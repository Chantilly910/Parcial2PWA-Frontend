
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PostCard extends Component {
  render() {
    const { post, onLike } = this.props;
    return (
      <div style={{ border: '1px solid #ccc', margin: '0.5rem', padding: '0.5rem' }}>
        <h3>{post.title}</h3>
        <p>{post.content.substring(0, 100)}...</p>
        <p>Likes: {post.likes.length}</p>
        <button onClick={onLike}>Like</button>
        <Link to={`/posts/${post.id}`}>Ver</Link>
      </div>
    );
  }
}
export default PostCard;
