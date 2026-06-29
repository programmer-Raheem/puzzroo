/**
 * Orbital Helper Component
 * Fixed orbital ring - only the shape inside rotates
 * Click + drag on circle border or touch gestures to rotate shape
 */

'use client'

import React, { useRef, useState, useEffect } from 'react'

interface OrbitalHelperProps {
  x: number | string
  y: number | string
  show: boolean
  onRotateLeft: () => void
  onRotateRight: () => void
  rotation: number
  orbitRadius?: number
}

export function OrbitalHelper({ x, y, show, onRotateLeft, onRotateRight, rotation, orbitRadius = 85 }: OrbitalHelperProps) {
  const [isDragging, setIsDragging] = useState(false)
  const dragStartAngle = useRef<number>(0)
  const currentAngle = useRef<number>(0)
  const centerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const lastTouchAngle = useRef<number>(0)

  if (!show) return null

  const getAngle = (clientX: number, clientY: number) => {
    const dx = clientX - centerRef.current.x
    const dy = clientY - centerRef.current.y
    return Math.atan2(dy, dx) * (180 / Math.PI)
  }

  const handleCircleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()

    const rect = e.currentTarget.getBoundingClientRect()
    centerRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }
    dragStartAngle.current = getAngle(e.clientX, e.clientY)
    currentAngle.current = dragStartAngle.current
    setIsDragging(true)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return

    const newAngle = getAngle(e.clientX, e.clientY)
    let angleDiff = newAngle - currentAngle.current

    if (angleDiff > 180) {
      angleDiff -= 360
    }

    if (angleDiff < -180) {
      angleDiff += 360
    }

    // Continuous smooth rotation - rotate every 15 degrees of circle drag
    if (Math.abs(angleDiff) >= 15) {
      if (angleDiff > 0) {
        onRotateRight()
      } else {
        onRotateLeft()
      }
      currentAngle.current = newAngle
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation()

    if (e.touches.length === 1) {
      const rect = e.currentTarget.getBoundingClientRect()
      centerRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      }
      const touch = e.touches[0]
      dragStartAngle.current = getAngle(touch.clientX, touch.clientY)
      currentAngle.current = dragStartAngle.current
      lastTouchAngle.current = dragStartAngle.current
      setIsDragging(true)
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return

    e.preventDefault()
    const touch = e.touches[0]
    const newAngle = getAngle(touch.clientX, touch.clientY)
    const angleDiff = newAngle - currentAngle.current

    // Smooth rotation for touch - rotate every 15 degrees
    if (Math.abs(angleDiff) >= 15) {
      if (angleDiff > 0) {
        onRotateRight()
      } else {
        onRotateLeft()
      }
      currentAngle.current = newAngle
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging])

  return (
    <div
      className="absolute"
      style={{
        left: typeof x === 'number' ? `${x}px` : x,
        top: typeof y === 'number' ? `${y}px` : y,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 100,
      }}
    >
      {/* Fixed orbital ring - does NOT rotate */}
      <div
        className="absolute"
        style={{
          width: `${orbitRadius * 2}px`,
          height: `${orbitRadius * 2}px`,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      >
        {/* Clickable circle BORDER ONLY for rotation */}
        <svg
          width={orbitRadius * 2}
          height={orbitRadius * 2}
          className="absolute inset-0"
          style={{
            overflow: 'visible',
          }}
        >
          <circle
            cx={orbitRadius}
            cy={orbitRadius}
            r={orbitRadius - 12}
            fill="none"
            stroke="transparent"
            strokeWidth="24"
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
              pointerEvents: 'stroke',
            }}
            onMouseDown={handleCircleMouseDown}
            onTouchStart={handleTouchStart}
          />
        </svg>

        <svg
          width={orbitRadius * 2}
          height={orbitRadius * 2}
          className="absolute inset-0"
          style={{ pointerEvents: 'none' }}
        >
          <defs>
            <filter id="glassBlur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Single thick grey ring - FIXED, does NOT rotate */}
          <circle
            cx={orbitRadius}
            cy={orbitRadius}
            r={orbitRadius - 12}
            fill="none"
            stroke="#9E9E9E"
            strokeWidth="16"
            opacity="0.7"
            filter="url(#glassBlur)"
          />
        </svg>

        {/* TOP BADGE - Purple with < > arrows - FIXED position */}
        <div
          className="absolute"
          style={{
            left: '50%',
            top: '-5px',
            transform: 'translateX(-50%)',
            zIndex: 101,
            pointerEvents: 'auto',
          }}
        >
          <div className="bg-[#6949FF] rounded-full px-3 py-1.5 flex items-center gap-2 shadow-lg">
            {/* Rotate Left Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onRotateLeft()
              }}
              className="hover:scale-125 active:scale-95 transition-transform duration-150"
              aria-label="Rotate left"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M8 2 L4 6 L8 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Rotate Right Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onRotateRight()
              }}
              className="hover:scale-125 active:scale-95 transition-transform duration-150"
              aria-label="Rotate right"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4 2 L8 6 L4 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
