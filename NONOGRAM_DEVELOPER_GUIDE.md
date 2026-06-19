# 🎮 NONOGRAM DEVELOPER GUIDE

## Quick Reference for Working with Nonogram Puzzles

---

## 🚨 CRITICAL RULES

### Rule #1: Empty Lines Use Empty Arrays
```typescript
// ❌ WRONG
{ values: [0] }

// ✅ CORRECT
{ values: [] }
```

### Rule #2: Never Write Clues Manually
```typescript
// ❌ WRONG - Manual clues
rowClues: [
  { values: [2, 3] },  // Hope this is right? 🤞
]

// ✅ CORRECT - Generated from solution
import { generateRowClues } from '@/lib/nonogram/puzzleAuditor'
const rowClues = generateRowClues(solution)
```

### Rule #3: Solution Grid is Source of Truth
The solution array defines the puzzle. Clues are **derived**, not independent.

---

## 📝 ADDING A NEW PUZZLE

### Step 1: Create Solution Grid
```typescript
const solution = [
  [0, 1, 1, 0],
  [1, 1, 1, 1],
  [1, 1, 1, 0],
  [0, 0, 0, 0],  // Empty row
]
```

### Step 2: Generate Clues Automatically
```typescript
import { generateRowClues, generateColumnClues } from '@/lib/nonogram/puzzleAuditor'

const puzzle = {
  id: 'easy-smiley',
  title: 'Smiley',
  difficulty: 'easy',
  size: 4,
  category: 'symbols',
  estimatedTime: 180,
  solution,
  rowClues: generateRowClues(solution),      // Auto-generated ✅
  columnClues: generateColumnClues(solution), // Auto-generated ✅
}
```

### Step 3: Validate Before Adding
```bash
node auditPuzzles.js
```

---

## 🔍 UNDERSTANDING CLUE GENERATION

### How It Works

```typescript
function generateCluesFromLine(line: number[]): number[] {
  const clues = []
  let count = 0
  
  for (const cell of line) {
    if (cell === 1) {
      count++
    } else if (count > 0) {
      clues.push(count)
      count = 0
    }
  }
  
  if (count > 0) {
    clues.push(count)
  }
  
  return clues  // Empty array if no filled cells ✅
}
```

### Examples

| Line | Generated Clue | Explanation |
|------|---------------|-------------|
| `[1, 1, 0, 1]` | `[2, 1]` | 2 filled, gap, 1 filled |
| `[0, 1, 1, 1, 0]` | `[3]` | 3 consecutive filled |
| `[1, 1, 1, 1, 1]` | `[5]` | 5 consecutive filled |
| `[0, 0, 0, 0, 0]` | `[]` | **Empty array** (no filled cells) |

---

## ⚠️ COMMON MISTAKES TO AVOID

### Mistake #1: Using [0] for Empty Lines
```typescript
// ❌ WRONG
rowClues: [
  { values: [2, 3] },
  { values: [0] },  // NO! This is invalid
]

// ✅ CORRECT
rowClues: [
  { values: [2, 3] },
  { values: [] },   // YES! Empty array
]
```

### Mistake #2: Mismatched Grid Size
```typescript
// ❌ WRONG
{
  size: 10,
  solution: [
    // Only 8 rows!
  ]
}

// ✅ CORRECT
{
  size: 10,
  solution: [
    // Exactly 10 rows with 10 cells each
  ]
}
```

### Mistake #3: Clues Don't Match Solution
```typescript
// ❌ WRONG - Manual clues that don't match
solution: [[1, 1, 0, 1, 1]]
rowClues: [{ values: [4] }]  // Wrong! Should be [2, 2]

// ✅ CORRECT - Generated clues always match
const rowClues = generateRowClues(solution)  // Gets [2, 2] ✅
```

---

## 🧪 VALIDATION & TESTING

### Validate a Single Puzzle
```typescript
import { validatePuzzle } from '@/lib/nonogram/puzzleAuditor'

const errors = validatePuzzle(myPuzzle)

if (errors.length > 0) {
  console.error('Puzzle has errors:', errors)
} else {
  console.log('Puzzle is valid! ✅')
}
```

### Validate All Puzzles
```typescript
import { validatePuzzleCollection } from '@/lib/nonogram/puzzleAuditor'

const results = validatePuzzleCollection(allPuzzles)

if (results.size === 0) {
  console.log('All puzzles valid! ✅')
}
```

