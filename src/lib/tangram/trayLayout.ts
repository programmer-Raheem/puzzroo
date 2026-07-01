/**
 * Tangram Tray Layout Configuration
 * Defines absolute positions for pieces in the tray
 */

import { TangramPieceType } from '@/types/tangram'
import {
  BOARD_VIRTUAL_WIDTH,
  TRAY_HEIGHT,
  TRAY_TOP,
} from './boardConfig'

/** Space between tray top edge and row 1 pieces */
const TRAY_ROW1_PADDING = 35

/** Base Y for row 1 */
const ROW1_Y = TRAY_TOP + TRAY_ROW1_PADDING

/** Row 2 sits below row 1 with enough clearance for large pieces */
const ROW2_Y = TRAY_TOP + 135

/**
 * Tray dimensions
 */
export const TRAY_CONFIG = {
  desktop: {
    width: BOARD_VIRTUAL_WIDTH,
    height: TRAY_HEIGHT,
  },
  mobile: {
    maxWidth: 350,
    aspectRatio: BOARD_VIRTUAL_WIDTH / TRAY_HEIGHT,
  },
}

/**
 * Absolute tray positions for each piece
 */
export const TRAY_LAYOUT: Record<TangramPieceType, { x: number; y: number; rotation: number }> = {
  // ── ROW 1 ──
  'large-triangle-1': {
    x: 40,
    y: ROW1_Y,
    rotation: 45,
  },
  'medium-triangle': {
    x: 325,
    y: ROW1_Y + 8,
    rotation: 45,
  },
  'large-triangle-2': {
    x: 580,
    y: ROW1_Y,
    rotation: 45,
  },

  // ── ROW 2 ──
  'small-triangle-1': {
    x: 40,
    y: ROW2_Y,
    rotation: 45,
  },
  'small-triangle-2': {
    x: 216,
    y: ROW2_Y,
    rotation: 45,
  },
  'square': {
    x: 392,
    y: ROW2_Y,
    rotation: 0,
  },
  'parallelogram': {
    x: 580,
    y: ROW2_Y - 5,
    rotation: 0,
  },
}

/**
 * Get tray position for a piece
 */
export function getTrayPosition(pieceType: TangramPieceType) {
  return TRAY_LAYOUT[pieceType]
}

/**
 * Get scaled tray positions for mobile
 * Maintains same arrangement, scales proportionally
 */
export function getScaledTrayPosition(pieceType: TangramPieceType, containerWidth: number) {
  const scale = containerWidth / TRAY_CONFIG.desktop.width
  const pos = TRAY_LAYOUT[pieceType]

  return {
    x: pos.x * scale,
    y: pos.y * scale,
    rotation: pos.rotation,
  }
}
