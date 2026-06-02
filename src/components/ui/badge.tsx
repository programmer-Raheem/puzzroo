import React from 'react'
import { cn } from '../../lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'secondary' | 'success' | 'warning' | 'danger'
}

export function Badge({
  className,
  variant = 'brand',
  children,
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide select-none border font-display transition-colors duration-200'

  const variants = {
    brand: 'bg-brand-50/50 text-brand-700 border-brand-200/50 dark:bg-brand-500/10 dark:text-brand-400 dark:border-brand-500/20',
    secondary: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800/40 dark:text-slate-400 dark:border-slate-800',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
    warning: 'bg-amber-50 text-amber-700 border-amber-200/50 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
    danger: 'bg-rose-50 text-rose-700 border-rose-200/50 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20',
  }

  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
