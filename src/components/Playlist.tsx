import React from 'react';
import { Play, Pause, Music2, X, UploadCloud } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  file: File;
  url: string;
  duration: number;
  coverUrl?: string;
}

interface PlaylistProps {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  onSongSelect: (song: Song) => void;
  onSongRemove: (songId: string) => void;
  onUpload: (files: FileList) => void;
}

const Playlist: React.FC<PlaylistProps> = ({
  songs,
  currentSong,
  isPlaying,
  onSongSelect,
  onSongRemove,
  onUpload,
}) => {
  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/30">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Music2 className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-bold text-gray-800">Playlist</h2>
          <span className="bg-purple-400 text-white text-sm px-3 py-1 rounded-full">
            {songs.length}
          </span>
        </div>

        {/* Upload button */}
        <label className="flex items-center gap-2 cursor-pointer bg-pink-700 hover:bg-pink-600 text-white text-sm px-4 py-1.5 rounded-full transition">
          <UploadCloud className="w-4 h-4" />
          Upload
          <input
            type="file"
            accept="audio/*"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                onUpload(e.target.files);
              }
            }}
          />
        </label>
      </div>

      {songs.length === 0 ? (
        <div className="text-center py-12">
          <Music2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No songs uploaded yet</p>
          <p className="text-gray-400 text-sm">Upload some music to get started!</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {songs.map((song, index) => (
            <div
              key={song.id}
              className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200 group ${
                currentSong?.id === song.id
                  ? 'bg-gradient-to-r from-pink-400/20 to-purple-400/20 border border-purple-300'
                  : 'bg-white/10 hover:bg-white/20 border border-transparent'
              }`}
              onClick={() => onSongSelect(song)}
            >
              {/* Thumbnail with Play Button Overlay */}
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0 shadow">
                {song.coverUrl ? (
                  <img
                    src={song.coverUrl}
                    alt={song.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Music2 className="text-gray-400 w-6 h-6" />
                  </div>
                )}
                <button className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition">
                  {currentSong?.id === song.id && isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  )}
                </button>
              </div>

              {/* Song Info */}
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-gray-500 font-medium w-6">
                    {index + 1}
                  </span>
                  <h3
                    className={`font-semibold truncate ${
                      currentSong?.id === song.id ? 'text-purple-600' : 'text-gray-800'
                    }`}
                  >
                    {song.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 truncate">{song.artist}</p>
              </div>

              {/* Duration + Remove */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  {formatDuration(song.duration)}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSongRemove(song.id);
                  }}
                  className="w-8 h-8 rounded-full bg-red-400/20 hover:bg-red-400/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Playlist;
