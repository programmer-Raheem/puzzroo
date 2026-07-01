/**
 * Tangram Game Component
 * Phase 3: Complete gameplay with countdown, hints, scoring
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useTangram } from '@/hooks/useTangram'
import { TangramBoard } from '@/components/games/tangram/TangramBoard'
import { TangramPiece } from '@/components/games/tangram/TangramPiece'
import { TangramModal } from '@/components/games/tangram/TangramModal'
import { CountdownTimer } from '@/components/games/tangram/CountdownTimer'
import { HintButton } from '@/components/games/tangram/HintButton'
import { HintGhost } from '@/components/games/tangram/HintGhost'

import { TangramPieceType } from '@/types/tangram'
import { TangramDifficulty, MAX_HINTS } from '@/types/tangram-puzzle'

export function TangramGame() {
  const searchParams = useSearchParams()
  const difficulty = (searchParams?.get('difficulty') as TangramDifficulty) || 'easy'
  
  const [isResetting, setIsResetting] = useState(false)
  const [mobileBoardWidth, setMobileBoardWidth] = useState(350)
  const router = useRouter()
  const mobileBoardRef = useRef<HTMLDivElement>(null)

  const {
    pieces,
    selectedPiece,
    gameStatus,
    timeRemaining,
    score,
    hintsUsed,
    hintPiece,
    availableHints,
    isSolved,
    currentPuzzle,
    selectPiece,
    movePiece,
    rotateLeft,
    rotateRight,
    requestHint,
    autoFill,
    resetGame,
    newGame,
    snapPiece,
  } = useTangram({ difficulty })

  // Track mobile board rendered width
  useEffect(() => {
    if (!mobileBoardRef.current) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setMobileBoardWidth(entry.contentRect.width)
      }
    })
    observer.observe(mobileBoardRef.current)
    return () => observer.disconnect()
  }, [])

  const handleNewGame = async () => {
    setIsResetting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    newGame()
    setIsResetting(false)
  }

  const handleRetry = async () => {
    setIsResetting(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    resetGame()
    setIsResetting(false)
  }

  const handleAutoFill = () => {
    autoFill()
  }

  const handleBackToLobby = () => {
    router.push('/tangram')
  }

  const handlePieceSelect = (pieceId: string) => {
    selectPiece(pieceId as TangramPieceType)
  }

  const handlePieceMove = (pieceId: string, x: number, y: number) => {
    movePiece(pieceId as TangramPieceType, x, y)
  }

  const handlePieceRotateLeft = () => {
    if (selectedPiece) rotateLeft()
  }

  const handlePieceRotateRight = () => {
    if (selectedPiece) rotateRight()
  }

  const handleSnapToSolution = (pieceId: string, x: number, y: number, rotation: number) => {
    snapPiece(pieceId as TangramPieceType, x, y, rotation)
  }

  const handleRequestHint = () => {
    requestHint()
  }

  // Get hint piece data - use current puzzle's solution
  const hintPieceData = hintPiece ? pieces.find(p => p.type === hintPiece) : null
  const hintSolution = (hintPiece && currentPuzzle) ? currentPuzzle.solution[hintPiece] : null

  return (
    <section className="w-full bg-white dark:bg-[#181A20] transition-colors duration-300 relative">
      <div className="w-full max-w-[1380px] mx-auto px-[20px] flex justify-start overflow-visible">
        <div className="w-full flex flex-col gap-[20px] pb-0 md:pb-[10px] max-w-full overflow-visible">

          {/* Desktop Layout */}
          <div className="hidden md:flex gap-[30px] justify-start items-start overflow-visible">

            {/* LEFT SIDE - BOARD */}
            <div className="flex-shrink-0 w-[700px] overflow-visible">
              <TangramBoard silhouette={currentPuzzle?.silhouette}>
                {/* Hint Ghost */}
                {hintPiece && hintSolution && hintPieceData && (
                  <HintGhost
                    pieceType={hintPiece}
                    solution={hintSolution}
                    color={hintPieceData.color}
                    boardContainerWidth={700}
                  />
                )}
                
                {/* Actual Pieces */}
                {pieces.map((piece) => (
                  <TangramPiece
                    key={piece.id}
                    piece={piece}
                    isSelected={selectedPiece === piece.id}
                    onSelect={() => handlePieceSelect(piece.id)}
                    onMove={(x, y) => handlePieceMove(piece.id, x, y)}
                    onRotateLeft={handlePieceRotateLeft}
                    onRotateRight={handlePieceRotateRight}
                    isInTray={!piece.isPlaced}
                    solution={currentPuzzle?.solution}
                    onSnapToSolution={(x, y, r) => handleSnapToSolution(piece.id, x, y, r)}
                    boardContainerWidth={700}
                    allPieces={pieces}
                  />
                ))}
              </TangramBoard>
            </div>

            {/* RIGHT SIDE - CONTROLS PANEL */}
            <div className="flex-shrink-0 w-[280px] flex flex-col gap-[20px] sticky top-[100px]">
              {/* Puzzle Title */}
              {currentPuzzle && (
                <div className="text-center">
                  <h3 className="font-urbanist text-xl font-bold text-[#212121] dark:text-white">
                    {currentPuzzle.title}
                  </h3>
                  <p className="font-urbanist text-sm text-[#757575] dark:text-[#9E9E9E] capitalize">
                    {currentPuzzle.difficulty}
                  </p>
                </div>
              )}

              {/* Countdown Timer */}
              <div className="bg-[#F0EDFF] dark:bg-[#1F222A] rounded-2xl p-4 flex flex-col items-center gap-2">
                <span className="font-urbanist text-sm font-medium text-[#757575] dark:text-[#9E9E9E]">
                  Time Remaining
                </span>
                <CountdownTimer timeRemaining={timeRemaining} />
              </div>

              {/* Score */}
              <div className="bg-[#F0EDFF] dark:bg-[#1F222A] rounded-2xl p-4 flex flex-col items-center gap-2">
                <span className="font-urbanist text-sm font-medium text-[#757575] dark:text-[#9E9E9E]">
                  Score
                </span>
                <span className="font-urbanist text-2xl font-bold text-[var(--color-primary)]">
                  {score}
                </span>
              </div>

              {/* Empty Space */}
              <div className="flex-1 min-h-[100px]" />

              {/* Hint Button */}
              <HintButton
                availableHints={availableHints}
                maxHints={MAX_HINTS}
                onRequestHint={handleRequestHint}
                disabled={gameStatus !== 'playing'}
              />

              {/* Auto Fill Button (Development Only) */}
              {process.env.NODE_ENV === 'development' && (
                <button
                  onClick={handleAutoFill}
                  disabled={isResetting || isSolved}
                  className="w-full h-[46px] rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[#F0EDFF] dark:hover:bg-[#35383F] font-urbanist font-bold text-[16px] transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Auto Fill
                </button>
              )}

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
            {/* Timer & Score Row */}
            <div className="w-full grid grid-cols-2 gap-3">
              <div className="bg-[#F0EDFF] dark:bg-[#1F222A] rounded-xl p-3 flex flex-col items-center gap-1">
                <span className="font-urbanist text-xs font-medium text-[#757575] dark:text-[#9E9E9E]">
                  Time
                </span>
                <CountdownTimer timeRemaining={timeRemaining} className="text-xl" />
              </div>
              <div className="bg-[#F0EDFF] dark:bg-[#1F222A] rounded-xl p-3 flex flex-col items-center gap-1">
                <span className="font-urbanist text-xs font-medium text-[#757575] dark:text-[#9E9E9E]">
                  Score
                </span>
                <span className="font-urbanist text-xl font-bold text-[var(--color-primary)]">
                  {score}
                </span>
              </div>
            </div>

            {/* Board */}
            <div ref={mobileBoardRef} className="w-full">
              <TangramBoard mobile silhouette={currentPuzzle?.silhouette}>
                {/* Hint Ghost */}
                {hintPiece && hintSolution && hintPieceData && (
                  <HintGhost
                    pieceType={hintPiece}
                    solution={hintSolution}
                    color={hintPieceData.color}
                    boardContainerWidth={mobileBoardWidth}
                  />
                )}
                
                {/* Actual Pieces */}
                {pieces.map((piece) => (
                  <TangramPiece
                    key={piece.id}
                    piece={piece}
                    isSelected={selectedPiece === piece.id}
                    onSelect={() => handlePieceSelect(piece.id)}
                    onMove={(x, y) => handlePieceMove(piece.id, x, y)}
                    onRotateLeft={handlePieceRotateLeft}
                    onRotateRight={handlePieceRotateRight}
                    isInTray={!piece.isPlaced}
                    solution={currentPuzzle?.solution}
                    onSnapToSolution={(x, y, r) => handleSnapToSolution(piece.id, x, y, r)}
                    boardContainerWidth={mobileBoardWidth}
                    allPieces={pieces}
                  />
                ))}
              </TangramBoard>
            </div>

            {/* Hint Button Mobile */}
            <HintButton
              availableHints={availableHints}
              maxHints={MAX_HINTS}
              onRequestHint={handleRequestHint}
              disabled={gameStatus !== 'playing'}
            />

            {/* Auto Fill Button Mobile (Development Only) */}
            {process.env.NODE_ENV === 'development' && (
              <button
                onClick={handleAutoFill}
                disabled={isResetting || isSolved}
                className="w-full h-[46px] rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[#F0EDFF] dark:hover:bg-[#35383F] font-urbanist font-bold text-[16px] transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Auto Fill
              </button>
            )}

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

      {/* Loading Overlay */}
      {isResetting && (
        <div className="fixed inset-0 bg-white/80 dark:bg-[#181A20]/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-[var(--color-primary)]" size={48} />
            <p className="font-urbanist text-lg font-semibold text-[var(--color-primary)]">
              Loading...
            </p>
          </div>
        </div>
      )}

      {/* Completion Modal */}
      <TangramModal
        isOpen={gameStatus === 'won' || gameStatus === 'lost'}
        time={0}
        mistakes={0}
        hintsUsed={hintsUsed}
        score={score}
        difficulty={difficulty}
        timeRemaining={timeRemaining}
        isTimeUp={gameStatus === 'lost'}
        onPlayAgain={handleRetry}
        onNewPuzzle={handleNewGame}
        onBackToLobby={handleBackToLobby}
      />
    </section>
  )
}
