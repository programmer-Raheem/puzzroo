import { TangramPieceType } from '@/types/tangram'
import { processPuzzle } from '../puzzleHelper'

const ARROW_RAW: Record<TangramPieceType, { x: number; y: number; rotation: number }> = {
  'large-triangle-1': { x: 170, y: -0.5, rotation: 45 },
  'large-triangle-2': { x: 170, y: 141, rotation: 315 },
  'medium-triangle': { x: 50, y: 70, rotation: 90 },
  'square': { x: -42, y: 64, rotation: 0 },
  'small-triangle-1': { x: -7, y: 29, rotation: 0 },
  'small-triangle-2': { x: -7, y: 141, rotation: 270 },
  'parallelogram': { x: -113, y: 64, rotation: 0 },
}

const processed = processPuzzle(ARROW_RAW)

export const ARROW_SOLUTION = processed.solution
export const ARROW_SILHOUETTE = processed.silhouette
