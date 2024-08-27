import "./MusicPlayer.css";

function MusicPlayer() {
  return (
    <div className="music-player">
      <div className="song-info">
        <h2>Ghost Stories</h2>
        <p>Coldplay</p>
      </div>

      <div className="album-art"></div>

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
