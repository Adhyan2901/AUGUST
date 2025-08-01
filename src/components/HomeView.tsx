import React, { useState, useEffect } from 'react';
import { Play, Pause, MoreHorizontal } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  file: File;
  url: string;
  duration: number;
  dateAdded: string;
  coverUrl?: string; // ✅ added
}

interface HomeViewProps {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  onSongSelect: (song: Song) => void;
}

const HomeView: React.FC<HomeViewProps> = ({
  songs,
  currentSong,
  isPlaying,
  onSongSelect,
}) => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const bannerImages = [
    '/songs/Untitled design/1.png',
    '/songs/Untitled design/2.png',
    '/songs/Untitled design/3.png',
    '/songs/Untitled design/4.png'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const recentSongs = songs.slice(-8); // Show last 8 uploaded songs

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}
        </h1>
        <p className="text-pink-300">LET's PLAY SOME MUSIC FOR YOUR LOVE ♡</p>
      </div>

      {/* Sliding Banner */}
      <div className="mb-8">
        <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-2xl">
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBannerIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src={image}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-900/80 via-purple-900/60 to-rose-900/80" />
            </div>
          ))}

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Every song tells our story 💕
              </h2>
            </div>
          </div>

          {/* Banner Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBannerIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentBannerIndex ? 'bg-pink-400 scale-110' : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Recently Added */}
      {songs.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Recently Listened</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentSongs.map((song) => (
              <div
                key={song.id}
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-2xl p-6 cursor-pointer transition-all duration-300 group shadow-xl hover:shadow-2xl hover:scale-105"
                onClick={() => onSongSelect(song)}
              >
                <div className="text-center">
                  <img
                    src={song.coverUrl || "/covers/default.jpg"}
                    alt={song.title}
                    className="w-20 h-20 mx-auto mb-4 object-cover rounded-2xl shadow-lg"
                  />
                  <h3 className={`font-bold text-lg mb-2 truncate ${
                    currentSong?.id === song.id ? 'text-pink-400' : 'text-white'
                  }`}>
                    {song.title}
                  </h3>
                  <p className="text-pink-300 text-sm mb-3 truncate">{song.artist}</p>
                  <p className="text-pink-400 text-xs mb-4">{formatDuration(song.duration)}</p>

                  <button className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg mx-auto">
                    {currentSong?.id === song.id && isPlaying ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Songs Grid */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Your Music Collection</h2>
        {songs.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎵</div>
            <h3 className="text-xl font-semibold text-white mb-2">No songs yet</h3>
            <p className="text-pink-300">Upload some music to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {songs.map((song) => (
              <div
                key={song.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/15 rounded-xl p-4 cursor-pointer transition-all duration-300 group hover:scale-105"
                onClick={() => onSongSelect(song)}
              >
                <div className="relative mb-4">
                  <img
                    src={song.coverUrl || "/covers/default.jpg"}
                    alt={song.title}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <button className="absolute bottom-2 right-2 w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg">
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
        )}
      </div>
    </div>
  );
};

export default HomeView;
