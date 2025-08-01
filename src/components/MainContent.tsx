import React from 'react';
import { Play, Pause, MoreHorizontal, Clock } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  file: File;
  url: string;
  duration: number;
  dateAdded: string;
  coverUrl?: string; // ✅ Add this line
}


interface MainContentProps {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  onSongSelect: (song: Song) => void;
  onSongRemove: (songId: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  songs,
  currentSong,
  isPlaying,
  onSongSelect,
  onSongRemove,
}) => {
  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-pink-950 via-purple-950 to-rose-950 text-white overflow-hidden">
      {/* Header */}
      <div className="p-8 pb-6">
        <div className="flex items-end gap-6">
          {/* ✅ Updated: Image of your best friend */}
          <div className="w-56 h-56 rounded-lg shadow-2xl overflow-hidden">
            <img
              src="/covers/prpl.jpg"
              alt="Best Friend"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-pink-300 mb-2">PLAYLIST</p>
            <h1 className="text-6xl font-bold mb-4">FOR MY PURPLE ♡</h1>
            <p className="text-pink-200">
              {songs.length} songs • Made for & by Love ♡
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8">
        {/* Action Bar */}
        <div className="flex items-center gap-6 mb-6">
          <button className="w-14 h-14 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center hover:from-pink-300 hover:to-rose-300 transition-all duration-200 shadow-lg">
            <Play className="w-6 h-6 text-white ml-1" />
          </button>
          <button className="text-pink-300 hover:text-white">
            <MoreHorizontal className="w-8 h-8" />
          </button>
        </div>

        {/* Songs Table */}
        <div className="bg-black/30 rounded-lg backdrop-blur-sm">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 text-sm text-pink-300 border-b border-pink-800/50">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-5">TITLE</div>
            <div className="col-span-3">ALBUM</div>
            <div className="col-span-2">DATE ADDED</div>
            <div className="col-span-1 flex justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          {/* Songs List */}
          <div className="max-h-96 overflow-y-auto">
            {songs.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🎵</div>
                <h3 className="text-xl font-semibold mb-2">No songs yet</h3>
                <p className="text-gray-400">Upload some music to get started!</p>
              </div>
            ) : (
              songs.map((song, index) => (
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
                    <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 shadow-md bg-white/10">
  {song.coverUrl ? (
    <img
      src={song.coverUrl}
      alt={song.title}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center">
      <div className="text-lg">🎵</div>
    </div>
  )}
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
                    {formatDate(song.dateAdded)}
                  </div>

                  <div className="col-span-1 flex items-center justify-center text-pink-300 text-sm">
                    {formatDuration(song.duration)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
