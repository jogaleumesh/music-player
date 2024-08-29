import "./MusicList.css";

function MusicList({
  songs,
  selectedSongId,
  onSongChange,
  activeTab,
  onTabClick,
  searchQuery,
  onSearchChange,
}) {
  return (
    <>
      <div className="tabs">
        <button
          className={activeTab === "forYou" ? "active" : ""}
          onClick={() => onTabClick("forYou")}
        >
          For You
        </button>
        <button
          className={activeTab === "topTracks" ? "active" : ""}
          onClick={() => onTabClick("topTracks")}
        >
          Top Tracks
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Song, Artist"
          value={searchQuery}
          onChange={onSearchChange}
        />

        <img src="/assets/search.svg" alt="search" className="search-icon" />
      </div>

      <ul className="songs">
        {songs.map((song, index) => (
          <li
            key={song.id}
            className={`song-item ${
              selectedSongId == song.id ? "selected" : ""
            }`}
            onClick={() => onSongChange(index)}
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
    </>
  );
}

export default MusicList;
