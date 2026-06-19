/**
 * Nonogram Puzzle Dataset Audit Script (JavaScript version)
 * Run with: node auditPuzzles.js
 */

// Simple clue generation function
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
  
  return clues
}

function generateRowClues(solution) {
  return solution.map(row => ({ values: generateCluesFromLine(row) }))
}

function generateColumnClues(solution) {
  const size = solution.length
  const columnClues = []
  
  for (let col = 0; col < size; col++) {
    const column = solution.map(row => row[col])
    columnClues.push({ values: generateCluesFromLine(column) })
  }
  
  return columnClues
}

function validatePuzzle(puzzle) {
  const errors = []
  const { id, size, solution, rowClues, columnClues, title } = puzzle
  
  // Validate row clues
  const correctRowClues = generateRowClues(solution)
  for (let row = 0; row < solution.length; row++) {
    const expected = correctRowClues[row].values
    const actual = rowClues[row].values
    
    if (JSON.stringify(expected) !== JSON.stringify(actual)) {
      errors.push({
        type: 'ROW_CLUE',
        row,
        expected,
        actual
      })
    }
  }
  
  // Validate column clues
  const correctColumnClues = generateColumnClues(solution)
  for (let col = 0; col < size; col++) {
    const expected = correctColumnClues[col].values
    const actual = columnClues[col].values
    
    if (JSON.stringify(expected) !== JSON.stringify(actual)) {
      errors.push({
        type: 'COLUMN_CLUE',
        col,
        expected,
        actual
      })
    }
  }
  
  return { id, title, errors }
}

// Manual puzzle data from easy.ts
const easyPuzzles = [
  {
    id: 'easy-heart',
    title: 'Heart',
    size: 10,
    solution: [
      [0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
      [1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    rowClues: [
      { values: [2, 2] },
      { values: [4, 4] },
      { values: [9] },
      { values: [9] },
      { values: [7] },
      { values: [5] },
      { values: [3] },
      { values: [1] },
      { values: [0] },
      { values: [0] },
    ],
    columnClues: [
      { values: [0] },
      { values: [2, 2] },
      { values: [5] },
      { values: [6] },
      { values: [6] },
      { values: [6] },
      { values: [6] },
      { values: [5] },
      { values: [2, 2] },
      { values: [0] },
    ],
  },
]

console.log('\n🔍 NONOGRAM PUZZLE AUDIT\n')
console.log('='.repeat(60))

for (const puzzle of easyPuzzles) {
  const result = validatePuzzle(puzzle)
  
  console.log(`\nPuzzle: ${result.title} (${result.id})`)
  console.log(`Errors Found: ${result.errors.length}`)
  
  if (result.errors.length > 0) {
    result.errors.forEach((error, i) => {
      console.log(`\n  ${i + 1}. ${error.type} Error`)
      if (error.row !== undefined) {
        console.log(`     Row: ${error.row}`)
      }
      if (error.col !== undefined) {
        console.log(`     Column: ${error.col}`)
      }
      console.log(`     Expected: [${error.expected.join(', ')}]`)
      console.log(`     Actual:   [${error.actual.join(', ')}]`)
    })
  } else {
    console.log('  ✅ Valid!')
  }
}

console.log('\n' + '='.repeat(60) + '\n')
