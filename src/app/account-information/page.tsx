'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/navbar'
import { Footer } from '@/components/layout/Footer'
import { AccountSidebar } from '@/components/account/AccountSidebar'
import { isLoggedIn, getCurrentUser, getLastLoginInfo } from '@/lib/auth/frontend-auth'
import { Check, Activity, BarChart3, Monitor, MapPin, User } from 'lucide-react'

export default function AccountInformationPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loginInfo, setLoginInfo] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    if (!isLoggedIn()) {
      router.push('/login')
      return
    }

    const userData = getCurrentUser()
    const lastLogin = getLastLoginInfo()
    
    if (userData) {
      setUser(userData)
    }
    if (lastLogin) {
      setLoginInfo(lastLogin)
    }
  }, [router])

  if (!mounted || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-purple-50/20 to-blue-50/10 dark:from-[#0F1014] dark:via-[#0F1014] dark:to-[#0F1014] transition-colors duration-300">
      <Navbar />

      <div className="w-full max-w-[1380px] mx-auto px-[20px] py-[40px] md:py-[60px]">
        <div className="flex gap-8">
          <AccountSidebar />

          <main className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-8">
              <h1 className="font-urbanist font-bold text-[36px] text-[#181A20] dark:text-white mb-2">
                {user.name}
              </h1>
              <p className="font-urbanist text-[16px] text-[#616161] dark:text-[#9E9E9E]">
                Account Information
              </p>
            </div>

            {/* Account Details Card */}
            <div className="bg-white dark:bg-[#1A1D23] rounded-xl border border-purple-100 dark:border-[#2A2D35] p-8 mb-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <User size={20} className="text-white" strokeWidth={2} />
                </div>
                <h2 className="font-urbanist font-bold text-[20px] text-[#181A20] dark:text-white">
                  Account Details
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="p-4 rounded-lg bg-purple-50/50 dark:bg-purple-500/5 border border-purple-100/50 dark:border-purple-500/10">
                  <span className="font-urbanist font-medium text-[13px] text-[#757575] dark:text-[#9E9E9E] block mb-2">
                    Full Name
                  </span>
                  <span className="font-urbanist font-semibold text-[16px] text-[#181A20] dark:text-white">
                    {user.name}
                  </span>
                </div>

                {/* Joined Since */}
                <div className="p-4 rounded-lg bg-purple-50/50 dark:bg-purple-500/5 border border-purple-100/50 dark:border-purple-500/10">
                  <span className="font-urbanist font-medium text-[13px] text-[#757575] dark:text-[#9E9E9E] block mb-2">
                    Member Since
                  </span>
                  <span className="font-urbanist font-semibold text-[16px] text-[#181A20] dark:text-white">
                    {user.joinedDate}
                  </span>
                </div>

                {/* Account ID */}
                <div className="p-4 rounded-lg bg-purple-50/50 dark:bg-purple-500/5 border border-purple-100/50 dark:border-purple-500/10">
                  <span className="font-urbanist font-medium text-[13px] text-[#757575] dark:text-[#9E9E9E] block mb-2">
                    Account ID
                  </span>
                  <span className="font-urbanist font-mono text-[14px] text-[#6949FF] dark:text-[#A78BFA]">
                    {user.id.slice(0, 12)}...
                  </span>
                </div>

                {/* Account Status */}
                <div className="p-4 rounded-lg bg-purple-50/50 dark:bg-purple-500/5 border border-purple-100/50 dark:border-purple-500/10">
                  <span className="font-urbanist font-medium text-[13px] text-[#757575] dark:text-[#9E9E9E] block mb-2">
                    Status
                  </span>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500 rounded-full">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    <span className="font-urbanist font-semibold text-[13px] text-white capitalize">
                      {user.accountStatus}
                    </span>
                  </div>
                </div>

                {/* Username */}
                <div className="p-4 rounded-lg bg-purple-50/50 dark:bg-purple-500/5 border border-purple-100/50 dark:border-purple-500/10">
                  <span className="font-urbanist font-medium text-[13px] text-[#757575] dark:text-[#9E9E9E] block mb-2">
                    Username
                  </span>
                  <span className="font-urbanist font-semibold text-[16px] text-[#181A20] dark:text-white">
                    @{user.username}
                  </span>
                </div>

                {/* Subscription */}
                <div className="p-4 rounded-lg bg-purple-50/50 dark:bg-purple-500/5 border border-purple-100/50 dark:border-purple-500/10">
                  <span className="font-urbanist font-medium text-[13px] text-[#757575] dark:text-[#9E9E9E] block mb-2">
                    Subscription
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full font-urbanist font-semibold text-[13px] text-white capitalize">
                    {user.subscriptionPlan}
                  </span>
                </div>

                {/* Email - Full Width */}
                <div className="md:col-span-2 p-4 rounded-lg bg-purple-50/50 dark:bg-purple-500/5 border border-purple-100/50 dark:border-purple-500/10">
                  <span className="font-urbanist font-medium text-[13px] text-[#757575] dark:text-[#9E9E9E] block mb-2">
                    Email Address
                  </span>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-urbanist font-semibold text-[16px] text-[#181A20] dark:text-white">
                      {user.email}
                    </span>
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500 rounded-full">
                      <Check size={12} className="text-white" strokeWidth={3} />
                      <span className="text-[11px] font-urbanist font-semibold text-white">Verified</span>
                    </div>
                  </div>
                  <span className="font-urbanist text-[12px] text-[#9E9E9E] dark:text-[#757575]">
                    Cannot be changed
                  </span>
                </div>

                {/* Password - Full Width */}
                <div className="md:col-span-2 p-4 rounded-lg bg-purple-50/50 dark:bg-purple-500/5 border border-purple-100/50 dark:border-purple-500/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-urbanist font-medium text-[13px] text-[#757575] dark:text-[#9E9E9E] block mb-1">
                        Password
                      </span>
                      <span className="font-urbanist text-[14px] text-[#181A20] dark:text-white">
                        ••••••••••••
                      </span>
                    </div>
                    <button className="px-5 py-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white rounded-lg font-urbanist font-semibold text-[14px] transition-all duration-200 active:scale-95">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-5 bg-white dark:bg-[#1A1D23] rounded-xl border border-purple-100 dark:border-[#2A2D35] shadow-sm">
                <Activity size={18} className="text-purple-600 mb-2" strokeWidth={2} />
                <p className="font-urbanist text-[12px] text-[#757575] dark:text-[#9E9E9E] mb-1">Games Played</p>
                <p className="font-urbanist font-bold text-[24px] text-[#181A20] dark:text-white">1</p>
              </div>

              <div className="p-5 bg-white dark:bg-[#1A1D23] rounded-xl border border-purple-100 dark:border-[#2A2D35] shadow-sm">
                <Check size={18} className="text-green-600 mb-2" strokeWidth={2} />
                <p className="font-urbanist text-[12px] text-[#757575] dark:text-[#9E9E9E] mb-1">Completed</p>
                <p className="font-urbanist font-bold text-[24px] text-[#181A20] dark:text-white">0</p>
              </div>

              <div className="p-5 bg-white dark:bg-[#1A1D23] rounded-xl border border-purple-100 dark:border-[#2A2D35] shadow-sm">
                <Activity size={18} className="text-orange-600 mb-2" strokeWidth={2} />
                <p className="font-urbanist text-[12px] text-[#757575] dark:text-[#9E9E9E] mb-1">Streak</p>
                <p className="font-urbanist font-bold text-[24px] text-[#181A20] dark:text-white">0</p>
              </div>

              <div className="p-5 bg-white dark:bg-[#1A1D23] rounded-xl border border-purple-100 dark:border-[#2A2D35] shadow-sm">
                <BarChart3 size={18} className="text-blue-600 mb-2" strokeWidth={2} />
                <p className="font-urbanist text-[12px] text-[#757575] dark:text-[#9E9E9E] mb-1">Success Rate</p>
                <p className="font-urbanist font-bold text-[24px] text-[#181A20] dark:text-white">0%</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-[#1A1D23] rounded-xl border border-purple-100 dark:border-[#2A2D35] p-8 shadow-sm">
              <h2 className="font-urbanist font-bold text-[20px] text-[#181A20] dark:text-white mb-6">
                Recent Activity
              </h2>

              {loginInfo && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-purple-50/50 dark:bg-purple-500/5 border border-purple-100/50 dark:border-purple-500/10">
                    <span className="font-urbanist font-medium text-[14px] text-[#757575] dark:text-[#9E9E9E]">
                      Last Login
                    </span>
                    <span className="font-urbanist font-semibold text-[15px] text-[#181A20] dark:text-white">
                      {loginInfo.lastLogin}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-purple-50/50 dark:bg-purple-500/5 border border-purple-100/50 dark:border-purple-500/10">
                    <span className="font-urbanist font-medium text-[14px] text-[#757575] dark:text-[#9E9E9E]">
                      Device
                    </span>
                    <div className="flex items-center gap-2">
                      <Monitor size={16} className="text-purple-600" />
                      <span className="font-urbanist font-semibold text-[15px] text-[#181A20] dark:text-white">
                        {loginInfo.device}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-purple-50/50 dark:bg-purple-500/5 border border-purple-100/50 dark:border-purple-500/10">
                    <span className="font-urbanist font-medium text-[14px] text-[#757575] dark:text-[#9E9E9E]">
                      Location
                    </span>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-purple-600" />
                      <span className="font-urbanist font-semibold text-[15px] text-[#181A20] dark:text-white">
                        {loginInfo.location}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}
