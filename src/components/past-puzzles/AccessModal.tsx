'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

interface AccessModalProps {
  isOpen: boolean
  onClose: () => void
  gameIcon: string
}

export function AccessModal({ isOpen, onClose, gameIcon }: AccessModalProps) {
  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 dark:bg-black/70 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div
          className="bg-[#F0EDFF] dark:bg-[#1F222A] rounded-2xl shadow-2xl max-w-lg w-full relative transform transition-all duration-300"
          style={{ height: '350px' }}
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/50 dark:hover:bg-black/20 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} className="text-[#424242] dark:text-[#E0E0E0]" />
          </button>

          {/* Content */}
          <div className="h-full flex items-center p-8">
            <div className="flex items-center gap-6 w-full">
              {/* Left: Icon */}
              <div className="flex-shrink-0">
                <div className="bg-white dark:bg-[#35383F] rounded-2xl p-6">
                  <Image
                    src={gameIcon}
                    alt="Game Icon"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Right: Text + Button */}
              <div className="flex flex-col gap-6 flex-1">
                <div className="space-y-3">
                  <p className="font-urbanist text-[16px] md:text-[18px] font-semibold text-[#424242] dark:text-[#E0E0E0] leading-relaxed">
                    <span className="font-bold text-[#6949FF]">Guest Access:</span> You can play the last 3 days of daily challenges
                  </p>
                  <p className="font-urbanist text-[16px] md:text-[18px] font-semibold text-[#424242] dark:text-[#E0E0E0] leading-relaxed">
                    Register to unlock 7 days of daily challenges!
                  </p>
                </div>

                <button 
                  onClick={() => {
                    // Handle registration navigation
                    console.log('Navigate to registration')
                    onClose()
                  }}
                  className="w-full h-[46px] rounded-full bg-[#6949FF] hover:bg-[#5536E6] text-white font-urbanist font-bold text-[16px] transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#6949FF] focus:ring-offset-2"
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
