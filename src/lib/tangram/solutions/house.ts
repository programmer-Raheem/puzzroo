/**
 * House Tangram Solution
 *
 * Reference image: peaked roof formed by two large triangles,
 * walls from small triangles + parallelogram, door/window from medium triangle + square.
 *
 * Raw coordinates use UNIT = 70.7 (unscaled base).
 */

import { TangramPieceType } from '@/types/tangram'
import { processPuzzle } from '../puzzleHelper'

const UNIT = 70.7

const HOUSE_RAW: Record<TangramPieceType, { x: number; y: number; rotation: number }> = {
  // Roof — two large triangles meeting at peak (x = 2*UNIT)
  'large-triangle-1': { x: 0,         y: 0,         rotation: 180 },
  'large-triangle-2': { x: UNIT * 2,  y: 0,         rotation: 270 },
  // Left wall — two small triangles stacked
  'small-triangle-1': { x: 0,         y: UNIT * 2,  rotation: 270 },
  'small-triangle-2': { x: 0,         y: UNIT * 2,  rotation: 90  },
  // Center wall — parallelogram fills between small triangles and right wall
  'parallelogram':    { x: UNIT,       y: UNIT * 2,  rotation: 0   },
  // Right section — medium triangle + square form door/window
  'medium-triangle':  { x: UNIT * 2 + UNIT * Math.SQRT2 / 2,
                        y: UNIT * 2 + UNIT * Math.SQRT2 / 2,
                        rotation: 45  },
  'square':           { x: UNIT * 3,  y: UNIT * 2,  rotation: 0   },
}

const processed = processPuzzle(HOUSE_RAW)

export const HOUSE_SOLUTION   = processed.solution
export const HOUSE_SILHOUETTE = processed.silhouette
