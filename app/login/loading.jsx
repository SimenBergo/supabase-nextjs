import React from 'react'

function loading() {
  return (
    <div className='font-sans text-2xl text-white flex items-center gap-2'>
      <p>Loading</p>
      <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500'></div>
    </div>
  )
}

export default loading
