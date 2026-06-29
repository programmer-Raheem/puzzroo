  /**
   * Tangram Completion Modal
   * Shows when puzzle is completed
   * Reuses Puzzroo modal pattern from Sudoku
   */

  'use client'

  import { useEffect } from 'react'

  interface TangramModalProps {
    isOpen: boolean
    time: number
    mistakes: number
    hintsUsed: number
    score: number
    onPlayAgain: () => void
    onBackToLobby?: () => void
  }

  export function TangramModal({
    isOpen,
    time,
    mistakes,
    hintsUsed,
    score,
    onPlayAgain,
    onBackToLobby,
  }: TangramModalProps) {
    // Handle ESC key
    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
          onPlayAgain()
        }
      }

      window.addEventListener('keydown', handleEsc)
      return () => window.removeEventListener('keydown', handleEsc)
    }, [isOpen, onPlayAgain])

    if (!isOpen) return null

    const formatTime = (seconds: number): string => {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }

    return (
      <>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/50 dark:bg-black/70 z-[9999] transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={onPlayAgain}
        />

        {/* Modal */}
        <div className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-opacity duration-300 ${
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
            {/* Win Modal Content */}
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h2
                id="modal-title"
                className="font-urbanist text-3xl font-bold text-[#212121] dark:text-white mb-2"
              >
                Puzzle Complete!
              </h2>
              <p className="font-urbanist text-[#424242] dark:text-[#E0E0E0] text-lg">
                Congratulations! You successfully completed the Tangram puzzle.
              </p>
            </div>

            {/* Stats */}
            <div className="bg-[#F0EDFF] dark:bg-[#35383F] rounded-xl p-4 mb-6 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-urbanist text-[#424242] dark:text-[#E0E0E0] font-medium">
                  Final Time
                </span>
                <span className="font-urbanist text-[var(--color-primary)] font-bold text-lg">
                  {formatTime(time)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-urbanist text-[#424242] dark:text-[#E0E0E0] font-medium">
                  Mistakes
                </span>
                <span className="font-urbanist text-[var(--color-primary)] font-bold text-lg">
                  {mistakes}
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
              <div className="flex justify-between items-center">
                <span className="font-urbanist text-[#424242] dark:text-[#E0E0E0] font-medium">
                  Final Score
                </span>
                <span className="font-urbanist text-[var(--color-primary)] font-bold text-lg">
                  {score}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={onPlayAgain}
                className="w-full h-[46px] rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-urbanist font-bold text-[16px] transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
              >
                Play Again
              </button>
              {onBackToLobby && (
                <button
                  onClick={onBackToLobby}
                  className="w-full h-[46px] rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[#F0EDFF] dark:hover:bg-[#35383F] font-urbanist font-bold text-[16px] transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
                >
                  Back to Lobby
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
