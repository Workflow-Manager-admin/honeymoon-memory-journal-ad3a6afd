import React from "react";
import "./TimelineEntry.css";

// PUBLIC_INTERFACE
function TimelineEntry({ entry }) {
  /** Single diary/memory entry for use in timeline or grid */
  // TODO: Support media gallery, favorite toggle, share, privacy etc.
  return (
    <article className={`timeline-entry ${entry.privacy === "public" ? "" : "private"}`}>
      <div className="timeline-entry-header">
        <h3>{entry.title}</h3>
        <span className="entry-date">{new Date(entry.date).toLocaleDateString()}</span>
      </div>
      <p className="entry-content">{entry.content}</p>
      {entry.mediaUrl && (
        <div className="entry-media">
          {/* Show images or videos */}
          <img src={entry.mediaUrl} alt={entry.title} />
        </div>
      )}
      <div className="entry-actions">
        <button className="favorite-btn">{entry.favorite ? "★" : "☆"}</button>
        <button className="share-btn">Share</button>
      </div>
      <div className="privacy-label">{entry.privacy === "public" ? "Public" : "Private"}</div>
    </article>
  );
}
export default TimelineEntry;
