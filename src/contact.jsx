import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon.");
    // Clear form
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <h1 className="title">GET IN TOUCH</h1>
      <p className="subtitle">Contact Us</p>
      <p className="description">
        Have questions about pet adoption or need help with our platform? Our friendly team is here to help.
      </p>

      <div className="contact-grid">
        <div className="contact-info">
          <p>📧 <strong>Email:</strong> info@adoptly.com</p>
          <p>📞 <strong>Phone:</strong> (123) 456-7890</p>
          <p>📍 <strong>Address:</strong> 1234 Adoption Lane, Petville, CA 12345</p>
          <p>🕒 <strong>Hours:</strong><br />
            Monday-Friday: 9am - 5pm<br />
            Saturday: 10am - 4pm<br />
            Sunday: Closed
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send Message</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Write Your Message"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
