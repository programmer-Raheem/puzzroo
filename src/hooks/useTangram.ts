/**
 * Tangram Game Hook - REFACTORED WITH GEOMETRY ENGINE
 * Manages game state, piece movement, rotation, and game logic
 */

'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  TangramPiece,
  TangramPieceType,
  GameStatus,
} from '@/types/tangram'
import { validatePuzzle, getSolvedSquarePositions } from '@/lib/tangram/validation'
import { markPuzzleCompleted } from '@/lib/completion/universal'
import { TRAY_LAYOUT } from '@/lib/tangram/trayLayout'

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

export function useTangram() {
  const [pieces, setPieces] = useState<TangramPiece[]>(INITIAL_PIECES)
  const [selectedPiece, setSelectedPiece] = useState<TangramPieceType | null>(null)
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing')
  const [time, setTime] = useState(0)
  const [score, setScore] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [availableHints, setAvailableHints] = useState(3)
  const [isSolved, setIsSolved] = useState(false)
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const isAutoFilling = useRef(false)

  // Timer
  useEffect(() => {
    if (gameStatus !== 'playing') {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      return
    }

    timerRef.current = setInterval(() => {
      setTime((t) => t + 1)
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
    
    const validation = validatePuzzle(pieces)
    
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
    
    // Calculate final score: 1000 - seconds - (mistakes * 25) - (hints * 50)
    const finalScore = Math.max(0, 1000 - time - (mistakes * 25) - (hintsUsed * 50))
    setScore(finalScore)
    
    // Mark puzzle as completed in localStorage
    markPuzzleCompleted('tangram', 'square-puzzle', {
      time,
      hintsUsed,
      score: finalScore,
      difficulty: 'medium',
    })
  }, [time, mistakes, hintsUsed])

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

  // Undo last move - restore piece to tray position
  const undoMove = useCallback(() => {
    if (selectedPiece) {
      setPieces((prevPieces) =>
        prevPieces.map((piece) =>
          piece.id === selectedPiece
            ? { 
                ...piece, 
                isPlaced: false, 
                position: { ...piece.trayPosition } // Restore to original tray position
              }
            : piece
        )
      )
      setMistakes((m) => m + 1)
    }
  }, [selectedPiece])

  // Request hint
  const requestHint = useCallback(() => {
    if (availableHints > 0) {
      setAvailableHints((h) => h - 1)
      setHintsUsed((h) => h + 1)
      setScore((s) => Math.max(0, s - 10))
      // TODO: Implement hint logic (show correct position briefly)
    }
  }, [availableHints])

  // Auto Fill (Development Only)
  const autoFill = useCallback(() => {
    const solvedPositions = getSolvedSquarePositions()
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
  }, [])

  // Reset game
  const resetGame = useCallback(() => {
    setPieces(INITIAL_PIECES)
    setSelectedPiece(null)
    setGameStatus('playing')
    setTime(0)
    setScore(0)
    setMistakes(0)
    setHintsUsed(0)
    setAvailableHints(3)
    setIsSolved(false)
  }, [])

  // New game
  const newGame = useCallback(() => {
    resetGame()
  }, [resetGame])

  return {
    pieces,
    selectedPiece,
    gameStatus,
    time,
    score,
    mistakes,
    hintsUsed,
    availableHints,
    isSolved,
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
