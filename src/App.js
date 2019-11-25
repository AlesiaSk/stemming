import React from 'react';
import './App.css';
import FileDialog from "./components/FileDialog";
import Help from "./components/Help.js";

const App = () => {
  return (
    <div className="App">
      <FileDialog/>
      <Help/>
    </div>
  );
};

export default App;
