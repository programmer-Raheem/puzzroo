/**
 * Hint Ghost Component - Phase 3
 * Shows ghost piece with animated dashed border (marching ants effect)
 */

'use client'

import React from 'react'
import { TangramPieceType } from '@/types/tangram'
import { PIECE_CONFIG } from '@/lib/tangram/pieceConfig'

interface HintGhostProps {
  pieceType: TangramPieceType
  solution: { x: number; y: number; rotation: number }
  color: string
  boardContainerWidth: number
}

export function HintGhost({ pieceType, solution, color, boardContainerWidth }: HintGhostProps) {
  const config = PIECE_CONFIG[pieceType]
  const scale = boardContainerWidth / 750

  return (
    <>
      <style jsx>{`
        @keyframes dashMove {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -32;
          }
        }
      `}</style>
      
      <div
        className="absolute pointer-events-none"
        style={{
          left: `${solution.x * scale}px`,
          top: `${solution.y * scale}px`,
          width: `${config.displayWidth * scale}px`,
          height: `${config.displayHeight * scale}px`,
          transform: `rotate(${solution.rotation}deg)`,
          transformOrigin: 'center',
          zIndex: 1,
        }}
      >
        <svg
          width={config.displayWidth * scale}
          height={config.displayHeight * scale}
          viewBox={`0 0 ${config.displayWidth} ${config.displayHeight}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          {/* Ghost piece fill */}
          <path
            d={config.svgPath}
            fill={color}
            opacity={0.22}
          />
          
          {/* Animated dashed border - Puzzroo Purple */}
          <path
            d={config.svgPath}
            fill="none"
            stroke="var(--color-primary, #6949FF)"
            strokeWidth="3"
            strokeDasharray="8 8"
            style={{
              animation: 'dashMove 1.2s linear infinite',
            }}
          />
        </svg>
      </div>
    </>
  )
}
