import { CrossMathPuzzle, Difficulty } from '@/lib/crossmath/types'
import { easyPuzzles } from './easy'
import { mediumPuzzles } from './medium'
import { hardPuzzles } from './hard'

export const puzzles: Record<Difficulty, CrossMathPuzzle[]> = {
  easy: easyPuzzles,
  medium: mediumPuzzles,
  hard: hardPuzzles,
}

export function getRandomPuzzle(difficulty: Difficulty): CrossMathPuzzle {
  const difficultyPuzzles = puzzles[difficulty]
  const randomIndex = Math.floor(Math.random() * difficultyPuzzles.length)
  return difficultyPuzzles[randomIndex]
}

export function getPuzzleById(id: string): CrossMathPuzzle | undefined {
  const allPuzzles = [...easyPuzzles, ...mediumPuzzles, ...hardPuzzles]
  return allPuzzles.find(p => p.id === id)
}
