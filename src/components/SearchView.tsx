import React, { useState, useMemo } from 'react';
import { Search, Play, Pause, X } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  file: File;
  url: string;
  duration: number;
  dateAdded: string;
}

interface SearchViewProps {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  onSongSelect: (song: Song) => void;
}

const SearchView: React.FC<SearchViewProps> = ({
  songs,
  currentSong,
  isPlaying,
  onSongSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSongs = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    return songs.filter(song =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.album.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [songs, searchQuery]);

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Search</h1>
      
      {/* Search Input */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-300" />
        <input
          type="text"
          placeholder="What do you want to listen to?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md bg-pink-800/30 border border-pink-600/50 rounded-full py-3 pl-12 pr-12 text-white placeholder-pink-300 focus:outline-none focus:border-pink-400 focus:bg-pink-700/40 transition-all duration-200"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Results */}
      {searchQuery.trim() === '' ? (
        <div className="text-center py-16">
          <Search className="w-16 h-16 text-pink-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Start typing to search</h3>
          <p className="text-pink-300">Find your favorite songs, artists, and albums</p>
        </div>
      ) : filteredSongs.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
          <p className="text-pink-300">Try searching for something else</p>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Search Results ({filteredSongs.length})
          </h2>
          
          {/* Results Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
            {filteredSongs.slice(0, 10).map((song) => (
              <div
                key={song.id}
                className="bg-pink-800/20 hover:bg-pink-700/30 rounded-lg p-4 cursor-pointer transition-all duration-300 group"
                onClick={() => onSongSelect(song)}
              >
                <div className="relative mb-4">
                  <div className="w-full aspect-square bg-gradient-to-br from-pink-400 to-rose-400 rounded-lg flex items-center justify-center">
                    <div className="text-4xl">🎵</div>
                  </div>
                  <button className="absolute bottom-2 right-2 w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105 shadow-lg">
                    {currentSong?.id === song.id && isPlaying ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    )}
                  </button>
                </div>
                <h3 className={`font-semibold truncate mb-1 ${
                  currentSong?.id === song.id ? 'text-pink-400' : 'text-white'
                }`}>
                  {song.title}
                </h3>
                <p className="text-pink-300 text-sm truncate">{song.artist}</p>
                <p className="text-pink-400 text-xs mt-1">{formatDuration(song.duration)}</p>
              </div>
            ))}
          </div>

          {/* Detailed List View */}
          <div className="bg-black/30 rounded-lg backdrop-blur-sm">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 text-sm text-pink-300 border-b border-pink-800/50">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-5">TITLE</div>
              <div className="col-span-3">ALBUM</div>
              <div className="col-span-2">ARTIST</div>
              <div className="col-span-1 text-center">⏱️</div>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {filteredSongs.map((song, index) => (
                <div
                  key={song.id}
                  className={`grid grid-cols-12 gap-4 px-6 py-3 hover:bg-white/10 rounded-lg cursor-pointer group transition-colors ${
                    currentSong?.id === song.id ? 'bg-pink-500/20' : ''
                  }`}
                  onClick={() => onSongSelect(song)}
                >
                  <div className="col-span-1 flex items-center justify-center">
                    <span className={`text-sm ${currentSong?.id === song.id ? 'text-pink-400' : 'text-pink-300'} group-hover:hidden`}>
                      {index + 1}
                    </span>
                    <button className="hidden group-hover:block">
                      {currentSong?.id === song.id && isPlaying ? (
                        <Pause className="w-4 h-4 text-white" />
                      ) : (
                        <Play className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </div>
                  
                  <div className="col-span-5 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded flex items-center justify-center">
                      <div className="text-lg">🎵</div>
                    </div>
                    <div>
                      <div className={`font-medium ${currentSong?.id === song.id ? 'text-pink-400' : 'text-white'}`}>
                        {song.title}
                      </div>
                      <div className="text-sm text-pink-300">{song.artist}</div>
                    </div>
                  </div>
                  
                  <div className="col-span-3 flex items-center text-pink-300 text-sm">
                    {song.album}
                  </div>
                  
                  <div className="col-span-2 flex items-center text-pink-300 text-sm">
                    {song.artist}
                  </div>
                  
                  <div className="col-span-1 flex items-center justify-center text-pink-300 text-sm">
                    {formatDuration(song.duration)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchView;