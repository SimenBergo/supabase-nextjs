'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Avatar from './avatar'

export default function AccountForm({ user }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState(null)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [response, setResponse] = useState(null)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      setResponse('Error loading the user')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error

      setResponse('Profile updated')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-2 items-center pt-6'>
      <div className='flex flex-col justify-center items-center gap-2'>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='text'
          value={user?.email}
          disabled
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
          className='button primary block rounded-lg bg-slate-100 text-black px-8 py-2 hover:bg-slate-200'
          onClick={() => updateProfile({ fullname, username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <form action='/auth/signout' method='post'>
          <button className='button block' type='submit'>
            Sign out
          </button>
        </form>
      </div>
      {response && <p>{response}</p>}
    </div>
  )
}
