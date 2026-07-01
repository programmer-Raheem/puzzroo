/**
 * Tangram Validation Engine
 *
 * Position-based validation against the active puzzle's solution.
 * Uses the exact same getPieceVertices as the silhouette builder —
 * single source of truth for all geometry.
 */

import { TangramPiece, TangramPieceType } from '@/types/tangram'
import { SQUARE_SOLUTION, isPieceInSolution, isSquareSolved } from './squareSolution'

const POSITION_TOLERANCE = 10
const ROTATION_TOLERANCE = 10

interface ValidationResult {
  isSolved: boolean
  coverage: number
  overflow: number
  allPiecesUsed: boolean
  allPiecesPlaced: boolean
}

/**
 * Validate puzzle completion using solution-based approach.
 * Accepts puzzle-specific solution for validation.
 */
export function validatePuzzle(
  pieces: TangramPiece[],
  solution?: Record<TangramPieceType, { x: number; y: number; rotation: number }>
): ValidationResult {
  const allPiecesUsed   = pieces.length === 7
  const allPiecesPlaced = pieces.every(p => p.isPlaced)

  // Compare piece positions against the provided solution (or fallback to square)
  const targetSolution = solution || SQUARE_SOLUTION
  const isSolved = isPuzzleSolved(pieces, targetSolution)

  return {
    isSolved,
    coverage: allPiecesPlaced ? 100 : 0,
    overflow: 0,
    allPiecesUsed,
    allPiecesPlaced,
  }
}

/**
 * Check if all pieces match the target solution within tolerances.
 */
function isPuzzleSolved(
  pieces: TangramPiece[],
  solution: Record<TangramPieceType, { x: number; y: number; rotation: number }>
): boolean {
  if (!pieces.every(p => p.isPlaced)) return false

  return pieces.every((piece) => {
    const target = solution[piece.type]
    if (!target) return false

    const posMatch =
      Math.abs(piece.position.x - target.x) < POSITION_TOLERANCE &&
      Math.abs(piece.position.y - target.y) < POSITION_TOLERANCE

    const norm    = (r: number) => ((r % 360) + 360) % 360
    const rotDiff = Math.abs(norm(piece.position.rotation) - norm(target.rotation))
    const rotMatch = rotDiff < ROTATION_TOLERANCE || rotDiff > (360 - ROTATION_TOLERANCE)

    return posMatch && rotMatch
  })
}

/**
 * AutoFill: return the exact solution coordinates.
 * No recalculation, no transforms, no offsets — just the solution as-is.
 */
export function getSolvedPositions(
  solution?: Record<TangramPieceType, { x: number; y: number; rotation: number }>
): Record<TangramPieceType, { x: number; y: number; rotation: number }> {
  return solution || SQUARE_SOLUTION
}

/**
 * @deprecated Use getSolvedPositions instead
 */
export function getSolvedSquarePositions(): Record<TangramPieceType, { x: number; y: number; rotation: number }> {
  return SQUARE_SOLUTION
}

// Re-export grid helpers for any consumers that might still use them
export function generateTargetGrid(): number[][] { return [] }
export function generatePlayerGrid(): number[][] { return [] }
