'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import { useCrossMath } from '@/hooks/useCrossMath'
import { CrossMathBoard } from '@/components/games/crossmath/CrossMathBoard'
import { CrossMathNumberPad } from '@/components/games/crossmath/CrossMathNumberPad'
import { SudokuControls } from '@/components/games/sudoku/SudokuControls'
import { SudokuStats } from '@/components/games/sudoku/SudokuStats'
import { SudokuModal } from '@/components/games/sudoku/SudokuModal'
import { FloatingScoreFeedback } from '@/components/games/sudoku/FloatingScoreFeedback'
import { images } from '@/lib/utils'
import { Difficulty } from '@/lib/crossmath/types'

export function CrossMathGame() {
  const router = useRouter()
  const [isResetting, setIsResetting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  
  const {
    board,
    selectedCell,
    mistakes,
    maxMistakes,
    score,
    time,
    gameStatus,
    difficulty,
    availableNumbers,
    usedNumbersCount,
    requiredNumbersCount,
    scoreFeedbacks,
    availableHints,
    selectCell,
    enterNumber,
    eraseCell,
    resetBoard,
    requestHint,
    handleFeedbackComplete,
  } = useCrossMath()

  // Show modal when game ends
  useEffect(() => {
    if (gameStatus === 'won' || gameStatus === 'lost') {
      const timer = setTimeout(() => {
        setShowModal(true)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setShowModal(false)
    }
  }, [gameStatus])

  // Prevent scroll when loading overlay is active (New Game loading)
  useEffect(() => {
    if (isResetting) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [isResetting])

  const handleNewGame = async () => {
    setIsResetting(true)
    setShowModal(false)
    await new Promise(resolve => setTimeout(resolve, 1000))
    resetBoard()
    setIsResetting(false)
  }

  const handlePlayAgain = () => {
    handleNewGame()
  }

  const handleBackToGames = () => {
    router.push('/')
  }

  // Determine numbers per row based on difficulty
  const getNumbersPerRow = (diff: Difficulty): number => {
    switch (diff) {
      case 'easy':
        return 3
      case 'medium':
        return 4
      case 'hard':
        return 5
      default:
        return 3
    }
  }

  const numbersPerRow = getNumbersPerRow(difficulty)

  return (
    <section className="w-full bg-white dark:bg-[#181A20] transition-colors duration-300 relative">
      <div className="w-full px-[20px] flex justify-center">
        <div className="w-full max-w-[1200px] flex flex-col gap-[15px] pb-0 md:pb-[50px]">
          
          {/* Desktop Layout */}
          <div className="hidden md:flex gap-[30px] lg:gap-[48px] justify-center items-center">
            {/* CrossMath Board - Center aligned for easy mode */}
            <div className="flex-shrink-0 relative">
              <CrossMathBoard
                board={board}
                selectedCell={selectedCell}
                onCellClick={selectCell}
              />
              {/* Floating Score Feedback */}
              <FloatingScoreFeedback
                feedbacks={scoreFeedbacks}
                onComplete={handleFeedbackComplete}
              />
            </div>

            {/* Right Control Panel - 230px width */}
            <div className="w-[230px] flex flex-col gap-[20px]">
              {/* Stats */}
              <div className="relative overflow-visible">
                <SudokuStats
                  mistakes={mistakes}
                  maxMistakes={maxMistakes}
                  score={score}
                  time={time}
                />
                {/* Floating Score Feedback */}
                <FloatingScoreFeedback
                  feedbacks={scoreFeedbacks}
                  onComplete={handleFeedbackComplete}
                />
              </div>

              {/* Feature Buttons */}
              <SudokuControls
                notesMode={false}
                availableHints={availableHints}
                onUndo={handleNewGame}
                onErase={eraseCell}
                onTogglePencil={() => {}}
                onHint={requestHint}
              />

              {/* Number Pad */}
              <CrossMathNumberPad
                availableNumbers={availableNumbers}
                onNumberSelect={enterNumber}
                numbersPerRow={numbersPerRow}
                usedNumbersCount={usedNumbersCount}
                requiredNumbersCount={requiredNumbersCount}
              />

              {/* New Game Button */}
              <button
                onClick={handleNewGame}
                disabled={isResetting}
                className="w-full h-[46px] rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-urbanist font-bold text-[16px] transition-all duration-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isResetting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Loading...</span>
                  </>
                ) : (
                  'New Game'
                )}
              </button>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col gap-[16px] items-center pb-[50px]">
            {/* Stats Row */}
            <div className="w-full relative overflow-visible">
              <SudokuStats
                mistakes={mistakes}
                maxMistakes={maxMistakes}
                score={score}
                time={time}
                mobile
              />
              {/* Floating Score Feedback Mobile */}
              <FloatingScoreFeedback
                feedbacks={scoreFeedbacks}
                onComplete={handleFeedbackComplete}
              />
            </div>

            {/* CrossMath Board */}
            <div className="w-full relative">
              <CrossMathBoard
                board={board}
                selectedCell={selectedCell}
                onCellClick={selectCell}
                mobile
              />
            </div>

            {/* Number Pad Mobile */}
            <CrossMathNumberPad
              availableNumbers={availableNumbers}
              onNumberSelect={enterNumber}
              numbersPerRow={numbersPerRow}
              mobile
              usedNumbersCount={usedNumbersCount}
              requiredNumbersCount={requiredNumbersCount}
            />

            {/* Feature Buttons Mobile */}
            <SudokuControls
              notesMode={false}
              availableHints={availableHints}
              onUndo={handleNewGame}
              onErase={eraseCell}
              onTogglePencil={() => {}}
              onHint={requestHint}
              mobile
            />

            {/* New Game Button Mobile */}
            <button
              onClick={handleNewGame}
              disabled={isResetting}
              className="w-full h-[46px] rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-urbanist font-bold text-[16px] transition-all duration-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isResetting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Loading...</span>
                </>
              ) : (
                'New Game'
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Win/Loss Modal */}
      <SudokuModal
        isOpen={showModal}
        type={gameStatus === 'won' ? 'win' : 'gameOver'}
        time={time}
        mistakes={mistakes}
        maxMistakes={maxMistakes}
        score={score}
        onPlayAgain={handlePlayAgain}
        onBackToGames={handleBackToGames}
        gameName="CrossMath"
      />

      {/* Loading Overlay for New Game */}
      {isResetting && (
        <div className="fixed inset-0 bg-white/80 dark:bg-[#181A20]/80 backdrop-blur-sm z-50">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
            {/* Puzzroo Logo + Text */}
            <div className="flex items-center gap-3">
              <Image
                src={images.logo}
                alt="Puzzroo Logo"
                width={40}
                height={40}
                className="w-10 h-10 rounded-lg"
              />
              <span className="font-urbanist text-[32px] font-extrabold tracking-tight text-[#181A20] dark:text-white">
                Puzzroo
              </span>
            </div>
            
            <Loader2 className="animate-spin text-[var(--color-primary)]" size={48} />
            <p className="font-urbanist text-lg font-semibold text-[var(--color-primary)]">
              Loading New Game...
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
