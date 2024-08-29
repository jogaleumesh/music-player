import { useState, useEffect } from "react";

import MusicList from "./components/MusicList";
import MusicPlayer from "./components/MusicPlayer";

import "./App.css";
function App() {
  const [songsData, setSongsData] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);

  const [currentSong, setCurrentSong] = useState(null); // Current song
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const [activeTab, setActiveTab] = useState("forYou"); // Tab state
  const [searchQuery, setSearchQuery] = useState(""); // Search input state

  const [showMenu, setShowMenu] = useState(true);
  const [showPlayer, setShowPlayer] = useState(true);

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
          setCurrentSongIndex(0);
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    // Function to check the device width and update showMenu state
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Assuming 768px is the tablet breakpoint
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };

    // Initial check when the component mounts
    handleResize();

    // Add event listener to check the width on window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
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
      style={{ backgroundColor: currentSong ? currentSong.accent : "#121212" }}
    >
      <div className="side-menu">
        <button className="menu-btn" onClick={handleMenu}>
          <img src="/assets/menu.svg" alt="menu" />
        </button>

        <img src="/assets/logo.svg" alt="logo" />

        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          className="user-pic"
        />
      </div>

      <div style={{ display: showMenu ? "block" : "none" }}>
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

      <div style={{ display: showPlayer ? "block" : "none" }}>
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
