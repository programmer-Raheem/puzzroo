'use client'

import { useEffect } from 'react'
import { formatTime } from '@/lib/nonogram/helpers'
import type { Difficulty } from '@/lib/nonogram/types'

interface NonogramModalProps {
  isOpen: boolean
  difficulty: Difficulty
  time: number
  completionPercentage: number
  hintsUsed: number
  onPlayAgain: () => void
  onNewPuzzle: () => void
  onBackToGames?: () => void
}

export function NonogramModal({
  isOpen,
  difficulty,
  time,
  completionPercentage,
  hintsUsed,
  onPlayAgain,
  onNewPuzzle,
  onBackToGames,
}: NonogramModalProps) {
  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onNewPuzzle()
      }
    }

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onNewPuzzle])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const difficultyDisplay = difficulty.charAt(0).toUpperCase() + difficulty.slice(1)

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 dark:bg-black/70 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onNewPuzzle}
      />

      {/* Modal */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div
          className={`bg-[#F0EDFF] dark:bg-[#1F222A] rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-300 ${
            isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Celebration Icon */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2
              id="modal-title"
              className="font-urbanist text-3xl font-bold text-[#212121] dark:text-white mb-2"
            >
              Puzzle Complete!
            </h2>
            <p className="font-urbanist text-[#424242] dark:text-[#E0E0E0] text-lg">
              Great job solving the Nonogram!
            </p>
          </div>

          {/* Stats */}
          <div className="bg-white dark:bg-[#35383F] rounded-xl p-4 mb-6 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-urbanist text-[#424242] dark:text-[#E0E0E0] font-medium">
                Difficulty
              </span>
              <span className="font-urbanist text-[var(--color-primary)] font-bold text-lg">
                {difficultyDisplay}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-urbanist text-[#424242] dark:text-[#E0E0E0] font-medium">
                Time
              </span>
              <span className="font-urbanist text-[var(--color-primary)] font-bold text-lg">
                {formatTime(time)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-urbanist text-[#424242] dark:text-[#E0E0E0] font-medium">
                Completion
              </span>
              <span className="font-urbanist text-[var(--color-primary)] font-bold text-lg">
                {completionPercentage}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-urbanist text-[#424242] dark:text-[#E0E0E0] font-medium">
                Hints Used
              </span>
              <span className="font-urbanist text-[var(--color-primary)] font-bold text-lg">
                {hintsUsed}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={onNewPuzzle}
              className="w-full h-[46px] rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-urbanist font-bold text-[16px] transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
            >
              New Puzzle
            </button>
            <button
              onClick={onPlayAgain}
              className="w-full h-[46px] rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[#F0EDFF] dark:hover:bg-[#35383F] font-urbanist font-bold text-[16px] transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
            >
              Play Again
            </button>
            {onBackToGames && (
              <button
                onClick={onBackToGames}
                className="w-full h-[46px] rounded-full border-2 border-[#D0D3DC] dark:border-[#616161] text-[#2B2F3A] dark:text-[#E0E0E0] hover:bg-[#F5F6FA] dark:hover:bg-[#35383F] font-urbanist font-bold text-[16px] transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
              >
                Back to Games
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
