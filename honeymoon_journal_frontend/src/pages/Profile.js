import React from "react";
import ProfileForm from "../components/ProfileForm";

// PUBLIC_INTERFACE
function Profile({ user }) {
  return (
    <main>
      <h2>My Profile</h2>
      <ProfileForm user={user} />
    </main>
  );
}
export default Profile;
