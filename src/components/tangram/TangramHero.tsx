/**
 * Tangram Hero Component
 * Simple hero section without difficulty selection
 */

'use client'

import React from 'react'

export function TangramHero() {
  return (
    <section className="w-full bg-white dark:bg-[#181A20] transition-colors duration-300 pt-[10px] md:pt-[15px] pb-[10px]">
      <div className="w-full px-[20px]">
        <div className="flex flex-col gap-[10px] md:gap-[15px]">
          {/* Title */}
          <h1 className="font-urbanist font-extrabold text-[32px] md:text-[48px] leading-[120%] text-[#212121] dark:text-white text-center">
            Tangram
          </h1>

          {/* Description */}
          <p className="font-urbanist text-[14px] md:text-[16px] leading-[160%] text-[#616161] dark:text-[#BDBDBD] text-center max-w-[600px] mx-auto">
            Arrange all seven pieces to match the target silhouette. Rotate and position each piece perfectly to complete the puzzle.
          </p>
        </div>
      </div>
    </section>
  )
}
