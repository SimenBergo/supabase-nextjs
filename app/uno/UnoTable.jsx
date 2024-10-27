'use client'
import React, { useState, useEffect } from 'react'
import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, BarList } from '@tremor/react'
import { Loader2 } from 'lucide-react'
import { useUnoGames } from '../context/UnoGamesContext'

export default function UnoTable() {
  const { games, loading } = useUnoGames()

  const groupGamesByDate = games => {
    const groupedGames = games.reduce((acc, game) => {
      const date = new Date(game.date_time).toDateString()
      acc[date] = acc[date] || []
      acc[date].push(game)
      return acc
    }, {})

    return Object.keys(groupedGames).map(date => ({
      title: date,
      region: groupedGames[date].region,
      games: groupedGames[date],
    }))
  }

  if (!games) return <div>No games found</div>

  if (loading)
    return (
      <div className='flex items-center justify-center'>
        <Loader2 className='animate-spin' />
      </div>
    )

  return (
    <div className='mx-auto max-w-2xl flex flex-col gap-10'>
      <Table className='overflow-visible'>
        <TableHead className='sticky top-0 bg-dark z-10'>
          <TableRow>
            <TableHeaderCell>Simen</TableHeaderCell>
            <TableHeaderCell>Sandra</TableHeaderCell>
            <TableHeaderCell>Kristian</TableHeaderCell>
            {/* <TableHeaderCell>Actions</TableHeaderCell> */}
          </TableRow>
        </TableHead>

        {games &&
          groupGamesByDate(games).map((group, index) => (
            <TableBody key={index}>
              <TableRow>
                <TableCell colSpan={3} className='text-center'>
                  {group.title + ', ' + group.games[0].region}
                </TableCell>
              </TableRow>
              {group.games.map((game, index) => (
                <TableRow key={index}>
                  <TableCell className='text-center'>{game.simen}</TableCell>
                  <TableCell className='text-center'>{game.sandra}</TableCell>
                  <TableCell className='text-center'>{game.kristian}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          ))}

        {/* <TableBody>
          {games.map((game, index) => (
            <TableRow key={index}>
              <TableCell className='text-center'>{game.simen}</TableCell>
              <TableCell className='text-center'>{game.sandra}</TableCell>
              <TableCell className='text-center'>{game.kristian}</TableCell>
       
            </TableRow>
          ))}
        </TableBody> */}
      </Table>

      {/* <Card className="mx-auto max-w-lg">
        <h3 className="text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">Leader</h3>
        <p className="mt-4 text-tremor-default flex items-center justify-between text-tremor-content dark:text-dark-tremor-content">
          <span>Player</span>
          <span>Points</span>
        </p>
        {games && <BarList data={getEachPlayerScore(games)} className="mt-2" />}
      </Card> */}
    </div>
  )
}
