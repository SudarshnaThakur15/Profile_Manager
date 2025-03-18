import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./styles/PreferredLanguage.css";

Modal.setAppElement("#root"); // Prevents accessibility issues

const PreferredLanguage = () => {
  const [languages, setLanguages] = useState<string[]>([]);
  const [availableLanguages] = useState(["English", "Spanish", "Arabic", "Tamil", "Hindi"]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch preferred languages
  useEffect(() => {
    const fetchPreferredLanguages = async () => {
      try {
        const response = await fetch("https://profile-manager-backend.onrender.com/api/preferred-language");
        const data = await response.json();
        if (data) setLanguages(data.languages);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPreferredLanguages();
  }, []);

  // Handle checkbox toggle
  const handleCheckboxChange = (language) => {
    setLanguages((prevLanguages) =>
      prevLanguages.includes(language)
        ? prevLanguages.filter((lang) => lang !== language)
        : [...prevLanguages, language]
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://profile-manager-backend.onrender.com/api/preferred-language", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ languages }),
      });
      const data = await response.json();
      console.log("Preferred Languages Updated:", data);
      setIsModalOpen(false);
      alert("Preferred languages updated successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="preferred-language">
      <div className="header">
        <h2>Preferred Language</h2>
        <button onClick={() => setIsModalOpen(true)}>Edit</button>
      </div>

      <ul>
        {languages.map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>

      {/* Modal for Editing */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <h3>Preferred Language</h3>
          <form onSubmit={handleSubmit}>
            {availableLanguages.map((language) => (
              <div key={language}>
                <input
                  type="checkbox"
                  id={language}
                  checked={languages.includes(language)}
                  onChange={() => handleCheckboxChange(language)}
                />
                <label htmlFor={language}>{language}</label>
              </div>
            ))}
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default PreferredLanguage;
