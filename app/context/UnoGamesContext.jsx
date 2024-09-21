'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

const UnoGamesContext = createContext()

export const useUnoGames = () => useContext(UnoGamesContext)

export const UnoGamesProvider = ({ children }) => {
  const supabase = createClient()
  const [games, setGames] = useState([])

  const getExistingGames = async () => {
    const { data: games, error } = await supabase.from('uno_games').select('*')
    if (error) {
      console.error(error)
    } else {
      setGames(games)
    }
  }

  const handleInserts = payload => {
    setGames(prevGames => [...prevGames, payload.new])
  }

  useEffect(() => {
    getExistingGames()

    const channel = supabase
      .channel('uno_games')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'uno_games' }, handleInserts)
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [supabase])

  return <UnoGamesContext.Provider value={{ games, setGames }}>{children}</UnoGamesContext.Provider>
}
