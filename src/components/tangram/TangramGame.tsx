/**
 * Tangram Game Component
 * Main game interface with proper layout proportions
 * LEFT: 65-70% (Board + Tray) | RIGHT: 30-35% (Stats)
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useTangram } from '@/hooks/useTangram'
import { TangramBoard } from '@/components/games/tangram/TangramBoard'
import { TangramPiece } from '@/components/games/tangram/TangramPiece'
import { TangramStats } from '@/components/games/tangram/TangramStats'
import { TangramModal } from '@/components/games/tangram/TangramModal'
import { SQUARE_SOLUTION } from '@/lib/tangram/squareSolution'
import { TangramPieceType } from '@/types/tangram'

export function TangramGame() {
  const [isResetting, setIsResetting] = useState(false)
  const [mobileBoardWidth, setMobileBoardWidth] = useState(350)
  const router = useRouter()
  const mobileBoardRef = useRef<HTMLDivElement>(null)

  const {
    pieces,
    selectedPiece,
    gameStatus,
    time,
    score,
    mistakes,
    hintsUsed,
    isSolved,
    selectPiece,
    deselectPiece,
    movePiece,
    rotateLeft,
    rotateRight,
    rotateCenter,
    undoMove,
    requestHint,
    autoFill,
    newGame,
    snapPiece,
  } = useTangram()

  // Track mobile board rendered width for OrbitalHelper scaling
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

  return (
    <section className="w-full bg-white dark:bg-[#181A20] transition-colors duration-300 relative overflow-x-hidden">
      <div className="w-full max-w-[1380px] mx-auto px-[20px] flex justify-start">
        <div className="w-full flex flex-col gap-[20px] pb-0 md:pb-[10px] max-w-full">
          
          {/* Desktop Layout: Align with navbar logo */}
          <div className="hidden md:flex gap-[30px] justify-start items-start">
            
            {/* LEFT SIDE - BOARD (aligned with navbar) */}
            <div className="flex-shrink-0 w-[600px]">
              {/* Tangram Board with integrated tray */}
              <TangramBoard>
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
                    solutionPosition={SQUARE_SOLUTION[piece.type as TangramPieceType]}
                    onSnapToSolution={(x, y, r) => handleSnapToSolution(piece.id, x, y, r)}
                    boardContainerWidth={600}
                    allPieces={pieces}
                  />
                ))}
              </TangramBoard>
            </div>

            {/* RIGHT SIDE - STATS PANEL */}
            <div className="flex-shrink-0 w-[280px] flex flex-col gap-[20px] sticky top-[100px]">
              {/* Stats */}
              <TangramStats
                time={time}
                score={score}
                mistakes={mistakes}
              />

              {/* Empty Space */}
              <div className="flex-1 min-h-[200px]" />

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

          {/* Mobile Layout - Vertical Stack */}
          <div className="md:hidden flex flex-col gap-[16px] items-center pb-[50px]">
            {/* Stats Row */}
            <div className="w-full">
              <TangramStats
                time={time}
                score={score}
                mistakes={mistakes}
                mobile
              />
            </div>

            {/* Tangram Board with integrated tray */}
            <div ref={mobileBoardRef} className="w-full">
              <TangramBoard mobile>
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
                    solutionPosition={SQUARE_SOLUTION[piece.type as TangramPieceType]}
                    onSnapToSolution={(x, y, r) => handleSnapToSolution(piece.id, x, y, r)}
                    boardContainerWidth={mobileBoardWidth}
                    allPieces={pieces}
                  />
                ))}
              </TangramBoard>
            </div>

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
        isOpen={gameStatus === 'won'}
        time={time}
        mistakes={mistakes}
        hintsUsed={hintsUsed}
        score={score}
        onPlayAgain={handleNewGame}
        onBackToLobby={handleBackToLobby}
      />
    </section>
  )
}
