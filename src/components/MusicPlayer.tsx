import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  file: File;
  url: string;
  duration: number;
}

interface MusicPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isShuffled: boolean;
  isRepeated: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onShuffle: () => void;
  onRepeat: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentSong,
  isPlaying,
  currentTime,
  duration,
  volume,
  isShuffled,
  isRepeated,
  onPlayPause,
  onPrevious,
  onNext,
  onSeek,
  onVolumeChange,
  onShuffle,
  onRepeat,
}) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/30">
      {/* Song Info */}
      <div className="text-center mb-8">
        <div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-pink-300/50 to-purple-300/50 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
          {currentSong ? (
            <div className="text-6xl">🎵</div>
          ) : (
            <div className="text-gray-400 text-lg">No song selected</div>
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {currentSong?.title || 'Select a song'}
        </h2>
        <p className="text-gray-600">
          {currentSong?.artist || 'Unknown artist'}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div 
          className="w-full h-2 bg-white/30 rounded-full cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percentage = (e.clientX - rect.left) / rect.width;
            onSeek(percentage * duration);
          }}
        >
          <div 
            className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full transition-all duration-150"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Main Controls */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <button
          onClick={onPrevious}
          className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm border border-white/30"
          disabled={!currentSong}
        >
          <SkipBack className="w-6 h-6 text-gray-700" />
        </button>
        <button
          onClick={onPlayPause}
          className="p-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 transition-all duration-200 shadow-lg"
          disabled={!currentSong}
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-white" />
          ) : (
            <Play className="w-8 h-8 text-white ml-1" />
          )}
        </button>
        <button
          onClick={onNext}
          className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm border border-white/30"
          disabled={!currentSong}
        >
          <SkipForward className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Secondary Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onShuffle}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isShuffled 
                ? 'bg-purple-400 text-white' 
                : 'bg-white/20 text-gray-600 hover:bg-white/30'
            }`}
          >
            <Shuffle className="w-4 h-4" />
          </button>
          <button
            onClick={onRepeat}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isRepeated 
                ? 'bg-purple-400 text-white' 
                : 'bg-white/20 text-gray-600 hover:bg-white/30'
            }`}
          >
            <Repeat className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <Volume2 className="w-4 h-4 text-gray-600" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-20 h-2 bg-white/30 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #f472b6 0%, #f472b6 ${volume * 100}%, rgba(255,255,255,0.3) ${volume * 100}%, rgba(255,255,255,0.3) 100%)`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;