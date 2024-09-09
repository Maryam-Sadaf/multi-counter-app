import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, addPost, updatePost, deletePost } from '../redux/slices/postsSlice';
import '../styles/Table.css';

function Table() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  // State to handle form visibility and form fields for adding a new post
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  // State to handle inline editing
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  const handleAddPost = () => {
    const newPost = {
      title: newTitle,
      body: newBody,
      userId: 1, // Simulated userId
    };
    dispatch(addPost(newPost));
    setNewTitle('');
    setNewBody('');
    setShowAddForm(false); // Close the form after adding
  };
  const handleEditClick = (post) => {
    setEditingPostId(post.id);
    setEditedTitle(post.title);
    setEditedBody(post.body);
  };
  const handleUpdate = (postId) => {
    dispatch(updatePost({ id: postId, title: editedTitle, body: editedBody }));
    setEditingPostId(null);
  };
  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
  };

  let content;

  if (status === 'loading') {
    content = <p>Loading...</p>;
  } else if (status === 'succeeded') {
    content = (
      <>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>
                  {editingPostId === post.id ? (
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                  ) : (
                    post.title
                  )}
                </td>
                <td>
                  {editingPostId === post.id ? (
                    <textarea
                      value={editedBody}
                      onChange={(e) => setEditedBody(e.target.value)}
                    />
                  ) : (
                    post.body
                  )}
                </td>
                <td>
                  {editingPostId === post.id ? (
                    <>
                      <button onClick={() => handleUpdate(post.id)}>Save</button>
                      <button onClick={() => setEditingPostId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(post)}>Edit</button>
                      <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div className="table-container">
      <h1>Posts Table</h1>

      {/* Add Post button */}
      <button className="add-post-button" onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? 'Close' : 'Add Post'}
      </button>

      {/* Add post form positioned at the top */}
      {showAddForm && (
        <div className="add-post-form">
          <h2>Add New Post</h2>
          <label>
            Title:
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </label>
          <label>
            Body:
            <textarea
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
            />
          </label>
          <button onClick={handleAddPost}>Add Post</button>
        </div>
      )}
      {content}
    </div>
  );
}

export default Table;
