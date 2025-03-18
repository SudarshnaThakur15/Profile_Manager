import React, { useState, useEffect } from 'react';
import './styles/SocialMedia.css';
import linkedinLogo from './images/linkedin.png'; // Import LinkedIn logo
import xLogo from './images/x.png'; // Import X logo
import gmailLogo from './images/gmail.png'; // Import Gmail logo
import youtubeLogo from './images/youtube.png'; // Import YouTube logo

const SocialMedia = () => {
  const [socialMedia, setSocialMedia] = useState({
    linkedin: '',
    x: '',
    gmail: '',
    youtube: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch social media links
  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/social-media');
        const data = await response.json();
        if (data) setSocialMedia(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSocialMedia();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocialMedia({
      ...socialMedia,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/social-media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(socialMedia),
      });
      const data = await response.json();
      console.log('Social Media Links Updated:', data);
      setIsEditing(false);
      alert('Social media links updated successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="social-media">
      <div className="header">
        <h2>Social Media</h2>
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>LinkedIn Link</label>
            <input
              type="text"
              name="linkedin"
              value={socialMedia.linkedin}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>X (Twitter) Link</label>
            <input
              type="text"
              name="x"
              value={socialMedia.x}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Gmail Link</label>
            <input
              type="text"
              name="gmail"
              value={socialMedia.gmail}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>YouTube Link</label>
            <input
              type="text"
              name="youtube"
              value={socialMedia.youtube}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="save-button">
            Save
          </button>
        </form>
      ) : (
        <div className="social-media-links">
          <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
            <img src={linkedinLogo} alt="LinkedIn" />
          </a>
          <a href={socialMedia.x} target="_blank" rel="noopener noreferrer">
            <img src={xLogo} alt="X (Twitter)" />
          </a>
          <a href={socialMedia.gmail} target="_blank" rel="noopener noreferrer">
            <img src={gmailLogo} alt="Gmail" />
          </a>
          <a href={socialMedia.youtube} target="_blank" rel="noopener noreferrer">
            <img src={youtubeLogo} alt="YouTube" />
          </a>
        </div>
      )}
    </div>
  );
};

export default SocialMedia;