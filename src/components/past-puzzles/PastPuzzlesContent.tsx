'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Lock, Calendar } from 'lucide-react'
import { generatePastPuzzles } from '@/lib/dailyChallenge/generator'
import { getChallengeStatus, getAccessiblePastChallenges } from '@/lib/dailyChallenge/storage'
import { DailyChallenge, DailyChallengeStatus } from '@/lib/dailyChallenge/types'
import { AccessModal } from './AccessModal'
import { FilterDropdown } from './FilterDropdown'
import { CalendarModal } from './CalendarModal'
import { images } from '@/lib/utils'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/Footer'

interface PastPuzzlesContentProps {
  gameId: string
}

export function PastPuzzlesContent({ gameId }: PastPuzzlesContentProps) {
  const [puzzles, setPuzzles] = useState<DailyChallenge[]>([])
  const [filter, setFilter] = useState<'all' | 'not-started' | 'in-progress' | 'completed'>('all')
  const [showAccessModal, setShowAccessModal] = useState(false)
  const [showCalendarModal, setShowCalendarModal] = useState(false)
  const accessibleCount = getAccessiblePastChallenges()

  // Format game title
  const gameTitle = gameId === 'cross-math' ? 'CrossMath' : gameId === 'sudoku' ? 'Sudoku' : gameId

  // Get game icon
  const gameIcon = gameId === 'cross-math' ? images.gameCards.crossWord : images.gameCards.sudoku

  useEffect(() => {
    // Generate 8 past puzzles
    const generated = generatePastPuzzles(8, gameId as 'sudoku' | 'cross-math')
    
    // Update status from localStorage and apply lock
    const withStatus = generated.map((puzzle, index) => {
      if (index >= accessibleCount) {
        return { ...puzzle, status: 'locked' as DailyChallengeStatus }
      }
      return {
        ...puzzle,
        status: getChallengeStatus(puzzle.id),
      }
    })
    
    setPuzzles(withStatus)
  }, [gameId, accessibleCount])

  // Filter puzzles
  const filteredPuzzles = filter === 'all' 
    ? puzzles 
    : puzzles.filter(p => p.status === filter)

  return (
    <>
      <Navbar />
      <section className="w-full min-h-screen bg-white dark:bg-[#181A20] transition-colors duration-300 py-10 md:py-16">
        <div className="w-full px-[20px] max-w-[1200px] mx-auto">
          
          {/* Header - OUTSIDE the bordered container */}
          <div className="text-center mb-8">
            <h1 className="font-urbanist font-bold text-[32px] md:text-[48px] text-[#181A20] dark:text-white mb-2">
              {gameTitle}
            </h1>
            <p className="font-urbanist text-[14px] md:text-[16px] text-[#757575] dark:text-[#BDBDBD]">
              Daily Challenges
            </p>
          </div>

          {/* Main Container with Border */}
          <div className="border-2 border-[#212121] dark:border-[#E0E0E0] rounded-3xl p-6 md:p-10">
            <div className="flex flex-col gap-8">

              {/* Filter + Controls Container */}
              <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
                <div className="w-full md:w-auto">
                  <FilterDropdown value={filter} onChange={setFilter} />
                </div>
                
                <button 
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-[#1F222A] border-2 border-[#6949FF] text-[#6949FF] font-urbanist font-medium text-[14px] hover:bg-[#F0EDFF] dark:hover:bg-[#2D2640] transition-all"
                  onClick={() => setShowCalendarModal(true)}
                >
                  <Calendar size={18} />
                  <span>Select Date</span>
                </button>
              </div>

              {/* Access Info Modal (always visible) */}
              <div className="bg-[#F0EDFF] dark:bg-[#35383F] rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <p className="font-urbanist text-[14px] md:text-[16px] text-[#424242] dark:text-[#E0E0E0] leading-relaxed">
                    <span className="font-bold text-[#6949FF]">Guest Access:</span> You can play the last 3 days of daily challenges
                  </p>
                  <p className="font-urbanist text-[14px] md:text-[16px] text-[#424242] dark:text-[#E0E0E0] leading-relaxed mt-2">
                    Register to unlock 7 days of daily challenges!
                  </p>
                </div>
                
                <button 
                  onClick={() => console.log('Navigate to registration')}
                  className="px-6 py-3 rounded-full bg-[#6949FF] hover:bg-[#5536E6] text-white font-urbanist font-bold text-[14px] md:text-[16px] transition-all duration-200 active:scale-95 whitespace-nowrap"
                >
                  Register Now
                </button>
              </div>

              {/* Past Puzzle Grid - Match FreeGames mobile layout */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-7 lg:gap-[30px]">
                {filteredPuzzles.map((puzzle, index) => (
                  <PuzzleCard
                    key={puzzle.id}
                    puzzle={puzzle}
                    gameIcon={gameIcon}
                    isLocked={puzzle.status === 'locked'}
                    onLockedClick={() => setShowAccessModal(true)}
                  />
                ))}
              </div>

              {/* Empty State */}
              {filteredPuzzles.length === 0 && (
                <div className="text-center py-16">
                  <p className="font-urbanist text-[16px] text-[#757575] dark:text-[#BDBDBD]">
                    No puzzles match this filter
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>
      <Footer />

      {/* Lock Click Modal */}
      <AccessModal 
        isOpen={showAccessModal} 
        onClose={() => setShowAccessModal(false)}
        gameIcon={gameIcon}
      />

      {/* Calendar Modal */}
      <CalendarModal
        isOpen={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
        gameId={gameId}
      />
    </>
  )
}

interface PuzzleCardProps {
  puzzle: DailyChallenge
  gameIcon: string
  isLocked: boolean
  onLockedClick: () => void
}

function PuzzleCard({ puzzle, gameIcon, isLocked, onLockedClick }: PuzzleCardProps) {
  const statusColors = {
    'completed': 'text-[#22C55E]',
    'in-progress': 'text-[#FF9800]',
    'not-started': 'text-[#757575] dark:text-[#BDBDBD]',
    'locked': 'text-[#BDBDBD] dark:text-[#757575]',
  }

  const statusLabels = {
    'completed': 'Completed',
    'in-progress': 'In Progress',
    'not-started': 'Not Started',
    'locked': 'Locked',
  }

  if (isLocked) {
    return (
      <div 
        onClick={onLockedClick}
        className="relative bg-[#F0EDFF] dark:bg-[#1F222A] rounded-xl p-4 md:p-5 flex flex-col gap-3 md:gap-4 cursor-pointer hover:shadow-md transition-all overflow-hidden min-h-[220px] md:min-h-[245px]"
      >
        {/* Blur Overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-gray-500/20 dark:bg-black/30 z-10 flex items-center justify-center">
          <Lock size={48} className="text-[#9E9E9E] dark:text-[#616161]" />
        </div>

        {/* Content (blurred in background) */}
        <div className="relative z-0 blur-[2px] grayscale opacity-50">
          <div className="flex justify-center mb-3">
            <Image
              src={gameIcon}
              alt="Game Icon"
              width={60}
              height={60}
              className="object-contain w-[50px] h-[50px] md:w-[60px] md:h-[60px]"
            />
          </div>

          <div className="bg-white dark:bg-[#35383F] rounded-full px-3 py-1.5 text-center mb-3 md:mb-4">
            <p className="font-urbanist font-semibold text-[11px] md:text-[12px] text-[#424242] dark:text-[#E0E0E0]">
              {puzzle.dateString} {puzzle.dayName}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="font-urbanist text-[11px] md:text-[12px] text-[#757575] dark:text-[#BDBDBD]">
                Difficulty:
              </span>
              <span className="font-urbanist font-semibold text-[11px] md:text-[12px] text-[#424242] dark:text-[#E0E0E0] capitalize">
                {puzzle.difficulty}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-urbanist text-[11px] md:text-[12px] text-[#757575] dark:text-[#BDBDBD]">
                Shape:
              </span>
              <span className="font-urbanist font-semibold text-[11px] md:text-[12px] text-[#424242] dark:text-[#E0E0E0] capitalize">
                {puzzle.shape}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link href={`/daily-challenge/${puzzle.gameId}?date=${puzzle.dateString}`}>
      <div 
        className="bg-[#F0EDFF] dark:bg-[#1F222A] rounded-xl p-4 md:p-5 flex flex-col gap-3 md:gap-4 hover:shadow-lg hover:shadow-purple-500/10 transition-all cursor-pointer min-h-[220px] md:min-h-[245px]"
      >
        {/* Top Icon */}
        <div className="flex justify-center">
          <Image
            src={gameIcon}
            alt="Game Icon"
            width={60}
            height={60}
            className="object-contain w-[50px] h-[50px] md:w-[60px] md:h-[60px]"
          />
        </div>

        {/* Date Badge */}
        <div className="bg-white dark:bg-[#35383F] rounded-full px-3 py-1.5 text-center">
          <p className="font-urbanist font-semibold text-[11px] md:text-[12px] text-[#424242] dark:text-[#E0E0E0]">
            {puzzle.dateString} {puzzle.dayName}
          </p>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex justify-between items-center">
            <span className="font-urbanist text-[11px] md:text-[12px] text-[#757575] dark:text-[#BDBDBD]">
              Difficulty:
            </span>
            <span className="font-urbanist font-semibold text-[11px] md:text-[12px] text-[#424242] dark:text-[#E0E0E0] capitalize">
              {puzzle.difficulty}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-urbanist text-[11px] md:text-[12px] text-[#757575] dark:text-[#BDBDBD]">
              Shape:
            </span>
            <span className="font-urbanist font-semibold text-[11px] md:text-[12px] text-[#424242] dark:text-[#E0E0E0] capitalize">
              {puzzle.shape}
            </span>
          </div>
          <div className="flex justify-between items-center mt-auto">
            <span className="font-urbanist text-[11px] md:text-[12px] text-[#757575] dark:text-[#BDBDBD]">
              Status:
            </span>
            <span className={`font-urbanist font-semibold text-[11px] md:text-[12px] ${statusColors[puzzle.status]}`}>
              {statusLabels[puzzle.status]}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
