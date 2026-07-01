/**
 * Windmill Tangram Solution
 *
 * Reference image: large body from two large triangles, rotating blades from
 * medium triangle + small triangles + square + parallelogram at top.
 *
 * Raw coordinates use UNIT = 70.7 (unscaled base).
 * Coordinates computed by vertex-matching solver.
 */

import { TangramPieceType } from '@/types/tangram'
import { processPuzzle } from '../puzzleHelper'

const UNIT = 70.7

const WINDMILL_RAW: Record<TangramPieceType, { x: number; y: number; rotation: number }> = {
  // Mill body — two large triangles forming a square
  'large-triangle-1': { x: 0,        y: UNIT * 2.5, rotation: 270 },
  'large-triangle-2': { x: 0,        y: UNIT * 2.5, rotation: 90  },
  // Blade hub — medium triangle sits on top of body
  'medium-triangle':  { x: 20.71,    y: UNIT * 1.5 + 20.71 - UNIT * Math.SQRT2, rotation: 45  },
  // Blade tip — square (rotated 45°)
  'square':           { x: 35.35,    y: 20.71,      rotation: 45  },
  // Left blade — small triangle
  'small-triangle-1': { x: 85.34,    y: UNIT,        rotation: 45  },
  // Right blade — small triangle
  'small-triangle-2': { x: -14.64,   y: UNIT,        rotation: 45  },
  // Side blade — parallelogram
  'parallelogram':    { x: 74.99,    y: UNIT * 1.35, rotation: 45  },
}

const processed = processPuzzle(WINDMILL_RAW)

export const WINDMILL_SOLUTION   = processed.solution
export const WINDMILL_SILHOUETTE = processed.silhouette
