import { CrossMathPuzzle } from '@/lib/crossmath/types'

/**
 * Easy CrossMath Puzzles - 7x7 grid
 * Grid structure: number-op-number-op-number = result
 * Columns 0,2,4 = numbers; Cols 1,3 = operators; Col 5 = '='; Col 6 = row result
 * Rows 0,2,4 = equation rows; Rows 1,3 = vertical operators; Row 5 = '='; Row 6 = col results
 *
 * Puzzle easy-1:
 *  Row 0:  _  +  5  -  1  =  _     (blank + 5 - 1 = blank)  blank=6 → 6+5-1=10 ✓
 *  Row 2:  3  -  _  +  5  =  7     (3 - blank + 5 = 7) blank=1 → 3-1+5=7 ✓
 *  Row 4:  6  -  6  -  _  = -6     (6-6-blank=-6) blank=6 → 6-6-6=-6 ✓
 *  Col 0:  6+3-6=3   ✓
 *  Col 2:  5+1-6=0   ✓
 *  Col 4:  1+5-6=0   ✓
 */

export const easyPuzzles: CrossMathPuzzle[] = [
  {
    id: 'easy-1',
    difficulty: 'easy',
    rows: 7,
    columns: 7,
    maxMistakes: 5,
    availableNumbers: [1, 3, 6, 10],
    grid: [
      [
        { type: 'empty', isEditable: true, row: 0, col: 0 },
        { type: 'operator', value: '+', isEditable: false, row: 0, col: 1 },
        { type: 'number', value: 5, isEditable: false, row: 0, col: 2 },
        { type: 'operator', value: '-', isEditable: false, row: 0, col: 3 },
        { type: 'number', value: 1, isEditable: false, row: 0, col: 4 },
        { type: 'operator', value: '=', isEditable: false, row: 0, col: 5 },
        { type: 'empty', isEditable: true, row: 0, col: 6 },
      ],
      [
        { type: 'operator', value: '+', isEditable: false, row: 1, col: 0 },
        { type: 'operator', value: '', isEditable: false, row: 1, col: 1 },
        { type: 'operator', value: '+', isEditable: false, row: 1, col: 2 },
        { type: 'operator', value: '', isEditable: false, row: 1, col: 3 },
        { type: 'operator', value: '+', isEditable: false, row: 1, col: 4 },
        { type: 'operator', value: '', isEditable: false, row: 1, col: 5 },
        { type: 'operator', value: '', isEditable: false, row: 1, col: 6 },
      ],
      [
        { type: 'number', value: 3, isEditable: false, row: 2, col: 0 },
        { type: 'operator', value: '-', isEditable: false, row: 2, col: 1 },
        { type: 'empty', isEditable: true, row: 2, col: 2 },
        { type: 'operator', value: '+', isEditable: false, row: 2, col: 3 },
        { type: 'number', value: 5, isEditable: false, row: 2, col: 4 },
        { type: 'operator', value: '=', isEditable: false, row: 2, col: 5 },
        { type: 'number', value: 7, isEditable: false, row: 2, col: 6 },
      ],
      [
        { type: 'operator', value: '-', isEditable: false, row: 3, col: 0 },
        { type: 'operator', value: '', isEditable: false, row: 3, col: 1 },
        { type: 'operator', value: '-', isEditable: false, row: 3, col: 2 },
        { type: 'operator', value: '', isEditable: false, row: 3, col: 3 },
        { type: 'operator', value: '-', isEditable: false, row: 3, col: 4 },
        { type: 'operator', value: '', isEditable: false, row: 3, col: 5 },
        { type: 'operator', value: '', isEditable: false, row: 3, col: 6 },
      ],
      [
        { type: 'number', value: 6, isEditable: false, row: 4, col: 0 },
        { type: 'operator', value: '-', isEditable: false, row: 4, col: 1 },
        { type: 'number', value: 6, isEditable: false, row: 4, col: 2 },
        { type: 'operator', value: '-', isEditable: false, row: 4, col: 3 },
        { type: 'empty', isEditable: true, row: 4, col: 4 },
        { type: 'operator', value: '=', isEditable: false, row: 4, col: 5 },
        { type: 'number', value: -6, isEditable: false, row: 4, col: 6 },
      ],
      [
        { type: 'operator', value: '=', isEditable: false, row: 5, col: 0 },
        { type: 'operator', value: '', isEditable: false, row: 5, col: 1 },
        { type: 'operator', value: '=', isEditable: false, row: 5, col: 2 },
        { type: 'operator', value: '', isEditable: false, row: 5, col: 3 },
        { type: 'operator', value: '=', isEditable: false, row: 5, col: 4 },
        { type: 'operator', value: '', isEditable: false, row: 5, col: 5 },
        { type: 'operator', value: '', isEditable: false, row: 5, col: 6 },
      ],
      [
        { type: 'empty', isEditable: true, row: 6, col: 0 },
        { type: 'operator', value: '', isEditable: false, row: 6, col: 1 },
        { type: 'number', value: 0, isEditable: false, row: 6, col: 2 },
        { type: 'operator', value: '', isEditable: false, row: 6, col: 3 },
        { type: 'number', value: 0, isEditable: false, row: 6, col: 4 },
        { type: 'operator', value: '', isEditable: false, row: 6, col: 5 },
        { type: 'operator', value: '', isEditable: false, row: 6, col: 6 },
      ],
    ],
    solution: {
      '0-0': 6,
      '0-6': 10,
      '2-2': 1,
      '4-4': 6,
      '6-0': 3,
    },
  },
  {
    /**
     * Puzzle easy-2:
     *  Row 0:  _  +  4  +  2  = 10    blank=4 → 4+4+2=10 ✓
     *  Row 2:  _  +  3  -  2  =  6    blank=5 → 5+3-2=6 ✓
     *  Row 4:  8  -  _  -  1  =  2    blank=5 → 8-5-1=2 ✓
     *  Col 0:  4+5-8=1   ✓
     *  Col 2:  4+3-5=2   ✓
     *  Col 4:  2-2-1=-1  ✓
     */
    id: 'easy-2',
    difficulty: 'easy',
    rows: 7,
    columns: 7,
    maxMistakes: 5,
    availableNumbers: [4, 5, 10],
    grid: [
      [
        { type: 'empty', isEditable: true, row: 0, col: 0 },
        { type: 'operator', value: '+', isEditable: false, row: 0, col: 1 },
        { type: 'number', value: 4, isEditable: false, row: 0, col: 2 },
        { type: 'operator', value: '+', isEditable: false, row: 0, col: 3 },
        { type: 'number', value: 2, isEditable: false, row: 0, col: 4 },
        { type: 'operator', value: '=', isEditable: false, row: 0, col: 5 },
        { type: 'number', value: 10, isEditable: false, row: 0, col: 6 },
      ],
      [
        { type: 'operator', value: '+', isEditable: false, row: 1, col: 0 },
        { type: 'operator', value: '', isEditable: false, row: 1, col: 1 },
        { type: 'operator', value: '+', isEditable: false, row: 1, col: 2 },
        { type: 'operator', value: '', isEditable: false, row: 1, col: 3 },
        { type: 'operator', value: '-', isEditable: false, row: 1, col: 4 },
        { type: 'operator', value: '', isEditable: false, row: 1, col: 5 },
        { type: 'operator', value: '', isEditable: false, row: 1, col: 6 },
      ],
      [
        { type: 'empty', isEditable: true, row: 2, col: 0 },
        { type: 'operator', value: '+', isEditable: false, row: 2, col: 1 },
        { type: 'number', value: 3, isEditable: false, row: 2, col: 2 },
        { type: 'operator', value: '-', isEditable: false, row: 2, col: 3 },
        { type: 'number', value: 2, isEditable: false, row: 2, col: 4 },
        { type: 'operator', value: '=', isEditable: false, row: 2, col: 5 },
        { type: 'number', value: 6, isEditable: false, row: 2, col: 6 },
      ],
      [
        { type: 'operator', value: '-', isEditable: false, row: 3, col: 0 },
        { type: 'operator', value: '', isEditable: false, row: 3, col: 1 },
        { type: 'operator', value: '-', isEditable: false, row: 3, col: 2 },
        { type: 'operator', value: '', isEditable: false, row: 3, col: 3 },
        { type: 'operator', value: '-', isEditable: false, row: 3, col: 4 },
        { type: 'operator', value: '', isEditable: false, row: 3, col: 5 },
        { type: 'operator', value: '', isEditable: false, row: 3, col: 6 },
      ],
      [
        { type: 'number', value: 8, isEditable: false, row: 4, col: 0 },
        { type: 'operator', value: '-', isEditable: false, row: 4, col: 1 },
        { type: 'empty', isEditable: true, row: 4, col: 2 },
        { type: 'operator', value: '-', isEditable: false, row: 4, col: 3 },
        { type: 'number', value: 1, isEditable: false, row: 4, col: 4 },
        { type: 'operator', value: '=', isEditable: false, row: 4, col: 5 },
        { type: 'number', value: 2, isEditable: false, row: 4, col: 6 },
      ],
      [
        { type: 'operator', value: '=', isEditable: false, row: 5, col: 0 },
        { type: 'operator', value: '', isEditable: false, row: 5, col: 1 },
        { type: 'operator', value: '=', isEditable: false, row: 5, col: 2 },
        { type: 'operator', value: '', isEditable: false, row: 5, col: 3 },
        { type: 'operator', value: '=', isEditable: false, row: 5, col: 4 },
        { type: 'operator', value: '', isEditable: false, row: 5, col: 5 },
        { type: 'operator', value: '', isEditable: false, row: 5, col: 6 },
      ],
      [
        { type: 'number', value: 1, isEditable: false, row: 6, col: 0 },
        { type: 'operator', value: '', isEditable: false, row: 6, col: 1 },
        { type: 'number', value: 2, isEditable: false, row: 6, col: 2 },
        { type: 'operator', value: '', isEditable: false, row: 6, col: 3 },
        { type: 'number', value: -1, isEditable: false, row: 6, col: 4 },
        { type: 'operator', value: '', isEditable: false, row: 6, col: 5 },
        { type: 'operator', value: '', isEditable: false, row: 6, col: 6 },
      ],
    ],
    solution: {
      '0-0': 4,
      '2-0': 5,
      '4-2': 5,
    },
  },
  {
    /**
     * Puzzle easy-3:
     *  Row 0:  _  -  2  +  3  =  8    blank=7 → 7-2+3=8 ✓
     *  Row 2:  4  +  _  -  1  =  9    blank=6 → 4+6-1=9 ✓
     *  Row 4:  _  +  5  -  3  =  9    blank=7 → 7+5-3=9 ✓
     *  Col 0:  7+4-7=4   ✓
     *  Col 2:  2+6-5=3   ✓
     *  Col 4:  3-1-3=-1  ✓
     */
    id: 'easy-3',
    difficulty: 'easy',
    rows: 7,
    columns: 7,
    maxMistakes: 5,
    availableNumbers: [6, 7],
    grid: [
      [
        { type: 'empty', isEditable: true, row: 0, col: 0 },
        { type: 'operator', value: '-', isEditable: false, row: 0, col: 1 },
        { type: 'number', value: 2, isEditable: false, row: 0, col: 2 },
        { type: 'operator', value: '+', isEditable: false, row: 0, col: 3 },
        { type: 'number', value: 3, isEditable: false, row: 0, col: 4 },
        { type: 'operator', value: '=', isEditable: false, row: 0, col: 5 },
        { type: 'number', value: 8, isEditable: false, row: 0, col: 6 },
      ],
      [
        { type: 'operator', value: '+', isEditable: false, row: 1, col: 0 },
        { type: 'operator', value: '', isEditable: false, row: 1, col: 1 },
        { type: 'operator', value: '+', isEditable: false, row: 1, col: 2 },
        { type: 'operator', value: '', isEditable: false, row: 1, col: 3 },
        { type: 'operator', value: '-', isEditable: false, row: 1, col: 4 },
        { type: 'operator', value: '', isEditable: false, row: 1, col: 5 },
        { type: 'operator', value: '', isEditable: false, row: 1, col: 6 },
      ],
      [
        { type: 'number', value: 4, isEditable: false, row: 2, col: 0 },
        { type: 'operator', value: '+', isEditable: false, row: 2, col: 1 },
        { type: 'empty', isEditable: true, row: 2, col: 2 },
        { type: 'operator', value: '-', isEditable: false, row: 2, col: 3 },
        { type: 'number', value: 1, isEditable: false, row: 2, col: 4 },
        { type: 'operator', value: '=', isEditable: false, row: 2, col: 5 },
        { type: 'number', value: 9, isEditable: false, row: 2, col: 6 },
      ],
      [
        { type: 'operator', value: '-', isEditable: false, row: 3, col: 0 },
        { type: 'operator', value: '', isEditable: false, row: 3, col: 1 },
        { type: 'operator', value: '-', isEditable: false, row: 3, col: 2 },
        { type: 'operator', value: '', isEditable: false, row: 3, col: 3 },
        { type: 'operator', value: '-', isEditable: false, row: 3, col: 4 },
        { type: 'operator', value: '', isEditable: false, row: 3, col: 5 },
        { type: 'operator', value: '', isEditable: false, row: 3, col: 6 },
      ],
      [
        { type: 'empty', isEditable: true, row: 4, col: 0 },
        { type: 'operator', value: '+', isEditable: false, row: 4, col: 1 },
        { type: 'number', value: 5, isEditable: false, row: 4, col: 2 },
        { type: 'operator', value: '-', isEditable: false, row: 4, col: 3 },
        { type: 'number', value: 3, isEditable: false, row: 4, col: 4 },
        { type: 'operator', value: '=', isEditable: false, row: 4, col: 5 },
        { type: 'number', value: 9, isEditable: false, row: 4, col: 6 },
      ],
      [
        { type: 'operator', value: '=', isEditable: false, row: 5, col: 0 },
        { type: 'operator', value: '', isEditable: false, row: 5, col: 1 },
        { type: 'operator', value: '=', isEditable: false, row: 5, col: 2 },
        { type: 'operator', value: '', isEditable: false, row: 5, col: 3 },
        { type: 'operator', value: '=', isEditable: false, row: 5, col: 4 },
        { type: 'operator', value: '', isEditable: false, row: 5, col: 5 },
        { type: 'operator', value: '', isEditable: false, row: 5, col: 6 },
      ],
      [
        { type: 'number', value: 4, isEditable: false, row: 6, col: 0 },
        { type: 'operator', value: '', isEditable: false, row: 6, col: 1 },
        { type: 'number', value: 3, isEditable: false, row: 6, col: 2 },
        { type: 'operator', value: '', isEditable: false, row: 6, col: 3 },
        { type: 'number', value: -1, isEditable: false, row: 6, col: 4 },
        { type: 'operator', value: '', isEditable: false, row: 6, col: 5 },
        { type: 'operator', value: '', isEditable: false, row: 6, col: 6 },
      ],
    ],
    solution: {
      '0-0': 7,
      '2-2': 6,
      '4-0': 7,
    },
  },
]
