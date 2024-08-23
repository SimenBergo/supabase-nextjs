'use client'
import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  BarList,
} from '@tremor/react';
import { Trash } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function UnoTable() {
  const supabase = createClient();
  /* const oldGames = {
    simen: 310,
    sandra: 312,
    kristian: 284,
    date_time: new Date('2023-01-01T00:00:00Z').toISOString(),
  } */
  const [games, setGames] = useState([]);
  const getExistingGames = async () => {
    const { data: games, error } = await supabase.from('uno_games').select('*');
    if (error) {
      console.error(error);
    } else {

      setGames(games);
    }
  }

  const handleInserts = (payload) => {
    setGames((prevGames) => [...prevGames, payload.new]);
  };

  useEffect(() => {
    getExistingGames();

    const channel = supabase
      .channel('uno_games')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'uno_games' }, handleInserts)
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabase]);

  const handleDelete = (row) => {
    console.log('Deleting row', row);
    setGames((prevGames) => prevGames.filter((game) => game !== row));
  };

  const getEachPlayerScore = (games) => {
    const playerScores = games.reduce((acc, game) => {
      Object.keys(game).forEach((key) => {
        if (key !== 'date_time' && key !== 'game_id' && key !== 'region') {
          acc[key] = acc[key] || 0;
          acc[key] += game[key];
        }
      });
      return acc;
    }, {});
  
    return Object.keys(playerScores).map((key) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: playerScores[key],
    }));
  };

  const groupGamesByDate = (games) => {
    const groupedGames = games.reduce((acc, game) => {
      const date = new Date(game.date_time).toDateString();
      acc[date] = acc[date] || [];
      acc[date].push(game);
      return acc;
    }, {});
  
    return Object.keys(groupedGames).map((date) => ({
      title: date,
      region: groupedGames[date].region,
      games: groupedGames[date],
    }));
  };

  console.log(games);

  return (
    <div className="mx-auto max-w-2xl flex flex-col gap-10">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Simen</TableHeaderCell>
            <TableHeaderCell>Sandra</TableHeaderCell>
            <TableHeaderCell>Kristian</TableHeaderCell>
            {/* <TableHeaderCell>Actions</TableHeaderCell> */}
          </TableRow>
        </TableHead>

        {games && groupGamesByDate(games).map((group, index) => (
            <TableBody key={index}>
              <TableRow>
                <TableCell colSpan={3} className='text-center'>{group.title + ', ' + group.games[0].region}</TableCell>
              </TableRow>
              {group.games.map((game, index) => (
                <TableRow key={index}>
                  <TableCell className='text-center'>{game.simen}</TableCell>
                  <TableCell className='text-center'>{game.sandra}</TableCell>
                  <TableCell className='text-center'>{game.kristian}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          )
        )}

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
  );
}