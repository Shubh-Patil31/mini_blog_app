import { useState, useEffect } from "react";
import Header from "./component/Header";
import SearchBar from "./component/SearchBar";
import PostList from "./component/PostList";
import PostDetail from "./component/PostDetail";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  return (
    <div className="app">
      <Header />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {loading ? (
        <div className="status-message">Loading posts...</div>
      ) : error ? (
        <div className="status-message error">{error}</div>
      ) : selectedPost ? (
        <PostDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
      ) : (
        <PostList
          posts={filteredPosts}
          onSelectPost={setSelectedPost}
          searchTerm={searchTerm}
        />
      )}
    </div>
  );
}

export default App;
