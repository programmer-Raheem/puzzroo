// Script to auto-fix Nonogram puzzle clues
// Run with: node fixNonogramPuzzles.js

const fs = require('fs');
const path = require('path');

function calculateCluesFromLine(line) {
  const clues = [];
  let count = 0;
  
  for (const cell of line) {
    if (cell === 1) {
      count++;
    } else if (count > 0) {
      clues.push(count);
      count = 0;
    }
  }
  
  if (count > 0) {
    clues.push(count);
  }
  
  return clues.length > 0 ? clues : [0];
}

function fixPuzzleFile(filePath) {
  console.log(`\n📝 Fixing ${path.basename(filePath)}...`);
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract all puzzle objects
  const puzzleMatches = content.matchAll(/{\s*id:[\s\S]*?},\s*(?=\{|])/g);
  
  let fixed = 0;
  let newContent = content;
  
  for (const match of puzzleMatches) {
    const puzzleStr = match[0];
    
    try {
      // Extract solution array
      const solutionMatch = puzzleStr.match(/solution:\s*\[([\s\S]*?)\],/);
      if (!solutionMatch) continue;
      
      const solutionStr = solutionMatch[1];
      const solution = eval(`[${solutionStr}]`);
      
      if (!solution || !solution.length) continue;
      
      const size = solution.length;
      
      // Calculate row clues
      const rowClues = [];
      for (let row = 0; row < size; row++) {
        const clueValues = calculateCluesFromLine(solution[row]);
        rowClues.push({ values: clueValues });
      }
      
      // Calculate column clues
      const columnClues = [];
      for (let col = 0; col < size; col++) {
        const column = solution.map(row => row[col]);
        const clueValues = calculateCluesFromLine(column);
        columnClues.push({ values: clueValues });
      }
      
      // Format new clues
      const rowCluesStr = rowClues.map(c => `{ values: [${c.values.join(', ')}] }`).join(',\n      ');
      const columnCluesStr = columnClues.map(c => `{ values: [${c.values.join(', ')}] }`).join(',\n      ');
      
      // Replace in puzzle string
      let newPuzzleStr = puzzleStr.replace(
        /rowClues:\s*\[[\s\S]*?\],/,
        `rowClues: [\n      ${rowCluesStr},\n    ],`
      );
      
      newPuzzleStr = newPuzzleStr.replace(
        /columnClues:\s*\[[\s\S]*?\],/,
        `columnClues: [\n      ${columnCluesStr},\n    ],`
      );
      
      newContent = newContent.replace(puzzleStr, newPuzzleStr);
      fixed++;
      
    } catch (error) {
      console.error(`Error processing puzzle: ${error.message}`);
    }
  }
  
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`✅ Fixed ${fixed} puzzles in ${path.basename(filePath)}`);
}

// Fix all puzzle files
const dataDir = path.join(__dirname, 'src', 'data', 'nonogram');
const files = ['easy.ts', 'medium.ts', 'hard.ts', 'daily.ts'];

console.log('🔧 Auto-fixing Nonogram puzzle clues...');
console.log('='.repeat(60));

for (const file of files) {
  const filePath = path.join(dataDir, file);
  if (fs.existsSync(filePath)) {
    fixPuzzleFile(filePath);
  }
}

console.log('\n' + '='.repeat(60));
console.log('✅ All puzzle files have been fixed!');
console.log('Run "npm run build" to validate the fixes.');
