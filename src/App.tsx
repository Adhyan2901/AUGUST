import { useState, useRef, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import HomeView from './components/HomeView';
import SearchView from './components/SearchView';
import MainContent from './components/MainContent';
import BottomPlayer from './components/BottomPlayer';
import LyricsBox from './components/LyricsBox';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  file: File;
  url: string;
  duration: number;
  dateAdded: string;
  coverUrl?: string; // ✅ Thumbnail field
}

function App() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeated, setIsRepeated] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [isLyricsVisible, setIsLyricsVisible] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // ✅ Load default songs from /public/songs
  useEffect(() => {
    const preloadSongs: Song[] = [
      {
        id: '1',
        title: 'You',
        artist: 'Armaan Malik',
        album: '___',
        url: '/songs/You.mp3',
        coverUrl: '/covers/You.jpg',
        file: new File([], 'You.mp3'),
        duration: 0,
        dateAdded: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Feelings',
        artist: 'LAUV',
        album: '___',
        url: '/songs/Feelings.mp3',
        coverUrl: '/covers/Feelings.jpg',
        file: new File([], 'Feelings.mp3'),
        duration: 0,
        dateAdded: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Photograph',
        artist: 'ED Sheeran',
        album: '___',
        url: '/songs/Photograph.mp3',
        coverUrl: '/covers/Photograph.jpg',
        file: new File([], 'Photograph.mp3'),
        duration: 0,
        dateAdded: new Date().toISOString(),
      },
      {
        id: '4',
        title: 'Theres Nothing Holdin Me Back',
        artist: 'Shawn Mendes',
        album: '___',
        url: '/songs/Shawn.mp3',
        coverUrl: '/covers/Theres Nothing Holdin Me Back.jpg',
        file: new File([], 'Shawn.mp3'),
        duration: 0,
        dateAdded: new Date().toISOString(),
      },
      {
        id: '5',
        title: 'Aankhon Se Batana',
        artist: 'Dikshant',
        album: '___',
        url: '/songs/Aankhon Se Batana.mp3',
        coverUrl: '/covers/Aankhon Se Batana.jpg',
        file: new File([], 'Aankhon Se Batana.mp3'),
        duration: 0,
        dateAdded: new Date().toISOString(),
      },
      {
        id: '6',
        title: 'Ve Maahi',
        artist: 'Arijit Singh',
        album: '___',
        url: '/songs/Ve Maahi.mp3',
        coverUrl: '/covers/Ve Maahi.jpg',
        file: new File([], 'Ve Maahi.mp3'),
        duration: 0,
        dateAdded: new Date().toISOString(),
      },
      {
        id: '7',
        title: 'Into You',
        artist: 'Hiten',
        album: '___',
        url: '/songs/Into You.mp3',
        coverUrl: '/covers/Into You.jpg',
        file: new File([], 'Into You.mp3'),
        duration: 0,
        dateAdded: new Date().toISOString(),
      },
      {
        id: '8',
        title: 'O Re Piya',
        artist: 'Atif Aslam',
        album: '___',
        url: '/songs/O re Piya.mp3',
        coverUrl: '/covers/O Re Piya.jpg',
        file: new File([], 'O re Piya.mp3'),
        duration: 0,
        dateAdded: new Date().toISOString(),
      },
      {
        id: '9',
        title: 'Tera Rastaa Chodoon Na',
        artist: 'Vishal-Shekhar',
        album: '___',
        url: '/songs/Cover of Tera Rastaa Chhodoon Na.jpg',
        coverUrl: '/covers/Cover of Tera Rastaa Chhodoon Na.jpg',
        file: new File([], 'Tera Rastaa Chhodoon Na.mp3'),
        duration: 0,
        dateAdded: new Date().toISOString(),
      },
      {
        id: '10',
        title: 'Stay',
        artist: 'KING',
        album: '___',
        url: '/songs/Stay.mp3',
        coverUrl: '/covers/Stay.jpg',
        file: new File([], 'Stay.mp3'),
        duration: 0,
        dateAdded: new Date().toISOString(),
      },
      {
        id: '11',
        title: 'Laapata',
        artist: 'KK',
        album: '___',
        url: '/songs/Laapata.mp3',
        coverUrl: '/covers/Laapata.jpg',
        file: new File([], 'Laapata.mp3'),
        duration: 0,
        dateAdded: new Date().toISOString(),
      },
      {
        id: '12',
        title: 'Mai Rang Sharbaton Ka',
        artist: 'Atif Aslam',
        album: '___',
        url: '/songs/Mai Rang Sharbaton Ka.mp3',
        coverUrl: '/covers/Main Rang Sharbaton Ka.jpg',
        file: new File([], 'Mai Rang Shabrbaton Ka.mp3'),
        duration: 0,
        dateAdded: new Date().toISOString(),
      },
      {
        id: '13',
        title: 'Samjho Na',
        artist: 'Aditya Rikhari',
        album: '___',
        url: '/songs/Samjho Na.mp3',
        coverUrl: '/covers/Samjho Na.jpg',
        file: new File([], 'Samjho Na.mp3'),
        duration: 0,
        dateAdded: new Date().toISOString(),
      },
      {
        id: '14',
        title: 'Tu Jaana Na Piya',
        artist: 'KING',
        album: '___',
        url: '/songs/Tu Jaana Na Piya.mp3',
        coverUrl: '/covers/Tu Jaana Na Piya.jpg',
        file: new File([], 'Tu Jaana Na Piya.mp3'),
        duration: 0,
        dateAdded: new Date().toISOString(),
      },
      {
        id: '15',
        title: 'Ikk Vaari Aa',
        artist: 'Arijit Singh',
        album: '___',
        url: '/songs/Ik Vaari Aa.mp3',
        coverUrl: '/covers/Ik Vaari Aa.jpg',
        file: new File([], 'Ik Vaari Aa.mp3'),
        duration: 0,
        dateAdded: new Date().toISOString(),
      },
      {
        id: '16',
        title: 'Tere Bina',
        artist: 'Zaeden',
        album: '___',
        url: '/songs/tere bina.mp3',
        coverUrl: '/covers/tere bina.jpg',
        file: new File([], 'tere bina.mp3'),
        duration: 0,
        dateAdded: new Date().toISOString(),
      },
      {
        id: '17',
        title: 'Subhanallah',
        artist: 'Pritam',
        album: '___',
        url: '/songs/Subhanallah.mp3',
        coverUrl: '/covers/Subhanallah.jpg',
        file: new File([], 'Subhanallah.mp3'),
        duration: 0,
        dateAdded: new Date().toISOString(),
      },
      {
        id: '18',
        title: 'Waalian',
        artist: 'Harnoor',
        album: '___',
        url: '/songs/Waalian.mp3',
        coverUrl: '/covers/Waalian.jpg',
        file: new File([], 'Waalian.mp3'),
        duration: 0,
        dateAdded: new Date().toISOString(),
      },
      {
        id: '19',
        title: 'What Makes You Beautiful',
        artist: 'One Direction',
        album: '___',
        url: '/songs/What Makes You Beautiful.mp3',
        coverUrl: '/covers/What Makes You Beautiful.jpg',
        file: new File([], 'What Makes You Beautiful.mp3'),
        duration: 0,
        dateAdded: new Date().toISOString(),
      },
      {
        id: '20',
        title: 'Mere Liye Tum Kaafi Ho',
        artist: 'Ayushmaan Khurana',
        album: '___',
        url: '/songs/Mere Liye Tum Kaafi Ho.mp3',
        coverUrl: '/covers/Mere Liye Tum Kaafi Ho.jpg',
        file: new File([], 'Mere Liye Tum Kaafi Ho.mp3'),
        duration: 0,
        dateAdded: new Date().toISOString(),
      },
      {
        id: '21',
        title: 'Manjha',
        artist: 'Vishal Mishra',
        album: '___',
        url: '/songs/Manjha.mp3',
        coverUrl: '/covers/Manjha.jpg',
        file: new File([], 'Manjha.mp3'),
        duration: 0,
        dateAdded: new Date().toISOString(),
      },
    ];

    setSongs(preloadSongs);

    preloadSongs.forEach((song, i) => {
      const audio = new Audio(song.url);
      audio.addEventListener('loadedmetadata', () => {
        setSongs(prev => {
          const updated = [...prev];
          updated[i] = { ...updated[i], duration: audio.duration };
          return updated;
        });
      });
    });
  }, []);

  const handleNext = useCallback(() => {
    if (songs.length === 0) return;

    let nextIndex;
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * songs.length);
    } else {
      const currentIndex = songs.findIndex(song => song.id === currentSong?.id);
      nextIndex = currentIndex < songs.length - 1 ? currentIndex + 1 : 0;
    }

    const nextSong = songs[nextIndex];
    setCurrentSong(nextSong);
    if (audioRef.current) {
      audioRef.current.src = nextSong.url;
      if (isPlaying) audioRef.current.play();
    }
  }, [songs, currentSong, isShuffled, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (isRepeated) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isRepeated, handleNext]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const handleFileUpload = async (files: FileList) => {
    const newSongs: Song[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('audio/')) {
        const url = URL.createObjectURL(file);
        const audio = new Audio(url);

        await new Promise(resolve => {
          audio.addEventListener('loadedmetadata', () => {
            const song: Song = {
              id: Date.now().toString() + i,
              title: file.name.replace(/\.[^/.]+$/, ''),
              artist: 'Unknown Artist',
              album: 'Unknown Album',
              file,
              url,
              duration: audio.duration,
              dateAdded: new Date().toISOString(),
              coverUrl: '', // For uploaded files, you can later let users upload an image too
            };
            newSongs.push(song);
            resolve(null);
          });
        });
      }
    }

    setSongs(prev => [...prev, ...newSongs]);
  };

  const handleSongSelect = (song: Song) => {
    if (currentSong?.id === song.id) {
      handlePlayPause();
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = song.url;
        audioRef.current.play();
      }
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current || !currentSong) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (songs.length === 0) return;
    const currentIndex = songs.findIndex(song => song.id === currentSong?.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : songs.length - 1;
    const prevSong = songs[prevIndex];
    setCurrentSong(prevSong);
    if (audioRef.current) {
      audioRef.current.src = prevSong.url;
      if (isPlaying) audioRef.current.play();
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleSongRemove = (songId: string) => {
    setSongs(prev => prev.filter(song => song.id !== songId));
    if (currentSong?.id === songId) {
      setCurrentSong(null);
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    }
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView
            songs={songs}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onSongSelect={handleSongSelect}
          />
        );
      case 'search':
        return (
          <SearchView
            songs={songs}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onSongSelect={handleSongSelect}
          />
        );
      case 'library':
        return (
          <MainContent
            songs={songs}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onSongSelect={handleSongSelect}
            onSongRemove={handleSongRemove}
          />
        );
      default:
        return (
          <HomeView
            songs={songs}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onSongSelect={handleSongSelect}
          />
        );
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-pink-950 via-purple-950 to-rose-950 text-white flex flex-col">
      {/* Upload Songs */}
      <div className="p-4">
        <label className="cursor-pointer bg-pink-700 px-4 py-2 rounded text-white hover:bg-pink-600 inline-block">
          Upload Songs
          <input
            type="file"
            accept="audio/*"
            multiple
            onChange={(e) => {
              if (e.target.files) handleFileUpload(e.target.files);
            }}
            className="hidden"
          />
        </label>
      </div>

      {/* Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          onLyricsClick={() => setIsLyricsVisible(!isLyricsVisible)}
        />
        <div className="flex-1 overflow-hidden">
          {renderMainContent()}
        </div>
      </div>

      {/* Bottom Player */}
      <BottomPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isShuffled={isShuffled}
        isRepeated={isRepeated}
        onPlayPause={handlePlayPause}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSeek={handleSeek}
        onVolumeChange={setVolume}
        onShuffle={() => setIsShuffled(!isShuffled)}
        onRepeat={() => setIsRepeated(!isRepeated)}
      />

      {/* Lyrics */}
      <LyricsBox
        currentSong={currentSong}
        isVisible={isLyricsVisible}
        onClose={() => setIsLyricsVisible(false)}
      />

      {/* Audio */}
      <audio ref={audioRef} />
    </div>
  );
}

export default App;
