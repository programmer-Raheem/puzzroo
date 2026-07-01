/**
 * Tangram board layout constants
 *
 * Virtual space is sized so desktop display (700×460) scales uniformly —
 * the inner square stays a true square at any board size.
 */

import { PIECE_SCALE } from './pieceConfig'

export const BOARD_DISPLAY_WIDTH = 700
export const BOARD_DISPLAY_HEIGHT = 460

export const BOARD_VIRTUAL_WIDTH = 750

/** Matches display aspect ratio: 700/750 === 460/VIRTUAL_HEIGHT */
export const BOARD_VIRTUAL_HEIGHT = Math.round(
  (BOARD_DISPLAY_HEIGHT * BOARD_VIRTUAL_WIDTH) / BOARD_DISPLAY_WIDTH
) // 493

/** Silhouette zone — scaled from original 400/700 layout */
export const SILHOUETTE_HEIGHT = Math.round((400 * BOARD_VIRTUAL_HEIGHT) / 700) // 282

export const TRAY_TOP = SILHOUETTE_HEIGHT
export const TRAY_HEIGHT = BOARD_VIRTUAL_HEIGHT - SILHOUETTE_HEIGHT

/** Scale legacy Y coordinates (from 700-tall board) into current virtual space */
export const LEGACY_Y_SCALE = BOARD_VIRTUAL_HEIGHT / 700

/** Square silhouette — scaled from original layout (was y=90 on 700-tall board) */
export const LEGACY_SQUARE_TOP = (400 / 2 - 200 / 2) * 1.1 // Move down 10% for more space at top
export const SQUARE_SIZE = 200 * PIECE_SCALE
export const SQUARE_LEFT = BOARD_VIRTUAL_WIDTH / 2 - SQUARE_SIZE / 2
export const SQUARE_TOP = (SILHOUETTE_HEIGHT - SQUARE_SIZE) / 2
export const SQUARE_RIGHT = SQUARE_LEFT + SQUARE_SIZE
export const SQUARE_BOTTOM = SQUARE_TOP + SQUARE_SIZE

export function scaleLegacyY(y: number): number {
  return y * LEGACY_Y_SCALE
}
