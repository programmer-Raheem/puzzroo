/**
 * Validation script for all Nonogram puzzles
 * Run with: npx tsx src/scripts/validateNonogramPuzzles.ts
 */

import { validatePuzzleDataset } from '../lib/nonogram/puzzleValidator'
import { easyPuzzles } from '../data/nonogram/easy'
import { mediumPuzzles } from '../data/nonogram/medium'
import { hardPuzzles } from '../data/nonogram/hard'
import { dailyPuzzles } from '../data/nonogram/daily'

console.log('🔍 Starting Nonogram Puzzle Data Integrity Audit...')
console.log('=' .repeat(60))

try {
  // Validate each dataset
  validatePuzzleDataset(easyPuzzles, 'Easy Puzzles')
  validatePuzzleDataset(mediumPuzzles, 'Medium Puzzles')
  validatePuzzleDataset(hardPuzzles, 'Hard Puzzles')
  validatePuzzleDataset(dailyPuzzles, 'Daily Puzzles')
  
  console.log('\n' + '='.repeat(60))
  console.log('✅ ALL PUZZLE DATASETS PASSED VALIDATION!')
  console.log(`Total puzzles validated: ${easyPuzzles.length + mediumPuzzles.length + hardPuzzles.length + dailyPuzzles.length}`)
  console.log('=' .repeat(60))
  
  process.exit(0)
} catch (error) {
  console.error('\n' + '='.repeat(60))
  console.error('❌ VALIDATION FAILED!')
  console.error('=' .repeat(60))
  console.error(error)
  process.exit(1)
}
