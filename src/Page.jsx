import React, { useEffect, useState } from "react";
import "./Page.css";

import PetPostings from "./PetDetails";
import PetSearch from "./Pets";
import MyProfile from "./MyProfile";   // ✅ new profile page

function Page() {
  const [activeComponent, setActiveComponent] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [fullname, setFullname] = useState("Loading...");
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const userid = sessionStorage.getItem("userid");
    const token = sessionStorage.getItem("token");

    if (!userid || !token) {
      alert("Session expired. Please login again.");
      window.location.replace("/");
    } else {
      // ✅ Get fullname from session if already stored
      const storedFullname = sessionStorage.getItem("fullname");
      if (storedFullname) {
        setFullname(storedFullname);
      } else {
        // fallback API call
        fetch("http://localhost:8087/users/getfullname", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: token, csrid: userid }),
        })
          .then((res) => res.text())
          .then((name) => {
            if (name.startsWith("401")) {
              alert("Session expired. Please login again.");
              sessionStorage.clear();
              window.location.replace("/");
            } else {
              setFullname(name);
              sessionStorage.setItem("fullname", name);
            }
          })
          .catch((err) => {
            console.error("Error fetching fullname:", err);
            setFullname("User");
          });
      }

      // ✅ Fetch role-based menus
      fetch("http://localhost:8087/menus/getmenusbyrole", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token }),
      })
        .then((res) => res.text())
        .then((text) => {
          if (text.startsWith("401")) {
            alert("Session expired. Please login again.");
            sessionStorage.clear();
            window.location.replace("/");
            return;
          }

          try {
            const data = JSON.parse(text);
            setMenus(data);
            if (data.length > 0) {
              loadComponent(data[0].mid); // default to first allowed menu
            }
          } catch (e) {
            console.error("Error parsing menus:", e, text);
          }
        })
        .catch((err) => console.error("Error fetching menus:", err));
    }
  }, []);

  const logout = () => {
    sessionStorage.clear();
    window.location.replace("/");
  };

  const loadComponent = (mid) => {
    setActiveTab(mid);
    if (mid === 1) setActiveComponent(<PetPostings />);
    else if (mid === 2) setActiveComponent(<PetSearch />);
    else if (mid === 3) setActiveComponent(<MyProfile />);  // ✅ profile page
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="header">
        <img className="logo" src="/Pet Adopt.jpg" alt="Adoptly" />
        <div className="logoText">
          Adopt<span>ly</span>
        </div>
        <div className="header-right">
          <label>{fullname}</label>
          <img
            className="logout"
            onClick={logout}
            src="/logout.png"
            alt="Logout"
          />
        </div>
      </div>

      {/* Main Layout */}
      <div className="main-content">
        {/* Sidebar */}
        <div className="sidebar">
          {menus.map((menu) => (
            <button
              key={menu.mid}
              onClick={() => loadComponent(menu.mid)}
              className={activeTab === menu.mid ? "active-btn" : ""}
            >
              <img src={menu.icon} alt={menu.mname} className="icon" />
              <span className="menu-text">{menu.mname}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="outlet">
          <div className="dashboard-card">{activeComponent}</div>
        </div>
      </div>
    </div>
  );
}

export default Page;
