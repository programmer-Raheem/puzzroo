'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Navbar from '@/components/layout/navbar'
import { Footer } from '@/components/layout/Footer'
import { NonogramHero } from '@/components/nonogram/NonogramHero'
import { NonogramGame } from '@/components/nonogram/NonogramGame'
import { markGameAsPlayed } from '@/components/sections/FreeGames'

function NonogramContent() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    setMounted(true)
    
    // Mark Nonogram as played
    markGameAsPlayed('nonogram')
    
    // Get difficulty from URL or use default
    const difficulty = searchParams.get('difficulty') || 'easy'
    
    // Validate difficulty
    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
      router.replace('/nonogram?difficulty=easy')
    }
  }, [searchParams, router])

  if (!mounted) {
    return null
  }

  return (
    <>
      <NonogramHero />
      <NonogramGame />
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
