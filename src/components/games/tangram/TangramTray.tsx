/**
 * Tangram Tray Component
 * Black background tray with pieces arranged in 2 rows as per reference
 */

'use client'

import React from 'react'

interface TangramTrayProps {
  children: React.ReactNode
  mobile?: boolean
}

export function TangramTray({ children, mobile = false }: TangramTrayProps) {
  const trayWidth = mobile ? 350 : 749

  return (
    <div
      className="relative bg-[#000000] rounded-[5px] border-2 border-[#CDCDCD] p-6"
      style={{
        width: `${trayWidth}px`,
        minHeight: mobile ? '160px' : '180px',
      }}
    >
      {/* Two-row grid layout exactly as reference */}
      <div className="grid grid-cols-4 gap-x-8 gap-y-6 place-items-center">
        {children}
      </div>
    </div>
  )
}
