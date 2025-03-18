import React from 'react';
import PersonalInfo from './components/PersnalInfo';
import Bio from './components/Bio';
import PreferredLanguage from './components/PreferredLanguage';
import InterestedTopic from './components/InterestedTopic';
import SocialMedia from './components/SocialMedia';
import Education from './components/Education';
import WorkExperience from './components/WorkExperience';
import './App.css'; // Import the main CSS file


const App= () => {
  return (
    <div className="app-container">
      <h1></h1>
      <PersonalInfo />
      <Bio />
      <PreferredLanguage />
      <InterestedTopic />
      <SocialMedia />
      <Education />
      <WorkExperience />
    </div>
  );
};

export default App;