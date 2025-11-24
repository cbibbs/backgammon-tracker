import { useState, useEffect } from 'react';

const STORAGE_KEY = 'backgammon_tracker_games';

export const useGames = () => {
    const [games, setGames] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
    }, [games]);

    const addGame = (game) => {
        setGames(prev => [{ ...game, id: Date.now(), date: new Date().toISOString() }, ...prev]);
    };

    const addBulkGames = (bulkData) => {
        const { opponent, wins, losses, date } = bulkData;
        const newGames = [];
        const timestamp = Date.now();
        const gameDate = date || new Date().toISOString();

        for (let i = 0; i < wins; i++) {
            newGames.push({
                id: timestamp + i,
                opponent,
                result: 'win',
                date: gameDate,
                notes: 'Bulk import'
            });
        }

        for (let i = 0; i < losses; i++) {
            newGames.push({
                id: timestamp + wins + i,
                opponent,
                result: 'loss',
                date: gameDate,
                notes: 'Bulk import'
            });
        }

        setGames(prev => [...newGames, ...prev]);
    };

    const deleteGame = (id) => {
        setGames(prev => prev.filter(g => g.id !== id));
    };

    const getStats = () => {
        const total = games.length;
        const wins = games.filter(g => g.result === 'win').length;
        const losses = games.filter(g => g.result === 'loss').length;
        // Calculate win rate with 3 decimal points
        const winRateVal = total === 0 ? 0 : (wins / total) * 100;
        const winRate = winRateVal.toFixed(3);

        // Calculate games to next integer
        let gamesToNextInteger = 0;
        if (total > 0 && winRateVal < 100) {
            const nextInteger = Math.floor(winRateVal) + 1;
            let tempWins = wins;
            let tempTotal = total;

            // Safety break to prevent infinite loops if something goes wrong, though unlikely
            while (gamesToNextInteger < 1000) {
                gamesToNextInteger++;
                tempWins++;
                tempTotal++;
                const newRate = (tempWins / tempTotal) * 100;
                if (newRate >= nextInteger) {
                    break;
                }
            }
        }

        return { total, wins, losses, winRate, gamesToNextInteger };
    };

    return { games, addGame, addBulkGames, deleteGame, getStats };
};

