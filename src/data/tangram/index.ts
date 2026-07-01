/**
 * Tangram Puzzle Datasets
 * Phase 3: Difficulty System
 */

import { TangramDifficulty, TangramPuzzle } from '@/types/tangram-puzzle'
import { easyPuzzles } from './easy'
import { mediumPuzzles } from './medium'
import { hardPuzzles } from './hard'

export function getPuzzlesByDifficulty(difficulty: TangramDifficulty): TangramPuzzle[] {
  switch (difficulty) {
    case 'easy':
      return easyPuzzles
    case 'medium':
      return mediumPuzzles
    case 'hard':
      return hardPuzzles
    default:
      return easyPuzzles
  }
}

export function getRandomPuzzle(difficulty: TangramDifficulty): TangramPuzzle | null {
  const puzzles = getPuzzlesByDifficulty(difficulty)
  if (puzzles.length === 0) return null
  
  const randomIndex = Math.floor(Math.random() * puzzles.length)
  return puzzles[randomIndex]
}

export function isDifficultyLocked(difficulty: TangramDifficulty): boolean {
  return difficulty === 'medium' || difficulty === 'hard'
}

export { easyPuzzles, mediumPuzzles, hardPuzzles }
