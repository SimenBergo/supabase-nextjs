import Navbar from '@/components/Navbar/Navbar'
import AccountForm from './create-form'
import { createClient } from '@/utils/supabase/server'
import CreateForm from './create-form'

export default async function Account() {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user?.id).single()
    const isAdmin = profile && profile.username === 'simenbergo'
    return (
        <>
            <Navbar user={profile} auth={user?.aud} />
            {isAdmin ? <CreateForm user={user} /> : <div className='min-h-screen w-full flex items-center justify-center'>Not authorized</div>}
        </>
    )
}