### Run Audit Script
```bash
# Quick validation
node auditPuzzles.js

# Detailed TypeScript validation
npx ts-node auditNonogramPuzzles.ts
```

---

## 🔧 REPAIR A BROKEN PUZZLE

### Auto-Repair
```typescript
import { repairPuzzle } from '@/lib/nonogram/puzzleAuditor'

const brokenPuzzle = {
  // ... puzzle with wrong clues
}

const fixedPuzzle = repairPuzzle(brokenPuzzle)
// Clues are now regenerated from solution ✅
```

### Batch Repair
```typescript
import { repairPuzzleCollection } from '@/lib/nonogram/puzzleAuditor'

const fixedPuzzles = repairPuzzleCollection(brokenPuzzles)
```

---

## 📐 PUZZLE STRUCTURE

### Complete Puzzle Type
```typescript
interface PuzzleData {
  id: string           // Unique identifier
  title: string        // Display name
  difficulty: 'easy' | 'medium' | 'hard'
  size: number         // Grid dimension (e.g., 10 for 10×10)
  category: string     // Theme/category
  estimatedTime: number // Seconds to complete
  solution: number[][] // The source of truth!
  rowClues: Clue[]     // Generated from solution
  columnClues: Clue[]  // Generated from solution
}

interface Clue {
  values: number[]     // Empty array [] for empty lines
}
```

---

## 🎨 UI RENDERING

### How Empty Clues Display

Empty clue arrays render nothing (correct behavior):

```typescript
// Component code
{clue.values.map((value, index) => (
  <div key={index}>{value}</div>
))}

// For { values: [] }
// Nothing renders! ✅ Correct!

// For { values: [2, 3] }
// Renders: <div>2</div><div>3</div>
```

---

## 📊 VALIDATION ERRORS

### Error Types

| Error Type | Cause | Fix |
|------------|-------|-----|
| `size_mismatch` | Grid size ≠ declared size | Fix solution dimensions |
| `incorrect_row_clue` | Row clue doesn't match solution | Regenerate clues |
| `incorrect_column_clue` | Column clue doesn't match solution | Regenerate clues |
| `invalid_zero_clue` | Using `[0]` instead of `[]` | Replace with `[]` |
| `dimension_mismatch` | Uneven grid dimensions | Ensure all rows same length |

---

## 🚀 DEPLOYMENT CHECKLIST

Before deploying new puzzles:

- [ ] Solution grid is correct size
- [ ] Clues generated automatically (not manual)
- [ ] Empty lines use `[]` not `[0]`
- [ ] Ran `node auditPuzzles.js` with no errors
- [ ] Tested puzzle in-game
- [ ] Puzzle can be completed
- [ ] Validation displays correctly

---

## 🆘 TROUBLESHOOTING

### "Puzzle won't complete"
- Check row/column clues match solution
- Run `validatePuzzle(puzzle)` to find errors

### "Clues display incorrectly"
- Ensure empty lines use `[]` not `[0]`
- Check solution grid dimensions

### "Validation keeps failing"
- Regenerate clues from solution
- Use `repairPuzzle()` to auto-fix

---

## 📚 USEFUL FUNCTIONS

### From `puzzleAuditor.ts`

```typescript
// Generate clues
generateRowClues(solution: number[][]): Clue[]
generateColumnClues(solution: number[][]): Clue[]

// Validate
validatePuzzle(puzzle: PuzzleData): ValidationError[]
validatePuzzleCollection(puzzles: PuzzleData[]): Map<string, ValidationError[]>

// Repair
repairPuzzle(puzzle: PuzzleData): PuzzleData
repairPuzzleCollection(puzzles: PuzzleData[]): PuzzleData[]

// Audit
auditPuzzles(puzzles: PuzzleData[]): AuditReport
```

---

## 🎓 LEARN MORE

- **Full Repair Report**: `NONOGRAM_DATASET_REPAIR_COMPLETE.md`
- **Executive Summary**: `NONOGRAM_REPAIR_EXECUTIVE_SUMMARY.md`
- **Auditor Source**: `src/lib/nonogram/puzzleAuditor.ts`
- **Helper Functions**: `src/lib/nonogram/helpers.ts`

---

**Last Updated**: 2026-06-19  
**Status**: Production Ready ✅
