/**
 * Tangram Easy Difficulty Puzzles
 * 5 core reference puzzles — each built from exact Tangram geometry
 */

import { TangramPuzzle, TIME_LIMITS } from '@/types/tangram-puzzle'
import { SQUARE_SOLUTION, SQUARE_SILHOUETTE } from '@/lib/tangram/squareSolution'
import { HOUSE_SOLUTION, HOUSE_SILHOUETTE } from '@/lib/tangram/solutions/house'
import { BOAT_SOLUTION, BOAT_SILHOUETTE } from '@/lib/tangram/solutions/boat'
import { ROCKET_SOLUTION, ROCKET_SILHOUETTE } from '@/lib/tangram/solutions/rocket'
import { WINDMILL_SOLUTION, WINDMILL_SILHOUETTE } from '@/lib/tangram/solutions/windmill'

export const easyPuzzles: TangramPuzzle[] = [
  {
    id: 'easy-square',
    title: 'Square',
    difficulty: 'easy',
    silhouette: SQUARE_SILHOUETTE,
    solution: SQUARE_SOLUTION,
    timeLimit: TIME_LIMITS.easy,
  },
  {
    id: 'easy-house',
    title: 'House',
    difficulty: 'easy',
    silhouette: HOUSE_SILHOUETTE,
    solution: HOUSE_SOLUTION,
    timeLimit: TIME_LIMITS.easy,
  },
  {
    id: 'easy-boat',
    title: 'Boat',
    difficulty: 'easy',
    silhouette: BOAT_SILHOUETTE,
    solution: BOAT_SOLUTION,
    timeLimit: TIME_LIMITS.easy,
  },
  {
    id: 'easy-rocket',
    title: 'Rocket',
    difficulty: 'easy',
    silhouette: ROCKET_SILHOUETTE,
    solution: ROCKET_SOLUTION,
    timeLimit: TIME_LIMITS.easy,
  },
  {
    id: 'easy-windmill',
    title: 'Windmill',
    difficulty: 'easy',
    silhouette: WINDMILL_SILHOUETTE,
    solution: WINDMILL_SOLUTION,
    timeLimit: TIME_LIMITS.easy,
  },
]
