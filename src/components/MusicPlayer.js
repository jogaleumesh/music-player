import { useState, useEffect, useRef } from "react";

import "./MusicPlayer.css";
function MusicPlayer({ song, onNext, onPrevious }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (song) {
      setCurrentTime(0);
      setDuration(0);
      audioRef.current.src = song.url;

      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [song]);

  // Play or Pause music
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle Volume Change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  // Handle Seek (slider control)
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Update seeker as song plays
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Update duration when song metadata is loaded
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  return (
    <div className="music-player">
      <div className="song-info">
        <h2>{song.name}</h2>
        <p>{song.artist}</p>
      </div>

      <img
        src={`https://cms.samespace.com/assets/${song.cover}`}
        alt={song.name}
        className="album-art"
      />

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      <div className="player-controls">
        <input
          id="range-slider"
          type="range"
          value={currentTime}
          max={duration}
          onChange={handleSeek}
        />

        <div className="controls">
          <button className="control-button">
            <img src="/assets/more.svg" alt="more" />
          </button>

          <button className="control-button" onClick={onPrevious}>
            <img src="/assets/previous.svg" alt="previous" />
          </button>
          <button className="control-button" onClick={handlePlayPause}>
            <img
              src={`/assets/${isPlaying ? "play.svg" : "pause.svg"}`}
              alt="more"
            />
          </button>
          <button className="control-button" onClick={onNext}>
            <img src="/assets/next.svg" alt="next" />
          </button>

          <button className="control-button">
            <img src="/assets/volume.svg" alt="volume" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
