import { CrossMathPuzzle } from '@/lib/crossmath/types'

/**
 * Medium CrossMath Puzzles — 11×11 grid
 *
 * Grid layout:
 *   Number cols : 0, 2, 4, 6, 8
 *   Operator cols: 1, 3, 5, 7  (row operators)
 *   Col 9 = '='
 *   Col 10 = row result  (some are BLANK → isEditable)
 *
 *   Number rows : 0, 2, 4, 6, 8
 *   Operator rows: 1, 3, 5, 7  (vertical operators)
 *   Row 9 = '=' signs
 *   Row 10 = column results  (some are BLANK → isEditable)
 *
 * Difficulty — 14 blanks per puzzle:
 *   • 10 inner number cell blanks (2 per equation row)
 *   •  2 row result blanks (col 10, rows vary)
 *   •  2 column result blanks (row 10, cols vary)
 *
 * Column result formula (left-to-right with vertical ops):
 *   result = row0[c] op(row1[c]) row2[c] op(row3[c]) row4[c] op(row5[c]) row6[c] op(row7[c]) row8[c]
 */

export const mediumPuzzles: CrossMathPuzzle[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // Puzzle medium-1  (14 blanks)
  //
  //  Vertical ops  row1: + - + - +   row3: - + - + -   row5: + - + - +   row7: - + - + -
  //
  //  Row 0: [7] + 3 - 5 + [8] - 2 = 11            blanks: (0,0)=7  (0,6)=8
  //  Row 2: [4] - 6 + [9] - 1 + 5 = [11]           blanks: (2,0)=4  (2,4)=9  (2,10)=11
  //  Row 4:  8 + [2] - 4 + 6 - [3] = 9             blanks: (4,2)=2  (4,8)=3
  //  Row 6:  3 + 7 - [2] + [5] - 9 = [4]           blanks: (6,4)=2  (6,6)=5  (6,10)=4
  //  Row 8: [6] - 4 + [8] - 3 + 1 = 8              blanks: (8,0)=6  (8,4)=8
  //
  //  Col 0 = 7+4-8+3-6 = 0   (given)
  //  Col 2 = 3-6+2-7+4 = -4  (blank → (10,2)=-4)
  //  Col 4 = 5+9-4+2-8 = 4   (given)
  //  Col 6 = 8-1+6-5+3 = 11  (given)
  //  Col 8 = 2+5-3+9-1 = 12  (blank → (10,8)=12)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'medium-1',
    difficulty: 'medium',
    rows: 11,
    columns: 11,
    maxMistakes: 4,
    availableNumbers: [2, 3, 4, 5, 6, 7, 8, 9],
    grid: [
      // Row 0: [7] + 3 - 5 + [8] - 2 = 11
      [
        { type: 'empty',    isEditable: true,  row: 0, col: 0 },
        { type: 'operator', value: '+', isEditable: false, row: 0, col: 1 },
        { type: 'number',   value: 3,   isEditable: false, row: 0, col: 2 },
        { type: 'operator', value: '-', isEditable: false, row: 0, col: 3 },
        { type: 'number',   value: 5,   isEditable: false, row: 0, col: 4 },
        { type: 'operator', value: '+', isEditable: false, row: 0, col: 5 },
        { type: 'empty',    isEditable: true,  row: 0, col: 6 },
        { type: 'operator', value: '-', isEditable: false, row: 0, col: 7 },
        { type: 'number',   value: 2,   isEditable: false, row: 0, col: 8 },
        { type: 'operator', value: '=', isEditable: false, row: 0, col: 9 },
        { type: 'number',   value: 11,  isEditable: false, row: 0, col: 10 },
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
      // Row 2: [4] - 6 + [9] - 1 + 5 = [11]
      [
        { type: 'empty',    isEditable: true,  row: 2, col: 0 },
        { type: 'operator', value: '-', isEditable: false, row: 2, col: 1 },
        { type: 'number',   value: 6,   isEditable: false, row: 2, col: 2 },
        { type: 'operator', value: '+', isEditable: false, row: 2, col: 3 },
        { type: 'empty',    isEditable: true,  row: 2, col: 4 },
        { type: 'operator', value: '-', isEditable: false, row: 2, col: 5 },
        { type: 'number',   value: 1,   isEditable: false, row: 2, col: 6 },
        { type: 'operator', value: '+', isEditable: false, row: 2, col: 7 },
        { type: 'number',   value: 5,   isEditable: false, row: 2, col: 8 },
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
      // Row 4: 8 + [2] - 4 + 6 - [3] = 9
      [
        { type: 'number',   value: 8,   isEditable: false, row: 4, col: 0 },
        { type: 'operator', value: '+', isEditable: false, row: 4, col: 1 },
        { type: 'empty',    isEditable: true,  row: 4, col: 2 },
        { type: 'operator', value: '-', isEditable: false, row: 4, col: 3 },
        { type: 'number',   value: 4,   isEditable: false, row: 4, col: 4 },
        { type: 'operator', value: '+', isEditable: false, row: 4, col: 5 },
        { type: 'number',   value: 6,   isEditable: false, row: 4, col: 6 },
        { type: 'operator', value: '-', isEditable: false, row: 4, col: 7 },
        { type: 'empty',    isEditable: true,  row: 4, col: 8 },
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
      // Row 6: 3 + 7 - [2] + [5] - 9 = [4]
      [
        { type: 'number',   value: 3,   isEditable: false, row: 6, col: 0 },
        { type: 'operator', value: '+', isEditable: false, row: 6, col: 1 },
        { type: 'number',   value: 7,   isEditable: false, row: 6, col: 2 },
        { type: 'operator', value: '-', isEditable: false, row: 6, col: 3 },
        { type: 'empty',    isEditable: true,  row: 6, col: 4 },
        { type: 'operator', value: '+', isEditable: false, row: 6, col: 5 },
        { type: 'empty',    isEditable: true,  row: 6, col: 6 },
        { type: 'operator', value: '-', isEditable: false, row: 6, col: 7 },
        { type: 'number',   value: 9,   isEditable: false, row: 6, col: 8 },
        { type: 'operator', value: '=', isEditable: false, row: 6, col: 9 },
        { type: 'empty',    isEditable: true,  row: 6, col: 10 },
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
      // Row 8: [6] - 4 + [8] - 3 + 1 = 8
      [
        { type: 'empty',    isEditable: true,  row: 8, col: 0 },
        { type: 'operator', value: '-', isEditable: false, row: 8, col: 1 },
        { type: 'number',   value: 4,   isEditable: false, row: 8, col: 2 },
        { type: 'operator', value: '+', isEditable: false, row: 8, col: 3 },
        { type: 'empty',    isEditable: true,  row: 8, col: 4 },
        { type: 'operator', value: '-', isEditable: false, row: 8, col: 5 },
        { type: 'number',   value: 3,   isEditable: false, row: 8, col: 6 },
        { type: 'operator', value: '+', isEditable: false, row: 8, col: 7 },
        { type: 'number',   value: 1,   isEditable: false, row: 8, col: 8 },
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
      // Row 10: column results  — col2=-4 (blank), col8=12 (blank)
      [
        { type: 'number',   value: 0,   isEditable: false, row: 10, col: 0 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 1 },
        { type: 'empty',    isEditable: true,  row: 10, col: 2 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 3 },
        { type: 'number',   value: 4,   isEditable: false, row: 10, col: 4 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 5 },
        { type: 'number',   value: 11,  isEditable: false, row: 10, col: 6 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 7 },
        { type: 'empty',    isEditable: true,  row: 10, col: 8 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 9 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 10 },
      ],
    ],
    solution: {
      '0-0': 7,  '0-6': 8,
      '2-0': 4,  '2-4': 9,  '2-10': 11,
      '4-2': 2,  '4-8': 3,
      '6-4': 2,  '6-6': 5,  '6-10': 4,
      '8-0': 6,  '8-4': 8,
      '10-2': -4, '10-8': 12,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Puzzle medium-2  (14 blanks)
  //
  //  Vertical ops  row1: - + - + -   row3: + - + - +   row5: - + - + -   row7: + - + - +
  //
  //  Row 0: [9] + 5 - [3] + 7 - 6 = [12]           blanks: (0,0)=9  (0,4)=3  (0,10)=12
  //  Row 2:  2 + [8] - 4 + [3] - 6 = 3              blanks: (2,2)=8  (2,6)=3
  //  Row 4: [6] - 3 + [7] - 5 + 4 = [9]             blanks: (4,0)=6  (4,4)=7  (4,10)=9
  //  Row 6:  5 + [1] - 8 + 6 - [2] = 2              blanks: (6,2)=1  (6,8)=2
  //  Row 8:  4 - 7 + [6] - [1] + 9 = 11             blanks: (8,4)=6  (8,6)=1
  //
  //  Col 0 = 9-2+6-5+4 = 12  (given)
  //  Col 2 = 5+8-3+1-7 = 4   (blank → (10,2)=4)
  //  Col 4 = 3-4+7-8+6 = 4   (given)
  //  Col 6 = 7+3-5+6-1 = 10  (blank → (10,6)=10)
  //  Col 8 = 6-6+4-2+9 = 11  (given)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'medium-2',
    difficulty: 'medium',
    rows: 11,
    columns: 11,
    maxMistakes: 4,
    availableNumbers: [1, 2, 3, 4, 6, 7, 8, 9],
    grid: [
      // Row 0: [9] + 5 - [3] + 7 - 6 = [12]
      [
        { type: 'empty',    isEditable: true,  row: 0, col: 0 },
        { type: 'operator', value: '+', isEditable: false, row: 0, col: 1 },
        { type: 'number',   value: 5,   isEditable: false, row: 0, col: 2 },
        { type: 'operator', value: '-', isEditable: false, row: 0, col: 3 },
        { type: 'empty',    isEditable: true,  row: 0, col: 4 },
        { type: 'operator', value: '+', isEditable: false, row: 0, col: 5 },
        { type: 'number',   value: 7,   isEditable: false, row: 0, col: 6 },
        { type: 'operator', value: '-', isEditable: false, row: 0, col: 7 },
        { type: 'number',   value: 6,   isEditable: false, row: 0, col: 8 },
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
      // Row 2: 2 + [8] - 4 + [3] - 6 = 3
      [
        { type: 'number',   value: 2,   isEditable: false, row: 2, col: 0 },
        { type: 'operator', value: '+', isEditable: false, row: 2, col: 1 },
        { type: 'empty',    isEditable: true,  row: 2, col: 2 },
        { type: 'operator', value: '-', isEditable: false, row: 2, col: 3 },
        { type: 'number',   value: 4,   isEditable: false, row: 2, col: 4 },
        { type: 'operator', value: '+', isEditable: false, row: 2, col: 5 },
        { type: 'empty',    isEditable: true,  row: 2, col: 6 },
        { type: 'operator', value: '-', isEditable: false, row: 2, col: 7 },
        { type: 'number',   value: 6,   isEditable: false, row: 2, col: 8 },
        { type: 'operator', value: '=', isEditable: false, row: 2, col: 9 },
        { type: 'number',   value: 3,   isEditable: false, row: 2, col: 10 },
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
      // Row 4: [6] - 3 + [7] - 5 + 4 = [9]
      [
        { type: 'empty',    isEditable: true,  row: 4, col: 0 },
        { type: 'operator', value: '-', isEditable: false, row: 4, col: 1 },
        { type: 'number',   value: 3,   isEditable: false, row: 4, col: 2 },
        { type: 'operator', value: '+', isEditable: false, row: 4, col: 3 },
        { type: 'empty',    isEditable: true,  row: 4, col: 4 },
        { type: 'operator', value: '-', isEditable: false, row: 4, col: 5 },
        { type: 'number',   value: 5,   isEditable: false, row: 4, col: 6 },
        { type: 'operator', value: '+', isEditable: false, row: 4, col: 7 },
        { type: 'number',   value: 4,   isEditable: false, row: 4, col: 8 },
        { type: 'operator', value: '=', isEditable: false, row: 4, col: 9 },
        { type: 'empty',    isEditable: true,  row: 4, col: 10 },
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
      // Row 6: 5 + [1] - 8 + 6 - [2] = 2
      [
        { type: 'number',   value: 5,   isEditable: false, row: 6, col: 0 },
        { type: 'operator', value: '+', isEditable: false, row: 6, col: 1 },
        { type: 'empty',    isEditable: true,  row: 6, col: 2 },
        { type: 'operator', value: '-', isEditable: false, row: 6, col: 3 },
        { type: 'number',   value: 8,   isEditable: false, row: 6, col: 4 },
        { type: 'operator', value: '+', isEditable: false, row: 6, col: 5 },
        { type: 'number',   value: 6,   isEditable: false, row: 6, col: 6 },
        { type: 'operator', value: '-', isEditable: false, row: 6, col: 7 },
        { type: 'empty',    isEditable: true,  row: 6, col: 8 },
        { type: 'operator', value: '=', isEditable: false, row: 6, col: 9 },
        { type: 'number',   value: 2,   isEditable: false, row: 6, col: 10 },
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
      // Row 8: 4 - 7 + [6] - [1] + 9 = 11
      [
        { type: 'number',   value: 4,   isEditable: false, row: 8, col: 0 },
        { type: 'operator', value: '-', isEditable: false, row: 8, col: 1 },
        { type: 'number',   value: 7,   isEditable: false, row: 8, col: 2 },
        { type: 'operator', value: '+', isEditable: false, row: 8, col: 3 },
        { type: 'empty',    isEditable: true,  row: 8, col: 4 },
        { type: 'operator', value: '-', isEditable: false, row: 8, col: 5 },
        { type: 'empty',    isEditable: true,  row: 8, col: 6 },
        { type: 'operator', value: '+', isEditable: false, row: 8, col: 7 },
        { type: 'number',   value: 9,   isEditable: false, row: 8, col: 8 },
        { type: 'operator', value: '=', isEditable: false, row: 8, col: 9 },
        { type: 'number',   value: 11,  isEditable: false, row: 8, col: 10 },
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
      // Row 10: column results — col2=4 (blank), col6=10 (blank)
      [
        { type: 'number',   value: 12,  isEditable: false, row: 10, col: 0 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 1 },
        { type: 'empty',    isEditable: true,  row: 10, col: 2 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 3 },
        { type: 'number',   value: 4,   isEditable: false, row: 10, col: 4 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 5 },
        { type: 'empty',    isEditable: true,  row: 10, col: 6 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 7 },
        { type: 'number',   value: 11,  isEditable: false, row: 10, col: 8 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 9 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 10 },
      ],
    ],
    solution: {
      '0-0': 9,  '0-4': 3,  '0-10': 12,
      '2-2': 8,  '2-6': 3,
      '4-0': 6,  '4-4': 7,  '4-10': 9,
      '6-2': 1,  '6-8': 2,
      '8-4': 6,  '8-6': 1,
      '10-2': 4, '10-6': 10,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Puzzle medium-3  (14 blanks)
  //
  //  Vertical ops  row1: + - + - +   row3: - + - + -   row5: + - + - +   row7: - + - + -
  //
  //  Row 0:  5 - [2] + 8 - [3] + 6 = 14            blanks: (0,2)=2  (0,6)=3
  //  Row 2: [3] + 7 - [5] + 4 - 2 = [7]            blanks: (2,0)=3  (2,4)=5  (2,10)=7
  //  Row 4:  9 - [4] + 2 - 6 + [8] = 9             blanks: (4,2)=4  (4,8)=8
  //  Row 6:  1 + 6 - [3] + [7] - 5 = [6]           blanks: (6,4)=3  (6,6)=7  (6,10)=6
  //  Row 8: [7] - 3 + 6 - [2] + 4 = 12             blanks: (8,0)=7  (8,6)=2
  //
  //  Col 0 = 5+3-9+1-7 = -7  (blank → (10,0)=-7)
  //  Col 2 = 2-7+4-6+3 = -4  (given)
  //  Col 4 = 8+5-2+3-6 =  8  (blank → (10,4)=8)
  //  Col 6 = 3-4+6-7+2 =  0  (given)
  //  Col 8 = 6+2-8+5-4 =  1  (given)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'medium-3',
    difficulty: 'medium',
    rows: 11,
    columns: 11,
    maxMistakes: 4,
    availableNumbers: [2, 3, 4, 5, 6, 7, 8],
    grid: [
      // Row 0: 5 - [2] + 8 - [3] + 6 = 14
      [
        { type: 'number',   value: 5,   isEditable: false, row: 0, col: 0 },
        { type: 'operator', value: '-', isEditable: false, row: 0, col: 1 },
        { type: 'empty',    isEditable: true,  row: 0, col: 2 },
        { type: 'operator', value: '+', isEditable: false, row: 0, col: 3 },
        { type: 'number',   value: 8,   isEditable: false, row: 0, col: 4 },
        { type: 'operator', value: '-', isEditable: false, row: 0, col: 5 },
        { type: 'empty',    isEditable: true,  row: 0, col: 6 },
        { type: 'operator', value: '+', isEditable: false, row: 0, col: 7 },
        { type: 'number',   value: 6,   isEditable: false, row: 0, col: 8 },
        { type: 'operator', value: '=', isEditable: false, row: 0, col: 9 },
        { type: 'number',   value: 14,  isEditable: false, row: 0, col: 10 },
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
      // Row 2: [3] + 7 - [5] + 4 - 2 = [7]
      [
        { type: 'empty',    isEditable: true,  row: 2, col: 0 },
        { type: 'operator', value: '+', isEditable: false, row: 2, col: 1 },
        { type: 'number',   value: 7,   isEditable: false, row: 2, col: 2 },
        { type: 'operator', value: '-', isEditable: false, row: 2, col: 3 },
        { type: 'empty',    isEditable: true,  row: 2, col: 4 },
        { type: 'operator', value: '+', isEditable: false, row: 2, col: 5 },
        { type: 'number',   value: 4,   isEditable: false, row: 2, col: 6 },
        { type: 'operator', value: '-', isEditable: false, row: 2, col: 7 },
        { type: 'number',   value: 2,   isEditable: false, row: 2, col: 8 },
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
      // Row 4: 9 - [4] + 2 - 6 + [8] = 9
      [
        { type: 'number',   value: 9,   isEditable: false, row: 4, col: 0 },
        { type: 'operator', value: '-', isEditable: false, row: 4, col: 1 },
        { type: 'empty',    isEditable: true,  row: 4, col: 2 },
        { type: 'operator', value: '+', isEditable: false, row: 4, col: 3 },
        { type: 'number',   value: 2,   isEditable: false, row: 4, col: 4 },
        { type: 'operator', value: '-', isEditable: false, row: 4, col: 5 },
        { type: 'number',   value: 6,   isEditable: false, row: 4, col: 6 },
        { type: 'operator', value: '+', isEditable: false, row: 4, col: 7 },
        { type: 'empty',    isEditable: true,  row: 4, col: 8 },
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
      // Row 6: 1 + 6 - [3] + [7] - 5 = [6]
      [
        { type: 'number',   value: 1,   isEditable: false, row: 6, col: 0 },
        { type: 'operator', value: '+', isEditable: false, row: 6, col: 1 },
        { type: 'number',   value: 6,   isEditable: false, row: 6, col: 2 },
        { type: 'operator', value: '-', isEditable: false, row: 6, col: 3 },
        { type: 'empty',    isEditable: true,  row: 6, col: 4 },
        { type: 'operator', value: '+', isEditable: false, row: 6, col: 5 },
        { type: 'empty',    isEditable: true,  row: 6, col: 6 },
        { type: 'operator', value: '-', isEditable: false, row: 6, col: 7 },
        { type: 'number',   value: 5,   isEditable: false, row: 6, col: 8 },
        { type: 'operator', value: '=', isEditable: false, row: 6, col: 9 },
        { type: 'empty',    isEditable: true,  row: 6, col: 10 },
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
      // Row 8: [7] - 3 + 6 - [2] + 4 = 12
      [
        { type: 'empty',    isEditable: true,  row: 8, col: 0 },
        { type: 'operator', value: '-', isEditable: false, row: 8, col: 1 },
        { type: 'number',   value: 3,   isEditable: false, row: 8, col: 2 },
        { type: 'operator', value: '+', isEditable: false, row: 8, col: 3 },
        { type: 'number',   value: 6,   isEditable: false, row: 8, col: 4 },
        { type: 'operator', value: '-', isEditable: false, row: 8, col: 5 },
        { type: 'empty',    isEditable: true,  row: 8, col: 6 },
        { type: 'operator', value: '+', isEditable: false, row: 8, col: 7 },
        { type: 'number',   value: 4,   isEditable: false, row: 8, col: 8 },
        { type: 'operator', value: '=', isEditable: false, row: 8, col: 9 },
        { type: 'number',   value: 12,  isEditable: false, row: 8, col: 10 },
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
      // Row 10: column results — col0=-7 (blank), col4=8 (blank)
      [
        { type: 'empty',    isEditable: true,  row: 10, col: 0 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 1 },
        { type: 'number',   value: -4,  isEditable: false, row: 10, col: 2 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 3 },
        { type: 'empty',    isEditable: true,  row: 10, col: 4 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 5 },
        { type: 'number',   value: 0,   isEditable: false, row: 10, col: 6 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 7 },
        { type: 'number',   value: 1,   isEditable: false, row: 10, col: 8 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 9 },
        { type: 'operator', value: '',  isEditable: false, row: 10, col: 10 },
      ],
    ],
    solution: {
      '0-2': 2,  '0-6': 3,
      '2-0': 3,  '2-4': 5,  '2-10': 7,
      '4-2': 4,  '4-8': 8,
      '6-4': 3,  '6-6': 7,  '6-10': 6,
      '8-0': 7,  '8-6': 2,
      '10-0': -7, '10-4': 8,
    },
  },
]
