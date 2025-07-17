import React, { useState } from "react";
import "./ProfileForm.css";

// PUBLIC_INTERFACE
function ProfileForm({ user }) {
  /** Registration, login or profile edit form */
  const [editing, setEditing] = useState(!user); // If not logged in, show registration

  // TODO: Authentication logic, form handlers

  return editing ? (
    <form className="profile-form">
      <input type="text" placeholder="Name" required />
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button className="save-btn" type="submit">{user ? "Update Profile" : "Register"}</button>
      {user && <button className="cancel-btn" onClick={() => setEditing(false)}>Cancel</button>}
    </form>
  ) : (
    <div>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button className="edit-btn" onClick={() => setEditing(true)}>Edit</button>
    </div>
  );
}
export default ProfileForm;
