/**
 * Tangram Stats Component
 * Displays game statistics (Time, Score, Mistakes)
 * Reuses Sudoku stats panel structure
 */

'use client'

import React from 'react'

interface TangramStatsProps {
  time: number
  score: number
  mistakes: number
  mobile?: boolean
}

export function TangramStats({
  time,
  score,
  mistakes,
  mobile = false,
}: TangramStatsProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  if (mobile) {
    return (
      <div className="w-full flex justify-between items-center">
        <span className="font-urbanist font-semibold text-[16px] leading-[140%] tracking-[0.2px] text-[#424242] dark:text-[#E0E0E0]">
          Time: <span className="text-[var(--color-primary)] inline-block min-w-[5ch]" style={{ fontVariantNumeric: 'tabular-nums' }}>{formatTime(time)}</span>
        </span>
        <span className="font-urbanist font-semibold text-[16px] leading-[140%] tracking-[0.2px] text-[#424242] dark:text-[#E0E0E0]">
          Score: <span className="text-[var(--color-primary)] inline-block min-w-[2.5ch]" style={{ fontVariantNumeric: 'tabular-nums' }}>{score}</span>
        </span>
        <span className="font-urbanist font-semibold text-[16px] leading-[140%] tracking-[0.2px] text-[#424242] dark:text-[#E0E0E0]">
          Mistakes: <span className="text-[var(--color-primary)]" style={{ fontVariantNumeric: 'tabular-nums' }}>{mistakes}</span>
        </span>
      </div>
    )
  }

  return (
    <div className="w-[230px] flex flex-col gap-[12px]">
      {/* Score - centered with stable width */}
      <div className="text-center">
        <span className="font-urbanist font-semibold text-[24px] leading-[140%] tracking-[0.2px] text-[#424242] dark:text-[#E0E0E0]">
          Score: <span className="text-[var(--color-primary)] inline-block min-w-[3ch]" style={{ fontVariantNumeric: 'tabular-nums' }}>{score}</span>
        </span>
      </div>

      {/* Time and Mistakes with stable widths */}
      <div className="flex justify-between items-center">
        <span className="font-urbanist font-semibold text-[16px] leading-[140%] tracking-[0.2px] text-[#424242] dark:text-[#E0E0E0]">
          Time: <span className="text-[var(--color-primary)] inline-block min-w-[5ch]" style={{ fontVariantNumeric: 'tabular-nums' }}>{formatTime(time)}</span>
        </span>
        <span className="font-urbanist font-semibold text-[16px] leading-[140%] tracking-[0.2px] text-[#424242] dark:text-[#E0E0E0]">
          Mistakes: <span className="text-[var(--color-primary)]" style={{ fontVariantNumeric: 'tabular-nums' }}>{mistakes}</span>
        </span>
      </div>
    </div>
  )
}
