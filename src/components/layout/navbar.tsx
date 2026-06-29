'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from '../../hooks/use-theme'
import { images } from '@/lib/utils'
import { isLoggedIn, getCurrentUser } from '@/lib/auth/frontend-auth'
import { ProfileDropdown } from './ProfileDropdown'

export function Navbar() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  // Check login status on mount and when component updates
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = isLoggedIn()
      setLoggedIn(isAuth)
      
      if (isAuth) {
        const userData = getCurrentUser()
        if (userData) {
          setUser({
            name: userData.name,
            email: userData.email,
          })
        }
      } else {
        setUser(null)
      }
    }

    checkAuth()
    
    // Listen for storage changes (login/logout in other tabs)
    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  return (
    <header className="sticky top-0 w-full bg-white dark:bg-[#181A20] transition-colors duration-300 relative z-[200]">
      <div className="w-full max-w-[1380px] mx-auto px-[20px] py-[8px] md:py-[22px]">
        <div className="w-full flex items-center justify-between h-[48px]">

          {/* LEFT: Logo + Brand */}
          <div className="flex items-center gap-[clamp(8px,1vw,12px)] select-none">
            <Link href="/" className="flex items-center gap-[clamp(8px,1vw,12px)] cursor-pointer">
              <Image
                src={images.logo}
                alt="Puzzroo Logo"
                width={32}
                height={32}
                className="w-6 h-6 md:w-8 md:h-8 rounded-lg"
                priority
              />

              <span className="font-urbanist text-[24px] font-extrabold text-[clamp(20px,2.5vw,40px)] tracking-tight text-[#181A20] dark:text-white transition-colors duration-300">
                Puzzroo
              </span>
            </Link>
          </div>

          {/* RIGHT: Desktop Actions */}
          <div className="hidden md:flex items-center gap-[clamp(8px,1vw,16px)] -mr-[15px]">
            {loggedIn && user ? (
              <>
                {/* Subscribe Button */}
                <Link href="/subscription">
                  <button className="h-[38px] px-[clamp(16px,2vw,24px)] rounded-full bg-[#6949FF] hover:bg-[#5536E6] text-white text-[16px] font-semibold font-urbanist transition-all duration-200 active:scale-95">
                    Subscribe Us
                  </button>
                </Link>

                {/* Profile Dropdown */}
                <ProfileDropdown userName={user.name} userEmail={user.email} />
              </>
            ) : (
              <>
                <Link href="/signup">
                  <button className="h-[38px] px-[clamp(16px,2vw,24px)] rounded-full bg-[#6949FF] hover:bg-[#5536E6] text-white text-[16px] font-semibold font-urbanist transition-all duration-200 active:scale-95">
                    Sign up
                  </button>
                </Link>

                <Link href="/login">
                  <button className="h-[38px] px-[clamp(16px,2vw,24px)] rounded-full bg-[#6949FF] hover:bg-[#5536E6] text-white text-[16px] font-semibold font-urbanist transition-all duration-200 active:scale-95">
                    Login
                  </button>
                </Link>
              </>
            )}

            <button
              onClick={toggleTheme}
              className="flex items-center justify-center gap-2 h-[38px] px-[clamp(12px,2vw,16px)] rounded-full hover:opacity-80 transition-all duration-200 active:scale-95"
              aria-label="Toggle theme"
              suppressHydrationWarning
            >
              <span className="font-urbanist text-[14px] font-medium text-[#181A20] dark:text-white transition-colors duration-300">
                {mounted && theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </span>
              <Image
                src={images.darkIcon}
                alt="Theme icon"
                width={20}
                height={20}
                suppressHydrationWarning
                className={`w-5 h-5 select-none transition-transform duration-500 ${mounted && theme === 'light' ? 'scale-x-[-1]' : ''
                  }`}
              />
            </button>

          </div>

          {/* RIGHT: Mobile Actions - Theme + Hamburger */}
          <div className="flex md:hidden items-center gap-2 ml-[20px]">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:opacity-80 transition-all duration-200 active:scale-95"
              aria-label="Toggle theme"
              suppressHydrationWarning
            >
              <Image
                src={images.darkIcon}
                alt="Theme icon"
                width={20}
                height={20}
                suppressHydrationWarning
                className={`w-5 h-5 select-none transition-transform duration-500 ${mounted && theme === 'light' ? 'scale-x-[-1]' : ''
                  }`}
              />
            </button>

            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg ml-2"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-[#212121] dark:bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 bg-[#212121] dark:bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-[#212121] dark:bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#181A20] border-t border-gray-200 dark:border-gray-800 z-50 shadow-lg">
          <div className="flex flex-col items-center gap-4 py-6">
            {loggedIn && user ? (
              <>
                <Link href="/subscription">
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="w-[200px] h-[38px] rounded-full bg-[#6949FF] hover:bg-[#5536E6] text-white text-[14px] font-semibold font-urbanist transition-all active:scale-95 duration-200"
                  >
                    Subscribe Us
                  </button>
                </Link>
                <Link href="/account-information">
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="w-[200px] h-[38px] rounded-full border-2 border-[#6949FF] text-[#6949FF] text-[14px] font-semibold font-urbanist transition-all active:scale-95 duration-200"
                  >
                    My Account
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="w-[200px] h-[38px] rounded-full bg-[#6949FF] hover:bg-[#5536E6] text-white text-[14px] font-semibold font-urbanist transition-all active:scale-95 duration-200">
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="w-[200px] h-[38px] rounded-full bg-[#6949FF] hover:bg-[#5536E6] text-white text-[14px] font-semibold font-urbanist transition-all active:scale-95 duration-200">
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
