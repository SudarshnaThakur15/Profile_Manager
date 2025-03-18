import React, { useState, useEffect } from 'react';
import './styles/Bio.css';

const Bio = () => {
  const [bio, setBio] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Fetch bio
  useEffect(() => {
    const fetchBio = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bio');
        const data = await response.json();
        if (data) setBio(data.bio);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBio();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio }),
      });
      const data = await response.json();
      console.log('Bio Updated:', data);
      setIsEditing(false);
      alert('Bio updated successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bio-container">
      <div className="header">
        <h2>Bio</h2>
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Enter your bio..."
              rows="5"
            />
          </div>
          <button type="submit" className="save-button">
            Save
          </button>
        </form>
      ) : (
        <div className="info-display">
          <p>{bio}</p>
        </div>
      )}
    </div>
  );
};

export default Bio;