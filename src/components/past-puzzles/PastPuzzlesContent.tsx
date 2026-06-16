'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Lock, Calendar, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
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
  const [isLoading, setIsLoading] = useState(false)
  const accessibleCount = getAccessiblePastChallenges()
  const router = useRouter()

  // Format game title
  const gameTitle = gameId === 'cross-math' ? 'CrossMath' : gameId === 'sudoku' ? 'Sudoku' : gameId

  // Get game icon
  const gameIcon = gameId === 'cross-math' ? images.gameCards.crossWord : images.gameCards.sudoku

  // Lock body scroll when loading
  useEffect(() => {
    if (isLoading) {
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
  }, [isLoading])

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
      <section className="w-full min-h-screen bg-white dark:bg-[#181A20] transition-colors duration-300 py-4 md:pb-16">
        <div className="w-full px-[20px] max-w-[1200px] mx-auto">
          
          {/* Header - OUTSIDE the bordered container */}
          <div className="text-center md:mb-8 mb-3">
            <h1 className="font-urbanist font-bold text-[32px] md:text-[48px] text-[#181A20] dark:text-white">
              {gameTitle}
            </h1>
            <p className="font-urbanist text-[14px] md:text-[16px] text-[#757575] dark:text-[#BDBDBD]">
              Daily Challenges
            </p>
          </div>

          {/* Main Container with Border */}
          <div className="border-[0.95px] border-[#979797] dark:border-[#E0E0E0] rounded-3xl p-6 md:p-10">
            <div className="flex flex-col gap-6">

              {/* Filter + Controls Container */}
              <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
                <div className="w-full md:w-auto">
                  <FilterDropdown value={filter} onChange={setFilter} />
                </div>
                
                <button 
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-[#1F222A] border-[1px] border-[#6949FF] text-[#6949FF] font-urbanist font-medium text-[14px] hover:bg-[#F0EDFF] dark:hover:bg-[#2D2640] transition-all"
                  onClick={() => setShowCalendarModal(true)}
                >
                  <Calendar size={18} />
                  <span>Select Date</span>
                </button>
              </div>

              {/* Access Info Modal (always visible) */}
              <div className="bg-[#F0EDFF] dark:bg-[#35383F] rounded-xl p-4 flex flex-col md:flex-row items-center gap-4">
                <div className="flex-1">
                  <p className="font-urbanist text-[14px] md:text-[16px] text-[#424242] dark:text-[#E0E0E0] leading-relaxed">
                    <span className="font-bold text-[#6949FF]">Guest Access:</span> You can play the last 3 days of daily challenges
                  </p>
                  <p className="font-urbanist text-[14px] md:text-[16px] text-[#424242] dark:text-[#E0E0E0] leading-relaxed">
                    Register to unlock 7 days of daily challenges!
                  </p>
                </div>
                
                <button 
                  onClick={() => console.log('Navigate to registration')}
                  className="px-6 py-2 rounded-full bg-[#6949FF] hover:bg-[#5536E6] text-white font-urbanist font-bold text-[14px] md:text-[16px] transition-all duration-200 active:scale-95 whitespace-nowrap"
                >
                  Register Now
                </button>
              </div>

              {/* Past Puzzle Grid - 1 column mobile, 4 columns desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-7 lg:gap-[30px]">
                {filteredPuzzles.map((puzzle, index) => (
                  <PuzzleCard
                    key={puzzle.id}
                    puzzle={puzzle}
                    gameIcon={gameIcon}
                    isLocked={puzzle.status === 'locked'}
                    onLockedClick={() => setShowAccessModal(true)}
                    onPlayClick={setIsLoading}
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

      {/* Loading Overlay */}
      {isLoading && (
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
              Loading Game...
            </p>
          </div>
        </div>
      )}
    </>
  )
}

interface PuzzleCardProps {
  puzzle: DailyChallenge
  gameIcon: string
  isLocked: boolean
  onLockedClick: () => void
  onPlayClick: (loading: boolean) => void
}

