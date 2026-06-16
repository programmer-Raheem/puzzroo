# Remaining Tasks Summary

## ✅ COMPLETED
1. **Past Puzzles Mobile Layout** - Changed to 1 card per row on mobile
2. **Past Puzzles Direct Game Access** - Cards now route directly to game (`/sudoku` or `/cross-math`), not lobby
3. **Play Puzzle Button Styled as CTA** - Now matches signup/register button style

## 🔧 IN PROGRESS / NEEDS ATTENTION

### 1. Score Popup Location
**Issue:** Score feedback appearing on board instead of just in stats area
**Current Status:** FloatingScoreFeedback is already positioned inside Stats container
**Likely Cause:** May be CSS overflow or z-index issue
**Action Needed:** Test and verify if still occurring after other fixes

### 2. Sudoku Board Size for Easy Mode
**Request:** Increase board size for easy mode puzzles
**Details:** User wants larger cells for better visibility on easy puzzles
**Current Board:** Fixed width 457.5px desktop, responsive mobile
**Action Needed:** 
- Create size variants based on difficulty
- Easy mode: increase to ~550px
- Keep medium/hard at current size

### 3. Game Lobby Enhancements
**After Play Button, add:**

```
OR

[Daily Challenge Button] [Past Puzzles Button]

Want to access more games or features?
[Subscribe] [Log In]

16 June 2026
⏱ Next challenge in: 18h 15m 49s
```

**Components Needed:**
- Reuse Daily Challenge & Past Puzzles buttons from hero
- Reuse Subscribe (CTA style) & Log In buttons from navbar
- Add countdown timer component
- Display current date dynamically
- Calculate time until next daily challenge (midnight)

**Implementation Steps:**
1. Update GameHero component
2. Add "OR" divider text
3. Add button row with Daily Challenge + Past Puzzles
4. Add promotional text
5. Add Subscribe (purple CTA) + Log In (white outline) buttons  
6. Add date display with current date
7. Add countdown timer to midnight
8. Style everything to match existing design

## 📝 NOTES
- All button styles should be reused from existing components
- Subscribe button = purple CTA (`bg-[#6949FF] hover:bg-[#5536E6]`)
- Log In button = white with purple border
- Timer should update every second
- Date format: "16 June 2026" (day month year)
- Timer format: "18h 15m 49s"

## 🎯 PRIORITY ORDER
1. Game Lobby enhancements (most complex)
2. Sudoku board size adjustment
3. Verify score popup behavior

