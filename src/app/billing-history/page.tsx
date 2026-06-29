'use client'

import { AccountLayout } from '@/components/account/AccountLayout'
import { getCurrentUser } from '@/lib/auth/frontend-auth'
import { Receipt, Calendar, CreditCard } from 'lucide-react'

export default function BillingHistoryPage() {
  const user = getCurrentUser()

  return (
    <AccountLayout>
            {/* Header */}
            <div className="mb-8">
              <h1 className="font-urbanist font-bold text-[32px] md:text-[40px] text-[#212121] dark:text-white mb-2">
                Billing History
              </h1>
              <p className="font-urbanist text-[16px] text-[#757575] dark:text-[#BDBDBD]">
                Manage your invoices, view past transactions, and download your receipts
              </p>
            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Current Plan */}
              <div className="bg-white dark:bg-[#1F222A] rounded-2xl border-[1.5px] border-[#E0E0E0] dark:border-[#35383F] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <CreditCard size={20} className="text-[#6949FF]" strokeWidth={2} />
                  </div>
                  <h3 className="font-urbanist font-bold text-[16px] text-[#757575] dark:text-[#BDBDBD]">
                    Current Plan
                  </h3>
                </div>
                <p className="font-urbanist font-bold text-[28px] text-[#212121] dark:text-white capitalize">
                  {user?.subscriptionPlan || 'Free'}
                </p>
              </div>

              {/* Next Billing */}
              <div className="bg-white dark:bg-[#1F222A] rounded-2xl border-[1.5px] border-[#E0E0E0] dark:border-[#35383F] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Calendar size={20} className="text-blue-600" strokeWidth={2} />
                  </div>
                  <h3 className="font-urbanist font-bold text-[16px] text-[#757575] dark:text-[#BDBDBD]">
                    Next Billing
                  </h3>
                </div>
                <p className="font-urbanist font-bold text-[28px] text-[#212121] dark:text-white">
                  —
                </p>
              </div>

              {/* Total Invoices */}
              <div className="bg-white dark:bg-[#1F222A] rounded-2xl border-[1.5px] border-[#E0E0E0] dark:border-[#35383F] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <Receipt size={20} className="text-green-600" strokeWidth={2} />
                  </div>
                  <h3 className="font-urbanist font-bold text-[16px] text-[#757575] dark:text-[#BDBDBD]">
                    Total Invoices
                  </h3>
                </div>
                <p className="font-urbanist font-bold text-[28px] text-[#212121] dark:text-white">
                  0
                </p>
              </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white dark:bg-[#1F222A] rounded-2xl border-[1.5px] border-[#E0E0E0] dark:border-[#35383F] p-8">
              <h2 className="font-urbanist font-bold text-[24px] text-[#212121] dark:text-white mb-6">
                Transaction Records
              </h2>

              {/* Empty State */}
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-20 h-20 bg-gray-100 dark:bg-[#181A20] rounded-full flex items-center justify-center mb-6">
                  <Receipt size={36} className="text-[#757575] dark:text-[#BDBDBD]" strokeWidth={1.5} />
                </div>
                <h3 className="font-urbanist font-bold text-[20px] text-[#212121] dark:text-white mb-2">
                  No History Found
                </h3>
                <p className="font-urbanist text-[15px] text-[#757575] dark:text-[#BDBDBD] text-center max-w-[400px]">
                  Your transaction records will appear here once you subscribe or make a purchase.
                </p>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl">
              <p className="font-urbanist text-[14px] text-purple-900 dark:text-purple-300">
                <strong>Need help?</strong> If you have questions about your billing or need to update your payment method, 
                please contact our support team.
              </p>
            </div>
    </AccountLayout>
  )
}
