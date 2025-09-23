import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const categories = [
  { id: "dog", name: "Dog", image: "/dog.jpg", count: 2 },
  { id: "cat", name: "Cat", image: "/cat.jpg", count: 2 },
  { id: "bird", name: "Bird", image: "/bird.jpg", count: 2 },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div id="container">
      <header id="header">
        <div className="logo">
          <img src="/Pet Adopt.jpg" alt="Adoptly Logo" />
          <div className="logoText">Adoptly</div>
        </div>
        <nav className="nav-buttons">
          <button className="btn">Home</button>
          <button className="btn" onClick={() => navigate("/pets")}>Pets</button>
          <button className="btn" onClick={() => navigate("/contact")}>Contact</button>
          <button className="btn" onClick={() => navigate("/")}>Logout</button>
        </nav>
      </header>

      <section className="hero">
        <div className="container">
          <h1>
            Find Your Perfect <span className="text-primary">Furry Friend</span>
          </h1>
          <p>
            Adoptly connects loving homes with pets in need. Browse our available pets and start your adoption journey today.
          </p>
          <button className="btn btn-primary" onClick={() => navigate("/page")}>Browse Pets</button> {/* Updated to navigate to /page */}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="text-center mb-8">Find Pets By Category</h2>
          <div className="categories">
            {categories.map(category => (
              <div className="card category-card" key={category.id}>
                <img src={category.image} alt={category.name} />
                <div className="category-card-content">
                  <h3 className="category-name">{category.name}</h3>
                  <p> available for adoption</p>
                  <button
                    className="btn btn-primary see-more"
                    onClick={() => navigate(`/pets?type=${category.id}`)}
                  >
                    See More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <h2 className="text-center mb-8">How Adoption Works</h2>
          <div className="steps-grid">
            <div className="card step-card">
              <div className="step-number">1</div>
              <h3>Browse Available Pets</h3>
              <p>Explore our wide selection of pets looking for their forever home.</p>
            </div>
            <div className="card step-card">
              <div className="step-number">2</div>
              <h3>Submit Application</h3>
              <p>Fill out our adoption form and tell us about your home environment.</p>
            </div>
            <div className="card step-card">
              <div className="step-number">3</div>
              <h3>Meet Your Match</h3>
              <p>Schedule a meet-and-greet with your potential new family member.</p>
            </div>
            <div className="card step-card">
              <div className="step-number">4</div>
              <h3>Welcome Home</h3>
              <p>Complete the adoption process and bring your new pet home!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
