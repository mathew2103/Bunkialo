import { useState } from 'react';
import PropTypes from 'prop-types';

const defaultSubjectConfig = {
  S1: { name: "Maths", subject_credit: 4, color: "cyan" },
  S2: { name: "Computer Organisation", subject_credit: 4, color: "rgb(178, 54, 79)" },
  S3: { name: "DSA", subject_credit: 5, color: "limegreen" },
  S4: { name: "EC", subject_credit: 5, color: "orange" },
  S5: { name: "PD", subject_credit: 1, color: "blueviolet" },
  S6: { name: "IT", subject_credit: 4, color: "greenyellow" },
  S7: { name: "Signals", subject_credit: 4, color: "royalblue" },
};

// Helper function to generate soft pastel colors
const generateUniqueColor = (existingColors) => {
  const hue = Math.random() * 360;
  const saturation = 60 + Math.random() * 10; // 60-70%
  const lightness = 75 + Math.random() * 10;  // 75-85%
  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  return existingColors.includes(color) ? generateUniqueColor(existingColors) : color;
};

function SubjectForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState(() => {
    const stored = localStorage.getItem("subjectConfig");
    return stored ? JSON.parse(stored) : defaultSubjectConfig;
  });

  const addSubject = () => {
    const newKey = `S${Object.keys(formData).length + 1}`;
    const existingColors = Object.values(formData).map(s => s.color);
    const defaultColor = defaultSubjectConfig[newKey]?.color;
    
    setFormData(prev => ({
      ...prev,
      [newKey]: {
        name: "",
        subject_credit: 4,
        color: defaultColor || generateUniqueColor(existingColors)
      }
    }));
  };

  const removeSubject = (keyToRemove) => {
    // Prevent removing all subjects
    if (Object.keys(formData).length <= 1) {
        return;
    }
    
    const newFormData = Object.entries(formData)
        // Remove the selected subject
        .filter(([key]) => key !== keyToRemove)
        // Rebuild object with new sequential keys
        .reduce((accumulator, [_key, value], index) => ({
            ...accumulator,
            [`S${index + 1}`]: value
        }), {});
    
    setFormData(newFormData);
};

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleSubjectChange = (key, field, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: field === 'subject_credit' ? parseInt(value) : value
      }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="subject-form">
      <button type="button" className="close-button" onClick={onClose}>×</button>
      {Object.keys(formData).sort().map(key => (
        <div key={key} className="subject-input-group">
          <label>{key}</label>
          <input
            type="text"
            placeholder="Subject Name"
            value={formData[key].name}
            onChange={(e) => handleSubjectChange(key, 'name', e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Credits"
            value={formData[key].subject_credit}
            onChange={(e) => handleSubjectChange(key, 'subject_credit', e.target.value)}
            required
            // min="1"
          />
          <button
            type="button"
            className="remove-button"
            onClick={() => removeSubject(key)}
            title="Remove subject"
          >
            −
          </button>
        </div>
      ))}
      <div className="form-actions">
        <button type="button" className="add-button" onClick={addSubject}>
          + Add Subject
        </button>
        <button type="submit">Save All Changes</button>
      </div>
    </form>
  );
}

SubjectForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export { SubjectForm, defaultSubjectConfig };
