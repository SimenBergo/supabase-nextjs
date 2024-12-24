'use client'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList } from 'recharts'
import { useEffect, useState } from 'react'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { useUnoGames } from '@/app/context/UnoGamesContext'

export const description = 'A bar chart'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
}

export function LeaderChart() {
  const { games } = useUnoGames()
  const [topPlayerPercentage, setTopPlayerPercentage] = useState('')

  const calcTotalScoreForEachPlayer = games => {
    return games.reduce((acc, game) => {
      acc.simen = (acc.simen || 0) + (game.simen || 0)
      acc.sandra = (acc.sandra || 0) + (game.sandra || 0)
      acc.kristian = (acc.kristian || 0) + (game.kristian || 0)
      return acc
    }, {})
  }

  const totalScores = calcTotalScoreForEachPlayer(games)

  const chartData = [
    { player: 'Simen', score: totalScores.simen || 0 },
    { player: 'Sandra', score: totalScores.sandra || 0 },
    { player: 'Kristian', score: totalScores.kristian || 0 },
  ]

  useEffect(() => {
    calculateTopPlayerPercentage()
  }, [games])

  const calculateTopPlayerPercentage = () => {
    if (games.length === 0) {
      setTopPlayerPercentage('No games played')
      return
    }

    const playerWins = { simen: 0, sandra: 0, kristian: 0 }

    games.forEach(game => {
      const winner = Object.keys(game).reduce((a, b) => (game[a] > game[b] ? a : b))
      playerWins[winner] += 1
    })

    const topPlayer = Object.keys(playerWins).reduce((a, b) => (playerWins[a] > playerWins[b] ? a : b))
    const topPlayerWins = playerWins[topPlayer]
    const percentage = ((topPlayerWins / games.length) * 100).toFixed(1)

    setTopPlayerPercentage(
      `${topPlayer.charAt(0).toUpperCase() + topPlayer.slice(1)} has won ${percentage}% of all games`
    )
  }

  const formatTimespan = () => {
    if (games.length === 0) return 'No games played'
    const firstGame = new Date(games[0].date_time)
    const lastGame = new Date(games[games.length - 1].date_time)
    const formatDate = date => {
      return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`
    }
    return `${formatDate(firstGame)} - ${formatDate(lastGame)}`
  }

  return (
    <Card className='max-w-96 bg-dark text-white mb-8'>
      <CardHeader>
        <CardTitle className='text-gray-200'>Number of points</CardTitle>
        <CardDescription className='text-white'>{formatTimespan()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} id='bar-chart-top-players'>
            <CartesianGrid vertical={false} />
            <XAxis dataKey='player' tickLine={false} tickMargin={10} axisLine={false} tickFormatter={value => value} />
            <YAxis hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey='score' fill='#38986a' radius={8}>
              <LabelList dataKey='score' position='middle' fill='#ffffff' />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 font-medium leading-none'>
          {topPlayerPercentage} <TrendingUp className='h-4 w-4' />
        </div>
      </CardFooter>
    </Card>
  )
}
