'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Avatar from './avatar'

export default function CreateForm({ user }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [fullname, setFullname] = useState(null)
  const [email, setEmail] = useState(null)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [response, setResponse] = useState(null)

  async function CreateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').insert({
        email,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error

      setResponse('Profile created')
    } catch (error) {
      console.log(error)
      alert('Error inserting the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-2 items-center py-6'>
      <div className='flex flex-col justify-center items-center gap-2'>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='text'
          value={email || ''}
          onChange={e => setEmail(e.target.value)}
          className='rounded-lg px-2 py-1 border-lime-300 text-black'
        />
      </div>
      <div className='flex flex-col justify-center items-center gap-2'>
        <label htmlFor='fullName'>Full Name</label>
        <input
          id='fullName'
          type='text'
          value={fullname || ''}
          onChange={e => setFullname(e.target.value)}
          className='rounded-lg px-2 py-1 border-lime-300 text-black'
        />
      </div>
      <div className='flex flex-col justify-center items-center gap-2'>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          value={username || ''}
          onChange={e => setUsername(e.target.value)}
          className='rounded-lg px-2 py-1 border-lime-300 text-black'
        />
      </div>
      <div className='flex flex-col justify-center items-center gap-2'>
        <label htmlFor='website'>Website</label>
        <input
          id='website'
          type='url'
          value={website || ''}
          onChange={e => setWebsite(e.target.value)}
          className='rounded-lg px-2 py-1 border-lime-300 text-black'
        />
      </div>
      <Avatar
        uid={user?.id}
        url={avatar_url}
        size={150}
        onUpload={url => {
          setAvatarUrl(url)
          updateProfile({ fullname, username, website, avatar_url: url })
        }}
      />
      <div>
        <button
          className='btn btn-primary'
          onClick={() => CreateProfile({ fullname, username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Create'}
        </button>
      </div>
      {response && <p>{response}</p>}
    </div>
  )
}
