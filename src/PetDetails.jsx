import React, { useState, useEffect } from "react";
import "./PetDetails.css";
import { callApi } from "./api";

function PetDetails() {
    const [pet, setPet] = useState({
        id: "",
        name: "",
        breed: "",
        age: "",
        cost: "",
        location: "",
        petsCondition: "",   // ✅ match backend
        category: ""
    });

    const [pets, setPets] = useState([]);

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = () => {
        callApi("GET", "http://localhost:8087/pets/readpet", "", (response) => {
            try {
                const data = JSON.parse(response);
                setPets(data);
            } catch (error) {
                console.error("Failed to parse response:", error);
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPet({ ...pet, [name]: value });
    };

    const savePet = () => {
        const payload = {
            ...pet,
            age: pet.age ? Number(pet.age) : 0,
            cost: pet.cost ? Number(pet.cost) : 0
        };

        const url = pet.id === ""
            ? "http://localhost:8087/pets/insert"
            : "http://localhost:8087/pets/update";

        const method = pet.id === "" ? "POST" : "PUT";

        callApi(method, url, JSON.stringify(payload), (res) => {
            alert(res.split("::")[1]);
            resetForm();
            fetchPets();
        });
    };

    const editPet = (p) => setPet({ ...p });

    const deletePet = (id) => {
        if (!window.confirm("Are you sure you want to delete this pet?")) return;

        callApi("DELETE", `http://localhost:8087/pets/delete/${id}`, "", (res) => {
            alert(res.split("::")[1]);
            fetchPets();
        });
    };

    const resetForm = () => {
        setPet({
            id: "",
            name: "",
            breed: "",
            age: "",
            cost: "",
            location: "",
            petsCondition: "",   // ✅ reset correctly
            category: ""
        });
    };

    return (
        <div className="pet-details">
            <h2>{pet.id ? "Update Pet" : "Add New Pet"}</h2>
            <input type="text" name="name" value={pet.name} onChange={handleChange} placeholder="Name" />
            <input type="text" name="breed" value={pet.breed} onChange={handleChange} placeholder="Breed" />
            <input type="number" name="age" value={pet.age} onChange={handleChange} placeholder="Age" />
            <input type="number" name="cost" value={pet.cost} onChange={handleChange} placeholder="Cost" />
            <input type="text" name="location" value={pet.location} onChange={handleChange} placeholder="Location" />
            <input type="text" name="petsCondition" value={pet.petsCondition} onChange={handleChange} placeholder="Condition" /> {/* ✅ changed */}
            <input type="text" name="category" value={pet.category} onChange={handleChange} placeholder="Category" />

            <div className="button-group">
                <button className="btn" onClick={savePet}>{pet.id ? "Update" : "Save"}</button>
                {pet.id && <button className="btn" onClick={resetForm}>Cancel</button>}
            </div>

            <h2 style={{ marginTop: "40px" }}>Available Pets</h2>
            {pets.length === 0 ? (
                <p>No pets available.</p>
            ) : (
                pets.map((p) => (
                    <div className="pet-card" key={p.id}>
                        <h3>{p.name}</h3>
                        <p><strong>Breed:</strong> {p.breed}</p>
                        <p><strong>Age:</strong> {p.age}</p>
                        <p><strong>Cost:</strong> ₹{p.cost}</p>
                        <p><strong>Location:</strong> {p.location}</p>
                        <p><strong>Condition:</strong> {p.petsCondition}</p> {/* ✅ fixed */}
                        <p><strong>Category:</strong> {p.category}</p>
                        <div className="button-group">
                            <button className="btn" onClick={() => editPet(p)}>Edit</button>
                            <button className="btn" onClick={() => deletePet(p.id)}>Delete</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default PetDetails;
