'use client'

import React from 'react'
import { useGameLobby } from '@/contexts/GameLobbyContext'

interface GameInfoProps {
  name: string
  about: string
  howToPlay: string
  bulletPoints: string[]
  keyboardControls: string
  difficulty?: 'easy' | 'medium' | 'hard'
  gameSlug?: string
}

export function GameInfo({ 
  name, 
  about, 
  howToPlay, 
  bulletPoints, 
  keyboardControls,
  gameSlug
}: GameInfoProps) {
  // Get difficulty from context
  const { selectedDifficulty } = useGameLobby()
  
  // Import dynamic instructions
  const { getGameInstructions } = require('@/data/gameInstructions')
  
  // Use dynamic instructions if gameSlug is provided, otherwise use static howToPlay
  const displayInstructions = gameSlug 
    ? getGameInstructions(gameSlug, selectedDifficulty)
    : howToPlay
  
  // Create difficulty-based heading
  const difficultyText = selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)
  const howToPlayHeading = gameSlug 
    ? `How To Play ${difficultyText} Mode`
    : `How To Play ${name}`

  return (
    <section className="w-full bg-white dark:bg-[#181A20] transition-colors duration-300 pt-0 pb-2 md:pt-2 ">
      <div className="w-full px-[20px]">
        <div className="w-full max-w-[646px] mx-auto flex flex-col gap-10">

          {/* About Section */}
          <div className="flex flex-col gap-4">
            <h2 className="font-urbanist font-bold text-[20px] leading-[120%] text-[#424242] dark:text-white transition-colors duration-300">
              About {name}
            </h2>
            <p className="font-urbanist font-medium text-[16px] leading-[140%] tracking-[0.2px] text-[#424242] dark:text-[#FAFAFA] transition-colors duration-300">
              {about}
            </p>
          </div>

          {/* How To Play Section */}
          <div className="flex flex-col gap-4">
            <h2 className="font-urbanist font-bold text-[20px] leading-[120%] text-[#424242] dark:text-white transition-colors duration-300">
              {howToPlayHeading}
            </h2>
            <p className="font-urbanist font-medium text-[16px] leading-[140%] tracking-[0.2px] text-[#424242] dark:text-[#FAFAFA] transition-colors duration-300">
              {displayInstructions}
            </p>

            {/* Bullet Points Container */}
            <div className="w-full max-w-[622px] rounded-[4px] bg-[#F5F5F5] dark:bg-[#1F222A] p-5 md:pr-5 md:pr-5 md:py-[20px] flex flex-col gap-3 transition-colors duration-300">
              {bulletPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-[#616161] dark:text-[#FAFAFA] flex-shrink-0">•</span>
                  <p className="font-urbanist font-medium text-[16px] leading-[140%] tracking-[0.2px] text-[#616161] dark:text-[#FAFAFA] transition-colors duration-300">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Keyboard Controls Section */}
          <div className="flex flex-col gap-4">
            <h2 className="font-urbanist font-bold text-[20px] leading-[120%] text-[#424242] dark:text-white transition-colors duration-300">
              Keyboard Controls
            </h2>
            <p className="font-urbanist font-medium text-[16px] leading-[140%] tracking-[0.2px] text-[#424242] dark:text-[#FAFAFA] transition-colors duration-300">
              {keyboardControls}
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
