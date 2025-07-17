import React from "react";
import Timeline from "../components/Timeline";

// PUBLIC_INTERFACE
function Favorites({ entries }) {
  /** Shows favorite memories or 'What We Learned' section */
  // TODO: filter favorites
  return (
    <main>
      <h2>Favorites</h2>
      <Timeline entries={entries ? entries.filter(e => e.favorite) : []} />
    </main>
  );
}
export default Favorites;
