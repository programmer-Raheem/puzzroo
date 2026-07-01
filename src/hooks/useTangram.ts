/**
 * Tangram Game Hook
 * Phase 3: Countdown timer, Hints, Scoring, Puzzle loading
 */

'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  TangramPiece,
  TangramPieceType,
  GameStatus,
} from '@/types/tangram'
import { TangramPuzzle, TangramDifficulty, MAX_HINTS } from '@/types/tangram-puzzle'
import { validatePuzzle, getSolvedPositions } from '@/lib/tangram/validation'
import { TRAY_LAYOUT } from '@/lib/tangram/trayLayout'
import { getRandomPuzzle } from '@/data/tangram'
import { saveCompletedPuzzle } from '@/data/tangram/past-puzzles'

// Initial pieces using canonical tray positions
const INITIAL_PIECES: TangramPiece[] = [
  {
    id: 'large-triangle-1',
    type: 'large-triangle-1',
    position: { ...TRAY_LAYOUT['large-triangle-1'] },
    trayPosition: { ...TRAY_LAYOUT['large-triangle-1'] },
    color: '#4A90E2',
    isPlaced: false,
  },
  {
    id: 'large-triangle-2',
    type: 'large-triangle-2',
    position: { ...TRAY_LAYOUT['large-triangle-2'] },
    trayPosition: { ...TRAY_LAYOUT['large-triangle-2'] },
    color: '#5C6BC0',
    isPlaced: false,
  },
  {
    id: 'medium-triangle',
    type: 'medium-triangle',
    position: { ...TRAY_LAYOUT['medium-triangle'] },
    trayPosition: { ...TRAY_LAYOUT['medium-triangle'] },
    color: '#F4A261',
    isPlaced: false,
  },
  {
    id: 'small-triangle-1',
    type: 'small-triangle-1',
    position: { ...TRAY_LAYOUT['small-triangle-1'] },
    trayPosition: { ...TRAY_LAYOUT['small-triangle-1'] },
    color: '#E76F51',
    isPlaced: false,
  },
  {
    id: 'small-triangle-2',
    type: 'small-triangle-2',
    position: { ...TRAY_LAYOUT['small-triangle-2'] },
    trayPosition: { ...TRAY_LAYOUT['small-triangle-2'] },
    color: '#2A9D8F',
    isPlaced: false,
  },
  {
    id: 'square',
    type: 'square',
    position: { ...TRAY_LAYOUT['square'] },
    trayPosition: { ...TRAY_LAYOUT['square'] },
    color: '#E63946',
    isPlaced: false,
  },
  {
    id: 'parallelogram',
    type: 'parallelogram',
    position: { ...TRAY_LAYOUT['parallelogram'] },
    trayPosition: { ...TRAY_LAYOUT['parallelogram'] },
    color: '#78C2AD',
    isPlaced: false,
  },
]

interface UseTangramOptions {
  difficulty?: TangramDifficulty
  puzzleId?: string
}

