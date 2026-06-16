'use client'

import React from 'react'
import { Cell } from '@/lib/crossmath/types'
import { CrossMathCell } from './CrossMathCell'

interface CrossMathBoardProps {
  board: Cell[][]
  selectedCell: { row: number; col: number } | null
  onCellClick: (row: number, col: number) => void
  mobile?: boolean
}

export function CrossMathBoard({
  board,
  selectedCell,
  onCellClick,
  mobile = false,
}: CrossMathBoardProps) {
  // Filter out completely dead rows (all non-editable empty cells with no value)
  const activeBoard = board.filter(row =>
    row.some(cell => !(cell.type === 'empty' && !cell.isEditable && !cell.value))
  )

  // Similarly filter columns: find columns that have at least one active cell
  const totalCols = activeBoard[0]?.length || 0
  const activeCols = new Set<number>()
  activeBoard.forEach(row => {
    row.forEach((cell, colIndex) => {
      if (!(cell.type === 'empty' && !cell.isEditable && !cell.value)) {
        activeCols.add(colIndex)
      }
    })
  })

  // Determine column range: from first active col to last active col (inclusive)
  const minCol = activeCols.size > 0 ? Math.min(...activeCols) : 0
  const maxCol = activeCols.size > 0 ? Math.max(...activeCols) : totalCols - 1

  // Slice each row to only include the active column range
  const trimmedBoard = activeBoard.map(row => row.slice(minCol, maxCol + 1))

  const rows = trimmedBoard.length
  const cols = trimmedBoard[0]?.length || 0

  return (
    <div
      className={`
        ${mobile ? 'w-full' : 'w-auto'}
        bg-white dark:bg-[#262A34]
        rounded-[12px]
        p-[12px] md:p-[16px]
        border-[1.5px] border-[#E0E0E0] dark:border-[#35383F]
        transition-colors duration-300
      `}
      style={{
        boxShadow: '0px 4px 60px 0px rgba(0, 0, 0, 0.12)',
      }}
    >
      <div
        className="grid gap-[2px] md:gap-[3px] w-full"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {trimmedBoard.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <CrossMathCell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              isSelected={
                selectedCell?.row === (rowIndex + (board.length - activeBoard.length)) &&
                selectedCell?.col === colIndex + minCol
              }
              onClick={() => onCellClick(
                rowIndex + (board.length - activeBoard.length),
                colIndex + minCol
              )}
            />
          ))
        )}
      </div>
    </div>
  )
}
