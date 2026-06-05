'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export function SudokuHero() {
  const router = useRouter()

  return (
    <section className="w-full bg-white dark:bg-[#181A20] transition-colors duration-300 py-[30px] md:py-[30px]">
      <div className="w-full px-[20px]">
        {/* Back Arrow */}
        <button
          onClick={() => router.push('/game/sudoku')}
          className="mb-6 w-12 h-12 rounded-full border-2 border-[var(--color-primary)] bg-white dark:bg-[#181A20] flex items-center justify-center p-2 hover:bg-[#F0EDFF] dark:hover:bg-[#35383F] transition-all duration-200 active:scale-95"
          aria-label="Back to games"
        >
          <ArrowLeft size={20} className="text-[var(--color-primary)]" strokeWidth={2.5} />
        </button>

        <div className="flex flex-col items-center gap-8 md:gap-10">
          
          {/* Sudoku Image with background */}
          <div className="w-[129px] h-[129px] relative flex items-center justify-center bg-[#F0EDFF] dark:bg-[#1F222A] rounded-[6px] p-[14px]">
            <Image
              src="/soduko.svg"
              alt="Sudoku"
              width={101}
              height={101}
              className="w-[101px] h-[101px] object-contain"
            />
          </div>

          {/* Sudoku Title */}
          <h1 className="font-urbanist font-bold text-[48px] leading-[120%] text-center text-[#212121] dark:text-[#FAFAFA] transition-colors duration-300">
            SUDOKU
          </h1>

        </div>
      </div>
    </section>
  )
}
