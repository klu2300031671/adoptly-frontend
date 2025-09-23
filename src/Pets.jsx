import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PetList.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Pets() {
  const query = useQuery();
  const navigate = useNavigate();
  const initialFilter = query.get("type");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(
    initialFilter
      ? initialFilter.charAt(0).toUpperCase() + initialFilter.slice(1)
      : "All Types"
  );
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initialFilter) {
      setFilter(initialFilter.charAt(0).toUpperCase() + initialFilter.slice(1));
    }
  }, [initialFilter]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch("http://localhost:8087/pets/readpet", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          alert("Session expired. Please login again.");
          window.location.href = "/login";
          return;
        }

        const data = await response.json();
        setPets(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pet data:", error);
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  // 🔍 Filter logic (normalized to lowercase and trimmed)
  const filteredPets = pets.filter((pet) => {
    const searchText = search.toLowerCase().trim();
    const petCategory = pet?.category?.toLowerCase().trim();
    const matchSearch =
      pet?.name?.toLowerCase().includes(searchText) ||
      pet?.breed?.toLowerCase().includes(searchText) ||
      pet?.location?.toLowerCase().includes(searchText);

    const matchCategory =
      filter.toLowerCase() === "all types" ||
      petCategory === filter.toLowerCase();

    return matchSearch && matchCategory;
  });

  const handleAdopt = (petId) => {
    navigate(`/adopt/${petId}`);
  };

  return (
    <div className="pets-page">
      <h2 className="pets-heading">Available Pets</h2>

      <div className="filters">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All Types">All Types</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Rabbit">Rabbit</option>
        </select>

        <input
          type="text"
          placeholder="Search by name, breed or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-btn" onClick={() => {}}>Search</button>
      </div>

      {loading ? (
        <p>Loading pets...</p>
      ) : filteredPets.length === 0 ? (
        <p>No pets found for your search.</p>
      ) : (
        <div className="pets-grid">
          {filteredPets.map((pet) => (
            <div className="pet-card" key={pet.id}>
              <img className="pet-image" src={pet.image} alt={pet.name} />
              <div className="pet-info">
                <h2>{pet.name}</h2>
                <p><strong>Breed:</strong> {pet.breed}</p>
                <p><strong>Age:</strong> {pet.age}</p>
                <p><strong>Location:</strong> {pet.location}</p>
                <p><strong>Type:</strong> {pet.category}</p>
                <button className="adopt-btn" onClick={() => handleAdopt(pet.id)}>
                  Adopt
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Pets;
