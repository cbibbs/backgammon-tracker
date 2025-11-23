import React, { useState } from 'react';

export const GameForm = ({ onAdd, onCancel }) => {
    const [opponent, setOpponent] = useState('');
    const [result, setResult] = useState('win');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!opponent.trim()) return;

        onAdd({
            opponent,
            result,
            notes
        });

        // Reset or close
        setOpponent('');
        setNotes('');
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

            <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Result</label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => setResult('win')}
                        className={`p-3 rounded-lg border font-medium transition-all ${result === 'win'
                                ? 'bg-emerald-500 text-white border-emerald-600 shadow-lg shadow-emerald-500/20'
                                : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-zinc-600'
                            }`}
                    >
                        Win
                    </button>
                    <button
                        type="button"
                        onClick={() => setResult('loss')}
                        className={`p-3 rounded-lg border font-medium transition-all ${result === 'loss'
                                ? 'bg-rose-500 text-white border-rose-600 shadow-lg shadow-rose-500/20'
                                : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-zinc-600'
                            }`}
                    >
                        Loss
                    </button>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Notes (Optional)</label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none"
                    rows="3"
                    placeholder="Any details about the game..."
                />
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
                    Save Game
                </button>
            </div>
        </form>
    );
};
