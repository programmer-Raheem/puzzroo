import { TangramPieceType } from '@/types/tangram'
import { processPuzzle } from '../puzzleHelper'

const FISH_RAW: Record<TangramPieceType, { x: number; y: number; rotation: number }> = {
  'large-triangle-1': { x: -41, y: 29, rotation: 315 },
  'large-triangle-2': { x: 100, y: 29, rotation: 90 },
  'medium-triangle': { x: 150, y: -40, rotation: 0 },
  'square': { x: 114, y: 64, rotation: 0 },
  'small-triangle-1': { x: 220, y: 29, rotation: 45 },
  'small-triangle-2': { x: 185, y: 105, rotation: 270 },
  'parallelogram': { x: 43, y: 64, rotation: 0 },
}

const processed = processPuzzle(FISH_RAW)

export const FISH_SOLUTION = processed.solution
export const FISH_SILHOUETTE = processed.silhouette
