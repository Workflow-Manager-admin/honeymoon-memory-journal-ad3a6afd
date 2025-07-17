import React from "react";
import Timeline from "../components/Timeline";
import DiaryEntryForm from "../components/DiaryEntryForm";

// PUBLIC_INTERFACE
function Home({ user }) {
  /** Home view with entry creation and timeline/diary list */
  return (
    <main>
      {user && <DiaryEntryForm />}
      <Timeline />
    </main>
  );
}
export default Home;
