import React from "react";
import TimelineEntry from "./TimelineEntry";
import "./Timeline.css";

// PUBLIC_INTERFACE
function Timeline({ entries = [] }) {
  /** Renders the timeline or journal in chronological order */
  // TODO: Load and sort real data
  return (
    <section className="timeline">
      <h2>Memories Timeline</h2>
      <div className="timeline-list">
        {entries.length === 0 ? (
          <p>No entries yet. Start by adding your first memory!</p>
        ) : (
          entries.map(entry => (
            <TimelineEntry key={entry.id} entry={entry} />
          ))
        )}
      </div>
    </section>
  );
}
export default Timeline;
