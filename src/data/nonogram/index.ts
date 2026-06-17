// Nonogram Puzzle Data Exports
// Centralized access to all difficulty levels

import { easyPuzzles } from './easy'
import { mediumPuzzles } from './medium'
import { hardPuzzles } from './hard'
import type { PuzzleData, Difficulty } from '@/lib/nonogram/types'

/**
 * Get a random puzzle for the specified difficulty
 */
export function getRandomPuzzle(difficulty: Difficulty): PuzzleData {
  const puzzles = {
    easy: easyPuzzles,
    medium: mediumPuzzles,
    hard: hardPuzzles,
  }

  const pool = puzzles[difficulty]
  const randomIndex = Math.floor(Math.random() * pool.length)
  return pool[randomIndex]
}

/**
 * Get all puzzles for a specific difficulty
 */
export function getPuzzlesByDifficulty(difficulty: Difficulty): PuzzleData[] {
  return {
    easy: easyPuzzles,
    medium: mediumPuzzles,
    hard: hardPuzzles,
  }[difficulty]
}

/**
 * Get puzzle by ID
 */
export function getPuzzleById(id: string): PuzzleData | undefined {
  const allPuzzles = [...easyPuzzles, ...mediumPuzzles, ...hardPuzzles]
  return allPuzzles.find((puzzle) => puzzle.id === id)
}

export { easyPuzzles, mediumPuzzles, hardPuzzles }
