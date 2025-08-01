import React from 'react';
import { Home, Search, Library, Music, Type } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onLyricsClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  onViewChange, 
  onLyricsClick 
}) => {
  return (
    <div className="w-64 bg-gradient-to-b from-pink-900 to-purple-900 text-white p-6 flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <Music className="w-8 h-8 text-pink-300" />
        <span className="text-2xl font-bold">AUGUST PARADISE</span>
      </div>

      {/* Main Navigation */}
      <nav className="space-y-4 mb-8">
        <button 
          onClick={() => onViewChange('home')}
          className={`flex items-center gap-4 transition-colors w-full text-left ${
            currentView === 'home' ? 'text-white' : 'text-pink-200 hover:text-white'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="font-medium">Home</span>
        </button>
        <button 
          onClick={() => onViewChange('search')}
          className={`flex items-center gap-4 transition-colors w-full text-left ${
            currentView === 'search' ? 'text-white' : 'text-pink-200 hover:text-white'
          }`}
        >
          <Search className="w-6 h-6" />
          <span className="font-medium">Search</span>
        </button>
        <button 
          onClick={() => onViewChange('library')}
          className={`flex items-center gap-4 transition-colors w-full text-left ${
            currentView === 'library' ? 'text-white' : 'text-pink-200 hover:text-white'
          }`}
        >
          <Library className="w-6 h-6" />
          <span className="font-medium">Your's Only 💜✨</span>
        </button>
      </nav>

      {/* Library Actions */}
      <div className="space-y-4 mb-8">
        <button 
          onClick={onLyricsClick}
          className="flex items-center gap-4 text-pink-200 hover:text-white transition-colors w-full text-left"
        >
          <Type className="w-6 h-6" />
          <span className="font-medium">Lyrics & Captions</span>
        </button>
      </div>

      {/* Playlists */}
      <div className="flex-1">
        <div className="border-t border-pink-700 pt-4">
          <div className="space-y-3">
            <div className="text-pink-300 text-sm font-medium">Recently Added</div>
            <div className="text-pink-200 hover:text-white cursor-pointer text-sm">My Playlist #1</div>
            <div className="text-pink-200 hover:text-white cursor-pointer text-sm">Favorites</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;