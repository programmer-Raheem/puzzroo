/**
 * Tangram Square Solution — Master Reference Puzzle
 *
 * Raw coordinates use UNIT = 70.7 (unscaled base).
 * processPuzzle() handles: scaling → centering → silhouette generation.
 *
 * Square decomposition (classic):
 *   LT1 fills top-left half; LT2 fills top-right half.
 *   Medium triangle fills bottom-right quadrant.
 *   Small triangles + square + parallelogram fill bottom-left quadrant.
 */

import { TangramPieceType } from '@/types/tangram'
import { processPuzzle } from './puzzleHelper'

const UNIT = 70.7

const SQUARE_RAW: Record<TangramPieceType, { x: number; y: number; rotation: number }> = {
  // Top-left large triangle (right-angle at top-left, hypotenuse is diagonal)
  'large-triangle-1': { x: 0,       y: 0,       rotation: 0   },
  // Top-right large triangle (mirrored, filling the right half of top row)
  'large-triangle-2': { x: UNIT*2,  y: 0,       rotation: 90  },
  // Medium triangle fills bottom-right corner
  'medium-triangle':  { x: UNIT*2,  y: UNIT*2,  rotation: 180 },
  // Small triangle — bottom-left
  'small-triangle-1': { x: 0,       y: UNIT*2,  rotation: 0   },
  // Small triangle — bottom-center, placed adjacent
  'small-triangle-2': { x: UNIT,    y: UNIT*2,  rotation: 90  },
  // Square — rotated 45° filling the gap
  'square':           { x: UNIT*0.5 - UNIT/2, y: UNIT*2 + UNIT/2, rotation: 45 },
  // Parallelogram — bottom strip
  'parallelogram':    { x: UNIT,    y: UNIT*3,  rotation: 180 },
}

const processed = processPuzzle(SQUARE_RAW)

export const SQUARE_SOLUTION  = processed.solution
export const SQUARE_SILHOUETTE = processed.silhouette

// ─── Validation helpers ────────────────────────────────────────────────────

export const POSITION_TOLERANCE = 18
export const ROTATION_TOLERANCE = 12

export function isPieceInSolution(
  pieceType: TangramPieceType,
  currentX: number,
  currentY: number,
  currentRotation: number
): boolean {
  const sol = SQUARE_SOLUTION[pieceType]
  const xOk  = Math.abs(currentX - sol.x) < POSITION_TOLERANCE
  const yOk  = Math.abs(currentY - sol.y) < POSITION_TOLERANCE
  const norm  = (r: number) => ((r % 360) + 360) % 360
  const diff  = Math.abs(norm(currentRotation) - norm(sol.rotation))
  const rotOk = diff < ROTATION_TOLERANCE || Math.abs(diff - 360) < ROTATION_TOLERANCE
  return xOk && yOk && rotOk
}

function matchesSlot(
  currentX: number, currentY: number, currentRotation: number,
  slotType: TangramPieceType
): boolean {
  const sol   = SQUARE_SOLUTION[slotType]
  const xOk   = Math.abs(currentX - sol.x) < POSITION_TOLERANCE
  const yOk   = Math.abs(currentY - sol.y) < POSITION_TOLERANCE
  const norm   = (r: number) => ((r % 360) + 360) % 360
  const diff   = Math.abs(norm(currentRotation) - norm(sol.rotation))
  const rotOk  = diff < ROTATION_TOLERANCE || Math.abs(diff - 360) < ROTATION_TOLERANCE
  return xOk && yOk && rotOk
}

export function isSquareSolved(pieces: Array<{
  type: TangramPieceType
  position: { x: number; y: number; rotation: number }
  isPlaced: boolean
}>): boolean {
  if (!pieces.every(p => p.isPlaced)) return false

  const LARGE_GROUP: [TangramPieceType, TangramPieceType] = ['large-triangle-1', 'large-triangle-2']
  const SMALL_GROUP: [TangramPieceType, TangramPieceType] = ['small-triangle-1', 'small-triangle-2']

  function groupSolved(group: [TangramPieceType, TangramPieceType]): boolean {
    const a = pieces.find(p => p.type === group[0])
    const b = pieces.find(p => p.type === group[1])
    if (!a || !b) return false
    const ab = matchesSlot(a.position.x, a.position.y, a.position.rotation, group[0]) &&
               matchesSlot(b.position.x, b.position.y, b.position.rotation, group[1])
    const ba = matchesSlot(a.position.x, a.position.y, a.position.rotation, group[1]) &&
               matchesSlot(b.position.x, b.position.y, b.position.rotation, group[0])
    return ab || ba
  }

  for (const type of ['medium-triangle', 'square', 'parallelogram'] as TangramPieceType[]) {
    const piece = pieces.find(p => p.type === type)
    if (!piece) return false
    if (!isPieceInSolution(type, piece.position.x, piece.position.y, piece.position.rotation)) return false
  }

  return groupSolved(LARGE_GROUP) && groupSolved(SMALL_GROUP)
}
