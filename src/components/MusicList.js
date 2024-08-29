import "./MusicList.css";

function MusicList({ songs, selectedSongId, onSongClick }) {
  return (
    <ul className="songs">
      {songs.map((song, index) => (
        <li
          key={song.id}
          className={`song-item ${selectedSongId == song.id ? "selected" : ""}`}
          onClick={() => onSongClick(index)}
        >
          <img
            src={`https://cms.samespace.com/assets/${song.cover}`}
            alt={song.name}
            className="song-image"
          />
          <div className="song-info">
            <h4>{song.name}</h4>
            <p>{song.artist}</p>
          </div>
          <span className="song-time">4:50</span>
        </li>
      ))}
    </ul>
  );
}

export default MusicList;