export function useTangram(options: UseTangramOptions = {}) {
  const { difficulty = 'easy' } = options
  
  // Load initial puzzle
  const [currentPuzzle, setCurrentPuzzle] = useState<TangramPuzzle | null>(() => {
    return getRandomPuzzle(difficulty)
  })
  
  const [pieces, setPieces] = useState<TangramPiece[]>(INITIAL_PIECES)
  const [selectedPiece, setSelectedPiece] = useState<TangramPieceType | null>(null)
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing')
  const [timeRemaining, setTimeRemaining] = useState(currentPuzzle?.timeLimit || 120)
  const [score, setScore] = useState(0)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [hintPiece, setHintPiece] = useState<TangramPieceType | null>(null)
  const [isSolved, setIsSolved] = useState(false)
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const isAutoFilling = useRef(false)

  // Countdown Timer (Phase 3 requirement)
  useEffect(() => {
    if (gameStatus !== 'playing') {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      return
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining((t) => {
        if (t <= 1) {
          // Time's up!
          setGameStatus('lost')
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [gameStatus])

  // Validate puzzle after pieces change
  useEffect(() => {
    if (gameStatus !== 'playing') return
    
    const validation = validatePuzzle(pieces, currentPuzzle?.solution)
    
    if (validation.isSolved && !isSolved) {
      if (isAutoFilling.current) {
        // Delay modal by 1s so user sees the completed square
        setTimeout(() => {
          handlePuzzleComplete()
        }, 1000)
      } else {
        handlePuzzleComplete()
      }
    }
  }, [pieces, gameStatus, isSolved])

  // Handle puzzle completion
  const handlePuzzleComplete = useCallback(() => {
    setIsSolved(true)
    setGameStatus('won')
    
    // Phase 3 Scoring: score = 1000 + remainingSeconds*5 - (hintsUsed*100)
    const finalScore = Math.max(0, 1000 + timeRemaining * 5 - hintsUsed * 100)
    setScore(finalScore)
    
    // Save to past puzzles
    if (currentPuzzle) {
      saveCompletedPuzzle({
        id: currentPuzzle.id,
        title: currentPuzzle.title,
        difficulty: currentPuzzle.difficulty,
        score: finalScore,
        remainingTime: timeRemaining,
        completedAt: new Date().toISOString(),
        hintsUsed,
      })
    }
  }, [timeRemaining, hintsUsed, currentPuzzle])

  // Select piece
  const selectPiece = useCallback((pieceId: TangramPieceType) => {
    setSelectedPiece(pieceId)
  }, [])

  // Deselect piece
  const deselectPiece = useCallback(() => {
    setSelectedPiece(null)
  }, [])

  // Move piece
  const movePiece = useCallback((pieceId: TangramPieceType, x: number, y: number) => {
    setPieces((prevPieces) =>
      prevPieces.map((piece) =>
        piece.id === pieceId
          ? { ...piece, position: { ...piece.position, x, y }, isPlaced: true }
          : piece
      )
    )
  }, [])

  // Rotate piece by one step in the given direction (+45 or -45)
  // Increases/decreases the numerical angle infinitely to ensure CSS transitions
  // animate smoothly in the correct direction without jumping back.
  const rotatePiece = useCallback(
    (pieceId: TangramPieceType, direction: 1 | -1) => {
      setPieces((prevPieces) =>
        prevPieces.map((piece) => {
          if (piece.id !== pieceId) return piece
          const newRotation = piece.position.rotation + direction * 45
          return {
            ...piece,
            position: { ...piece.position, rotation: newRotation },
          }
        })
      )
    },
    []
  )

  // Rotate selected piece left (one step counter-clockwise)
  const rotateLeft = useCallback(() => {
    if (selectedPiece) {
      rotatePiece(selectedPiece, -1)
    }
  }, [selectedPiece, rotatePiece])

  // Rotate selected piece right (one step clockwise)
  const rotateRight = useCallback(() => {
    if (selectedPiece) {
      rotatePiece(selectedPiece, 1)
    }
  }, [selectedPiece, rotatePiece])

  // Rotate center (snap to next angle clockwise)
  const rotateCenter = useCallback(() => {
    if (selectedPiece) {
      rotatePiece(selectedPiece, 1)
    }
  }, [selectedPiece, rotatePiece])

  // Snap piece to exact position + rotation (used by magnetic snap)
  const snapPiece = useCallback((pieceId: TangramPieceType, x: number, y: number, rotation: number) => {
    setPieces((prevPieces) =>
      prevPieces.map((piece) =>
        piece.id === pieceId
          ? { ...piece, position: { x, y, rotation }, isPlaced: true }
          : piece
      )
    )
  }, [])

  // Undo move
  const undoMove = useCallback(() => {
    if (selectedPiece) {
      setPieces((prevPieces) =>
        prevPieces.map((piece) =>
          piece.id === selectedPiece
            ? { 
                ...piece, 
                isPlaced: false, 
                position: { ...piece.trayPosition }
              }
            : piece
        )
      )
    }
  }, [selectedPiece])

  // Request hint (Phase 3: Ghost piece system)
  const requestHint = useCallback(() => {
    if (hintsUsed >= MAX_HINTS || !currentPuzzle) return
    
    // Find first unplaced piece
    const unplacedPiece = pieces.find(p => !p.isPlaced)
    if (!unplacedPiece) return
    
    setHintsUsed((h) => h + 1)
    setHintPiece(unplacedPiece.type)
    
    // Clear hint after 5 seconds
    setTimeout(() => {
      setHintPiece(null)
    }, 5000)
  }, [hintsUsed, pieces, currentPuzzle])

  // Auto Fill (Development Only)
  const autoFill = useCallback(() => {
    if (!currentPuzzle) return
    const solvedPositions = getSolvedPositions(currentPuzzle.solution)
    isAutoFilling.current = true
    
    setPieces((prevPieces) =>
      prevPieces.map((piece) => {
        const solvedPos = solvedPositions[piece.type]
        if (solvedPos) {
          return {
            ...piece,
            position: solvedPos,
            isPlaced: true,
          }
        }
        return piece
      })
    )

    // Clear flag after delay (modal appears after 1s, clear flag safely after 1.5s)
    setTimeout(() => {
      isAutoFilling.current = false
    }, 1500)
  }, [currentPuzzle])

  // Reset game
  const resetGame = useCallback(() => {
    setPieces(INITIAL_PIECES)
    setSelectedPiece(null)
    setGameStatus('playing')
    setTimeRemaining(currentPuzzle?.timeLimit || 120)
    setScore(0)
    setHintsUsed(0)
    setHintPiece(null)
    setIsSolved(false)
  }, [currentPuzzle])

  // New game (loads another puzzle from same difficulty)
  const newGame = useCallback(() => {
    const newPuzzle = getRandomPuzzle(difficulty)
    setCurrentPuzzle(newPuzzle)
    setPieces(INITIAL_PIECES)
    setSelectedPiece(null)
    setGameStatus('playing')
    setTimeRemaining(newPuzzle?.timeLimit || 120)
    setScore(0)
    setHintsUsed(0)
    setHintPiece(null)
    setIsSolved(false)
  }, [difficulty])

  return {
    pieces,
    selectedPiece,
    gameStatus,
    timeRemaining,
    score,
    hintsUsed,
    hintPiece,
    availableHints: MAX_HINTS - hintsUsed,
    isSolved,
    currentPuzzle,
    selectPiece,
    deselectPiece,
    movePiece,
    rotatePiece,
    rotateLeft,
    rotateRight,
    rotateCenter,
    undoMove,
    requestHint,
    autoFill,
    resetGame,
    newGame,
    snapPiece,
  }
}
