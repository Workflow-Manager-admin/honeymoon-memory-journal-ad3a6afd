import React from "react";
import "./GalleryGrid.css";

/**
 * PUBLIC_INTERFACE
 * Renders uploaded media files (images/videos)
 * file object should have { id, url, type, name }
 */
function GalleryGrid({ files = [] }) {
  return (
    <div className="gallery-grid">
      {files.length === 0 ? (
        <p>No photos or videos yet.</p>
      ) : (
        files.map((file) => (
          <div key={file.id || file._id || file.url} className="gallery-item">
            {file.type && file.type.startsWith("image/") ? (
              <img src={file.url} alt={file.name || ""} />
            ) : (
              <video src={file.url} controls />
            )}
          </div>
        ))
      )}
    </div>
  );
}
export default GalleryGrid;
