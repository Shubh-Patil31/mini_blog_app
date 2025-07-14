export default function PostList({ posts, onSelectPost, searchTerm }) {
  if (posts.length === 0 && searchTerm) {
    return <div className="status-message">No posts match your search.</div>;
  }

  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li
          key={post.id}
          className="post-item"
          onClick={() => onSelectPost(post)}
        >
          <h3>{post.title}</h3>
        </li>
      ))}
    </ul>
  );
}
