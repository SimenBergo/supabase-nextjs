import React, { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'

export default function UnoInput() {
  const supabase = createClient()

  const [simen, setSimen] = useState(null)
  const [sandra, setSandra] = useState(null)
  const [kristian, setKristian] = useState(null)
  const [region, setRegion] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState('')
  const [showResponse, setShowResponse] = useState(false)

  const geoIpLookup = () => {
    return fetch('https://ipapi.co/json')
      .then(res => res.json())
      .then(data => data.city || data.region.split(' ')[0])
      .catch(() => 'Error fetching region')
  }

  async function createGame() {
    if (simen === null || sandra === null || kristian === null) {
      setResponse('All fields are required')
      setShowResponse(true) // Show the response message
      setTimeout(() => setShowResponse(false), 3000)
      return
    }
    try {
      setLoading(true)

      const region = await geoIpLookup()
      console.log('region', region)
      console.log(simen, sandra, kristian)
      const { error } = await supabase.from('uno_games').insert({
        simen,
        sandra,
        kristian,
        region, // Include the region in the insert
        date_time: new Date().toISOString(),
      })
      if (error) throw error

      setResponse('Game inserted')
    } catch (error) {
      console.error(error)
      setResponse('Error inserting game')
    } finally {
      setLoading(false)
      setShowResponse(true) // Show the response message
      setTimeout(() => setShowResponse(false), 3000)
    }
  }

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
        <div className='flex flex-col justify-center items-center gap-2'>
          <label htmlFor='simen'>Simen</label>
          <input
            id='simen'
            type='number'
            value={simen || ''}
            onChange={e => setSimen(e.target.value)}
            className='rounded-lg px-2 py-1 border-lime-300 text-black min-w-[110px]'
            min={1}
            max={3}
          />
        </div>
        <div className='flex flex-col justify-center items-center gap-2'>
          <label htmlFor='sandra'>Sandra</label>
          <input
            id='sandra'
            type='number'
            value={sandra || ''}
            onChange={e => setSandra(e.target.value)}
            className='rounded-lg px-2 py-1 border-lime-300 text-black min-w-[110px]'
            min={1}
            max={3}
          />
        </div>
        <div className='flex flex-col justify-center items-center gap-2'>
          <label htmlFor='kristian'>Kristian</label>
          <input
            id='kristian'
            type='number'
            value={kristian || ''}
            onChange={e => setKristian(e.target.value)}
            className='rounded-lg px-2 py-1 border-lime-300 text-black min-w-[110px]'
            min={1}
            max={3}
          />
        </div>
      </div>
      <div className='w-full flex items-center justify-center'>
        <button
          className='btn btn-primary w-[147px] h-[42px] flex items-center justify-center'
          onClick={() => createGame()}
          disabled={loading}
        >
          {loading ? (
            <Image
              src='/loading-indicator.svg'
              height={20}
              width={20}
              priority
              alt='loading-indicator'
              className='animate-rotate white-svg'
            />
          ) : (
            'Post game'
          )}
        </button>
      </div>
      {showResponse && (
        <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50'>
          <div
            className={`bg-dark text-white px-6 py-3 rounded-lg shadow-lg ${
              showResponse ? 'animate-fadeIn' : 'animate-fadeOut'
            }`}
          >
            {response}
          </div>
        </div>
      )}
    </div>
  )
}
