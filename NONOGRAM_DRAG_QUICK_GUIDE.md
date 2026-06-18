# Nonogram Drag System - Quick Reference Guide

## How to Use

### Desktop (Mouse)
- **Fill Multiple Cells:** Press on empty cell → drag → release
- **Cross Multiple Cells:** Press on filled cell → drag → release  
- **Erase Multiple Cells:** Press on crossed cell → drag → release

### Mobile (Touch)
- **Fill Multiple Cells:** Touch empty cell → drag finger → lift
- **Cross Multiple Cells:** Touch filled cell → drag finger → lift
- **Erase Multiple Cells:** Touch crossed cell → drag finger → lift

## Direction Lock
- **Horizontal:** Drag left/right → locks to that row
- **Vertical:** Drag up/down → locks to that column
- Prevents accidental diagonal painting

## Quick Tips
✅ **Do:**
- Drag along rows to quickly fill/cross lines
- Drag along columns for vertical patterns
- Use drag for large areas, click for single cells
- Start drag from the cell state you want to apply

❌ **Don't:**
- Try to drag diagonally (direction lock prevents this)
- Worry about dragging too fast (all cells captured)
- Drag outside the board (automatically ends)

## Examples

### Fill a Row
1. Find empty cell at start of row
2. Press and hold
3. Drag horizontally across row
4. Release → entire row filled

### Cross a Column
1. Find filled cell at top of column
2. Press and hold
3. Drag vertically down column
4. Release → entire column crossed

### Erase Mistakes
1. Find crossed cell in mistake area
2. Press and hold
3. Drag across all mistake cells
4. Release → all cells cleared

## Interaction Modes

You can use any combination:

| Mode | Description | Best For |
|------|-------------|----------|
| **Click Only** | Single click cycles states | Precise single cells |
| **Drag Only** | Drag to paint multiple | Fast large areas |
| **Keyboard Only** | Arrow keys + Space | Accessibility |
| **Mixed** | Combine all methods | Maximum efficiency |

## State Cycle

**Single Click Cycle:**
```
Empty → Filled → Crossed → Empty
```

**Drag Actions:**
```
Start on Empty  → Drag Fill   → All visited = Filled
Start on Filled → Drag Cross  → All visited = Crossed
Start on Crossed → Drag Erase → All visited = Empty
```

## Performance

- Works on all puzzle sizes (10×10, 15×15, 20×20)
- No lag even on Hard mode
- Smooth 60fps on all devices
- Works on desktop, tablet, and mobile

## Accessibility

All existing features still work:
- ✅ Arrow key navigation
- ✅ Space/Enter to toggle
- ✅ Backspace to clear
- ✅ Tab navigation
- ✅ Screen readers

Drag is optional - you can solve puzzles without it!

## Troubleshooting

**Drag not working?**
- Make sure you press and hold before moving
- Try starting from a different cell
- Check if game is in "playing" state (not won)

**Cells being skipped?**
- Direction lock is preventing diagonal movement
- Drag along a single row or column
- This is intentional to prevent mistakes

**Drag ending unexpectedly?**
- Pointer left the board area
- This is normal - just start a new drag

---

**Version:** Nonogram 2.1  
**Last Updated:** June 18, 2026
