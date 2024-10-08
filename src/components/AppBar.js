import { Link, useLocation } from "react-router-dom";
import "../styles/AppBar.css";
import React from "react";

const links = [
  { path: "/", label: "Home Page" },
  { path: "/agents", label: "Agents Page" },
  { path: "/management", label: "Management Page" },
];

const AppBar = ({ options, user, setUser }) => {
  const location = useLocation();

  const handleChange = (event) => {
    const selectedUser = options.find(
      (option) => option.role === event.target.value
    );
    setUser(selectedUser);
  };

  return (
    <header className="app-bar">
      <h1 className="app-title">Policy Management</h1>
      <div className="app-bar-actions">
        <nav>
          {links.map(
            ({ path, label }) =>
              location.pathname !== path && (
                <Link key={path} to={path} className="link-hover">
                  {label}
                </Link>
              )
          )}
        </nav>
        <select
          className="app-select"
          value={user ? user.role : ""}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select a user
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.role}>
              {option.role}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};

export default AppBar;
