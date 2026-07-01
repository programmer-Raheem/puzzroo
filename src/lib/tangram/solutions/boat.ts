/**
 * Boat Tangram Solution
 *
 * Reference image: diamond hull from two large triangles, square cabin on top,
 * bottom keel from small triangles + parallelogram + medium triangle.
 *
 * Raw coordinates use UNIT = 70.7 (unscaled base).
 * Coordinates computed by vertex-matching solver (zero-cost).
 */

import { TangramPieceType } from '@/types/tangram'
import { processPuzzle } from '../puzzleHelper'

const UNIT  = 70.7
const H     = UNIT * Math.SQRT2 // ≈ 100 — hypotenuse of small triangle

const BOAT_RAW: Record<TangramPieceType, { x: number; y: number; rotation: number }> = {
  // Cabin — square sits above the diamond hull
  'square':           { x: H,        y: -UNIT,       rotation: 0   },
  // Hull — two large triangles forming a diamond
  'large-triangle-1': { x: 29.28,    y: 29.28,       rotation: 45  },
  'large-triangle-2': { x: 29.28,    y: 29.28,       rotation: 225 },
  // Keel left — small triangle
  'small-triangle-1': { x: 0,        y: H * 2,       rotation: 0   },
  // Keel center — parallelogram
  'parallelogram':    { x: 0,        y: H * 2,       rotation: 0   },
  // Keel right — small triangle
  'small-triangle-2': { x: UNIT,     y: H * 2,       rotation: 180 },
  // Stern — medium triangle
  'medium-triangle':  { x: UNIT * 2, y: H * 2,       rotation: 270 },
}

const processed = processPuzzle(BOAT_RAW)

export const BOAT_SOLUTION   = processed.solution
export const BOAT_SILHOUETTE = processed.silhouette
