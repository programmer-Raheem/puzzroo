import { CrossMathPuzzle } from '@/lib/crossmath/types'

/**
 * Hard CrossMath Puzzles — 11×11 grid
 *
 * Grid layout:
 *   Number cols : 0, 2, 4, 6, 8
 *   Operator cols: 1, 3, 5, 7  (row operators)
 *   Col 9 = '='
 *   Col 10 = row result  (3 are BLANK → isEditable)
 *
 *   Number rows : 0, 2, 4, 6, 8
 *   Operator rows: 1, 3, 5, 7  (vertical operators)
 *   Row 9 = '=' signs
 *   Row 10 = column results  (3 are BLANK → isEditable)
 *
 * Difficulty — 18 blanks per puzzle:
 *   • 12 inner number cell blanks (2–3 per equation row)
 *   •  3 row result blanks (col 10)
 *   •  3 column result blanks (row 10)
 *
 * Column result formula (left-to-right with vertical ops):
 *   result = row0[c] op(row1[c]) row2[c] op(row3[c]) row4[c] op(row5[c]) row6[c] op(row7[c]) row8[c]
 */

export const hardPuzzles: CrossMathPuzzle[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // Puzzle hard-1  (18 blanks)
  //
  //  Vertical ops  row1: + - + - +   row3: - + - + -   row5: + - + - +   row7: - + - + -
  //
  //  Row 0: [8] + 6 - [3] + 5 - [9] = [7]     blanks: (0,0)=8  (0,4)=3  (0,8)=9  (0,10)=7
  //  Row 2:  4 - [7] + 9 - [2] + 6 = 10        blanks: (2,2)=7  (2,6)=2
  //  Row 4: [5] + 3 - [8] + [7] - 1 = [6]     blanks: (4,0)=5  (4,4)=8  (4,6)=7  (4,10)=6
  //  Row 6:  9 - [4] + 2 - 6 + [8] = 9         blanks: (6,2)=4  (6,8)=8
  //  Row 8: [1] + 7 - [6] + 3 - 4 = [1]        blanks: (8,0)=1  (8,4)=6  (8,10)=1
  //
  //  Col 0 = 8+4-5+9-1 = 15  (given)
  //  Col 2 = 6-7+3-4+7 = 5   (blank → (10,2)=5)
  //  Col 4 = 3+9-8+2-6 = 0   (blank → (10,4)=0)
  //  Col 6 = 5-2+7-6+3 = 7   (given)
  //  Col 8 = 9+6-1+8-4 = 18  (blank → (10,8)=18)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'hard-1',
    difficulty: 'hard',
    rows: 11,
    columns: 11,
    maxMistakes: 3,
    availableNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    grid: [
      // Row 0: [8] + 6 - [3] + 5 - [9] = [7]
      [
        { type: 'empty',    isEditable: true,  row: 0, col: 0 },
        { type: 'operator', value: '+', isEditable: false, row: 0, col: 1 },
        { type: 'number',   value: 6,   isEditable: false, row: 0, col: 2 },
        { type: 'operator', value: '-', isEditable: false, row: 0, col: 3 },
        { type: 'empty',    isEditable: true,  row: 0, col: 4 },
        { type: 'operator', value: '+', isEditable: false, row: 0, col: 5 },
        { type: 'number',   value: 5,   isEditable: false, row: 0, col: 6 },
        { type: 'operator', value: '-', isEditable: false, row: 0, col: 7 },
        { type: 'empty',    isEditable: true,  row: 0, col: 8 },
        { type: 'operator', value: '=', isEditable: false, row: 0, col: 9 },
        { type: 'empty',    isEditable: true,  row: 0, col: 10 },
      ],
      // Row 1: vertical operators
      [
        { type: 'operator', value: '+', isEditable: false, row: 1, col: 0 },
        { type: 'operator', value: '',  isEditable: false, row: 1, col: 1 },
        { type: 'operator', value: '-', isEditable: false, row: 1, col: 2 },
        { type: 'operator', value: '',  isEditable: false, row: 1, col: 3 },
        { type: 'operator', value: '+', isEditable: false, row: 1, col: 4 },
        { type: 'operator', value: '',  isEditable: false, row: 1, col: 5 },
        { type: 'operator', value: '-', isEditable: false, row: 1, col: 6 },
        { type: 'operator', value: '',  isEditable: false, row: 1, col: 7 },
        { type: 'operator', value: '+', isEditable: false, row: 1, col: 8 },
        { type: 'operator', value: '',  isEditable: false, row: 1, col: 9 },
        { type: 'operator', value: '',  isEditable: false, row: 1, col: 10 },
      ],
      // Row 2: 4 - [7] + 9 - [2] + 6 = 10
      [
        { type: 'number',   value: 4,   isEditable: false, row: 2, col: 0 },
        { type: 'operator', value: '-', isEditable: false, row: 2, col: 1 },
        { type: 'empty',    isEditable: true,  row: 2, col: 2 },
        { type: 'operator', value: '+', isEditable: false, row: 2, col: 3 },
        { type: 'number',   value: 9,   isEditable: false, row: 2, col: 4 },
        { type: 'operator', value: '-', isEditable: false, row: 2, col: 5 },
        { type: 'empty',    isEditable: true,  row: 2, col: 6 },
        { type: 'operator', value: '+', isEditable: false, row: 2, col: 7 },
        { type: 'number',   value: 6,   isEditable: false, row: 2, col: 8 },
        { type: 'operator', value: '=', isEditable: false, row: 2, col: 9 },
        { type: 'number',   value: 10,  isEditable: false, row: 2, col: 10 },
      ],
      // Row 3: vertical operators
      [
        { type: 'operator', value: '-', isEditable: false, row: 3, col: 0 },
        { type: 'operator', value: '',  isEditable: false, row: 3, col: 1 },
        { type: 'operator', value: '+', isEditable: false, row: 3, col: 2 },
        { type: 'operator', value: '',  isEditable: false, row: 3, col: 3 },
        { type: 'operator', value: '-', isEditable: false, row: 3, col: 4 },
        { type: 'operator', value: '',  isEditable: false, row: 3, col: 5 },
        { type: 'operator', value: '+', isEditable: false, row: 3, col: 6 },
        { type: 'operator', value: '',  isEditable: false, row: 3, col: 7 },
        { type: 'operator', value: '-', isEditable: false, row: 3, col: 8 },
        { type: 'operator', value: '',  isEditable: false, row: 3, col: 9 },
        { type: 'operator', value: '',  isEditable: false, row: 3, col: 10 },
      ],
      // Row 4: [5] + 3 - [8] + [7] - 1 = [6]
      [
        { type: 'empty',    isEditable: true,  row: 4, col: 0 },
        { type: 'operator', value: '+', isEditable: false, row: 4, col: 1 },
        { type: 'number',   value: 3,   isEditable: false, row: 4, col: 2 },
        { type: 'operator', value: '-', isEditable: false, row: 4, col: 3 },
        { type: 'empty',    isEditable: true,  row: 4, col: 4 },
        { type: 'operator', value: '+', isEditable: false, row: 4, col: 5 },
        { type: 'empty',    isEditable: true,  row: 4, col: 6 },
        { type: 'operator', value: '-', isEditable: false, row: 4, col: 7 },
        { type: 'number',   value: 1,   isEditable: false, row: 4, col: 8 },
        { type: 'operator', value: '=', isEditable: false, row: 4, col: 9 },
        { type: 'empty',    isEditable: true,  row: 4, col: 10 },
      ],
      // Row 5: vertical operators
      [
        { type: 'operator', value: '+', isEditable: false, row: 5, col: 0 },
        { type: 'operator', value: '',  isEditable: false, row: 5, col: 1 },
        { type: 'operator', value: '-', isEditable: false, row: 5, col: 2 },
        { type: 'operator', value: '',  isEditable: false, row: 5, col: 3 },
        { type: 'operator', value: '+', isEditable: false, row: 5, col: 4 },
        { type: 'operator', value: '',  isEditable: false, row: 5, col: 5 },
        { type: 'operator', value: '-', isEditable: false, row: 5, col: 6 },
        { type: 'operator', value: '',  isEditable: false, row: 5, col: 7 },
        { type: 'operator', value: '+', isEditable: false, row: 5, col: 8 },
        { type: 'operator', value: '',  isEditable: false, row: 5, col: 9 },
        { type: 'operator', value: '',  isEditable: false, row: 5, col: 10 },
      ],
      // Row 6: 9 - [4] + 2 - 6 + [8] = 9
      [
        { type: 'number',   value: 9,   isEditable: false, row: 6, col: 0 },
        { type: 'operator', value: '-', isEditable: false, row: 6, col: 1 },
        { type: 'empty',    isEditable: true,  row: 6, col: 2 },
        { type: 'operator', value: '+', isEditable: false, row: 6, col: 3 },
        { type: 'number',   value: 2,   isEditable: false, row: 6, col: 4 },
        { type: 'operator', value: '-', isEditable: false, row: 6, col: 5 },
        { type: 'number',   value: 6,   isEditable: false, row: 6, col: 6 },
        { type: 'operator', value: '+', isEditable: false, row: 6, col: 7 },
        { type: 'empty',    isEditable: true,  row: 6, col: 8 },
        { type: 'operator', value: '=', isEditable: false, row: 6, col: 9 },
        { type: 'number',   value: 9,   isEditable: false, row: 6, col: 10 },
      ],
      // Row 7: vertical operators
      [
        { type: 'operator', value: '-', isEditable: false, row: 7, col: 0 },
        { type: 'operator', value: '',  isEditable: false, row: 7, col: 1 },
        { type: 'operator', value: '+', isEditable: false, row: 7, col: 2 },
        { type: 'operator', value: '',  isEditable: false, row: 7, col: 3 },
        { type: 'operator', value: '-', isEditable: false, row: 7, col: 4 },
        { type: 'operator', value: '',  isEditable: false, row: 7, col: 5 },
        { type: 'operator', value: '+', isEditable: false, row: 7, col: 6 },
        { type: 'operator', value: '',  isEditable: false, row: 7, col: 7 },
        { type: 'operator', value: '-', isEditable: false, row: 7, col: 8 },
        { type: 'operator', value: '',  isEditable: false, row: 7, col: 9 },
        { type: 'operator', value: '',  isEditable: false, row: 7, col: 10 },
      ],
      // Row 8: [1] + 7 - [6] + 3 - 4 = [1]
      [
        { type: 'empty',    isEditable: true,  row: 8, col: 0 },
        { type: 'operator', value: '+', isEditable: false, row: 8, col: 1 },
        { type: 'number',   value: 7,   isEditable: false, row: 8, col: 2 },
        { type: 'operator', value: '-', isEditable: false, row: 8, col: 3 },
        { type: 'empty',    isEditable: true,  row: 8, col: 4 },
        { type: 'operator', value: '+', isEditable: false, row: 8, col: 5 },
        { type: 'number',   value: 3,   isEditable: false, row: 8, col: 6 },
        { type: 'operator', value: '-', isEditable: false, row: 8, col: 7 },
        { type: 'number',   value: 4,   isEditable: false, row: 8, col: 8 },
        { type: 'operator', value: '=', isEditable: false, row: 8, col: 9 },
        { type: 'empty',    isEditable: true,  row: 8, col: 10 },
      ],
      // Row 9: = signs
      [
        { type: 'operator', value: '=', isEditable: false, row: 9, col: 0 },
        { type: 'operator', value: '',  isEditable: false, row: 9, col: 1 },
        { type: 'operator', value: '=', isEditable: false, row: 9, col: 2 },
        { type: 'operator', value: '',  isEditable: false, row: 9, col: 3 },
        { type: 'operator', value: '=', isEditable: false, row: 9, col: 4 },
        { type: 'operator', value: '',  isEditable: false, row: 9, col: 5 },
        { type: 'operator', value: '=', isEditable: false, row: 9, col: 6 },
        { type: 'operator', value: '',  isEditable: false, row: 9, col: 7 },
        { type: 'operator', value: '=', isEditable: false, row: 9, col: 8 },
        { type: 'operator', value: '',  isEditable: false, row: 9, col: 9 },
        { type: 'operator', value: '',  isEditable: false, row: 9, col: 10 },
      ],
      // Row 10: col results — col2=5 (blank), col4=0 (blank), col8=18 (blank)
      [
        { type: 'number',   value: 15,  isEditable: false, row: 10, col: 0 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 1 },
        { type: 'empty',    isEditable: true,  row: 10, col: 2 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 3 },
        { type: 'empty',    isEditable: true,  row: 10, col: 4 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 5 },
        { type: 'number',   value: 7,   isEditable: false, row: 10, col: 6 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 7 },
        { type: 'empty',    isEditable: true,  row: 10, col: 8 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 9 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 10 },
      ],
    ],
    solution: {
      '0-0': 8,  '0-4': 3,  '0-8': 9,  '0-10': 7,
      '2-2': 7,  '2-6': 2,
      '4-0': 5,  '4-4': 8,  '4-6': 7,  '4-10': 6,
      '6-2': 4,  '6-8': 8,
      '8-0': 1,  '8-4': 6,  '8-10': 1,
      '10-2': 5, '10-4': 0, '10-8': 18,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Puzzle hard-2  (18 blanks)
  //
  //  Vertical ops  row1: - + - + -   row3: + - + - +   row5: - + - + -   row7: + - + - +
  //
  //  Row 0: [6] + 9 - 4 + [2] - [7] = [6]     blanks: (0,0)=6  (0,6)=2  (0,8)=7  (0,10)=6
  //  Row 2: [3] - 5 + [8] - 1 + 6 = 11         blanks: (2,0)=3  (2,4)=8  (2,10)=11
  //  Row 4:  7 + [2] - [9] + 4 - [3] = 1       blanks: (4,2)=2  (4,4)=9  (4,8)=3
  //  Row 6: [4] + 6 - 3 + [8] - 5 = [10]       blanks: (6,0)=4  (6,6)=8  (6,10)=10
  //  Row 8:  9 - [1] + 5 - [7] + 2 = 8         blanks: (8,2)=1  (8,6)=7
  //
  //  Col 0 = 6-3+7-4+9 = 15  (blank → (10,0)=15)
  //  Col 2 = 9+5-2+6-1 = 17  (given)
  //  Col 4 = 4-8+9-3+5 = 7   (blank → (10,4)=7)
  //  Col 6 = 2+1-4+8-7 = 0   (blank → (10,6)=0)
  //  Col 8 = 7+6-3+5-2 = 13  (given)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'hard-2',
    difficulty: 'hard',
    rows: 11,
    columns: 11,
    maxMistakes: 3,
    availableNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    grid: [
      // Row 0: [6] + 9 - 4 + [2] - [7] = [6]
      [
        { type: 'empty',    isEditable: true,  row: 0, col: 0 },
        { type: 'operator', value: '+', isEditable: false, row: 0, col: 1 },
        { type: 'number',   value: 9,   isEditable: false, row: 0, col: 2 },
        { type: 'operator', value: '-', isEditable: false, row: 0, col: 3 },
        { type: 'number',   value: 4,   isEditable: false, row: 0, col: 4 },
        { type: 'operator', value: '+', isEditable: false, row: 0, col: 5 },
        { type: 'empty',    isEditable: true,  row: 0, col: 6 },
        { type: 'operator', value: '-', isEditable: false, row: 0, col: 7 },
        { type: 'empty',    isEditable: true,  row: 0, col: 8 },
        { type: 'operator', value: '=', isEditable: false, row: 0, col: 9 },
        { type: 'empty',    isEditable: true,  row: 0, col: 10 },
      ],
      // Row 1: vertical operators
      [
        { type: 'operator', value: '-', isEditable: false, row: 1, col: 0 },
        { type: 'operator', value: '',  isEditable: false, row: 1, col: 1 },
        { type: 'operator', value: '+', isEditable: false, row: 1, col: 2 },
        { type: 'operator', value: '',  isEditable: false, row: 1, col: 3 },
        { type: 'operator', value: '-', isEditable: false, row: 1, col: 4 },
        { type: 'operator', value: '',  isEditable: false, row: 1, col: 5 },
        { type: 'operator', value: '+', isEditable: false, row: 1, col: 6 },
        { type: 'operator', value: '',  isEditable: false, row: 1, col: 7 },
        { type: 'operator', value: '-', isEditable: false, row: 1, col: 8 },
        { type: 'operator', value: '',  isEditable: false, row: 1, col: 9 },
        { type: 'operator', value: '',  isEditable: false, row: 1, col: 10 },
      ],
      // Row 2: [3] - 5 + [8] - 1 + 6 = 11
      [
        { type: 'empty',    isEditable: true,  row: 2, col: 0 },
        { type: 'operator', value: '-', isEditable: false, row: 2, col: 1 },
        { type: 'number',   value: 5,   isEditable: false, row: 2, col: 2 },
        { type: 'operator', value: '+', isEditable: false, row: 2, col: 3 },
        { type: 'empty',    isEditable: true,  row: 2, col: 4 },
        { type: 'operator', value: '-', isEditable: false, row: 2, col: 5 },
        { type: 'number',   value: 1,   isEditable: false, row: 2, col: 6 },
        { type: 'operator', value: '+', isEditable: false, row: 2, col: 7 },
        { type: 'number',   value: 6,   isEditable: false, row: 2, col: 8 },
        { type: 'operator', value: '=', isEditable: false, row: 2, col: 9 },
        { type: 'empty',    isEditable: true,  row: 2, col: 10 },
      ],
      // Row 3: vertical operators
      [
        { type: 'operator', value: '+', isEditable: false, row: 3, col: 0 },
        { type: 'operator', value: '',  isEditable: false, row: 3, col: 1 },
        { type: 'operator', value: '-', isEditable: false, row: 3, col: 2 },
        { type: 'operator', value: '',  isEditable: false, row: 3, col: 3 },
        { type: 'operator', value: '+', isEditable: false, row: 3, col: 4 },
        { type: 'operator', value: '',  isEditable: false, row: 3, col: 5 },
        { type: 'operator', value: '-', isEditable: false, row: 3, col: 6 },
        { type: 'operator', value: '',  isEditable: false, row: 3, col: 7 },
        { type: 'operator', value: '+', isEditable: false, row: 3, col: 8 },
        { type: 'operator', value: '',  isEditable: false, row: 3, col: 9 },
        { type: 'operator', value: '',  isEditable: false, row: 3, col: 10 },
      ],
      // Row 4: 7 + [2] - [9] + 4 - [3] = 1
      [
        { type: 'number',   value: 7,   isEditable: false, row: 4, col: 0 },
        { type: 'operator', value: '+', isEditable: false, row: 4, col: 1 },
        { type: 'empty',    isEditable: true,  row: 4, col: 2 },
        { type: 'operator', value: '-', isEditable: false, row: 4, col: 3 },
        { type: 'empty',    isEditable: true,  row: 4, col: 4 },
        { type: 'operator', value: '+', isEditable: false, row: 4, col: 5 },
        { type: 'number',   value: 4,   isEditable: false, row: 4, col: 6 },
        { type: 'operator', value: '-', isEditable: false, row: 4, col: 7 },
        { type: 'empty',    isEditable: true,  row: 4, col: 8 },
        { type: 'operator', value: '=', isEditable: false, row: 4, col: 9 },
        { type: 'number',   value: 1,   isEditable: false, row: 4, col: 10 },
      ],
      // Row 5: vertical operators
      [
        { type: 'operator', value: '-', isEditable: false, row: 5, col: 0 },
        { type: 'operator', value: '',  isEditable: false, row: 5, col: 1 },
        { type: 'operator', value: '+', isEditable: false, row: 5, col: 2 },
        { type: 'operator', value: '',  isEditable: false, row: 5, col: 3 },
        { type: 'operator', value: '-', isEditable: false, row: 5, col: 4 },
        { type: 'operator', value: '',  isEditable: false, row: 5, col: 5 },
        { type: 'operator', value: '+', isEditable: false, row: 5, col: 6 },
        { type: 'operator', value: '',  isEditable: false, row: 5, col: 7 },
        { type: 'operator', value: '-', isEditable: false, row: 5, col: 8 },
        { type: 'operator', value: '',  isEditable: false, row: 5, col: 9 },
        { type: 'operator', value: '',  isEditable: false, row: 5, col: 10 },
      ],
      // Row 6: [4] + 6 - 3 + [8] - 5 = [10]
      [
        { type: 'empty',    isEditable: true,  row: 6, col: 0 },
        { type: 'operator', value: '+', isEditable: false, row: 6, col: 1 },
        { type: 'number',   value: 6,   isEditable: false, row: 6, col: 2 },
        { type: 'operator', value: '-', isEditable: false, row: 6, col: 3 },
        { type: 'number',   value: 3,   isEditable: false, row: 6, col: 4 },
        { type: 'operator', value: '+', isEditable: false, row: 6, col: 5 },
        { type: 'empty',    isEditable: true,  row: 6, col: 6 },
        { type: 'operator', value: '-', isEditable: false, row: 6, col: 7 },
        { type: 'number',   value: 5,   isEditable: false, row: 6, col: 8 },
        { type: 'operator', value: '=', isEditable: false, row: 6, col: 9 },
        { type: 'empty',    isEditable: true,  row: 6, col: 10 },
      ],
      // Row 7: vertical operators
      [
        { type: 'operator', value: '+', isEditable: false, row: 7, col: 0 },
        { type: 'operator', value: '',  isEditable: false, row: 7, col: 1 },
        { type: 'operator', value: '-', isEditable: false, row: 7, col: 2 },
        { type: 'operator', value: '',  isEditable: false, row: 7, col: 3 },
        { type: 'operator', value: '+', isEditable: false, row: 7, col: 4 },
        { type: 'operator', value: '',  isEditable: false, row: 7, col: 5 },
        { type: 'operator', value: '-', isEditable: false, row: 7, col: 6 },
        { type: 'operator', value: '',  isEditable: false, row: 7, col: 7 },
        { type: 'operator', value: '+', isEditable: false, row: 7, col: 8 },
        { type: 'operator', value: '',  isEditable: false, row: 7, col: 9 },
        { type: 'operator', value: '',  isEditable: false, row: 7, col: 10 },
      ],
      // Row 8: 9 - [1] + 5 - [7] + 2 = 8
      [
        { type: 'number',   value: 9,   isEditable: false, row: 8, col: 0 },
        { type: 'operator', value: '-', isEditable: false, row: 8, col: 1 },
        { type: 'empty',    isEditable: true,  row: 8, col: 2 },
        { type: 'operator', value: '+', isEditable: false, row: 8, col: 3 },
        { type: 'number',   value: 5,   isEditable: false, row: 8, col: 4 },
        { type: 'operator', value: '-', isEditable: false, row: 8, col: 5 },
        { type: 'empty',    isEditable: true,  row: 8, col: 6 },
        { type: 'operator', value: '+', isEditable: false, row: 8, col: 7 },
        { type: 'number',   value: 2,   isEditable: false, row: 8, col: 8 },
        { type: 'operator', value: '=', isEditable: false, row: 8, col: 9 },
        { type: 'number',   value: 8,   isEditable: false, row: 8, col: 10 },
      ],
      // Row 9: = signs
      [
        { type: 'operator', value: '=', isEditable: false, row: 9, col: 0 },
        { type: 'operator', value: '',  isEditable: false, row: 9, col: 1 },
        { type: 'operator', value: '=', isEditable: false, row: 9, col: 2 },
        { type: 'operator', value: '',  isEditable: false, row: 9, col: 3 },
        { type: 'operator', value: '=', isEditable: false, row: 9, col: 4 },
        { type: 'operator', value: '',  isEditable: false, row: 9, col: 5 },
        { type: 'operator', value: '=', isEditable: false, row: 9, col: 6 },
        { type: 'operator', value: '',  isEditable: false, row: 9, col: 7 },
        { type: 'operator', value: '=', isEditable: false, row: 9, col: 8 },
        { type: 'operator', value: '',  isEditable: false, row: 9, col: 9 },
        { type: 'operator', value: '',  isEditable: false, row: 9, col: 10 },
      ],
      // Row 10: col results — col0=15 (blank), col4=7 (blank), col6=0 (blank)
      [
        { type: 'empty',    isEditable: true,  row: 10, col: 0 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 1 },
        { type: 'number',   value: 17,  isEditable: false, row: 10, col: 2 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 3 },
        { type: 'empty',    isEditable: true,  row: 10, col: 4 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 5 },
        { type: 'empty',    isEditable: true,  row: 10, col: 6 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 7 },
        { type: 'number',   value: 13,  isEditable: false, row: 10, col: 8 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 9 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 10 },
      ],
    ],
    solution: {
      '0-0': 6,  '0-6': 2,  '0-8': 7,  '0-10': 6,
      '2-0': 3,  '2-4': 8,  '2-10': 11,
      '4-2': 2,  '4-4': 9,  '4-8': 3,
      '6-0': 4,  '6-6': 8,  '6-10': 10,
      '8-2': 1,  '8-6': 7,
      '10-0': 15, '10-4': 7, '10-6': 0,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Puzzle hard-3  (18 blanks)
  //
  //  Vertical ops  row1: + - + - +   row3: - + - + -   row5: + - + - +   row7: - + - + -
  //
  //  Row 0: [7] - [3] + 9 - 5 + [4] = [12]    blanks: (0,0)=7  (0,2)=3  (0,8)=4  (0,10)=12
  //  Row 2:  5 + 8 - [6] + [2] - 7 = 2         blanks: (2,4)=6  (2,6)=2  (2,10)=2
  //  Row 4: [3] + 4 - [1] + [9] - 6 = 9        blanks: (4,0)=3  (4,4)=1  (4,6)=9
  //  Row 6:  9 - 6 + [5] - [8] + 3 = 3         blanks: (6,4)=5  (6,6)=8
  //  Row 8:  2 + [7] - 4 + 6 - [9] = [2]       blanks: (8,2)=7  (8,8)=9  (8,10)=2
  //
  //  Col 0 = 7+5-3+9-2 = 16  (given)
  //  Col 2 = 3-8+4-6+7 = 0   (blank → (10,2)=0)
  //  Col 4 = 9+6-1+5-4 = 15  (given)
  //  Col 6 = 5-2+9-8+6 = 10  (blank → (10,6)=10)
  //  Col 8 = 4+7-6+3-9 = -1  (blank → (10,8)=-1)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'hard-3',
    difficulty: 'hard',
    rows: 11,
    columns: 11,
    maxMistakes: 3,
    availableNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    grid: [
      // Row 0: [7] - [3] + 9 - 5 + [4] = [12]
      [
        { type: 'empty',    isEditable: true,  row: 0, col: 0 },
        { type: 'operator', value: '-', isEditable: false, row: 0, col: 1 },
        { type: 'empty',    isEditable: true,  row: 0, col: 2 },
        { type: 'operator', value: '+', isEditable: false, row: 0, col: 3 },
        { type: 'number',   value: 9,   isEditable: false, row: 0, col: 4 },
        { type: 'operator', value: '-', isEditable: false, row: 0, col: 5 },
        { type: 'number',   value: 5,   isEditable: false, row: 0, col: 6 },
        { type: 'operator', value: '+', isEditable: false, row: 0, col: 7 },
        { type: 'empty',    isEditable: true,  row: 0, col: 8 },
        { type: 'operator', value: '=', isEditable: false, row: 0, col: 9 },
        { type: 'empty',    isEditable: true,  row: 0, col: 10 },
      ],
      // Row 1: vertical operators
      [
        { type: 'operator', value: '+', isEditable: false, row: 1, col: 0 },
        { type: 'operator', value: '',  isEditable: false, row: 1, col: 1 },
        { type: 'operator', value: '-', isEditable: false, row: 1, col: 2 },
        { type: 'operator', value: '',  isEditable: false, row: 1, col: 3 },
        { type: 'operator', value: '+', isEditable: false, row: 1, col: 4 },
        { type: 'operator', value: '',  isEditable: false, row: 1, col: 5 },
        { type: 'operator', value: '-', isEditable: false, row: 1, col: 6 },
        { type: 'operator', value: '',  isEditable: false, row: 1, col: 7 },
        { type: 'operator', value: '+', isEditable: false, row: 1, col: 8 },
        { type: 'operator', value: '',  isEditable: false, row: 1, col: 9 },
        { type: 'operator', value: '',  isEditable: false, row: 1, col: 10 },
      ],
      // Row 2: 5 + 8 - [6] + [2] - 7 = [2]
      [
        { type: 'number',   value: 5,   isEditable: false, row: 2, col: 0 },
        { type: 'operator', value: '+', isEditable: false, row: 2, col: 1 },
        { type: 'number',   value: 8,   isEditable: false, row: 2, col: 2 },
        { type: 'operator', value: '-', isEditable: false, row: 2, col: 3 },
        { type: 'empty',    isEditable: true,  row: 2, col: 4 },
        { type: 'operator', value: '+', isEditable: false, row: 2, col: 5 },
        { type: 'empty',    isEditable: true,  row: 2, col: 6 },
        { type: 'operator', value: '-', isEditable: false, row: 2, col: 7 },
        { type: 'number',   value: 7,   isEditable: false, row: 2, col: 8 },
        { type: 'operator', value: '=', isEditable: false, row: 2, col: 9 },
        { type: 'empty',    isEditable: true,  row: 2, col: 10 },
      ],
      // Row 3: vertical operators
      [
        { type: 'operator', value: '-', isEditable: false, row: 3, col: 0 },
        { type: 'operator', value: '',  isEditable: false, row: 3, col: 1 },
        { type: 'operator', value: '+', isEditable: false, row: 3, col: 2 },
        { type: 'operator', value: '',  isEditable: false, row: 3, col: 3 },
        { type: 'operator', value: '-', isEditable: false, row: 3, col: 4 },
        { type: 'operator', value: '',  isEditable: false, row: 3, col: 5 },
        { type: 'operator', value: '+', isEditable: false, row: 3, col: 6 },
        { type: 'operator', value: '',  isEditable: false, row: 3, col: 7 },
        { type: 'operator', value: '-', isEditable: false, row: 3, col: 8 },
        { type: 'operator', value: '',  isEditable: false, row: 3, col: 9 },
        { type: 'operator', value: '',  isEditable: false, row: 3, col: 10 },
      ],
      // Row 4: [3] + 4 - [1] + [9] - 6 = 9
      [
        { type: 'empty',    isEditable: true,  row: 4, col: 0 },
        { type: 'operator', value: '+', isEditable: false, row: 4, col: 1 },
        { type: 'number',   value: 4,   isEditable: false, row: 4, col: 2 },
        { type: 'operator', value: '-', isEditable: false, row: 4, col: 3 },
        { type: 'empty',    isEditable: true,  row: 4, col: 4 },
        { type: 'operator', value: '+', isEditable: false, row: 4, col: 5 },
        { type: 'empty',    isEditable: true,  row: 4, col: 6 },
        { type: 'operator', value: '-', isEditable: false, row: 4, col: 7 },
        { type: 'number',   value: 6,   isEditable: false, row: 4, col: 8 },
        { type: 'operator', value: '=', isEditable: false, row: 4, col: 9 },
        { type: 'number',   value: 9,   isEditable: false, row: 4, col: 10 },
      ],
      // Row 5: vertical operators
      [
        { type: 'operator', value: '+', isEditable: false, row: 5, col: 0 },
        { type: 'operator', value: '',  isEditable: false, row: 5, col: 1 },
        { type: 'operator', value: '-', isEditable: false, row: 5, col: 2 },
        { type: 'operator', value: '',  isEditable: false, row: 5, col: 3 },
        { type: 'operator', value: '+', isEditable: false, row: 5, col: 4 },
        { type: 'operator', value: '',  isEditable: false, row: 5, col: 5 },
        { type: 'operator', value: '-', isEditable: false, row: 5, col: 6 },
        { type: 'operator', value: '',  isEditable: false, row: 5, col: 7 },
        { type: 'operator', value: '+', isEditable: false, row: 5, col: 8 },
        { type: 'operator', value: '',  isEditable: false, row: 5, col: 9 },
        { type: 'operator', value: '',  isEditable: false, row: 5, col: 10 },
      ],
      // Row 6: 9 - 6 + [5] - [8] + 3 = 3
      [
        { type: 'number',   value: 9,   isEditable: false, row: 6, col: 0 },
        { type: 'operator', value: '-', isEditable: false, row: 6, col: 1 },
        { type: 'number',   value: 6,   isEditable: false, row: 6, col: 2 },
        { type: 'operator', value: '+', isEditable: false, row: 6, col: 3 },
        { type: 'empty',    isEditable: true,  row: 6, col: 4 },
        { type: 'operator', value: '-', isEditable: false, row: 6, col: 5 },
        { type: 'empty',    isEditable: true,  row: 6, col: 6 },
        { type: 'operator', value: '+', isEditable: false, row: 6, col: 7 },
        { type: 'number',   value: 3,   isEditable: false, row: 6, col: 8 },
        { type: 'operator', value: '=', isEditable: false, row: 6, col: 9 },
        { type: 'number',   value: 3,   isEditable: false, row: 6, col: 10 },
      ],
      // Row 7: vertical operators
      [
        { type: 'operator', value: '-', isEditable: false, row: 7, col: 0 },
        { type: 'operator', value: '',  isEditable: false, row: 7, col: 1 },
        { type: 'operator', value: '+', isEditable: false, row: 7, col: 2 },
        { type: 'operator', value: '',  isEditable: false, row: 7, col: 3 },
        { type: 'operator', value: '-', isEditable: false, row: 7, col: 4 },
        { type: 'operator', value: '',  isEditable: false, row: 7, col: 5 },
        { type: 'operator', value: '+', isEditable: false, row: 7, col: 6 },
        { type: 'operator', value: '',  isEditable: false, row: 7, col: 7 },
        { type: 'operator', value: '-', isEditable: false, row: 7, col: 8 },
        { type: 'operator', value: '',  isEditable: false, row: 7, col: 9 },
        { type: 'operator', value: '',  isEditable: false, row: 7, col: 10 },
      ],
      // Row 8: 2 + [7] - 4 + 6 - [9] = [2]
      [
        { type: 'number',   value: 2,   isEditable: false, row: 8, col: 0 },
        { type: 'operator', value: '+', isEditable: false, row: 8, col: 1 },
        { type: 'empty',    isEditable: true,  row: 8, col: 2 },
        { type: 'operator', value: '-', isEditable: false, row: 8, col: 3 },
        { type: 'number',   value: 4,   isEditable: false, row: 8, col: 4 },
        { type: 'operator', value: '+', isEditable: false, row: 8, col: 5 },
        { type: 'number',   value: 6,   isEditable: false, row: 8, col: 6 },
        { type: 'operator', value: '-', isEditable: false, row: 8, col: 7 },
        { type: 'empty',    isEditable: true,  row: 8, col: 8 },
        { type: 'operator', value: '=', isEditable: false, row: 8, col: 9 },
        { type: 'empty',    isEditable: true,  row: 8, col: 10 },
      ],
      // Row 9: = signs
      [
        { type: 'operator', value: '=', isEditable: false, row: 9, col: 0 },
        { type: 'operator', value: '',  isEditable: false, row: 9, col: 1 },
        { type: 'operator', value: '=', isEditable: false, row: 9, col: 2 },
        { type: 'operator', value: '',  isEditable: false, row: 9, col: 3 },
        { type: 'operator', value: '=', isEditable: false, row: 9, col: 4 },
        { type: 'operator', value: '',  isEditable: false, row: 9, col: 5 },
        { type: 'operator', value: '=', isEditable: false, row: 9, col: 6 },
        { type: 'operator', value: '',  isEditable: false, row: 9, col: 7 },
        { type: 'operator', value: '=', isEditable: false, row: 9, col: 8 },
        { type: 'operator', value: '',  isEditable: false, row: 9, col: 9 },
        { type: 'operator', value: '',  isEditable: false, row: 9, col: 10 },
      ],
      // Row 10: col results — col2=0 (blank), col6=10 (blank), col8=-1 (blank)
      [
        { type: 'number',   value: 16,  isEditable: false, row: 10, col: 0 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 1 },
        { type: 'empty',    isEditable: true,  row: 10, col: 2 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 3 },
        { type: 'number',   value: 15,  isEditable: false, row: 10, col: 4 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 5 },
        { type: 'empty',    isEditable: true,  row: 10, col: 6 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 7 },
        { type: 'empty',    isEditable: true,  row: 10, col: 8 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 9 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 10 },
      ],
    ],
    solution: {
      '0-0': 7,  '0-2': 3,  '0-8': 4,  '0-10': 12,
      '2-4': 6,  '2-6': 2,  '2-10': 2,
      '4-0': 3,  '4-4': 1,  '4-6': 9,
      '6-4': 5,  '6-6': 8,
      '8-2': 7,  '8-8': 9,  '8-10': 2,
      '10-2': 0, '10-6': 10, '10-8': -1,
    },
  },
]
