import React, { useState } from "react";

function Note({ title, content, id, onDelete, onUpdate,onpriority}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({ title, content });
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedNote((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!editedNote.title.trim() || !editedNote.content.trim()) return;
    onUpdate(id, editedNote);
    setIsEditing(false);
  };
  return (
    <div className="note">
      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            value={editedNote.title}
            onChange={handleEditChange}
          />
          <textarea
            name="content"
            rows="3"
            value={editedNote.content}
            onChange={handleEditChange}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h1>{title}</h1>
          <p>{content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(id)}>Delete</button>
          <button onClick={()=>onpriority(id)}>Preority</button> 

        </>
      )}
    </div>
  );
}

export default Note;
