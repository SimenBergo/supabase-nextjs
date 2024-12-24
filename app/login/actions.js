'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

// Validation helper functions
const isValidEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return typeof email === 'string' && email.length <= 255 && emailRegex.test(email)
}

const isValidPassword = password => {
  return typeof password === 'string' && password.length >= 6 && password.length <= 64
}

export async function login(formData) {
  const supabase = createClient()

  const email = formData.get('email')
  const password = formData.get('password')
  // Validate inputs
  if (!email || !password) {
    redirect('/error?message=Missing+credentials')
    return
  }

  if (!isValidEmail(email)) {
    redirect('/error?message=Invalid+email+format')
    return
  }

  if (!isValidPassword(password)) {
    redirect('/error?message=Invalid+password+format')
    return
  }

  const data = { email, password }
  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect(`/error?message=${encodeURIComponent(error.message)}`)
    return
  }

  revalidatePath('/', 'layout')
  redirect('/uno')
}

export async function signup(formData) {
  const supabase = createClient()

  const email = formData.get('email')
  const password = formData.get('password')

  // Validate inputs
  if (!email || !password) {
    redirect('/error?message=Missing+credentials')
    return
  }

  if (!isValidEmail(email)) {
    redirect('/error?message=Invalid+email+format')
    return
  }

  if (!isValidPassword(password)) {
    redirect('/error?message=Password+must+be+at+least+6+characters')
    return
  }

  const data = { email, password }
  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect(`/error?message=${encodeURIComponent(error.message)}`)
    return
  }

  revalidatePath('/', 'layout')
  redirect('/account')
}
