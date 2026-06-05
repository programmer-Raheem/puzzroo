# Sudoku Interaction Layer Refinements - Implementation Guide

## Overview
This document outlines all the behavioral and state-management improvements needed without changing any UI design.

## Changes Required

### 1. Hint Should Apply to Selected Cell ✅

**File**: `src/hooks/useSudoku.ts`
**Function**: `requestHint()`

**Current Issue**: Hint fills a random empty cell
**Required**: Hint should fill the currently selected cell

```typescript
const requestHint = useCallback(() => {
  if (gameState.gameStatus !== 'playing') return
  
  const availableHints = calculateAvailableHints(gameState.score)
  if (availableHints <= 0) return
  
  // NEW: Check if there's a selected cell
  if (!selectedCell) return
  
  const cell = getCellAt(gameState.currentBoard, selectedCell)
  if (!cell || cell.fixed || cell.value) return // Don't hint filled cells
  
  // Use selected cell instead of finding random empty
  const correctValue = getCorrectValue(gameState.solution, selectedCell)
  if (!correctValue) return
  
  let newBoard = updateCellValue(gameState.currentBoard, selectedCell, correctValue)
  newBoard[selectedCell.row][selectedCell.col] = clearNotes(
    newBoard[selectedCell.row][selectedCell.col]
  )
  // Mark as correct state
  newBoard[selectedCell.row][selectedCell.col].isCorrect = true
  
  updateScore(-20)
  setGameState((prev) => ({ ...prev, currentBoard: newBoard }))
  
  // Check for win...
}, [selectedCell, gameState, updateScore])
```

### 2. Standardize Loading Spinner Durations ✅

**File**: `src/components/sudoku/SudokuGame.tsx`

**Current**: 2 seconds for all
**Required**: 1.0s during play, 1.5s after win/loss

```typescript
const handleNewGame = async (fromModal = false) => {
  setIsResetting(true)
  // 1.5s from modal, 1.0s during play
  const delay = fromModal ? 1500 : 1000
  await new Promise(resolve => setTimeout(resolve, delay))
  resetBoard()
  setIsResetting(false)
}
```

Then update modal buttons to pass `fromModal=true`:
```typescript
<button onClick={() => handleNewGame(true)}>Play Again</button>
```

### 3. Preserve Active Difficulty Tab ✅

**Already Implemented**: The `loadDifficultyPreference()` and `saveDifficultyPreference()` functions already handle this in `src/lib/sudoku/storage.ts` and are called in `useSudoku.ts`.

**Verification Needed**: Test that difficulty persists after:
- Navigation away and back
- Page refresh  
- Browser restart

### 4. Floating Score Feedback Must Emerge From Score Number ✅

**Already Fixed**: In previous changes, the animation now starts at `-20px` (near score position) and moves up to `-60px` then exits at `-80px`.

**File**: `src/components/games/sudoku/FloatingScoreFeedback.tsx`

Current implementation is correct.

### 5. Correctly Filled Cells Should Stay Highlighted ✅

**Files Needed**:
1. `src/lib/sudoku/types.ts` - Add `isCorrect` property
2. `src/hooks/useSudoku.ts` - Set `isCorrect = true` when correct
3. `src/components/games/sudoku/SudokuCell.tsx` - Add purple tint for correct cells
4. `src/lib/sudoku/storage.ts` - Persist correct state

**Type Update**:
```typescript
export interface SudokuCell {
  value: number | null
  fixed: boolean
  notes?: number[]
  isError?: boolean
  isCorrect?: boolean // NEW
}
```

**Hook Update** (`enterNumber` function):
```typescript
if (num === correctValue) {
  // Correct answer
  newBoard[selectedCell.row][selectedCell.col].isCorrect = true // NEW
  updateScore(10)
  setGameState((prev) => ({ ...prev, currentBoard: newBoard }))
  // ... check for win
}
```

**Cell Component Update**:
```typescript
// In SudokuCell component, add to className logic:
let bgClass = ''
if (cell.isError) {
  bgClass = '!bg-[#F75555] hover:!bg-[#F75555]'
} else if (cell.isCorrect) {
  bgClass = 'bg-[#E8DFFF]' // Subtle purple tint
} else if (isSelected) {
  bgClass = 'bg-[#A592FF] ring-2 ring-[var(--color-primary)] ring-inset'
}
// ... rest of logic
```

### 6. Incorrect Cells Must Remain Red ✅

**File**: `src/hooks/useSudoku.ts`

