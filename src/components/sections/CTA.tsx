'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'

export function CTA() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Subscribed: ${email}`)
    setEmail('')
  }

  return (
    <section id="cta" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Skeleton content - Replace with your custom CTA banner */}
        <div className="bg-slate-900 dark:bg-slate-900/50 p-12 rounded-3xl text-center flex flex-col items-center">
          <h2 className="font-display font-black text-3xl text-white">
            CTA Call-to-Action Section
          </h2>
          <p className="text-slate-400 mt-2 max-w-md">
            Place your conversion forms, register links, or newsletters here.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-sm">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 text-white placeholder-slate-400 border border-white/20 rounded-xl px-4 py-2 flex-1"
            />
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </section>
  )
}
