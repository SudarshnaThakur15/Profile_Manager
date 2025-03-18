import React, { useState, useEffect } from "react";
import "./styles/InterestedTopic.css";

const InterestedTopic = () => {
  const [topics, setTopics] = useState<string[]>([]);
  const [newTopic, setNewTopic] = useState("");
  const [suggestedTopics] = useState([
    "Design",
    "Marketing",
    "Sales",
    "Finance",
    "Dance",
    "Business",
  ]);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch interested topics from API
  useEffect(() => {
    const fetchInterestedTopics = async () => {
      try {
        const response = await fetch("http://localhost:5500/api/interested-topic");
        const data = await response.json();
        if (data) setTopics(data.topics);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInterestedTopics();
  }, []);

  // Add or Remove a topic
  const toggleTopic = (topic: string) => {
    setTopics((prevTopics) =>
      prevTopics.includes(topic)
        ? prevTopics.filter((t) => t !== topic)
        : prevTopics.length < 20
        ? [...prevTopics, topic]
        : prevTopics
    );
  };

  // Handle manual topic entry
  const handleAddCustomTopic = () => {
    const topic = newTopic.trim();
    if (topic && !topics.includes(topic) && topics.length < 20) {
      setTopics([...topics, topic]);
      setNewTopic(""); // Clear input field
    }
  };

  // Save updated topics to API
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5500/api/interested-topic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topics }),
      });
      const data = await response.json();
      console.log("Interested Topics Updated:", data);
      setIsEditing(false);
      alert("Interested topics updated successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="interested-topic">
      <div className="header">
        <h2>Interested Topic</h2>
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </div>

      <div className="selected-topics">
        {topics.map((topic) => (
          <span key={topic} className="topic-tag">
            {topic} <button onClick={() => toggleTopic(topic)}>×</button>
          </span>
        ))}
      </div>

      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h3>Interested Topic</h3>
            <p>Tag (maximum 20)</p>

            <div className="selected-topics">
              {topics.map((topic) => (
                <span key={topic} className="topic-tag">
                  {topic} <button onClick={() => toggleTopic(topic)}>×</button>
                </span>
              ))}
            </div>
            <div className="manual-entry">
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="Enter a custom topic..."
              />
              <button className="add-button" onClick={handleAddCustomTopic}>
                Add
              </button>
            </div>
            <h4 style={{margin:"6px"}}>Suggession</h4>
            <div className="suggested-topics">
              {suggestedTopics.map((topic) => (
                <button key={topic} className="suggested-tag" onClick={() => toggleTopic(topic)}>
                  + {topic}
                </button>
              ))}
            </div>

            {/* Manual Topic Entry */}
            <div className="manual-entry">
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="Enter a custom topic..."
              />
              <button className="add-button" onClick={handleAddCustomTopic}>
                Add
              </button>
            </div>

            <button className="save-button" onClick={handleSubmit}>
              SAVE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterestedTopic;
