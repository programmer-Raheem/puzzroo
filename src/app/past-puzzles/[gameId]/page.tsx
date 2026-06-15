'use client'

import { Suspense } from 'react'
import { useParams } from 'next/navigation'
import { PastPuzzlesContent } from '@/components/past-puzzles/PastPuzzlesContent'
import { Loader2 } from 'lucide-react'

export default function PastPuzzlesPage() {
  const params = useParams()
  const gameId = params.gameId as string

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#181A20]">
        <Loader2 className="animate-spin text-[var(--color-primary)]" size={48} />
      </div>
    }>
      <PastPuzzlesContent gameId={gameId} />
    </Suspense>
  )
}
