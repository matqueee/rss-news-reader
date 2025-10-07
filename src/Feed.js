import React, { useEffect, useState } from "react";

function Feed({ feedUrl }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!feedUrl) return;

    setLoading(true);
    setError("");

    const fetchFeed = async () => {
      try {
        const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`);
        const data = await res.json();
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, "text/xml");
        const itemsArray = Array.from(xml.querySelectorAll("item")).map(item => ({
          title: item.querySelector("title")?.textContent,
          link: item.querySelector("link")?.textContent,
          pubDate: item.querySelector("pubDate")?.textContent,
          description: item.querySelector("description")?.textContent
        }));
        setItems(itemsArray);
      } catch (err) {
        setError("Failed to load feed.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [feedUrl]);

  if (loading) return <p>Loading feed...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid">
      {items.map((item, i) => (
        <div key={i} className="card">
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            <h3>{item.title}</h3>
          </a>
          <small>{item.pubDate}</small>
          <p dangerouslySetInnerHTML={{ __html: item.description }} />
        </div>
      ))}
    </div>
  );
}

export default Feed;
