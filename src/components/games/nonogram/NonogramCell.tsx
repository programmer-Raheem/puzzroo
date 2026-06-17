'use client'

import { CellState, CellPosition } from '@/lib/nonogram/types'
import { shouldHaveThickBorder } from '@/lib/nonogram/helpers'

interface NonogramCellProps {
  state: CellState
  position: CellPosition
  isSelected: boolean
  isMobile?: boolean
  onClick: (position: CellPosition) => void
}

export function NonogramCell({
  state,
  position,
  isSelected,
  isMobile = false,
  onClick,
}: NonogramCellProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onClick(position)
  }

  // Check if this cell should have thick borders (5x5 grouping)
  const hasThickRight = shouldHaveThickBorder(position.col + 1, 5)
  const hasThickBottom = shouldHaveThickBorder(position.row + 1, 5)

  // Background color based on state
  let bgClass = ''
  if (state === 'filled') {
    bgClass = 'bg-[#2F6FED]'
  } else if (state === 'crossed') {
    bgClass = 'bg-white dark:bg-[#181A20]'
  } else if (isSelected) {
    bgClass = 'bg-[#A592FF]' // Purple selection like Sudoku
  } else {
    bgClass = 'bg-white dark:bg-[#181A20] hover:bg-[#E8DFFF] dark:hover:bg-[#2A2D35]'
  }

  const cellSize = isMobile ? 24 : 32

  return (
    <button
      onClick={handleClick}
      onMouseDown={(e) => e.preventDefault()}
      className={`
        relative
        flex items-center justify-center
        ${bgClass}
        border-[1px] border-[#D0D3DC] dark:border-[#424242]
        ${hasThickRight ? 'border-r-[3px] border-r-[#2B2F3A] dark:border-r-[#FAFAFA]' : ''}
        ${hasThickBottom ? 'border-b-[3px] border-b-[#2B2F3A] dark:border-b-[#FAFAFA]' : ''}
        transition-colors duration-150
        cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-[#2F6FED]
      `}
      style={{
        width: `${cellSize}px`,
        height: `${cellSize}px`,
      }}
      aria-label={`Cell ${position.row + 1}, ${position.col + 1}, ${state}`}
      tabIndex={-1}
      suppressHydrationWarning
    >
      {/* Cross mark for 'crossed' state */}
      {state === 'crossed' && (
        <div className="relative w-full h-full flex items-center justify-center">
          <svg
            width={cellSize * 0.5}
            height={cellSize * 0.5}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 2L14 14M14 2L2 14"
              stroke="#A0A4B8"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </button>
  )
}
