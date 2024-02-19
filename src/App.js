// App.js
import React, { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import Playlist from './Playlist';

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    // Load playlist and last played audio from local storage on component mount
    const storedPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
    const lastPlayedIndex = JSON.parse(localStorage.getItem('lastPlayedIndex')) || 0;
    setPlaylist(storedPlaylist);
    setCurrentTrackIndex(lastPlayedIndex);
  }, []);

  useEffect(() => {
    // Save playlist and last played audio to local storage
    localStorage.setItem('playlist', JSON.stringify(playlist));
    localStorage.setItem('lastPlayedIndex', JSON.stringify(currentTrackIndex));
  }, [playlist, currentTrackIndex]);

  const handleFileUpload = (files) => {
    // Handle file upload and add to playlist
    const updatedPlaylist = [...playlist, ...files];
    setPlaylist(updatedPlaylist);
  };

  const handleTrackChange = (index) => {
    // Change current track index
    setCurrentTrackIndex(index);
  };

  const handleTrackEnd = () => {
    // Play next track when current track ends
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={(e) => handleFileUpload(e.target.files)} multiple />
      <Playlist playlist={playlist} currentTrackIndex={currentTrackIndex} onTrackChange={handleTrackChange} />
      <AudioPlayer
        src={playlist[currentTrackIndex]}
        onEnded={handleTrackEnd}
      />
    </div>
  );
}

export default App;
