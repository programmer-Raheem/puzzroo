/**
 * Tangram Daily Challenges
 * Phase 3: Frontend-only daily rotation
 */

import { TangramPuzzle, TIME_LIMITS } from '@/types/tangram-puzzle'
import { SQUARE_SOLUTION } from '@/lib/tangram/squareSolution'

export const dailyPuzzles: TangramPuzzle[] = [
  {
    id: 'daily-1',
    title: 'Daily Square',
    difficulty: 'easy',
    silhouette: 'square',
    solution: SQUARE_SOLUTION,
    timeLimit: TIME_LIMITS.easy,
  },
  {
    id: 'daily-2',
    title: 'Daily Challenge',
    difficulty: 'easy',
    silhouette: 'square',
    solution: SQUARE_SOLUTION,
    timeLimit: TIME_LIMITS.easy,
  },
  {
    id: 'daily-3',
    title: 'Daily Puzzle',
    difficulty: 'easy',
    silhouette: 'square',
    solution: SQUARE_SOLUTION,
    timeLimit: TIME_LIMITS.easy,
  },
]

/**
 * Get today's daily challenge
 * Rotates based on day of year
 */
export function getTodaysDailyChallenge(): TangramPuzzle {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  const dayOfYear = Math.floor(diff / oneDay)
  
  const index = dayOfYear % dailyPuzzles.length
  return dailyPuzzles[index]
}
