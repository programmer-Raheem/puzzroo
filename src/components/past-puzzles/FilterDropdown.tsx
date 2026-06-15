'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'

interface FilterDropdownProps {
  value: 'all' | 'not-started' | 'in-progress' | 'completed'
  onChange: (value: 'all' | 'not-started' | 'in-progress' | 'completed') => void
}

const filterOptions = [
  { value: 'all' as const, label: 'All Puzzles', shortLabel: 'All' },
  { value: 'not-started' as const, label: 'Not Started', shortLabel: 'Not Started' },
  { value: 'in-progress' as const, label: 'In Progress', shortLabel: 'In Progress' },
  { value: 'completed' as const, label: 'Completed', shortLabel: 'Completed' },
]

export function FilterDropdown({ value, onChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedLabel = filterOptions.find(opt => opt.value === value)?.label || 'All Puzzles'

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      {/* Mobile: Horizontal Tab View */}
      <div className="w-full md:hidden">
        <div className="bg-[#E0E0E0] dark:bg-[#35383F] rounded-lg p-1 flex gap-1">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`
                flex-1 px-3 py-2 rounded-md font-urbanist font-medium text-[12px] transition-all
                ${value === option.value
                  ? 'bg-[#6949FF] text-white shadow-md'
                  : 'bg-transparent text-[#424242] dark:text-[#E0E0E0] hover:bg-white/50 dark:hover:bg-[#2D2640]'
                }
              `}
            >
              {option.shortLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: Dropdown Button */}
      <div className="hidden md:block relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#6949FF] hover:bg-[#5536E6] text-white font-urbanist font-medium text-[14px] transition-all min-w-[180px] justify-between"
        >
          <span>{selectedLabel}</span>
          <ChevronDown 
            size={18} 
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-[#35383F] rounded-lg shadow-lg border border-[#E0E0E0] dark:border-[#424242] overflow-hidden z-10">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className="w-full px-4 py-2.5 text-left font-urbanist text-[14px] text-[#424242] dark:text-[#E0E0E0] hover:bg-[#F0EDFF] dark:hover:bg-[#2D2640] transition-colors flex items-center justify-between"
              >
                <span>{option.label}</span>
                {value === option.value && (
                  <Check size={16} className="text-[#6949FF]" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
