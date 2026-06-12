'use client'

import React, { useState } from 'react'
import { InfoPageLayout } from '@/components/layout/InfoPageLayout'
import { Button } from '@/components/ui/button'

export default function ContactUsPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  
  // Errors state
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({})
  
  // Success state
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    const newErrors: typeof errors = {}
    if (!name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email address'
    }
    if (!message.trim()) {
      newErrors.message = 'Message is required'
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setName('')
    setEmail('')
    setMessage('')
    setErrors({})
    setIsSubmitted(false)
  }

  return (
    <InfoPageLayout title="Contact Us">
      <div className="max-w-[600px] mx-auto w-full pb-[40px]">
        {isSubmitted ? (
          <div className="bg-[#F0EDFF] dark:bg-[#1F222A] rounded-[20px] p-8 text-center flex flex-col items-center gap-6 border-[1.5px] border-[#E0E0E0] dark:border-[#35383F] transition-all duration-300">
            <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center text-white text-3xl font-bold">
              ✓
            </div>
            <div>
              <h2 className="font-urbanist font-bold text-[24px] text-[#212121] dark:text-white mb-2">
                Thank You!
              </h2>
              <p className="font-urbanist font-medium text-[16px] text-[#757575] dark:text-[#BDBDBD]">
                Your message has been sent successfully. We'll get back to you as soon as possible.
              </p>
            </div>
            <Button onClick={handleReset} variant="primary" size="md" className="rounded-full w-full max-w-[200px]">
              Send Another Message
            </Button>
          </div>
        ) : (
          <div className="bg-[#FFFFFF] dark:bg-[#1F222A] rounded-[20px] p-6 sm:p-8 border-[1.5px] border-[#E0E0E0] dark:border-[#35383F] shadow-lg shadow-purple-500/5 transition-all duration-300">
            <p className="font-urbanist font-medium text-[16px] md:text-[18px] leading-[150%] text-[#757575] dark:text-[#BDBDBD] mb-8 text-center">
              Got a question, bug report, or feature request? Drop us a line below and the Puzzroo team will get back to you!
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-urbanist font-bold text-[14px] text-[#424242] dark:text-[#E0E0E0]">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    if (errors.name) setErrors(prev => ({ ...prev, name: undefined }))
                  }}
                  className={`w-full h-[48px] px-4 rounded-xl border font-urbanist text-[16px] bg-white dark:bg-[#181A20] text-[#212121] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6949FF] focus:border-transparent transition-all duration-200 ${
                    errors.name ? 'border-red-500 focus:ring-red-500' : 'border-[#E0E0E0] dark:border-[#35383F]'
                  }`}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <span className="font-urbanist font-semibold text-[13px] text-red-500">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-urbanist font-bold text-[14px] text-[#424242] dark:text-[#E0E0E0]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email) setErrors(prev => ({ ...prev, email: undefined }))
                  }}
                  className={`w-full h-[48px] px-4 rounded-xl border font-urbanist text-[16px] bg-white dark:bg-[#181A20] text-[#212121] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6949FF] focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-[#E0E0E0] dark:border-[#35383F]'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <span className="font-urbanist font-semibold text-[13px] text-red-500">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Message field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-urbanist font-bold text-[14px] text-[#424242] dark:text-[#E0E0E0]">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value)
                    if (errors.message) setErrors(prev => ({ ...prev, message: undefined }))
                  }}
                  rows={5}
                  className={`w-full p-4 rounded-xl border font-urbanist text-[16px] bg-white dark:bg-[#181A20] text-[#212121] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6949FF] focus:border-transparent transition-all duration-200 resize-none ${
                    errors.message ? 'border-red-500 focus:ring-red-500' : 'border-[#E0E0E0] dark:border-[#35383F]'
                  }`}
                  placeholder="Tell us what you need help with..."
                />
                {errors.message && (
                  <span className="font-urbanist font-semibold text-[13px] text-red-500">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="w-full h-[48px] rounded-full text-base font-urbanist font-semibold bg-[#6949FF] hover:bg-[#5536E6]"
              >
                Submit Message
              </Button>
            </form>
          </div>
        )}
      </div>
    </InfoPageLayout>
  )
}
