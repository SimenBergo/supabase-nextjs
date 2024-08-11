import Navbar from '@/components/Navbar/Navbar'
import UnoForm from './UnoForm'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function Uno() {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user?.id).single()

    if(!user) {
        return (
            <>
                <Navbar />
                <div className='w-full h-screen flex justify-center items-center'>
                    <Link href="/login" className='hover:underline'>Log in </Link>
                </div>
            </>
        )
    }

    return (
        <>
            <Navbar user={profile} auth={user?.aud} />
            <UnoForm user={user} />
        </>
    )
}