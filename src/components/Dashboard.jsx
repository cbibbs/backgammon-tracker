import React from 'react';

export const Dashboard = ({ stats, games, onDelete }) => {
    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 shadow-lg">
                    <p className="text-zinc-400 text-sm font-medium">Win Rate</p>
                    <p className="text-3xl font-bold text-emerald-400">{stats.winRate}%</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 shadow-lg">
                    <p className="text-zinc-400 text-sm font-medium">Total Games</p>
                    <p className="text-3xl font-bold text-white">{stats.total}</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 shadow-lg">
                    <p className="text-zinc-400 text-sm font-medium">Wins</p>
                    <p className="text-2xl font-bold text-emerald-400">{stats.wins}</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 shadow-lg">
                    <p className="text-zinc-400 text-sm font-medium">Losses</p>
                    <p className="text-2xl font-bold text-rose-400">{stats.losses}</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 shadow-lg col-span-2 sm:col-span-1">
                    <p className="text-zinc-400 text-sm font-medium">Games to Next %</p>
                    <p className="text-2xl font-bold text-blue-400">
                        {stats.gamesToNextInteger > 0 ? `+${stats.gamesToNextInteger} Wins` : '-'}
                    </p>
                </div>
            </div>

            {/* Recent History */}
            <div className="bg-zinc-800 rounded-xl border border-zinc-700 shadow-lg overflow-hidden">
                <div className="p-4 border-b border-zinc-700">
                    <h3 className="text-lg font-semibold text-white">Recent Games</h3>
                </div>
                <div className="divide-y divide-zinc-700 max-h-96 overflow-y-auto">
                    {games.length === 0 ? (
                        <p className="p-4 text-zinc-500 text-center">No games recorded yet.</p>
                    ) : (
                        games.map((game) => (
                            <div key={game.id} className="p-4 flex items-center justify-between hover:bg-zinc-700/50 transition-colors">
                                <div>
                                    <p className="font-medium text-white">{game.opponent}</p>
                                    <p className="text-xs text-zinc-400">{new Date(game.date).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${game.result === 'win'
                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                        }`}>
                                        {game.result.toUpperCase()}
                                    </span>
                                    <button
                                        onClick={() => onDelete(game.id)}
                                        className="text-zinc-500 hover:text-rose-400 transition-colors"
                                        aria-label="Delete game"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
