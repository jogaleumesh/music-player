import { useState, useEffect } from "react";

import MusicList from "./components/MusicList";
import MusicPlayer from "./components/MusicPlayer";

import "./App.css";
function App() {
  const [songsData, setSongsData] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null); // Current song

  const [activeTab, setActiveTab] = useState("forYou"); // Tab state
  const [searchQuery, setSearchQuery] = useState(""); // Search input state

  // Fetch songs data from API
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("https://cms.samespace.com/items/songs");
        const res = await response.json();
        const data = res.data;
        setSongsData(data);
        setFilteredSongs(data);

        // select the first song by default
        if (data.length > 0) {
          setCurrentSong(data[0]);
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  // Function to change tab and filter songs
  const handleTabChange = (tab) => {
    setSearchQuery("");
    setActiveTab(tab);

    // Filter songs based on the tab
    if (tab === "topTracks") {
      setFilteredSongs(songsData.filter((song) => song.top_track));
    } else {
      setFilteredSongs(songsData);
    }
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = songsData.filter(
      (song) =>
        song.name.toLowerCase().includes(query) &&
        (activeTab === "topTracks" ? song.top_track : true)
    );

    setFilteredSongs(filtered);
  };

  // Function to handle song selection from the list
  const handleSongClick = (song) => {
    setCurrentSong(song);
  };

  return (
    <div
      className="app"
      style={{ backgroundColor: currentSong ? currentSong.accent : "#121212" }}
    >
      <div className="left-nav">
        <img src="/assets/logo.svg" alt="logo" />
      </div>

      <div className="music-list">
        <div className="tabs">
          <button
            className={activeTab === "forYou" ? "active" : ""}
            onClick={() => handleTabChange("forYou")}
          >
            For You
          </button>
          <button
            className={activeTab === "topTracks" ? "active" : ""}
            onClick={() => handleTabChange("topTracks")}
          >
            Top Tracks
          </button>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Song, Artist"
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <img src="/assets/search.svg" alt="search" className="search-icon" />
        </div>

        <MusicList
          songs={filteredSongs}
          selectedSongId={currentSong?.id}
          onSongClick={handleSongClick}
        />
      </div>

      {currentSong && <MusicPlayer song={currentSong} />}
    </div>
  );
}

export default App;
