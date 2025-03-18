const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(`${process.env.MONGO_URI}ProfileManager`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/personal-info', require('./routes/personalInfo'));
app.use('/api/social-media', require('./routes/SocialMedia'));
app.use('/api/bio', require('./routes/bio'));
app.use('/api/preferred-language', require('./routes/preferredLanguage'));
app.use('/api/interested-topic', require('./routes/interestedTopic'));
// app.use('/api/education', require('./routes/education'));
// app.use('/api/work-experience', require('./routes/workExperience'));

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));