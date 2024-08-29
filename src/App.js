import { useState, useEffect } from "react";

import { fetchSongs } from "./services/apiService";

import MusicList from "./components/MusicList";
import MusicPlayer from "./components/MusicPlayer";

import "./App.css";
function App() {
  const [songsData, setSongsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filteredSongs, setFilteredSongs] = useState([]);

  const [currentSong, setCurrentSong] = useState(null); // Current song
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const [activeTab, setActiveTab] = useState("forYou"); // Tab state
  const [searchQuery, setSearchQuery] = useState(""); // Search input state

  const [showMenu, setShowMenu] = useState(true);
  const [showPlayer, setShowPlayer] = useState(true);

  // Fetch songs data from API
  useEffect(() => {
    const getSongs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSongs();
        setSongsData(data);
        setFilteredSongs(data);

        if (data.length > 0) {
          setCurrentSong(data[0]);
        }
      } catch (error) {
        setError("Error fetching songs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getSongs();
  }, []);

  useEffect(() => {
    // function to check the width of the window
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    handleResize();

    // Add the event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to change tab and filter songs
  const handleTabClick = (tab) => {
    setSearchQuery("");
    setCurrentSongIndex(0);
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
    setCurrentSongIndex(0);

    const filtered = songsData.filter(
      (song) =>
        song.name.toLowerCase().includes(query) &&
        (activeTab === "topTracks" ? song.top_track : true)
    );

    setFilteredSongs(filtered);
  };

  const handleSongChange = (index) => {
    setCurrentSongIndex(index);
    setCurrentSong(filteredSongs[index]);
    handleMenu();
  };

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === filteredSongs.length - 1 ? 0 : prevIndex + 1
    );
    setCurrentSong(filteredSongs[currentSongIndex]);
  };

  const handlePreviousSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? filteredSongs.length - 1 : prevIndex - 1
    );
    setCurrentSong(filteredSongs[currentSongIndex]);
  };

  const handleMenu = () => {
    if (window.innerWidth < 768) {
      setShowMenu(!showMenu);
      setShowPlayer(!showPlayer);
    }
  };

  return (
    <div
      className="app"
      style={{
        background: `linear-gradient(108deg, ${currentSong?.accent}, rgba(0, 0, 0, 0.60) 99.84%), #000`,
      }}
    >
      <div className="side-menu">
        <button className="menu-btn" onClick={handleMenu}>
          <img src="/assets/menu.svg" alt="menu" />
        </button>

        <img className="logo" src="/assets/logo.svg" alt="logo" />

        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          className="user-pic"
        />
      </div>

      <div
        className="music-list"
        style={{ display: showMenu ? "block" : "none" }}
      >
        <MusicList
          songs={filteredSongs}
          selectedSongId={currentSong?.id}
          searchQuery={searchQuery}
          activeTab={activeTab}
          onTabClick={handleTabClick}
          onSearchChange={handleSearchChange}
          onSongChange={handleSongChange}
        />
      </div>

      <div
        className="music-player"
        style={{ display: showPlayer ? "block" : "none" }}
      >
        {currentSong && (
          <MusicPlayer
            song={currentSong}
            onNext={handleNextSong}
            onPrevious={handlePreviousSong}
          />
        )}
      </div>
    </div>
  );
}

export default App;
