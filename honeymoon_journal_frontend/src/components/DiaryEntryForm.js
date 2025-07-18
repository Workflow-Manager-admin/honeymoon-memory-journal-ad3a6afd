import React, { useState } from "react";
import "./DiaryEntryForm.css";

/**
 * PUBLIC_INTERFACE
 * DiaryEntryForm - handles creation (and optionally edit) of memory/diary entry
 * @param {object} props
 * @param {function} props.onSave - callback triggered with entry data when entry is saved
 * @param {function} props.onCancel - cancel handler
 * @param {boolean} props.loading - disables form during submit
 */
function DiaryEntryForm({ entry, onSave, onCancel, loading }) {
  const [title, setTitle] = useState(entry ? entry.title : "");
  const [content, setContent] = useState(entry ? entry.content : "");
  const [privacy, setPrivacy] = useState(entry ? entry.privacy : "private");
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [error, setError] = useState(null);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setMedia(file);
    if (file && file.type.startsWith("image/")) {
      setMediaPreview(URL.createObjectURL(file));
    } else {
      setMediaPreview(null);
    }
  };

  // Form submit handler - calls backend via prop
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!title || !content) {
      setError("Title/content required");
      return;
    }
    if (onSave) {
      const resp = await onSave({
        title,
        content,
        privacy,
        media,
      });
      if (resp && !resp.success) {
        setError(resp.message || "Could not add entry");
      } else if (resp && resp.success) {
        // Clear form if successfully submitted
        setTitle("");
        setContent("");
        setPrivacy("private");
        setMedia(null);
        setMediaPreview(null);
        if (onCancel) onCancel();
      }
    }
  };

  return (
    <form className="diary-form" onSubmit={handleSubmit}>
      <input
        className="diary-title"
        placeholder="Entry Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        disabled={loading}
      />
      <textarea
        className="diary-content"
        value={content}
        placeholder="Write your memorable experience..."
        onChange={e => setContent(e.target.value)}
        required
        disabled={loading}
      />
      <label className="privacy-label">
        <input
          type="radio"
          name="privacy"
          value="private"
          checked={privacy === "private"}
          onChange={() => setPrivacy("private")}
          disabled={loading}
        /> Private
        <input
          type="radio"
          name="privacy"
          value="public"
          checked={privacy === "public"}
          onChange={() => setPrivacy("public")}
          disabled={loading}
        /> Public
      </label>
      <input
        className="media-upload"
        type="file"
        accept="image/*,video/*"
        onChange={handleMediaChange}
        disabled={loading}
      />
      {mediaPreview && (
        <div style={{ margin: "0.5rem 0" }}>
          <img src={mediaPreview} alt="preview" style={{ maxHeight: 100, borderRadius: 6 }} />
        </div>
      )}
      {error && (
        <div style={{ color: "red", marginBottom: 4 }}>{error}</div>
      )}
      <div className="form-actions">
        <button className="save-btn" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Entry"}
        </button>
        {onCancel && <button className="cancel-btn" onClick={onCancel} type="button" disabled={loading}>Cancel</button>}
      </div>
    </form>
  );
}
export default DiaryEntryForm;
