import React, { useState } from 'react';

const EditModal = ({ post, onClose, onSave }) => {
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedBody, setEditedBody] = useState(post.body);
      console.log("lksmdlkdlfd")
  const handleSave = () => {
    // Call the onSave prop to save the changes
    onSave({ ...post, title: editedTitle, body: editedBody });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <h2>Edit Post</h2>
        <label>Title:</label>
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <label>Body:</label>
        <textarea
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
        ></textarea>
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
