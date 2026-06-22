'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/navbar'
import { Footer } from '@/components/layout/Footer'
import { AccountSidebar } from '@/components/account/AccountSidebar'
import { isLoggedIn } from '@/lib/auth/frontend-auth'
import { Check, Zap } from 'lucide-react'

const features = [
  'Unlimited access to all games and difficulty levels',
  'Full archive of past Daily Challenges',
  'Ad-free experience — pure focus',
  'Advanced stats and performance tracking',
  'Early access to new games and features',
  'Compete on leaderboards without limits',
]

export default function SubscriptionPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    if (!isLoggedIn()) {
      router.push('/login')
    }
  }, [router])

  if (!mounted) {
    return null
  }

  if (!isLoggedIn()) {
    return null
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#181A20] transition-colors duration-300">
      <Navbar />

      <div className="w-full max-w-[1380px] mx-auto px-[20px] py-[40px] md:py-[60px]">
        <div className="flex gap-8">
          {/* Sidebar */}
          <AccountSidebar />

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="font-urbanist font-bold text-[36px] md:text-[48px] text-[#212121] dark:text-white mb-4">
                Unlock Your Full Puzzle Experience
              </h1>
              <p className="font-urbanist text-[16px] md:text-[18px] text-[#757575] dark:text-[#BDBDBD] max-w-[600px] mx-auto">
                Access all games, unlimited challenges, and a distraction-free experience.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Monthly Plan */}
              <div className="bg-white dark:bg-[#1F222A] rounded-2xl border-[1.5px] border-[#E0E0E0] dark:border-[#35383F] p-6 hover:border-[#6949FF] transition-all duration-200">
                <h3 className="font-urbanist font-bold text-[20px] text-[#212121] dark:text-white mb-2">
                  Monthly
                </h3>
                <div className="mb-6">
                  <span className="font-urbanist font-bold text-[40px] text-[#6949FF]">
                    €0.99
                  </span>
                  <span className="font-urbanist text-[16px] text-[#757575] dark:text-[#BDBDBD]">
                    /month
                  </span>
                </div>
                <button className="w-full h-[48px] bg-[#6949FF] hover:bg-[#5536E6] text-white rounded-full font-urbanist font-semibold text-[16px] transition-all duration-200 active:scale-95 mb-4">
                  Choose Monthly
                </button>
                <p className="font-urbanist text-[13px] text-[#757575] dark:text-[#BDBDBD] text-center">
                  Billed monthly
                </p>
              </div>

              {/* Yearly Plan - Best Value */}
              <div className="bg-white dark:bg-[#1F222A] rounded-2xl border-[2px] border-[#6949FF] p-6 relative transform md:scale-105 shadow-lg shadow-purple-500/20">
                {/* Best Value Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#6949FF] rounded-full">
                  <span className="font-urbanist font-bold text-[12px] text-white">
                    Best Value
                  </span>
                </div>

                <h3 className="font-urbanist font-bold text-[20px] text-[#212121] dark:text-white mb-2 mt-2">
                  Yearly
                </h3>
                <div className="mb-2">
                  <span className="font-urbanist font-bold text-[40px] text-[#6949FF]">
                    €9.90
                  </span>
                  <span className="font-urbanist text-[16px] text-[#757575] dark:text-[#BDBDBD]">
                    /year
                  </span>
                </div>
                <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                  <span className="font-urbanist font-bold text-[13px] text-green-600 dark:text-green-400">
                    Save 17%
                  </span>
                </div>
                <button className="w-full h-[48px] bg-[#6949FF] hover:bg-[#5536E6] text-white rounded-full font-urbanist font-semibold text-[16px] transition-all duration-200 active:scale-95 mb-4">
                  Choose Yearly
                </button>
                <p className="font-urbanist text-[13px] text-[#757575] dark:text-[#BDBDBD] text-center">
                  Billed annually
                </p>
              </div>

              {/* Lifetime Plan */}
              <div className="bg-white dark:bg-[#1F222A] rounded-2xl border-[1.5px] border-[#E0E0E0] dark:border-[#35383F] p-6 hover:border-[#6949FF] transition-all duration-200">
                <h3 className="font-urbanist font-bold text-[20px] text-[#212121] dark:text-white mb-2">
                  Lifetime
                </h3>
                <div className="mb-6">
                  <span className="font-urbanist font-bold text-[40px] text-[#6949FF]">
                    €29.90
                  </span>
                  <span className="font-urbanist text-[16px] text-[#757575] dark:text-[#BDBDBD]">
                    /one-time
                  </span>
                </div>
                <button className="w-full h-[48px] bg-[#6949FF] hover:bg-[#5536E6] text-white rounded-full font-urbanist font-semibold text-[16px] transition-all duration-200 active:scale-95 mb-4">
                  Get Lifetime Access
                </button>
                <p className="font-urbanist text-[13px] text-[#757575] dark:text-[#BDBDBD] text-center">
                  Pay once, play forever
                </p>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white dark:bg-[#1F222A] rounded-2xl border-[1.5px] border-[#E0E0E0] dark:border-[#35383F] p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <Zap size={20} className="text-[#6949FF]" />
                </div>
                <h2 className="font-urbanist font-bold text-[24px] text-[#212121] dark:text-white">
                  Everything Included
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-0.5">
                      <Check size={14} className="text-green-600 dark:text-green-400" strokeWidth={3} />
                    </div>
                    <span className="font-urbanist text-[15px] text-[#424242] dark:text-[#E0E0E0]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer Note */}
              <div className="mt-8 pt-6 border-t border-[#E0E0E0] dark:border-[#35383F]">
                <p className="font-urbanist text-[13px] text-[#757575] dark:text-[#BDBDBD] text-center">
                  Secure payment powered by Stripe. Cancel anytime.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}
