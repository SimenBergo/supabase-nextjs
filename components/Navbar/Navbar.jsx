'use client'
import React, { useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { createClient } from '@/utils/supabase/client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import Link from 'next/link'

function Navbar({ user, auth }) {
  const isAuthenticated = user && auth === 'authenticated'
  const supabase = createClient()
  const [avatarUrl, setAvatarUrl] = React.useState(null)

  useEffect(() => {
    async function downloadImage(path) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (isAuthenticated && user.avatar_url) downloadImage(user.avatar_url)
  }, [isAuthenticated, user?.avatar_url, supabase])

  if (isAuthenticated && user) {
    const fallback = user?.full_name[0] + user?.full_name?.split(' ')[1][0]
    return (
      <div className='w-full h-[4rem] border-b border-primary-green p-4 flex items-center justify-between'>
        <h1 className='text-2xl font-bold drop-shadow-lg'>Dwight&#39;s Uno data</h1>
        <div className='flex gap-4 z-[999] bg-inherit'>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={avatarUrl} alt={user.full_name} />
                <AvatarFallback>{fallback}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href='/account' className=''>
                <DropdownMenuItem>Account</DropdownMenuItem>
              </Link>
              <Link href='/uno'>
                <DropdownMenuItem>Uno</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <form action='/auth/signout' method='post'>
                  <button className='button block' type='submit'>
                    Sign out
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    )
  }
  return (
    <div className='mw-full min-h-[4rem] border-b border-primary-green p-4 flex items-center justify-between'>
      <h1 className='text-2xl font-bold'>Dwight&#39;s Uno data</h1>
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
