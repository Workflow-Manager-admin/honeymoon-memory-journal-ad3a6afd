//
// API utility: handles backend calls for auth, entries, and gallery.
//
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000"; // Set as needed

// Helper to parse JSON or throw error
const parseJSON = async (res) => {
  if (res.ok) return res.json();
  const error = await res.json().catch(() => ({}));
  throw error;
};

// PUBLIC_INTERFACE
export async function registerUser({ name, email, password }) {
  /** Register a new user */
  const res = await fetch(`${BASE_URL}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
    credentials: "include",
  });
  return parseJSON(res);
}

// PUBLIC_INTERFACE
export async function loginUser({ email, password }) {
  /** Log in a user and receive auth token (or cookie if supported) */
  const res = await fetch(`${BASE_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  return parseJSON(res);
}

// PUBLIC_INTERFACE
export async function logoutUser(token) {
  /** Log out the current user */
  const res = await fetch(`${BASE_URL}/api/users/logout`, {
    method: "POST",
    headers: token ? { Authorization: "Bearer " + token } : {},
    credentials: "include",
  });
  if (res.status === 204) return true;
  return false;
}

// PUBLIC_INTERFACE
export async function fetchProfile(token) {
  /** Get user profile info (requires auth) */
  const res = await fetch(`${BASE_URL}/api/users/profile`, {
    method: "GET",
    headers: token ? { Authorization: "Bearer " + token } : {},
    credentials: "include",
  });
  return parseJSON(res);
}

// PUBLIC_INTERFACE
export async function createEntry({ title, content, privacy, media }, token) {
  /** Create a diary entry with optional media file, returns entry */
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("privacy", privacy);
  if (media) formData.append("media", media);

  const res = await fetch(`${BASE_URL}/api/entries`, {
    method: "POST",
    headers: token ? { Authorization: "Bearer " + token } : {},
    body: formData,
    credentials: "include",
  });
  return parseJSON(res);
}

// PUBLIC_INTERFACE
export async function uploadMedia(media, token) {
  /** Upload an image or video to gallery, returns file meta */
  const formData = new FormData();
  formData.append("media", media);
  const res = await fetch(`${BASE_URL}/api/gallery/upload`, {
    method: "POST",
    headers: token ? { Authorization: "Bearer " + token } : {},
    body: formData,
    credentials: "include",
  });
  return parseJSON(res);
}

// PUBLIC_INTERFACE
export async function fetchGallery(token) {
  /** List uploaded gallery files */
  const res = await fetch(`${BASE_URL}/api/gallery`, {
    method: "GET",
    headers: token ? { Authorization: "Bearer " + token } : {},
    credentials: "include",
  });
  return parseJSON(res);
}

// PUBLIC_INTERFACE
export async function fetchEntries(token) {
  /** Fetch all diary entries for the user */
  const res = await fetch(`${BASE_URL}/api/entries`, {
    method: "GET",
    headers: token ? { Authorization: "Bearer " + token } : {},
    credentials: "include",
  });
  return parseJSON(res);
}
