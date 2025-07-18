import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import SharedJournal from "./pages/SharedJournal";
import {
  registerUser,
  loginUser,
  logoutUser,
  fetchProfile,
  fetchEntries,
  fetchGallery,
  createEntry,
  uploadMedia,
} from "./api";
import "./App.css";

/**
 * Core app, manages auth state, token, and provides auth/media handlers to children.
 */
function App() {
  const [theme, setTheme] = useState("light");

  // State
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [entries, setEntries] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [filters, setFilters] = useState([]);
  const [sharedEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // On load, fetch profile if token set
  useEffect(() => {
    if (token) {
      fetchProfile(token)
        .then((profile) => setUser(profile))
        .catch(() => {
          setToken("");
          setUser(null);
          localStorage.removeItem("token");
        });
    } else {
      setUser(null);
    }
  }, [token]);

  // On login, fetch entries & gallery
  useEffect(() => {
    if (token) {
      fetchEntries(token)
        .then(setEntries)
        .catch(() => setEntries([]));
      fetchGallery(token)
        .then(setGallery)
        .catch(() => setGallery([]));
    } else {
      setEntries([]);
      setGallery([]);
    }
  }, [token]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // PUBLIC_INTERFACE
  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const resp = await loginUser({ email, password });
      if (resp && (resp.token || resp.accessToken)) {
        const receivedToken = resp.token || resp.accessToken;
        setToken(receivedToken);
        localStorage.setItem("token", receivedToken);
        setUser(resp.user || { ...resp, token: undefined });
        return { success: true };
      } else {
        throw new Error(resp.message || "Invalid login");
      }
    } catch (err) {
      setUser(null);
      setToken("");
      localStorage.removeItem("token");
      return { success: false, message: err.message || "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  // PUBLIC_INTERFACE
  const handleRegister = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const resp = await registerUser({ name, email, password });
      // Registration can log the user in, or ask to log in
      if (resp && (resp.token || resp.accessToken)) {
        const receivedToken = resp.token || resp.accessToken;
        setToken(receivedToken);
        localStorage.setItem("token", receivedToken);
        setUser(resp.user || { ...resp, token: undefined });
        return { success: true };
      } else {
        // fallback: registration successful, must login manually
        return { success: true, mustLogin: true };
      }
    } catch (err) {
      return { success: false, message: err.message || "Register failed" };
    } finally {
      setLoading(false);
    }
  };

  // PUBLIC_INTERFACE
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutUser(token);
    } catch {}
    setUser(null);
    setToken("");
    setEntries([]);
    setGallery([]);
    localStorage.removeItem("token");
    setLoading(false);
  };

  // PUBLIC_INTERFACE
  const handleEntrySubmit = async (entryData) => {
    if (!token || !entryData.title || !entryData.content) return;
    setLoading(true);
    try {
      const result = await createEntry(entryData, token);
      setEntries([result, ...entries]);
      return { success: true, entry: result };
    } catch (err) {
      return { success: false, message: err.message || "Failed to add entry" };
    } finally {
      setLoading(false);
    }
  };

  // PUBLIC_INTERFACE
  const handleMediaUpload = async (file) => {
    if (!token || !file) return;
    setLoading(true);
    try {
      const result = await uploadMedia(file, token);
      setGallery([result, ...gallery]);
      return { success: true, file: result };
    } catch (err) {
      return { success: false, message: err.message || "Upload failed" };
    } finally {
      setLoading(false);
    }
  };

  const onFilterChange = (val) => {
    // TODO: change filters and reload/filter entries
  };

  return (
    <Router>
      <div className="App">
        <Header
          onThemeToggle={toggleTheme}
          theme={theme}
          user={user}
          onLogout={handleLogout}
        />
        <div className="app-layout">
          <Sidebar filters={filters} onFilterChange={onFilterChange} />
          <div className="main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    user={user}
                    onEntrySubmit={handleEntrySubmit}
                    loading={loading}
                  />
                }
              />
              <Route
                path="/gallery"
                element={
                  <Gallery
                    user={user}
                    gallery={gallery}
                    onUpload={handleMediaUpload}
                    loading={loading}
                  />
                }
              />
              <Route
                path="/favorites"
                element={
                  <Favorites
                    entries={entries.filter((e) => e.favorite)}
                  />
                }
              />
              <Route path="/map" element={<Map />} />
              <Route
                path="/profile"
                element={
                  <Profile
                    user={user}
                    onLogin={handleLogin}
                    onRegister={handleRegister}
                    loading={loading}
                  />
                }
              />
              <Route
                path="/shared/:token"
                element={
                  <SharedJournal sharedEntries={sharedEntries} />
                }
              />
              <Route
                path="*"
                element={
                  <Home
                    user={user}
                    onEntrySubmit={handleEntrySubmit}
                    loading={loading}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
