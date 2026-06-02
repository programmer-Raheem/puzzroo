import React from 'react'

export function About() {
  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Skeleton content - Replace with your custom About markup */}
        <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
          About App Section
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-lg">
          Add your secondary feature explanations, statistics grids, or screenshots here.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 items-center">
          <div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Replace this with custom descriptions of your spatial puzzle philosophy, game modes, and user benefits.
            </p>
          </div>
          <div className="w-full h-64 bg-slate-100 dark:bg-slate-900 rounded-3xl flex items-center justify-center border-2 border-dashed">
            <span className="text-sm text-slate-400">Mock App UI Placeholder</span>
          </div>
        </div>
      </div>
    </section>
  )
}
