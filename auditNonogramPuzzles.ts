/**
 * Nonogram Puzzle Dataset Audit Script
 * 
 * Run with: npx ts-node auditNonogramPuzzles.ts
 */

import { easyPuzzles } from './src/data/nonogram/easy'
import { mediumPuzzles } from './src/data/nonogram/medium'
import { hardPuzzles } from './src/data/nonogram/hard'
import { dailyPuzzles } from './src/data/nonogram/daily'
import { auditPuzzles, printAuditReport, repairPuzzleCollection } from './src/lib/nonogram/puzzleAuditor'
import type { PuzzleData } from './src/lib/nonogram/types'

console.log('\n🔍 Starting Comprehensive Nonogram Puzzle Audit...\n')

// Audit Easy Puzzles
console.log('\n' + '='.repeat(60))
console.log('AUDITING EASY PUZZLES')
console.log('='.repeat(60))
const easyReport = auditPuzzles(easyPuzzles)
printAuditReport(easyReport)

// Audit Medium Puzzles
console.log('\n' + '='.repeat(60))
console.log('AUDITING MEDIUM PUZZLES')
console.log('='.repeat(60))
const mediumReport = auditPuzzles(mediumPuzzles)
printAuditReport(mediumReport)

// Audit Hard Puzzles
console.log('\n' + '='.repeat(60))
console.log('AUDITING HARD PUZZLES')
console.log('='.repeat(60))
const hardReport = auditPuzzles(hardPuzzles)
printAuditReport(hardReport)

// Audit Daily Puzzles
console.log('\n' + '='.repeat(60))
console.log('AUDITING DAILY PUZZLES')
console.log('='.repeat(60))
const dailyReport = auditPuzzles(dailyPuzzles)
printAuditReport(dailyReport)

// Summary
const totalPuzzles = easyPuzzles.length + mediumPuzzles.length + hardPuzzles.length + dailyPuzzles.length
const totalInvalid = easyReport.invalidPuzzles + mediumReport.invalidPuzzles + hardReport.invalidPuzzles + dailyReport.invalidPuzzles

console.log('\n' + '='.repeat(60))
console.log('OVERALL SUMMARY')
console.log('='.repeat(60))
console.log(`Total Puzzles Audited: ${totalPuzzles}`)
console.log(`Total Invalid Puzzles: ${totalInvalid}`)
console.log(`Total Valid Puzzles: ${totalPuzzles - totalInvalid}`)

if (totalInvalid > 0) {
  console.log('\n⚠️  REPAIR REQUIRED!')
  console.log('   Run repair script to fix all invalid puzzles.')
} else {
  console.log('\n✅ All puzzles are valid!')
}

console.log('\n' + '='.repeat(60) + '\n')
