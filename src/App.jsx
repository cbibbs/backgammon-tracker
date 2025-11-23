import React, { useState } from 'react';
import { useGames } from './hooks/useGames';
import { Dashboard } from './components/Dashboard';
import { GameForm } from './components/GameForm';
import { BulkGameForm } from './components/BulkGameForm';

function App() {
  const { games, addGame, addBulkGames, deleteGame, getStats } = useGames();
  const [isAdding, setIsAdding] = useState(false);
  const [isBulk, setIsBulk] = useState(false);
  const stats = getStats();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 flex items-center justify-between sticky top-0 bg-zinc-950/80 backdrop-blur-md z-10 border-b border-zinc-800/50">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Backgammon
            </h1>
            <p className="text-xs text-zinc-500 font-medium tracking-wider uppercase">Tracker</p>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-full shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
            aria-label="Add Game"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Dashboard stats={stats} games={games} onDelete={deleteGame} />
        </main>

        {/* Add Game Modal Overlay */}
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setIsAdding(false)}
            />
            <div className="relative w-full max-w-md bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl p-6 transform transition-all animate-in slide-in-from-bottom-10 fade-in duration-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Log Game</h2>
                <div className="flex bg-zinc-800 rounded-lg p-1">
                  <button
                    onClick={() => setIsBulk(false)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${!isBulk ? 'bg-zinc-700 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
                  >
                    Single
                  </button>
                  <button
                    onClick={() => setIsBulk(true)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${isBulk ? 'bg-zinc-700 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
                  >
                    Bulk
                  </button>
                </div>
              </div>

              {isBulk ? (
                <BulkGameForm
                  onAdd={(data) => {
                    addBulkGames(data);
                    setIsAdding(false);
                  }}
                  onCancel={() => setIsAdding(false)}
                />
              ) : (
                <GameForm
                  onAdd={(game) => {
                    addGame(game);
                    setIsAdding(false);
                  }}
                  onCancel={() => setIsAdding(false)}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
