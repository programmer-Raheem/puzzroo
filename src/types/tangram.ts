/**
 * Tangram Types
 * Type definitions for Tangram game pieces, puzzles, and game state
 */

export type TangramPieceType = 
  | 'large-triangle-1'
  | 'large-triangle-2'
  | 'medium-triangle'
  | 'small-triangle-1'
  | 'small-triangle-2'
  | 'square'
  | 'parallelogram'

export interface TangramPiecePosition {
  x: number
  y: number
  rotation: number // Must be 0, 45, 90, 135, 180, 225, 270, or 315
}

export interface TangramPiece {
  id: TangramPieceType
  type: TangramPieceType
  position: TangramPiecePosition
  trayPosition: TangramPiecePosition // Original position in tray for reset/undo
  color: string
  isPlaced: boolean
}

export interface TangramPuzzle {
  id: string
  name: string
  difficulty: 'easy' | 'medium' | 'hard'
  silhouette: string // SVG path or description
  solution: Record<TangramPieceType, TangramPiecePosition>
}

export type GameStatus = 'playing' | 'won' | 'paused' | 'lost'

export interface TangramGameState {
  pieces: TangramPiece[]
  selectedPiece: TangramPieceType | null
  gameStatus: GameStatus
  time: number
  score: number
  mistakes: number
  hintsUsed: number
  availableHints: number
  isSolved: boolean
}
