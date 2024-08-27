import "./App.css";

import MusicList from "./components/MusicList";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  return (
    <div className="app">
      <div className="left-nav">
        <img src="/assets/logo.svg" alt="logo" />
      </div>

      <MusicList />
      <MusicPlayer />
    </div>
  );
}

export default App;
