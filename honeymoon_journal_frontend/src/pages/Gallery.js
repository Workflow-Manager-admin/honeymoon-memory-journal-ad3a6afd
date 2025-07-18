import React, { useRef, useState } from "react";
import GalleryGrid from "../components/GalleryGrid";

/**
 * PUBLIC_INTERFACE
 * Shows gallery, enables uploads if user is logged in
 */
function Gallery({ user, gallery = [], onUpload, loading }) {
  const [uploadError, setUploadError] = useState("");
  const fileInput = useRef();

  const handleUpload = async (e) => {
    e.preventDefault();
    const files = fileInput.current.files;
    if (!files.length || !onUpload) return;
    setUploadError("");
    const file = files[0];
    const resp = await onUpload(file);
    if (resp && !resp.success) setUploadError(resp.message || "Upload error");
    if (resp && resp.success) fileInput.current.value = "";
  };

  return (
    <main>
      <h2>Multimedia Gallery</h2>
      {user && (
        <form onSubmit={handleUpload} style={{ margin: "1.2rem 0", display: "flex", gap: 8, alignItems: "center" }}>
          <input type="file" ref={fileInput} accept="image/*,video/*" disabled={loading} />
          <button type="submit" className="save-btn" disabled={loading}>{loading ? "Uploading..." : "Upload"}</button>
          {uploadError && <span style={{ color: "red" }}>{uploadError}</span>}
        </form>
      )}
      <GalleryGrid files={gallery} />
    </main>
  );
}
export default Gallery;
