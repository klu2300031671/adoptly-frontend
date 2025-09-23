import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import Pets from "./Pets";
import AdoptionForm from "./AdoptionForm";
import Page from "./Page";
import Contact from "./contact"; // ✅ Contact component import
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/page" element={<Page />} />
        <Route path="/adopt/:id" element={<AdoptionForm />} />
        <Route path="/contact" element={<Contact />} /> {/* ✅ New Contact Route */}
      </Routes>
    </Router>
  </React.StrictMode>
);
