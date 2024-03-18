import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <form className='flex flex-col h-screen items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-3'>
        <label htmlFor='email'>Email:</label>
        <input
          id='email'
          name='email'
          type='email'
          required
          className='rounded-lg px-2 py-1 border-lime-300 text-black'
        />
        <label htmlFor='password'>Password:</label>
        <input
          id='password'
          name='password'
          type='password'
          required
          className='rounded-lg px-2 py-1 border-lime-300 text-black'
        />
        <button formAction={login} className='rounded-lg bg-slate-800 text-white px-8 py-2 hover:bg-slate-900'>
          Log in
        </button>
        <button formAction={signup} className='rounded-lg bg-slate-900 text-white px-8 py-2 hover:bg-slate-950'>
          Sign up
        </button>
      </div>
    </form>
  )
}
