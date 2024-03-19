import Navbar from '@/components/Navbar/Navbar'
import AccountForm from './account-form'
import { createClient } from '@/utils/supabase/server'

export default async function Account() {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user?.id).single()
    console.log('user: ', user)
    return (
        <>
            <Navbar user={profile} auth={user?.aud} />
            <AccountForm user={user} />
        </>
    )
}