import { TangramPieceType } from '@/types/tangram'
import { processPuzzle } from '../puzzleHelper'

const DIAMOND_RAW: Record<TangramPieceType, { x: number; y: number; rotation: number }> = {
  'large-triangle-1': { x: 29, y: -41, rotation: 180 },
  'large-triangle-2': { x: 170, y: 70, rotation: 270 },
  'medium-triangle': { x: 50, y: 140, rotation: 0 },
  'square': { x: -7, y: 64, rotation: 45 },
  'small-triangle-1': { x: 64, y: 29, rotation: 45 },
  'small-triangle-2': { x: 135, y: 70, rotation: 225 },
  'parallelogram': { x: 19, y: 110, rotation: 315 },
}

const processed = processPuzzle(DIAMOND_RAW)

export const DIAMOND_SOLUTION = processed.solution
export const DIAMOND_SILHOUETTE = processed.silhouette
