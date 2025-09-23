import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Pets.css";
import PetDetails from "./PetDetails"; // Just import if used

function Pets() {
    const [pets, setPets] = useState([]);
    const [initialFilter, setInitialFilter] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setInitialFilter(searchParams.get("filter") || "");
    }, [location]);

    return (
        <div>
            <h2>Pet Search</h2>
            <p>Displaying results for {initialFilter || "All Pets"}</p>
            {/* More Pet Search functionality here */}
        </div>
    );
}

export default Pets;
