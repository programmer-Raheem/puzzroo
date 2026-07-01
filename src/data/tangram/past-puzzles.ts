/**
 * Tangram Past Puzzles Storage
 * Phase 3: Local storage integration
 */

import { CompletedTangramPuzzle } from '@/types/tangram-puzzle'

const STORAGE_KEY = 'puzzroo_tangram_completed'

export function saveCompletedPuzzle(puzzle: CompletedTangramPuzzle): void {
  try {
    const existing = getCompletedPuzzles()
    const updated = [puzzle, ...existing]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (error) {
    console.error('Failed to save completed puzzle:', error)
  }
}

export function getCompletedPuzzles(): CompletedTangramPuzzle[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch (error) {
    console.error('Failed to load completed puzzles:', error)
    return []
  }
}

export function clearCompletedPuzzles(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear completed puzzles:', error)
  }
}
