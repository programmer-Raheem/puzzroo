/**
 * Sudoku Number Pad Component
 * 1-9 number selection buttons
 */

'use client'

import React from 'react'

interface SudokuNumberPadProps {
  selectedNumber: number | null
  onNumberSelect: (num: number) => void
  mobile?: boolean
}

export function SudokuNumberPad({
  selectedNumber,
  onNumberSelect,
  mobile = false,
}: SudokuNumberPadProps) {
  if (mobile) {
    return (
      <div className="flex flex-col items-center gap-[6px] w-full">
        {/* Row 1: Numbers 1-5 */}
        <div className="flex justify-center items-center gap-[6px] w-full">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => onNumberSelect(num)}
              className={`
                w-[calc((100%-24px)/5)] h-[46px] rounded-[4px] 
                font-urbanist font-bold text-[20px] leading-[120%] 
                flex items-center justify-center transition-all duration-300
                ${
                  selectedNumber === num
                    ? 'bg-[#A592FF] text-white'
                    : 'bg-[#F5F5F5] dark:bg-[#1F222A] text-[#424242] dark:text-[#F5F5F5] hover:bg-[#A592FF] hover:text-white'
                }
              `}
              aria-label={`Number ${num}`}
              aria-pressed={selectedNumber === num}
            >
              {num}
            </button>
          ))}
        </div>
        {/* Row 2: Numbers 6-9 - same width as row 1 buttons */}
        <div className="flex justify-center items-center gap-[6px] w-full">
          {[6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => onNumberSelect(num)}
              className={`
                w-[calc((100%-24px)/5)] h-[46px] rounded-[4px] 
                font-urbanist font-bold text-[20px] leading-[120%] 
                flex items-center justify-center transition-all duration-300
                ${
                  selectedNumber === num
                    ? 'bg-[#A592FF] text-white'
                    : 'bg-[#F5F5F5] dark:bg-[#1F222A] text-[#424242] dark:text-[#F5F5F5] hover:bg-[#A592FF] hover:text-white'
                }
              `}
              aria-label={`Number ${num}`}
              aria-pressed={selectedNumber === num}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-[8.07px] w-[230px]">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          onClick={() => onNumberSelect(num)}
          className={`
            w-[71.09px] h-[71.09px] rounded-[5.33px] 
            font-urbanist font-bold text-[42.65px] leading-[120%] 
            flex items-center justify-center transition-all duration-200
            ${
              selectedNumber === num
                ? 'bg-[#A592FF] text-white'
                : 'bg-[#F5F5F5] dark:bg-[#1F222A] text-[#424242] dark:text-[#F5F5F5] hover:bg-[#EEEEEE] dark:hover:bg-[#2A2D35]'
            }
          `}
          aria-label={`Number ${num}`}
          aria-pressed={selectedNumber === num}
        >
          {num}
        </button>
      ))}
    </div>
  )
}
