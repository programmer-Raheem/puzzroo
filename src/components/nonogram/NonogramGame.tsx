'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Lightbulb } from 'lucide-react'
import { useNonogram } from '@/hooks/useNonogram'
import { NonogramModal } from './NonogramModal'
import { formatTime } from '@/lib/nonogram/helpers'
import type { CellPosition } from '@/lib/nonogram/types'

export function NonogramGame() {
  const router = useRouter()
  const {
    grid,
    selectedCell,
    currentPuzzle,
    isInitialized,
    gameStatus,
    elapsedSeconds,
    rowValidation,
    columnValidation,
    progress,
    hintsUsed,
    maxHints,
    mistakeCell,
    handleCellClick,
    resetPuzzle,
    newPuzzle,
    useHint,
  } = useNonogram()

  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth)
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // Dynamic cell sizing based on screen width and difficulty
  const cellSize = useMemo(() => {
    if (!currentPuzzle || windowWidth === 0) return 32
    
    const availableWidth = Math.min(windowWidth - 80, 717.5)
    const gridSize = currentPuzzle.size
    const clueWidth = 64
    const borderSpace = 20
    const maxBoardWidth = availableWidth - clueWidth - borderSpace
    
    const calculatedSize = Math.floor(maxBoardWidth / gridSize)
    
    if (windowWidth < 768) {
      return Math.max(20, Math.min(28, calculatedSize))
    } else if (windowWidth < 1024) {
      return Math.max(28, Math.min(34, calculatedSize))
    } else {
      return Math.max(32, Math.min(40, calculatedSize))
    }
  }, [currentPuzzle, windowWidth])

  const handleBackToGames = () => {
    router.push('/game/nonogram')
  }

  if (!isInitialized || !currentPuzzle) {
    return (
      <section className="w-full bg-white dark:bg-[#181A20] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-urbanist text-lg text-[#2B2F3A] dark:text-white">
            Loading puzzle...
          </p>
        </div>
      </section>
    )
  }

  const maxRowClueCount = Math.max(...currentPuzzle.rowClues.map(c => c.values.length), 1)
  const maxColClueCount = Math.max(...currentPuzzle.columnClues.map(c => c.values.length), 1)
  
  const clueSize = cellSize
  const cornerWidth = maxRowClueCount * clueSize
  const cornerHeight = maxColClueCount * clueSize

  const canUseHint = hintsUsed < maxHints && gameStatus === 'playing'

  return (
    <>
      <section className="w-full bg-white dark:bg-[#181A20] transition-colors duration-300">
        <div className="w-full px-[20px] py-[40px] flex justify-center">
          <div className="w-full max-w-[717.5px] flex flex-col items-center gap-[20px]">
            
            {/* Timer and Progress Bar */}
            <div className="w-full flex flex-col gap-3">
              {/* Timer */}
              <div className="flex justify-center">
                <div className="bg-[#F5F6FA] dark:bg-[#35383F] rounded-full px-6 py-2">
                  <span className="font-urbanist text-[20px] font-bold text-[#2B2F3A] dark:text-white font-mono">
                    {formatTime(elapsedSeconds)}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-urbanist text-[14px] font-medium text-[#424242] dark:text-[#E0E0E0]">
                    Progress
                  </span>
                  <span className="font-urbanist text-[14px] font-bold text-[var(--color-primary)]">
                    {progress.percentComplete}%
                  </span>
                </div>
                <div className="w-full h-3 bg-[#F5F6FA] dark:bg-[#35383F] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#6949FF] to-[#8B6EFF] transition-all duration-300 ease-out"
                    style={{ width: `${progress.percentComplete}%` }}
                  />
                </div>
                <div className="mt-1 text-center">
                  <span className="font-urbanist text-[12px] text-[#616161] dark:text-[#A0A4B8]">
                    {progress.correctCellsFilled} / {progress.totalCellsRequired} cells
                  </span>
                </div>
              </div>
            </div>

            {/* Game Board */}
            <div className="w-full overflow-x-auto flex justify-center">
              <div className="inline-flex flex-col border-2 border-[#D0D3DC] dark:border-[#616161]">
                
                {/* Top: Corner + Column Clues */}
                <div className="flex">
                  <div 
                    className="flex-shrink-0 bg-transparent"
                    style={{ width: `${cornerWidth}px`, height: `${cornerHeight}px` }}
                  />
                  
                  <div className="flex">
                    {currentPuzzle.columnClues.map((clue, colIdx) => {
                      const isCompleted = columnValidation[colIdx] === 'completed'
                      return (
                        <div
                          key={`col-clue-${colIdx}`}
                          className="flex flex-col items-center justify-end"
                          style={{ width: `${cellSize}px`, minHeight: `${cornerHeight}px` }}
                        >
                          {clue.values.map((value, vIdx) => {
                            const displayValue = value === 6 ? 0 : value
                            const bgColor = displayValue === 0 
                              ? 'bg-[#6949FF]' 
                              : isCompleted 
                                ? 'bg-[#2F6FED] dark:bg-[#2F6FED]'
                                : 'bg-[#F5F6FA] dark:bg-[#2A2D35]'
                            const textColor = displayValue === 0 || isCompleted
                              ? 'text-white'
                              : 'text-[#2B2F3A] dark:text-[#E0E0E0]'
                            
                            return (
                              <div
                                key={vIdx}
                                className={`flex items-center justify-center border border-[#D0D3DC] dark:border-[#616161] ${bgColor} transition-colors duration-300`}
                                style={{ width: `${clueSize}px`, height: `${clueSize}px` }}
                              >
                                <span className={`font-urbanist text-[12px] sm:text-[13px] md:text-[14px] font-bold ${textColor}`}>
                                  {displayValue}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Bottom: Row Clues + Board */}
                <div className="flex">
                  <div className="flex flex-col flex-shrink-0">
                    {currentPuzzle.rowClues.map((clue, rowIdx) => {
                      const isCompleted = rowValidation[rowIdx] === 'completed'
                      return (
                        <div
                          key={`row-clue-${rowIdx}`}
                          className="flex items-center justify-end"
                          style={{ minWidth: `${cornerWidth}px`, height: `${cellSize}px` }}
                        >
                          {clue.values.map((value, vIdx) => {
                            const displayValue = value === 6 ? 0 : value
                            const bgColor = displayValue === 0 
                              ? 'bg-[#6949FF]' 
                              : isCompleted 
                                ? 'bg-[#2F6FED] dark:bg-[#2F6FED]'
                                : 'bg-[#F5F6FA] dark:bg-[#2A2D35]'
                            const textColor = displayValue === 0 || isCompleted
                              ? 'text-white'
                              : 'text-[#2B2F3A] dark:text-[#E0E0E0]'
                            
                            return (
                              <div
                                key={vIdx}
                                className={`flex items-center justify-center border border-[#D0D3DC] dark:border-[#616161] ${bgColor} transition-colors duration-300`}
                                style={{ width: `${clueSize}px`, height: `${clueSize}px` }}
                              >
                                <span className={`font-urbanist text-[12px] sm:text-[13px] md:text-[14px] font-bold ${textColor}`}>
                                  {displayValue}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>

                  <div className="grid" style={{
                    gridTemplateColumns: `repeat(${currentPuzzle.size}, ${cellSize}px)`,
                    gridTemplateRows: `repeat(${currentPuzzle.size}, ${cellSize}px)`,
                  }}>
                    {grid.map((row, rowIdx) =>
                      row.map((cellState, colIdx) => {
                        const position: CellPosition = { row: rowIdx, col: colIdx }
                        const isSelected = selectedCell?.row === rowIdx && selectedCell?.col === colIdx
                        const isMistake = mistakeCell?.row === rowIdx && mistakeCell?.col === colIdx
                        
                        const hasThickRight = (colIdx + 1) % 5 === 0 && colIdx !== currentPuzzle.size - 1
                        const hasThickBottom = (rowIdx + 1) % 5 === 0 && rowIdx !== currentPuzzle.size - 1

                        let bgClass = ''
                        let borderClass = ''
                        
                        if (isMistake) {
                          borderClass = 'ring-2 ring-red-500 ring-inset'
                        }
                        
                        if (cellState === 'filled') {
                          bgClass = 'bg-[#2F6FED]'
                        } else if (cellState === 'crossed') {
                          bgClass = 'bg-white dark:bg-[#181A20]'
                        } else if (isSelected) {
                          bgClass = 'bg-[#A592FF]'
                        } else {
                          bgClass = 'bg-white dark:bg-[#181A20] hover:bg-[#E8DFFF] dark:hover:bg-[#35383F]'
                        }

                        return (
                          <button
                            key={`cell-${rowIdx}-${colIdx}`}
                            onClick={() => handleCellClick(position)}
                            disabled={gameStatus !== 'playing'}
                            className={`flex items-center justify-center border-[1px] border-[#D0D3DC] dark:border-[#616161] ${bgClass} ${borderClass} ${
                              hasThickRight ? 'border-r-[3px] border-r-[#2B2F3A] dark:border-r-[#FAFAFA]' : ''
                            } ${hasThickBottom ? 'border-b-[3px] border-b-[#2B2F3A] dark:border-b-[#FAFAFA]' : ''} transition-all duration-150 cursor-crosshair focus:outline-none focus:ring-2 focus:ring-[#A592FF] disabled:cursor-not-allowed disabled:opacity-70`}
                            style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
                            aria-label={`Cell row ${rowIdx + 1}, column ${colIdx + 1}, ${cellState}`}
                          >
                            {cellState === 'crossed' && (
                              <svg width={cellSize * 0.5} height={cellSize * 0.5} viewBox="0 0 16 16" fill="none">
                                <path d="M2 2L14 14M14 2L2 14" stroke="#A0A4B8" strokeWidth="2" strokeLinecap="round" />
                              </svg>
                            )}
                          </button>
                        )
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[500px]">
              <button
                onClick={useHint}
                disabled={!canUseHint}
                className="flex-1 h-[46px] rounded-full bg-[#FFA726] hover:bg-[#FB8C00] disabled:bg-gray-300 dark:disabled:bg-[#424242] text-white font-urbanist font-bold text-[16px] transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2"
                aria-label={`Use hint, ${maxHints - hintsUsed} remaining`}
              >
                <Lightbulb size={20} />
                Hint ({maxHints - hintsUsed})
              </button>
              
              <button
                onClick={resetPuzzle}
                className="flex-1 h-[46px] rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-[#35383F] dark:hover:bg-[#424242] text-[#2B2F3A] dark:text-white font-urbanist font-bold text-[16px] transition-all duration-200 active:scale-95"
              >
                Reset
              </button>
              
              <button
                onClick={newPuzzle}
                className="flex-1 h-[46px] rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-urbanist font-bold text-[16px] transition-all duration-200 active:scale-95"
              >
                New Puzzle
              </button>
            </div>

            {/* Keyboard Instructions */}
            <div className="text-center mt-4">
              <p className="font-urbanist text-[12px] text-[#616161] dark:text-[#A0A4B8]">
                Use arrow keys to navigate • Space/Enter to toggle • Backspace to clear
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Completion Modal */}
      <NonogramModal
        isOpen={gameStatus === 'won'}
        difficulty={currentPuzzle.difficulty}
        time={elapsedSeconds}
        completionPercentage={progress.percentComplete}
        hintsUsed={hintsUsed}
        onPlayAgain={resetPuzzle}
        onNewPuzzle={newPuzzle}
        onBackToGames={handleBackToGames}
      />
    </>
  )
}
