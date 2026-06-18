'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Navbar from '@/components/layout/navbar'
import { Footer } from '@/components/layout/Footer'
import { NonogramHero } from '@/components/nonogram/NonogramHero'
import { NonogramGame } from '@/components/nonogram/NonogramGame'
import { PuzzleSelection } from '@/components/nonogram/PuzzleSelection'
import { markGameAsPlayed } from '@/components/sections/FreeGames'

function NonogramContent() {
  const [mounted, setMounted] = useState(false)
  const [showGame, setShowGame] = useState(false)
  const [selectedPuzzleId, setSelectedPuzzleId] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    setMounted(true)
    
    // Mark Nonogram as played
    markGameAsPlayed('nonogram')
    
    // Check if puzzleId is in URL (coming from puzzle selection)
    const puzzleId = searchParams.get('puzzleId')
    if (puzzleId) {
      setSelectedPuzzleId(puzzleId)
      setShowGame(true)
    }
  }, [searchParams])

  const handleSelectPuzzle = (puzzleId: string) => {
    setSelectedPuzzleId(puzzleId)
    setShowGame(true)
    // Update URL with puzzle ID
    router.push(`/nonogram?puzzleId=${puzzleId}`)
  }

  const handleBackToSelection = () => {
    setShowGame(false)
    setSelectedPuzzleId(null)
    router.push('/nonogram')
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      <NonogramHero />
      {showGame ? (
        <NonogramGame 
          puzzleId={selectedPuzzleId || undefined} 
          onBackToSelection={handleBackToSelection}
        />
      ) : (
        <PuzzleSelection onSelectPuzzle={handleSelectPuzzle} />
      )}
    </>
  )
}

export default function NonogramPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#181A20] transition-colors duration-300 flex flex-col">
      <div className="w-full max-w-[1380px] mx-auto flex-grow flex flex-col pb-0 md:pb-[50px]">
        <Navbar />
        <main className="flex-grow flex flex-col">
          <Suspense fallback={<div className="flex-grow" />}>
            <NonogramContent />
          </Suspense>
        </main>
      </div>
      <Footer />
    </div>
  )
}