function PuzzleCard({ puzzle, gameIcon, isLocked, onLockedClick, onPlayClick }: PuzzleCardProps) {
  const router = useRouter()
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
        className="relative bg-white dark:bg-[#1F222A] border-[1.5px] border-[#E0E0E0] dark:border-[#35383F] rounded-2xl p-5 flex flex-col gap-4 cursor-pointer hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 opacity-60"
      >
        {/* Lock Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="bg-white dark:bg-[#1F222A] rounded-full p-4 shadow-lg">
            <Lock size={32} className="text-[#6949FF]" />
          </div>
        </div>

        {/* Content (visible but dimmed) */}
        <div className="relative z-0 opacity-40">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-[#F0EDFF] dark:bg-[#35383F] rounded-xl flex items-center justify-center">
              <Image
                src={gameIcon}
                alt="Game Icon"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
          </div>

          <div className="bg-[#F0EDFF] dark:bg-[#35383F] rounded-xl px-3 py-2 text-center mb-4">
            <p className="font-urbanist font-bold text-[11px] md:text-[12px] text-[#424242] dark:text-[#E0E0E0]">
              {puzzle.dateString}
            </p>
            <p className="font-urbanist text-[10px] md:text-[11px] text-[#757575] dark:text-[#BDBDBD]">
              {puzzle.dayName}
            </p>
          </div>

          <div className="space-y-2 text-[11px] md:text-[12px]">
            <div className="flex items-center justify-between py-1">
              <span className="font-urbanist text-[#757575] dark:text-[#BDBDBD]">Difficulty</span>
              <span className="font-urbanist font-semibold text-[#424242] dark:text-[#E0E0E0] capitalize">
                {puzzle.difficulty}
              </span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="font-urbanist text-[#757575] dark:text-[#BDBDBD]">Shape</span>
              <span className="font-urbanist font-semibold text-[#424242] dark:text-[#E0E0E0] capitalize">
                {puzzle.shape}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleCardClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    onPlayClick(true)
    // Show loading for 2-3 seconds
    await new Promise(resolve => setTimeout(resolve, 2500))
    // Route directly to game page (not game lobby)
    const gameUrl = puzzle.gameId === 'sudoku' ? '/sudoku' : puzzle.gameId === 'cross-math' ? '/cross-math' : '/sudoku'
    router.push(gameUrl)
  }

  return (
    <div className="bg-white dark:bg-[#1F222A] border-[1.5px] border-[#E0E0E0] dark:border-[#35383F] rounded-2xl p-5 flex flex-col gap-4 hover:shadow-lg hover:shadow-purple-500/10 hover:border-[#6949FF] transition-all duration-300 group"
    >
      {/* Top Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-[#F0EDFF] dark:bg-[#35383F] rounded-xl flex items-center justify-center group-hover:bg-[#6949FF] transition-colors duration-300">
          <Image
            src={gameIcon}
            alt="Game Icon"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
      </div>

      {/* Date Badge */}
      <div className="bg-[#F0EDFF] dark:bg-[#35383F] rounded-xl px-3 py-2 text-center group-hover:bg-[#6949FF]/10 transition-colors duration-300">
        <p className="font-urbanist font-bold text-[11px] md:text-[12px] text-[#424242] dark:text-[#E0E0E0]">
          {puzzle.dateString}
        </p>
        <p className="font-urbanist text-[10px] md:text-[11px] text-[#757575] dark:text-[#BDBDBD]">
          {puzzle.dayName}
        </p>
      </div>

      {/* Details */}
      <div className="space-y-2 text-[11px] md:text-[12px] flex-1">
        <div className="flex items-center justify-between py-1 border-b border-[#F0F0F0] dark:border-[#35383F]">
          <span className="font-urbanist text-[#757575] dark:text-[#BDBDBD]">Difficulty</span>
          <span className="font-urbanist font-semibold text-[#424242] dark:text-[#E0E0E0] capitalize">
            {puzzle.difficulty}
          </span>
        </div>
        <div className="flex items-center justify-between py-1 border-b border-[#F0F0F0] dark:border-[#35383F]">
          <span className="font-urbanist text-[#757575] dark:text-[#BDBDBD]">Shape</span>
          <span className="font-urbanist font-semibold text-[#424242] dark:text-[#E0E0E0] capitalize">
            {puzzle.shape}
          </span>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="font-urbanist text-[#757575] dark:text-[#BDBDBD]">Status</span>
          <span className={`font-urbanist font-bold text-[11px] md:text-[12px] ${statusColors[puzzle.status]}`}>
            {statusLabels[puzzle.status]}
          </span>
        </div>
      </div>

      {/* Play Button - CTA Style like Signup */}
      <button
        onClick={handleCardClick}
        className="w-full h-[46px] rounded-full bg-[#6949FF] hover:bg-[#5536E6] text-white font-urbanist font-semibold text-[14px] md:text-[16px] transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
      >
        <span>Play Puzzle</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transform group-hover:translate-x-1 transition-transform">
          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}
