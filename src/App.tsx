import React from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import FeedItemsList from './components/FeedItemsList/FeedItemsList';
import "@fontsource/dm-sans";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <FeedItemsList/>
    </div>
  );
}

export default App;
