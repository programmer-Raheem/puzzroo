/**
 * Tangram Silhouette Builder
 * Generates SVG silhouettes from actual piece arrangements
 * Ensures silhouette matches solution exactly
 */

import { TangramPieceType } from '@/types/tangram'
import { UNIT } from './pieceConfig'

export interface PiecePosition {
  x: number
  y: number
  rotation: number
}

export interface Point {
  x: number
  y: number
}

export interface Bounds {
  minX: number
  minY: number
  maxX: number
  maxY: number
  width: number
  height: number
}

/**
 * Get world-space vertices of a piece at a specific position and rotation.
 * Exported so puzzleHelper and validation can share this exact same logic.
 */
export function getPieceVertices(
  pieceType: TangramPieceType,
  position: PiecePosition
): Point[] {
  const { x, y, rotation } = position
  const rad = (rotation * Math.PI) / 180

  let baseVertices: Point[] = []
  let cx = 0
  let cy = 0

  switch (pieceType) {
    case 'large-triangle-1':
    case 'large-triangle-2':
      baseVertices = [
        { x: 0, y: 0 },
        { x: UNIT * 2, y: 0 },
        { x: 0, y: UNIT * 2 },
      ]
      cx = UNIT
      cy = UNIT
      break
    case 'medium-triangle':
      baseVertices = [
        { x: 0, y: 0 },
        { x: UNIT * Math.SQRT2, y: 0 },
        { x: 0, y: UNIT * Math.SQRT2 },
      ]
      cx = (UNIT * Math.SQRT2) / 2
      cy = (UNIT * Math.SQRT2) / 2
      break
    case 'small-triangle-1':
    case 'small-triangle-2':
      baseVertices = [
        { x: 0, y: 0 },
        { x: UNIT, y: 0 },
        { x: 0, y: UNIT },
      ]
      cx = UNIT / 2
      cy = UNIT / 2
      break
    case 'square':
      baseVertices = [
        { x: 0, y: 0 },
        { x: UNIT, y: 0 },
        { x: UNIT, y: UNIT },
        { x: 0, y: UNIT },
      ]
      cx = UNIT / 2
      cy = UNIT / 2
      break
    case 'parallelogram':
      baseVertices = [
        { x: UNIT, y: 0 },
        { x: UNIT * 2, y: 0 },
        { x: UNIT, y: UNIT },
        { x: 0, y: UNIT },
      ]
      cx = UNIT
      cy = UNIT / 2
      break
  }

  // Apply rotation around center, then translate to world position
  return baseVertices.map((v) => {
    const dx = v.x - cx
    const dy = v.y - cy
    const rotatedX = cx + dx * Math.cos(rad) - dy * Math.sin(rad)
    const rotatedY = cy + dx * Math.sin(rad) + dy * Math.cos(rad)
    return {
      x: x + rotatedX,
      y: y + rotatedY,
    }
  })
}

const ALL_PIECE_TYPES: TangramPieceType[] = [
  'large-triangle-1',
  'large-triangle-2',
  'medium-triangle',
  'small-triangle-1',
  'small-triangle-2',
  'square',
  'parallelogram',
]

/**
 * Calculate bounding box of all pieces in a solution.
 * Exported so puzzleHelper can use it for dynamic centering.
 */
export function getPuzzleBounds(
  solution: Record<TangramPieceType, PiecePosition>
): Bounds {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  ALL_PIECE_TYPES.forEach((type) => {
    const vertices = getPieceVertices(type, solution[type])
    vertices.forEach((v) => {
      minX = Math.min(minX, v.x)
      minY = Math.min(minY, v.y)
      maxX = Math.max(maxX, v.x)
      maxY = Math.max(maxY, v.y)
    })
  })

  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
  }
}

/**
 * Build SVG path from piece arrangement using convex hull.
 * Input: a solution where every piece position is in absolute board coordinates.
 * Output: an absolute SVG path string (no extra translate needed on the canvas).
 */
export function buildSilhouette(
  solution: Record<TangramPieceType, PiecePosition>
): string {
  const allVertices: Point[] = []

  ALL_PIECE_TYPES.forEach((type) => {
    const vertices = getPieceVertices(type, solution[type])
    allVertices.push(...vertices)
  })

  const hull = convexHull(allVertices)

  if (hull.length === 0) return ''

  let path = `M ${hull[0].x.toFixed(2)} ${hull[0].y.toFixed(2)}`
  for (let i = 1; i < hull.length; i++) {
    path += ` L ${hull[i].x.toFixed(2)} ${hull[i].y.toFixed(2)}`
  }
  path += ' Z'

  return path
}

/**
 * Convex hull algorithm (Andrew's monotone chain)
 */
function convexHull(points: Point[]): Point[] {
  if (points.length < 3) return points

  const sorted = [...points].sort((a, b) => {
    if (a.x !== b.x) return a.x - b.x
    return a.y - b.y
  })

  const lower: Point[] = []
  for (const p of sorted) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
      lower.pop()
    }
    lower.push(p)
  }

  const upper: Point[] = []
  for (let i = sorted.length - 1; i >= 0; i--) {
    const p = sorted[i]
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
      upper.pop()
    }
    upper.push(p)
  }

  lower.pop()
  upper.pop()

  return lower.concat(upper)
}

function cross(o: Point, a: Point, b: Point): number {
  return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x)
}
