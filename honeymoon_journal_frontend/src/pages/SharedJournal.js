import React from "react";
import Timeline from "../components/Timeline";

// PUBLIC_INTERFACE
function SharedJournal({ sharedEntries }) {
  /** Read-only view for public/journal sharing */
  return (
    <main>
      <h2>Shared Journal</h2>
      <Timeline entries={sharedEntries || []} />
    </main>
  );
}
export default SharedJournal;
