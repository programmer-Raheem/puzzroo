/**
 * Countdown Timer Component - Phase 3
 * Displays reverse countdown timer
 * Turns red with optional pulse at 20 seconds
 */

'use client'

interface CountdownTimerProps {
  timeRemaining: number
  className?: string
}

export function CountdownTimer({ timeRemaining, className = '' }: CountdownTimerProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const isWarning = timeRemaining <= 20
  
  return (
    <>
      <style jsx>{`
        @keyframes pulseWarning {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.55;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
      
      <div
        className={`font-urbanist text-2xl font-bold transition-colors duration-300 ${className}`}
        style={{
          color: isWarning ? '#FF4D4F' : 'var(--color-primary)',
          animation: isWarning ? 'pulseWarning 1s infinite' : 'none',
        }}
      >
        {formatTime(timeRemaining)}
      </div>
    </>
  )
}
