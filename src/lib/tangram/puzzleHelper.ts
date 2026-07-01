/**
 * Tangram Puzzle Helper
 *
 * Single source of truth for puzzle processing:
 * 1. Accept raw relative coordinates (UNIT = 70.7 base, unscaled)
 * 2. Scale by PIECE_SCALE
 * 3. Calculate bounding box of the scaled composition
 * 4. Center the composition in the board's silhouette zone
 * 5. Generate silhouette from the absolute board coordinates
 * 6. Return { solution, silhouette } — both in absolute board coordinates
 *
 * AutoFill, validation, and hints all use solution directly.
 * No extra transforms, no extra offsets, no re-scaling.
 */

import { TangramPieceType } from '@/types/tangram'
import { PIECE_SCALE } from './pieceConfig'
import { BOARD_VIRTUAL_WIDTH, SILHOUETTE_HEIGHT } from './boardConfig'
import { getPuzzleBounds, buildSilhouette } from './buildSilhouette'

type PiecePos = { x: number; y: number; rotation: number }
type RawSolution = Record<TangramPieceType, PiecePos>

export interface ScaledPuzzle {
  solution: Record<TangramPieceType, PiecePos>
  silhouette: string
}

/** Padding (px) to keep shapes away from board edges */
const PADDING = 10

/**
 * Process a raw solution:
 * - raw coords use UNIT = 70.7 (unscaled) as the base unit
 * - PIECE_SCALE is applied here — not in the raw definitions
 */
export function processPuzzle(rawSolution: RawSolution): ScaledPuzzle {
  // 1. Scale every coordinate by PIECE_SCALE
  const scaled: RawSolution = {} as RawSolution
  for (const [pieceType, pos] of Object.entries(rawSolution)) {
    scaled[pieceType as TangramPieceType] = {
      x: pos.x * PIECE_SCALE,
      y: pos.y * PIECE_SCALE,
      rotation: pos.rotation,
    }
  }

  // 2. Calculate bounding box of the scaled composition
  const bounds = getPuzzleBounds(scaled)

  // 3. Compute centering offsets so the shape sits centered in the silhouette zone
  //    Silhouette zone = top 0..SILHOUETTE_HEIGHT of the board
  const availableW = BOARD_VIRTUAL_WIDTH - 2 * PADDING
  const availableH = SILHOUETTE_HEIGHT - 2 * PADDING

  const offsetX = (availableW - bounds.width) / 2 + PADDING - bounds.minX
  const offsetY = (availableH - bounds.height) / 2 + PADDING - bounds.minY

  // 4. Apply offsets — produce absolute board coordinates
  const boardSolution: RawSolution = {} as RawSolution
  for (const [pieceType, pos] of Object.entries(scaled)) {
    boardSolution[pieceType as TangramPieceType] = {
      x: pos.x + offsetX,
      y: pos.y + offsetY,
      rotation: pos.rotation,
    }
  }

  // 5. Build silhouette directly from the absolute board coordinates
  const silhouette = buildSilhouette(boardSolution)

  return { solution: boardSolution, silhouette }
}
