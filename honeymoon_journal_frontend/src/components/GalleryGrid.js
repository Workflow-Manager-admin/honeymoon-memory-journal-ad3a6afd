import React from "react";
import "./GalleryGrid.css";

// PUBLIC_INTERFACE
function GalleryGrid({ files = [] }) {
  /** Shows gallery of user-uploaded media files */
  // TODO: handle real media files
  return (
    <div className="gallery-grid">
      {files.length === 0 ? (
        <p>No photos or videos yet.</p>
      ) : (
        files.map(file => (
          <div key={file.id} className="gallery-item">
            {file.type.startsWith("image/") ? (
              <img src={file.url} alt={file.name} />
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
