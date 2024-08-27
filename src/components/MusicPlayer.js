import "./MusicPlayer.css";
function MusicPlayer({ song }) {
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

      <div className="player-controls">
        <div className="progress-bar">
          <div className="progress" style={{ width: "40%" }}></div>
        </div>

        <div className="controls">
          <button className="control-button">
            <img src="/assets/more.svg" alt="more" />
          </button>
          <button className="control-button">
            <img src="/assets/backward.svg" alt="more" />
          </button>
          <button className="control-button">
            <img src="/assets/play.svg" alt="more" />
          </button>
          <button className="control-button">
            <img src="/assets/forward.svg" alt="more" />
          </button>
          <button className="control-button">
            <img src="/assets/volume.svg" alt="more" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
