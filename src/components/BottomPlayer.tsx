import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  Heart,
  Maximize2,
} from 'lucide-react';

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

interface BottomPlayerProps {
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

const BottomPlayer: React.FC<BottomPlayerProps> = ({
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
    <div className="h-24 bg-gradient-to-r from-pink-900 to-purple-900 border-t border-pink-700 px-4 flex items-center justify-between">
      {/* Left - Song Info */}
      <div className="flex items-center gap-4 w-80">
        {currentSong ? (
          <>
            <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-400 rounded flex items-center justify-center">
              <div className="text-xl">🎵</div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-medium truncate">{currentSong.title}</div>
              <div className="text-pink-300 text-sm truncate">{currentSong.artist}</div>
            </div>
            <button className="text-pink-300 hover:text-pink-200">
              <Heart className="w-5 h-5" />
            </button>
          </>
        ) : (
          <div className="text-pink-300">No song selected</div>
        )}
      </div>

      {/* Center - Controls */}
      <div className="flex flex-col items-center gap-2 flex-1 max-w-2xl">
        <div className="flex items-center gap-4">
          <button
            onClick={onShuffle}
            className={`p-2 rounded-full transition-colors ${
              isShuffled ? 'text-pink-400' : 'text-pink-300 hover:text-white'
            }`}
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <button
            onClick={onPrevious}
            className="text-pink-300 hover:text-white transition-colors"
            disabled={!currentSong}
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={onPlayPause}
            className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
            disabled={!currentSong}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white ml-0.5" />
            )}
          </button>

          <button
            onClick={onNext}
            className="text-pink-300 hover:text-white transition-colors"
            disabled={!currentSong}
          >
            <SkipForward className="w-5 h-5" />
          </button>

          <button
            onClick={onRepeat}
            className={`p-2 rounded-full transition-colors ${
              isRepeated ? 'text-pink-400' : 'text-pink-300 hover:text-white'
            }`}
          >
            <Repeat className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-pink-300 w-10 text-right">{formatTime(currentTime)}</span>
          <div
            className="flex-1 h-1 bg-pink-800 rounded-full cursor-pointer group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const percentage = (e.clientX - rect.left) / rect.width;
              onSeek(percentage * duration);
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-pink-400 to-rose-400 rounded-full relative group-hover:from-pink-300 group-hover:to-rose-300 transition-colors"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-pink-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <span className="text-xs text-pink-300 w-10">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right - Volume & Fullscreen */}
      <div className="flex items-center gap-4 w-80 justify-end">
        <button className="text-pink-300 hover:text-white">
          <Maximize2 className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-pink-300" />
          <div
            className="w-24 h-1 bg-pink-800 rounded-full cursor-pointer group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const percentage = (e.clientX - rect.left) / rect.width;
              onVolumeChange(percentage);
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-pink-400 to-rose-400 rounded-full relative group-hover:from-pink-300 group-hover:to-rose-300 transition-colors"
              style={{ width: `${volume * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-pink-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomPlayer;
