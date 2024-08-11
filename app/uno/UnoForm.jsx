'use client'
import { Club, Spade } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import UnoTable from './UnoTable'
import UnoInput from './UnoInput'

export default function UnoForm({ user }) {
  
  return (
    <div className='flex flex-col items-center justify-start min-h-screen m-10 gap-10'>
      <div className='flex gap-2 items-center justify-center'>
        {/* <Club size={64} color='#37996b' /> */}
        <h1 className="text-2xl md:text-5xl font-bold text-center font-sans border-b-4 text-shadow shadow-slate-700 border-primary-green">Uno statistikk</h1>
        {/* <Spade size={64} color='#37996b' /> */}
      </div>
      <div className='flex flex-col'>
        <UnoTable />
      </div>
      <UnoInput />
    </div>
  )
}

