/**
 * Tangram Board Component - REFACTORED WITH GEOMETRY ENGINE
 * Canvas-based board with grey background, BLACK square silhouette, and black piece tray
 */

'use client'

import React, { useRef, useEffect } from 'react'
import { TARGET_SQUARE_SIZE } from '@/lib/tangram/pieceConfig'

interface TangramBoardProps {
  children: React.ReactNode
  mobile?: boolean
}

export function TangramBoard({ children, mobile = false }: TangramBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const VIRTUAL_WIDTH = 750
  const VIRTUAL_HEIGHT = 700

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Grey background for entire canvas
    ctx.fillStyle = '#71717A'
    ctx.fillRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT)

    // Silhouette area (top part)
    const silhouetteHeight = 400

    // Hidden BLACK square silhouette - matches total piece area (~283×283px)
    const shapeSize = Math.round(TARGET_SQUARE_SIZE)
    const centerX = VIRTUAL_WIDTH / 2 - shapeSize / 2
    const centerY = (silhouetteHeight / 2 - shapeSize / 2) * 0.9 // 10% upward shift

    // Draw BLACK silhouette (15% opacity)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'
    ctx.fillRect(centerX, centerY, shapeSize, shapeSize)

    // Black tray area (bottom part)
    const trayTop = silhouetteHeight
    const trayHeight = VIRTUAL_HEIGHT - silhouetteHeight
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, trayTop, VIRTUAL_WIDTH, trayHeight)
  }, [])

  return (
    <div className="relative w-full max-w-[450px] md:max-w-[600px] aspect-[750/700] tangram-board-container mx-auto">
      <canvas
        ref={canvasRef}
        width={VIRTUAL_WIDTH}
        height={VIRTUAL_HEIGHT}
        className="w-full h-full block rounded-[5px] border-2 border-[#CDCDCD]"
      />

      {/* Pieces overlay on canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full pointer-events-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
