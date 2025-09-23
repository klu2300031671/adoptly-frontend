
import React, { useState } from 'react';
import './PetPosting.css';

const PetPosting = () => {
  const [petData, setPetData] = useState({
    name: '',
    type: '',
    breed: '',
    age: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleImageChange = (e) => {
    setPetData({ ...petData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(petData);
  };

  return (
    <div className="pets-page">
      <h1 className="pets-heading">Post a Pet for Adoption</h1>
      <form onSubmit={handleSubmit} className="pet-posting-form">
        <div className="form-group">
          <label htmlFor="name">Pet Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={petData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Pet Type</label>
          <select
            id="type"
            name="type"
            value={petData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select a type</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Bird">Bird</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="breed">Breed</label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={petData.breed}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={petData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={petData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Pet Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit" className="search-btn">
          Post Pet
        </button>
      </form>
    </div>
  );
};

export default PetPosting;
