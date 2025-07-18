import React, { useState } from "react";
import Timeline from "../components/Timeline";
import DiaryEntryForm from "../components/DiaryEntryForm";

/**
 * PUBLIC_INTERFACE
 * Home shows entry creation form and the timeline
 */
function Home({ user, onEntrySubmit, loading }) {
  const [showForm, setShowForm] = useState(false);

  if (!user) {
    return (
      <main>
        <p>Please <a href="/profile">register or log in</a> to add memories.</p>
        <Timeline entries={[]} />
      </main>
    );
  }

  return (
    <main>
      {showForm ? (
        <DiaryEntryForm
          onSave={async (data) => {
            const resp = await onEntrySubmit(data);
            if (resp && resp.success) setShowForm(false);
            return resp;
          }}
          onCancel={() => setShowForm(false)}
          loading={loading}
        />
      ) : (
        <button className="save-btn" onClick={() => setShowForm(true)}>Add Memory</button>
      )}
      <Timeline /> 
    </main>
  );
}
export default Home;
