'use client'
import React from 'react'

function Navbar({ user }) {
  console.log(user)
  const isAuthenticated = user && user?.aud === 'authenticated'
  if (isAuthenticated) {
    return (
      <div className='w-full h-[4rem] border-b border-white p-4 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Bergos playground</h1>
        <div className='flex gap-4'>
          <a href='/account' className='hover:underline'>
            {user.email}
          </a>
          <a href='/signout' className='hover:underline'>
            Sign out
          </a>
        </div>
      </div>
    )
  }
  return (
    <div className='w-full h-[4rem] border-b border-white p-4 flex items-center justify-between'>
      <h1 className='text-2xl font-bold'>Bergos playground</h1>
      <div className='flex gap-4'>
        <a href='/account' className='hover:underline'>
          Account
        </a>
        <a href='/login' className='hover:underline'>
          Login
        </a>
      </div>
    </div>
  )
}

export default Navbar
