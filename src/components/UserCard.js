import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUsersAsync, deleteUserAsync, updatePostAsync } from '../features/usersSlice';
import '../assets/style/usercard.css';
import EditModal from './commoncomponents/EditModal';

const UserCard = () => {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.users);
  console.log('data', data, status, error);
  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);
  const [editPost, setEditPost] = useState(null);
  const handleDeleteUser = async (postId) => {
    try {
      await dispatch(deleteUserAsync(postId));
      // dispatch(fetchUsersAsync());
    } catch (error) {
      // Handle the error if needed
      console.error('Error deleting post:', error);
    }
  };
  const handleEditPost = (post) => {
    setEditPost(post);
  };
  return (
    <>
      <div className='page-title'>User Directory</div>
      <div className='user-card-container'>
        {status === 'success' && data.length > 0 &&
          data?.map((post) => (
            <div className='user-card' key={post.id}>
              <div>
                <strong>{post.id}</strong>
              </div>
              <div>{post.title} Posts</div>
              <button onClick={() => handleEditPost(post)}>Edit</button>
              <button onClick={() => handleDeleteUser(post.id)}>Delete</button>
            </div>
          ))}
      </div>
      {editPost && (
        <EditModal
          post={editPost}
          onClose={() => setEditPost(null)}
          onSave={(updatedPost) => {
            // Handle the save logic here, e.g., dispatch an action to update the post
            dispatch(
              updatePostAsync({
                postId: updatedPost.id,
                newData: {
                  id: updatedPost.id,
                  title: updatedPost.title,
                  body: updatedPost.body,
                  userId: updatedPost.userId,
                },
              })
            );
            console.log('Updated post:', updatedPost);
          }}
        />
      )}
    </>
  );
};

export default UserCard;
