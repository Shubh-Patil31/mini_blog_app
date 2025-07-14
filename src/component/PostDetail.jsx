export default function PostDetail({ post, onBack }) {
  return (
    <div className="post-detail">
      <button onClick={onBack} className="back-button">
        ← Back to Posts
      </button>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}
