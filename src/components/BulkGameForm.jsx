import React, { useState } from 'react';

export const BulkGameForm = ({ onAdd, onCancel }) => {
    const [opponent, setOpponent] = useState('');
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!opponent.trim()) return;
        if (wins === 0 && losses === 0) return;

        onAdd({
            opponent,
            wins: parseInt(wins),
            losses: parseInt(losses)
        });

        // Reset
        setOpponent('');
        setWins(0);
        setLosses(0);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Opponent</label>
                <input
                    type="text"
                    value={opponent}
                    onChange={(e) => setOpponent(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter opponent name"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Wins</label>
                    <input
                        type="number"
                        min="0"
                        value={wins}
                        onChange={(e) => setWins(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Losses</label>
                    <input
                        type="number"
                        min="0"
                        value={losses}
                        onChange={(e) => setLosses(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
            </div>

            <div className="flex gap-3 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 py-3 px-4 rounded-lg border border-zinc-700 text-zinc-300 font-medium hover:bg-zinc-800 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-lg bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
                >
                    Import Games
                </button>
            </div>
        </form>
    );
};
