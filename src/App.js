import React, { useState } from "react";
import Feed from "./Feed";

function App() {
  const [feedUrl, setFeedUrl] = useState("https://feeds.bbci.co.uk/news/rss.xml");

  return (
    <div className="App">
      <h1>React RSS News Reader</h1>
      <input
        type="text"
        placeholder="Enter RSS feed URL..."
        value={feedUrl}
        onChange={(e) => setFeedUrl(e.target.value)}
      />
      <Feed feedUrl={feedUrl} />
    </div>
  );
}

export default App;
