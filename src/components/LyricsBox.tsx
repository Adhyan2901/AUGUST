import React, { useState } from 'react';
import { Maximize2, Minimize2, X, Type } from 'lucide-react';

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

interface LyricsBoxProps {
  currentSong: Song | null;
  isVisible: boolean;
  onClose: () => void;
}

const LyricsBox: React.FC<LyricsBoxProps> = ({ currentSong, isVisible, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sample lyrics - in a real app, you'd fetch these from your backend
  const sampleLyrics = `[Verse 1]
In the quiet of the morning light
Your voice echoes through my mind
Every melody we used to share
Still lingers in the air

[Chorus]
This song is for you, my dearest friend
Through every note, our hearts transcend
In harmony we'll always be
You mean the world to me

[Verse 2]
When the world gets overwhelming
And the days feel far too long
I remember all our laughter
And it helps me carry on

[Chorus]
This song is for you, my dearest friend
Through every note, our hearts transcend
In harmony we'll always be
You mean the world to me

[Bridge]
Distance cannot break the bond we share
Music brings us closer, everywhere
In every song, in every beat
Our friendship is complete

[Outro]
So here's to you, my best friend true
This melody I sing for you ♡`;

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop for fullscreen */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40" />
      )}
      
      {/* Lyrics Container */}
      <div className={`
        ${isFullscreen 
          ? 'fixed inset-4 z-50' 
          : 'fixed bottom-28 right-6 w-80 h-96'
        }
        bg-pink-900/20 backdrop-blur-md border border-pink-600/30 rounded-2xl
        transition-all duration-300 ease-in-out
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-pink-600/30">
          <div className="flex items-center gap-3">
            <Type className="w-5 h-5 text-pink-300" />
            <div>
              <h3 className="text-white font-semibold">
                {currentSong ? 'Lyrics' : 'No Song Playing'}
              </h3>
              {currentSong && (
                <p className="text-pink-300 text-sm">
                  {currentSong.title} - {currentSong.artist}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-lg bg-pink-700/30 hover:bg-pink-600/40 text-pink-300 hover:text-white transition-colors"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-pink-700/30 hover:bg-pink-600/40 text-pink-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 h-full overflow-hidden">
          {currentSong ? (
            <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-pink-600 scrollbar-track-transparent">
              <div className={`text-pink-100 leading-relaxed ${isFullscreen ? 'text-lg' : 'text-sm'}`}>
                {sampleLyrics.split('\n').map((line, index) => (
                  <div key={index} className={`
                    ${line.startsWith('[') && line.endsWith(']') 
                      ? 'text-pink-400 font-semibold mt-4 mb-2' 
                      : 'mb-1'
                    }
                    ${line.trim() === '' ? 'mb-3' : ''}
                  `}>
                    {line || '\u00A0'}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Type className="w-12 h-12 text-pink-300 mx-auto mb-4" />
                <p className="text-pink-300">Select a song to view lyrics</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LyricsBox;