import React, { useState } from "react";
import "./MusicList.css";

const songsData = [
  {
    title: "Starboy",
    artist: "The Weeknd",
    time: "4:16",
    image:
      "https://akm-img-a-in.tosshub.com/indiatoday/images/media_bank/202309/chaleya-song-141618190-16x9.jpg?VersionId=7WQ6L3T.EHeLJ9xS4Vh53vAmNtxZ3fUf&size=690:388",
  },
  {
    title: "Demons",
    artist: "Imagine Dragons",
    time: "5:24",
    image: "https://via.placeholder.com/50",
  },
  {
    title: "Mouth of the River",
    artist: "Imagine Dragons",
    time: "6:23",
    image: "https://via.placeholder.com/50",
  },
  {
    title: "Ghost Stories",
    artist: "Coldplay",
    time: "3:10",
    image: "https://via.placeholder.com/50",
  },
  {
    title: "Sparks",
    artist: "Coldplay",
    time: "4:23",
    image: "https://via.placeholder.com/50",
  },
  {
    title: "Viva La Vida",
    artist: "Coldplay",
    time: "5:32",
    image: "https://via.placeholder.com/50",
  },
  {
    title: "Hymn for the Weekend",
    artist: "Coldplay",
    time: "2:23",
    image: "https://via.placeholder.com/50",
  },
  {
    title: "Pain",
    artist: "Ryan Jones",
    time: "3:12",
    image: "https://via.placeholder.com/50",
  },
];

function MusicList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("for-you");

  const filteredSongs = songsData.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="music-list">
      <div className="tabs">
        <button
          className={currentTab === "for-you" ? "active" : ""}
          onClick={() => setCurrentTab("for-you")}
        >
          For You
        </button>
        <button
          className={currentTab === "top-tracks" ? "active" : ""}
          onClick={() => setCurrentTab("top-tracks")}
        >
          Top Tracks
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Song, Artist"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <img src="/assets/search.svg" alt="search" className="search-icon" />
      </div>

      <ul className="song-list">
        {filteredSongs.map((song, index) => (
          <li key={index} className="song-item">
            <img src={song.image} alt={song.title} className="song-image" />
            <div className="song-info">
              <h4>{song.title}</h4>
              <p>{song.artist}</p>
            </div>
            <span className="song-time">{song.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MusicList;
