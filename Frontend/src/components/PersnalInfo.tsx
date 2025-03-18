import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './styles/PersonalInfo.css';

Modal.setAppElement('#root'); // Prevents accessibility issues

const PersonalInfo = () => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    address: '',
    email: '',
    phone: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch personal info
  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/personal-info');
        const data = await response.json();
        if (data) setPersonalInfo(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPersonalInfo();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5500/api/personal-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(personalInfo),
      });
      const data = await response.json();
      console.log('Personal Info Updated:', data);
      setIsModalOpen(false);
      alert('Personal info updated successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="personal-info">
      <div className="header">
        <h2>Personal Information</h2>
        <button onClick={() => setIsModalOpen(true)}>Edit</button>
      </div>

      <div className="info-display">
        <h3>Personal Information</h3>
        <p><strong> Name:</strong> {personalInfo.firstName}</p>
        <p><strong>Last Name:</strong> {personalInfo.lastName}</p>
        <p><strong>Age:</strong> {personalInfo.age}</p>
        <p><strong>Gender:</strong> {personalInfo.gender}</p>
        <p><strong>Address:</strong> {personalInfo.address}</p>

        <h3>Contact Information</h3>
        <p><strong>Email:</strong> {personalInfo.email}</p>
        <p><strong>Phone Number:</strong> {personalInfo.phone}</p>
      </div>

      {/* Modal for Editing */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal"
        overlayClassName="overlay"
      >
        
      <div className='form'  >
        <form onSubmit={handleSubmit} className=''>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstName" value={personalInfo.firstName} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" value={personalInfo.lastName} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input type="number" name="age" value={personalInfo.age} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={personalInfo.gender} onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea name="address" value={personalInfo.address} onChange={handleChange} />
          </div>

          <h3>Contact Information</h3>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={personalInfo.email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" name="phone" value={personalInfo.phone} onChange={handleChange} />
          </div>

          <button type="submit" className="save-button">Save</button>
          <button type="button" className="cancel-button" onClick={() => setIsModalOpen(false)}>Cancel</button>
        </form></div>
      </Modal>
    </div>
  );
};

export default PersonalInfo;
