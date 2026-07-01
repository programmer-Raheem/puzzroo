/**
 * Tangram Puzzle Types
 * Phase 3: Difficulty System & Puzzle Datasets
 */

import { TangramPieceType } from './tangram'

export type TangramDifficulty = 'easy' | 'medium' | 'hard'

export interface PiecePosition {
  x: number
  y: number
  rotation: number
}

export interface TangramPuzzle {
  id: string
  title: string
  difficulty: TangramDifficulty
  silhouette: string // SVG path data
  solution: Record<TangramPieceType, PiecePosition>
  timeLimit: number // in seconds
}

export interface CompletedTangramPuzzle {
  id: string
  title: string
  difficulty: TangramDifficulty
  score: number
  remainingTime: number
  completedAt: string // ISO date string
  hintsUsed: number
}

export const TIME_LIMITS: Record<TangramDifficulty, number> = {
  easy: 120, // 2 minutes
  medium: 240, // 4 minutes
  hard: 360, // 6 minutes
}

export const MAX_HINTS = 3
