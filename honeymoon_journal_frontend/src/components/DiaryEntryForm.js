import React, { useState } from "react";
import "./DiaryEntryForm.css";

// PUBLIC_INTERFACE
function DiaryEntryForm({ entry, onSave, onCancel }) {
  /** Form for creating or editing a diary/memory entry */
  const [title, setTitle] = useState(entry ? entry.title : "");
  const [content, setContent] = useState(entry ? entry.content : "");
  const [privacy, setPrivacy] = useState(entry ? entry.privacy : "private");
  const [media, setMedia] = useState(null);

  // TODO: Form handlers and validation

  return (
    <form className="diary-form">
      <input
        className="diary-title"
        placeholder="Entry Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        className="diary-content"
        value={content}
        placeholder="Write your memorable experience..."
        onChange={e => setContent(e.target.value)}
        required
      />
      <label className="privacy-label">
        <input
          type="radio"
          name="privacy"
          value="private"
          checked={privacy === "private"}
          onChange={() => setPrivacy("private")}
        /> Private
        <input
          type="radio"
          name="privacy"
          value="public"
          checked={privacy === "public"}
          onChange={() => setPrivacy("public")}
        /> Public
      </label>
      <input
        className="media-upload"
        type="file"
        accept="image/*,video/*"
        onChange={e => setMedia(e.target.files[0])}
      />
      <div className="form-actions">
        <button className="save-btn" type="submit">Save Entry</button>
        {onCancel && <button className="cancel-btn" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
export default DiaryEntryForm;