**Current Issue**: Error state clears after 1 second
**Required**: Error state persists until game ends/resets

**Fix**: Remove the setTimeout that clears error state:

```typescript
if (num !== correctValue) {
  // Wrong answer
  newBoard[selectedCell.row][selectedCell.col].isError = true
  
  setGameState((prev) => ({
    ...prev,
    currentBoard: newBoard,
    mistakes: prev.mistakes + 1,
  }))
  
  updateScore(-5)
  
  // Check game over
  if (gameState.mistakes + 1 >= INITIAL_GAME_STATE.maxMistakes) {
    setGameState((prev) => ({ ...prev, gameStatus: 'lost' }))
    clearGameState()
  }
  
  // REMOVE THIS ENTIRE setTimeout BLOCK
  // Error should persist, not clear after 1 second
}
```

### 7. Persist Correct and Incorrect Cell States ✅

**Already Implemented**: The `saveGameState()` function in `src/lib/sudoku/storage.ts` already saves the entire `currentBoard` which includes all cell properties.

**Verification**: Since `isCorrect` and `isError` are properties of `SudokuCell`, they will automatically be saved and restored.

### 8. Correct-State Visual Rules ✅

**Addressed in Item #5** above with the purple tint `bg-[#E8DFFF]`.

This color:
- Matches Puzzroo purple palette
- Is subtle (light tint, not overpowering)
- Persists (part of cell state)
- Allows selection/interaction

### 9. Error-State Visual Rules ✅

**Already Implemented**: Error cells use `!bg-[#F75555] hover:!bg-[#F75555]` which:
- Remains red
- Persists (after removing setTimeout)
- Allows selection (hover uses !important)

## Summary of Code Changes Needed

### File 1: `src/lib/sudoku/types.ts`
```typescript
export interface SudokuCell {
  value: number | null
  fixed: boolean
  notes?: number[]
  isError?: boolean
  isCorrect?: boolean // ADD THIS
}
```

### File 2: `src/hooks/useSudoku.ts`

1. Update `requestHint()` - use selectedCell instead of findEmptyCell
2. Update `enterNumber()` - add `isCorrect = true` for correct answers
3. Update `enterNumber()` - remove setTimeout that clears isError
4. Update `resetBoard()` - no changes needed (already clears state)

### File 3: `src/components/games/sudoku/SudokuCell.tsx`

Add correct state styling:
```typescript
else if (cell.isCorrect) {
  bgClass = 'bg-[#E8DFFF]'
}
```

### File 4: `src/components/sudoku/SudokuGame.tsx`

Update handleNewGame to accept fromModal parameter:
```typescript
const handleNewGame = async (fromModal = false) => {
  setIsResetting(true)
  const delay = fromModal ? 1500 : 1000
  await new Promise(resolve => setTimeout(resolve, delay))
  resetBoard()
  setIsResetting(false)
}
```

Pass true from modal buttons.

### File 5: `src/components/games/sudoku/SudokuModal.tsx`

Update button onClick:
```typescript
<button onClick={() => onPlayAgain(true)}>Play Again</button>
```

And update the prop type to accept boolean.

## Testing Checklist

After implementation, verify:

✅ **Hint to Selected Cell**
- Select cell → Click Hint → Hint fills that cell only

✅ **Loading Durations**
- New Game during play → 1.0s spinner
- New Game from modal → 1.5s spinner

✅ **Difficulty Persistence**
- Select Hard → Leave → Return → Hard still active
- Select Hard → Refresh → Hard still active

✅ **Score Animation**
- Score changes → Animation starts from score position → Moves up

✅ **Correct Cell Highlighting**
- Enter correct number → Cell gets purple tint
- Purple tint persists after deselection
- Purple tint persists after page refresh

✅ **Incorrect Cell Red State**
- Enter wrong number → Cell turns red
- Red persists after deselection
- Red persists until new game/reset
- Red persists after page refresh

✅ **Full State Persistence**
- Play game → Refresh → Everything restored
- Correct cells still purple
- Error cells still red
- Score, time, difficulty all restored

## Color Reference

- **Correct Cell Background**: `#E8DFFF` (light purple, subtle)
- **Error Cell Background**: `#F75555` (red, prominent)
- **Primary Purple**: `#6949FF` (from existing design)
- **Selection Purple**: `#A592FF` (from existing design)

## No Design Changes

All changes are behavioral/state only:
- No spacing changes
- No typography changes  
- No layout changes
- No component hierarchy changes
- Colors use existing Puzzroo palette
