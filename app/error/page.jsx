'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message')

  // Fallback default error message
  const errorMessage = message || 'An unexpected error occurred. Please try again.'

  return (
    <div className='flex flex-col items-center justify-center  min-h-screen'>
      <h1 className='text-3xl font-bold mb-4'>Error</h1>
      <p className='text-lg mb-6'>{decodeURIComponent(errorMessage)}</p>
      <a href='/login' className='text-blue-500 hover:underline hover:scale-105 hover:duration-150'>
        Go back to Login
      </a>
    </div>
  )
}
