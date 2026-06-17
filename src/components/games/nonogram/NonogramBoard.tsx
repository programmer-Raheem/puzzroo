'use client'

import { CellState, CellPosition, GridSize } from '@/lib/nonogram/types'
import { NonogramCell } from './NonogramCell'

interface NonogramBoardProps {
  grid: CellState[][]
  size: GridSize
  selectedCell: CellPosition | null
  onCellClick: (position: CellPosition) => void
  mobile?: boolean
}

export function NonogramBoard({
  grid,
  size,
  selectedCell,
  onCellClick,
  mobile = false,
}: NonogramBoardProps) {
  const cellSize = mobile ? 24 : 32

  return (
    <div
      className="inline-grid bg-white dark:bg-[#181A20]"
      style={{
        gridTemplateColumns: `repeat(${size}, ${cellSize}px)`,
        border: '3px solid #2B2F3A',
      }}
      role="grid"
      aria-label="Nonogram board"
    >
      {grid.map((row, rowIndex) =>
        row.map((cellState, colIndex) => {
          const position: CellPosition = { row: rowIndex, col: colIndex }
          const isSelected =
            selectedCell?.row === rowIndex && selectedCell?.col === colIndex

          return (
            <NonogramCell
              key={`${rowIndex}-${colIndex}`}
              state={cellState}
              position={position}
              isSelected={isSelected}
              isMobile={mobile}
              onClick={onCellClick}
            />
          )
        })
      )}
    </div>
  )
}
