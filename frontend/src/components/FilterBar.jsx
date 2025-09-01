import React from "react";

export default function FilterBar({ setCategory }) {
  const filters = ["All", "Music", "Education", "Gaming", "Sports", "News"];

  return (
    <div className="filter-bar">
      {filters.map((f) => (
        <button key={f} onClick={() => setCategory(f === "All" ? "" : f)}>
          {f}
        </button>
      ))}
    </div>
  );
}
