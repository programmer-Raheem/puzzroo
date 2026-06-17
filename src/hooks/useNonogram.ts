/**
 * Nonogram State Hook - Phase 2 Complete
 * Game logic, validation, completion detection, and progress tracking
 */

'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { 
  CellState, 
  CellPosition, 
  Difficulty, 
  PuzzleData, 
  ValidationStatus,
  GameStatus,
  GameProgress,
  HintState,
} from '@/lib/nonogram/types'
import { 
  createEmptyGrid,
  checkPuzzleCompletion,
  validateAllRows,
  validateAllColumns,
  calculateProgress,
  isCellMistake,
  findHintPosition,
} from '@/lib/nonogram/helpers'
import { getRandomPuzzle } from '@/data/nonogram'
import { 
  saveGameState, 
  loadGameState, 
  clearGameState,
  updateStatsOnCompletion,
  getHintLimits,
} from '@/lib/nonogram/storage'

export function useNonogram() {
  const searchParams = useSearchParams()
  const urlDifficulty = (searchParams.get('difficulty') || 'easy') as Difficulty

  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [currentPuzzle, setCurrentPuzzle] = useState<PuzzleData | null>(null)
  const [grid, setGrid] = useState<CellState[][]>([])
  const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  
  // Phase 2: Game state
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing')
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [rowValidation, setRowValidation] = useState<ValidationStatus[]>([])
  const [columnValidation, setColumnValidation] = useState<ValidationStatus[]>([])
  const [progress, setProgress] = useState<GameProgress>({
    totalCellsRequired: 0,
    correctCellsFilled: 0,
    percentComplete: 0,
  })
  const [hintsUsed, setHintsUsed] = useState(0)
  const [maxHints, setMaxHints] = useState(5)
  const [mistakeCell, setMistakeCell] = useState<CellPosition | null>(null)
  
  // Timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number | null>(null)

  /**
   * Initialize a new puzzle
   */
  const initializePuzzle = useCallback((diff: Difficulty, loadSaved = true) => {
    // Try to load saved game first
    if (loadSaved && typeof window !== 'undefined') {
      const saved = loadGameState()
      if (saved && saved.difficulty === diff) {
        const puzzle = getRandomPuzzle(diff)
        // Find the exact puzzle by ID
        setCurrentPuzzle(puzzle)
        setGrid(saved.grid)
        setElapsedSeconds(saved.elapsedSeconds)
        setHintsUsed(saved.hintsUsed)
        setMaxHints(getHintLimits(diff))
        setGameStatus('playing')
        return
      }
    }

    // Load new puzzle
    const puzzle = getRandomPuzzle(diff)
    const emptyGrid = createEmptyGrid(puzzle.size)
    
    setCurrentPuzzle(puzzle)
    setGrid(emptyGrid)
    setSelectedCell(null)
    setElapsedSeconds(0)
    setHintsUsed(0)
    setMaxHints(getHintLimits(diff))
    setGameStatus('playing')
    setRowValidation(Array(puzzle.size).fill('incomplete'))
    setColumnValidation(Array(puzzle.size).fill('incomplete'))
    setProgress({
      totalCellsRequired: 0,
      correctCellsFilled: 0,
      percentComplete: 0,
    })
    startTimeRef.current = null
  }, [])

  /**
   * Sync with URL difficulty on mount/change
   */
  useEffect(() => {
    if (typeof window !== 'undefined' && !isInitialized) {
      const valid = ['easy', 'medium', 'hard']
      const currentDiff = valid.includes(urlDifficulty) ? urlDifficulty : 'easy'
      
      setDifficulty(currentDiff)
      initializePuzzle(currentDiff)
      setIsInitialized(true)
    }
  }, [urlDifficulty, isInitialized, initializePuzzle])

  /**
   * Timer management
   */
  useEffect(() => {
    if (gameStatus === 'playing') {
      if (startTimeRef.current === null) {
        startTimeRef.current = Date.now() - (elapsedSeconds * 1000)
      }

      timerRef.current = setInterval(() => {
        if (startTimeRef.current !== null) {
          const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
          setElapsedSeconds(elapsed)
        }
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [gameStatus, elapsedSeconds])

  /**
   * Auto-save game state
   */
  useEffect(() => {
    if (isInitialized && gameStatus === 'playing' && currentPuzzle) {
      saveGameState({
        grid,
        puzzleId: currentPuzzle.id,
        difficulty,
        elapsedSeconds,
        hintsUsed,
        mistakeCount: 0,
        timestamp: Date.now(),
      })
    }
  }, [grid, currentPuzzle, difficulty, elapsedSeconds, hintsUsed, gameStatus, isInitialized])

  /**
   * Validation and progress tracking on grid change
   */
  useEffect(() => {
    if (!currentPuzzle || gameStatus !== 'playing') return

    // Validate rows and columns
    const rowStatus = validateAllRows(grid, currentPuzzle.rowClues)
    const colStatus = validateAllColumns(grid, currentPuzzle.columnClues)
    
    setRowValidation(rowStatus)
    setColumnValidation(colStatus)

    // Calculate progress
    const gameProgress = calculateProgress(grid, currentPuzzle.solution)
    setProgress(gameProgress)

    // Check for completion
    const isComplete = checkPuzzleCompletion(grid, currentPuzzle.solution)
    if (isComplete) {
      setGameStatus('won')
      updateStatsOnCompletion(elapsedSeconds)
      clearGameState()
    }
  }, [grid, currentPuzzle, gameStatus, elapsedSeconds])

  /**
   * Handle cell click - cycle through states: empty -> filled -> crossed -> empty
   */
  const handleCellClick = useCallback((position: CellPosition) => {
    if (gameStatus !== 'playing' || !currentPuzzle) return
    
    setSelectedCell(position)
    
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row])
      const currentState = newGrid[position.row][position.col]
      
      // Cycle: empty -> filled -> crossed -> empty
      if (currentState === 'empty') {
        newGrid[position.row][position.col] = 'filled'
      } else if (currentState === 'filled') {
        newGrid[position.row][position.col] = 'crossed'
      } else {
        newGrid[position.row][position.col] = 'empty'
      }
      
      // Check if this is a mistake (optional: for assisted mode)
      const isMistake = isCellMistake(newGrid, currentPuzzle.solution, position)
      if (isMistake && newGrid[position.row][position.col] !== 'empty') {
        setMistakeCell(position)
        setTimeout(() => setMistakeCell(null), 1000)
      }
      
      return newGrid
    })
  }, [currentPuzzle, gameStatus])

  /**
   * Reset the current puzzle
   */
  const resetPuzzle = useCallback(() => {
    if (currentPuzzle) {
      const emptyGrid = createEmptyGrid(currentPuzzle.size)
      setGrid(emptyGrid)
      setSelectedCell(null)
      setElapsedSeconds(0)
      setHintsUsed(0)
      setGameStatus('playing')
      setRowValidation(Array(currentPuzzle.size).fill('incomplete'))
      setColumnValidation(Array(currentPuzzle.size).fill('incomplete'))
      startTimeRef.current = null
      clearGameState()
    }
  }, [currentPuzzle])

  /**
   * Start a new puzzle
   */
  const newPuzzle = useCallback(() => {
    initializePuzzle(difficulty, false)
  }, [difficulty, initializePuzzle])

  /**
   * Change difficulty
   */
  const changeDifficulty = useCallback((newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty)
    initializePuzzle(newDifficulty, false)
  }, [initializePuzzle])

  /**
   * Use hint - reveal one correct cell
   */
  const useHint = useCallback(() => {
    if (!currentPuzzle || gameStatus !== 'playing') return
    if (hintsUsed >= maxHints) return

    const hintPosition = findHintPosition(grid, currentPuzzle.solution)
    if (!hintPosition) return

    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row])
      newGrid[hintPosition.row][hintPosition.col] = 'filled'
      return newGrid
    })

    setHintsUsed((prev) => prev + 1)
    setSelectedCell(hintPosition)
  }, [currentPuzzle, grid, gameStatus, hintsUsed, maxHints])

  /**
   * Keyboard navigation
   */
  useEffect(() => {
    if (gameStatus !== 'playing' || !currentPuzzle) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Arrow keys for navigation
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
        
        if (!selectedCell) {
          setSelectedCell({ row: 0, col: 0 })
          return
        }

        let newRow = selectedCell.row
        let newCol = selectedCell.col

        switch (e.key) {
          case 'ArrowUp':
            newRow = Math.max(0, selectedCell.row - 1)
            break
          case 'ArrowDown':
            newRow = Math.min(currentPuzzle.size - 1, selectedCell.row + 1)
            break
          case 'ArrowLeft':
            newCol = Math.max(0, selectedCell.col - 1)
            break
          case 'ArrowRight':
            newCol = Math.min(currentPuzzle.size - 1, selectedCell.col + 1)
            break
        }

        setSelectedCell({ row: newRow, col: newCol })
      }

      // Space or Enter to toggle cell
      if (selectedCell && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault()
        handleCellClick(selectedCell)
      }

      // Backspace or Delete to clear cell
      if (selectedCell && (e.key === 'Backspace' || e.key === 'Delete')) {
        e.preventDefault()
        setGrid((prevGrid) => {
          const newGrid = prevGrid.map((row) => [...row])
          newGrid[selectedCell.row][selectedCell.col] = 'empty'
          return newGrid
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedCell, gameStatus, currentPuzzle, handleCellClick])

  return {
    // State
    grid,
    selectedCell,
    difficulty,
    currentPuzzle,
    isInitialized,
    gameStatus,
    elapsedSeconds,
    rowValidation,
    columnValidation,
    progress,
    hintsUsed,
    maxHints,
    mistakeCell,

    // Actions
    handleCellClick,
    resetPuzzle,
    newPuzzle,
    changeDifficulty,
    useHint,
  }
}
