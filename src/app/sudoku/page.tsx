'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/layout/navbar'
import { Footer } from '@/components/layout/Footer'
import { SudokuHero } from '@/components/sudoku/SudokuHero'
import { SudokuGame } from '@/components/sudoku/SudokuGame'

export default function SudokuPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#181A20] transition-colors duration-300 flex flex-col">
      <div className="w-full max-w-[1380px] mx-auto flex-grow flex flex-col pb-0 md:pb-[50px]">
        <Navbar />
        <main className="flex-grow flex flex-col">
          <SudokuHero />
          <SudokuGame />
        </main>
      </div>
      <Footer />
    </div>
  )
}
