/**
 * Comprehensive Nonogram Puzzle Repair Script
 * This script recalculates ALL clues from solution grids
 * Run with: node repairAllNonogramPuzzles.js
 */

const fs = require('fs')
const path = require('path')

// ===== CLUE GENERATION FUNCTIONS =====

function generateCluesFromLine(line) {
  const clues = []
  let consecutiveCount = 0
  
  for (const cell of line) {
    if (cell === 1) {
      consecutiveCount++
    } else if (consecutiveCount > 0) {
      clues.push(consecutiveCount)
      consecutiveCount = 0
    }
  }
  
  if (consecutiveCount > 0) {
    clues.push(consecutiveCount)
  }
  
  // Return empty array if no filled cells (NEVER return [0])
  return clues
}

function generateRowClues(solution) {
  return solution.map(row => ({
    values: generateCluesFromLine(row)
  }))
}

function generateColumnClues(solution) {
  const size = solution.length
  const columnClues = []
  
  for (let col = 0; col < size; col++) {
    const column = solution.map(row => row[col])
    columnClues.push({
      values: generateCluesFromLine(column)
    })
  }
  
  return columnClues
}

function repairPuzzle(puzzle) {
  return {
    ...puzzle,
    rowClues: generateRowClues(puzzle.solution),
    columnClues: generateColumnClues(puzzle.solution)
  }
}

// ===== GENERATE TYPESCRIPT FILE CONTENT =====

function generatePuzzleFileContent(puzzles, difficulty, isDaily = false) {
  const varName = isDaily ? 'dailyPuzzles' : `${difficulty}Puzzles`
  
  let content = `import { PuzzleData } from '@/lib/nonogram/types'\n\n`
  content += `export const ${varName}: PuzzleData[] = [\n`
  
  puzzles.forEach((puzzle, puzzleIndex) => {
    const repairedPuzzle = repairPuzzle(puzzle)
    
    content += `  {\n`
    content += `    id: '${repairedPuzzle.id}',\n`
    content += `    title: '${repairedPuzzle.title}',\n`
    content += `    difficulty: '${repairedPuzzle.difficulty}',\n`
    content += `    size: ${repairedPuzzle.size},\n`
    content += `    category: '${repairedPuzzle.category}',\n`
    content += `    estimatedTime: ${repairedPuzzle.estimatedTime},\n`
    
    // Solution
    content += `    solution: [\n`
    repairedPuzzle.solution.forEach(row => {
      content += `      [${row.join(', ')}],\n`
    })
    content += `    ],\n`
    
    // Row Clues
    content += `    rowClues: [\n`
    repairedPuzzle.rowClues.forEach(clue => {
      if (clue.values.length === 0) {
        content += `      { values: [] },\n`
      } else {
        content += `      { values: [${clue.values.join(', ')}] },\n`
      }
    })
    content += `    ],\n`
    
    // Column Clues
    content += `    columnClues: [\n`
    repairedPuzzle.columnClues.forEach(clue => {
      if (clue.values.length === 0) {
        content += `      { values: [] },\n`
      } else {
        content += `      { values: [${clue.values.join(', ')}] },\n`
      }
    })
    content += `    ],\n`
    
    content += `  },\n`
  })
  
  content += `]\n`
  
  return content
}

// ===== READ PUZZLE FILES =====

console.log('\n🔧 NONOGRAM PUZZLE REPAIR TOOL\n')
console.log('='.repeat(60))

const puzzleFiles = [
  { path: './src/data/nonogram/easy.ts', difficulty: 'easy' },
  { path: './src/data/nonogram/medium.ts', difficulty: 'medium' },
  { path: './src/data/nonogram/hard.ts', difficulty: 'hard' },
  { path: './src/data/nonogram/daily.ts', difficulty: 'daily', isDaily: true },
]

let totalPuzzlesRepaired = 0

puzzleFiles.forEach(({ path: filePath, difficulty, isDaily }) => {
  console.log(`\n📁 Processing: ${filePath}`)
  
  try {
    // Read the file
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    
    // Extract puzzle data using regex (simplified approach)
    // This requires the puzzles to be exported as we've defined them
    const puzzlesMatch = fileContent.match(/export const \w+Puzzles: PuzzleData\[\] = (\[[\s\S]*\])/m)
    
    if (!puzzlesMatch) {
      console.log(`   ⚠️  Could not parse puzzles from file`)
      return
    }
    
    // For now, we'll use require to load the modules
    const puzzleModule = require(filePath.replace('./src', './src').replace('.ts', ''))
    const puzzlesVarName = isDaily ? 'dailyPuzzles' : `${difficulty}Puzzles`
    const puzzles = puzzleModule[puzzlesVarName]
    
    if (!puzzles || puzzles.length === 0) {
      console.log(`   ⚠️  No puzzles found`)
      return
    }
    
    console.log(`   Found ${puzzles.length} puzzles`)
    
    // Generate repaired content
    const repairedContent = generatePuzzleFileContent(puzzles, difficulty, isDaily)
    
    // Write back to file
    fs.writeFileSync(filePath, repairedContent, 'utf-8')
    
    console.log(`   ✅ Repaired and saved ${puzzles.length} puzzles`)
    totalPuzzlesRepaired += puzzles.length
    
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`)
  }
})

console.log('\n' + '='.repeat(60))
console.log(`\n✨ REPAIR COMPLETE!`)
console.log(`   Total puzzles repaired: ${totalPuzzlesRepaired}`)
console.log('\n' + '='.repeat(60) + '\n')
