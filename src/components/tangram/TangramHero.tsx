/**
 * Tangram Hero Component
 * Hero section for Tangram game page
 */

'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

const difficulties = ['easy', 'medium', 'hard'] as const
type Difficulty = typeof difficulties[number]

export function TangramHero() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty>('easy')

  useEffect(() => {
    setMounted(true)
    const difficulty = searchParams?.get('difficulty') as Difficulty
    if (difficulty && difficulties.includes(difficulty)) {
      setActiveDifficulty(difficulty)
    }
  }, [searchParams])

  const handleDifficultyChange = (difficulty: Difficulty) => {
    setActiveDifficulty(difficulty)
    router.push(`/tangram?difficulty=${difficulty}`)
  }

  if (!mounted) {
    return null
  }

  return (
    <section className="w-full bg-white dark:bg-[#181A20] transition-colors duration-300 pt-[10px] md:pt-[15px] pb-[10px]">
      <div className="w-full px-[20px]">
        <div className="flex flex-col gap-[10px] md:gap-[15px]">
          {/* Title */}
          <h1 className="font-urbanist font-extrabold text-[32px] md:text-[48px] leading-[120%] text-[#212121] dark:text-white text-center">
            Tangram
          </h1>

          {/* Difficulty Tabs */}
          <div className="flex justify-center">
            <div className="inline-flex gap-[10px] p-[6px] bg-[#F5F5F5] dark:bg-[#1F222A] rounded-full">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => handleDifficultyChange(difficulty)}
                  className={`
                    px-[24px] py-[10px] rounded-full font-urbanist font-semibold text-[14px] md:text-[16px] transition-all duration-200
                    ${
                      activeDifficulty === difficulty
                        ? 'bg-[#6949FF] text-white'
                        : 'bg-transparent text-[#757575] dark:text-[#9E9E9E] hover:text-[#212121] dark:hover:text-white'
                    }
                  `}
                >
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="font-urbanist text-[14px] md:text-[16px] leading-[160%] text-[#616161] dark:text-[#BDBDBD] text-center max-w-[600px] mx-auto">
            Arrange all seven pieces to match the target silhouette. Rotate and position each piece perfectly to complete the puzzle.
          </p>
        </div>
      </div>
    </section>
  )
}
