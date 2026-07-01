/**
 * Rocket Tangram Solution
 *
 * Reference image: pointed nose from medium triangle, body from two large triangles,
 * engine section from square, fins from two small triangles, exhaust from parallelogram.
 *
 * Raw coordinates use UNIT = 70.7 (unscaled base).
 * Coordinates computed by vertex-matching solver (zero-cost).
 */

import { TangramPieceType } from '@/types/tangram'
import { processPuzzle } from '../puzzleHelper'

const UNIT = 70.7

const ROCKET_RAW: Record<TangramPieceType, { x: number; y: number; rotation: number }> = {
  // Nose cone — medium triangle at top
  'medium-triangle':  { x: 20.71,   y: 20.71,   rotation: 45  },
  // Body — two large triangles forming a rectangle
  'large-triangle-1': { x: 0,       y: UNIT,     rotation: 270 },
  'large-triangle-2': { x: 0,       y: UNIT,     rotation: 90  },
  // Engine section — square
  'square':           { x: UNIT * 0.5, y: UNIT * 3, rotation: 0 },
  // Left fin — small triangle
  'small-triangle-1': { x: -UNIT * 0.5, y: UNIT * 3, rotation: 180 },
  // Right fin — small triangle
  'small-triangle-2': { x: UNIT * 1.5,  y: UNIT * 3, rotation: 270 },
  // Exhaust nozzle — parallelogram
  'parallelogram':    { x: -UNIT * 0.5, y: UNIT * 4, rotation: 0   },
}

const processed = processPuzzle(ROCKET_RAW)

export const ROCKET_SOLUTION   = processed.solution
export const ROCKET_SILHOUETTE = processed.silhouette
