import React from "react";
import "./Sidebar.css";

// PUBLIC_INTERFACE
function Sidebar({ filters, onFilterChange, children }) {
  /** Sidebar with quick navigation, filters, or custom content */
  return (
    <aside className="sidebar">
      {filters && (
        <div className="sidebar-filters">
          <h2>Filter Memories</h2>
          {filters.map((filter) => (
            <button
              key={filter.label}
              className="filter-btn"
              onClick={() => onFilterChange(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}
      {children}
    </aside>
  );
}
export default Sidebar;
