import React, { useState } from "react";
import "./index.css";
import Input from '../../UIComponents/Input'
import { useNavigate } from "react-router-dom";


const index = ({ search, setSearch, setQuery }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchSubmit = () => {
    setQuery(search);
    setIsOpen(false); // Close menu after search
  };

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="logo" onClick={() => navigate("/home")}>
            <img src="/logoDark.png" alt="Logo" />
          </div>
          <button 
            className="menu-toggle" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation"
          >
            <i className={isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
          </button>
        </div>

        <div className={`navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="nav-links">
            <li><a href="/home" onClick={() => setIsOpen(false)}>Home</a></li>
            <li><a href="#" onClick={() => setIsOpen(false)}>Explore</a></li>
            <li><a href="#" onClick={() => setIsOpen(false)}>Favorites</a></li>
            <li><a href="#" onClick={() => setIsOpen(false)}>About</a></li>
          </ul>

          <div className="search-box">
            <Input
              placeholder="Search images..."
              search={search}
              setSearch={setSearch}
            />
            <button onClick={handleSearchSubmit}>Search</button>

            {/* Logout Icon */}
            <button 
              className="logout-btn"
              onClick={handleLogout}
              title="Logout"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default index;