import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import SharedJournal from "./pages/SharedJournal";
import "./App.css";

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null); // TODO: Use backend/api for auth
  const [entries, setEntries] = useState([]); // TODO: backend loading
  const [filters, setFilters] = useState([]);
  const [sharedEntries] = useState([]); // For /share routes

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleLogout = () => setUser(null);

  const onFilterChange = (val) => {
    // TODO: change filters
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
              <Route path="/" element={<Home user={user} />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/favorites" element={<Favorites entries={entries} />} />
              <Route path="/map" element={<Map />} />
              <Route path="/profile" element={<Profile user={user} />} />
              <Route
                path="/shared/:token"
                element={<SharedJournal sharedEntries={sharedEntries} />}
              />
              <Route path="*" element={<Home user={user} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
