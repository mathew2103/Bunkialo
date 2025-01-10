import { useState, useEffect } from "react";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";
const noOfWeeks=12
const subjectConfig = {
  S1: { name: "Maths", subject_credit: 4, color: "cyan" },
  S2: { name: "Computer Organisation", subject_credit: 4, color: "rgb(178, 54, 79)" },
  S3: { name: "DSA", subject_credit: 5, color: "limegreen" },
  S4: { name: "EC", subject_credit: 5, color: "orange" },
  S5: { name: "PD", subject_credit: 1, color: "blueviolet" },
  S6: { name: "IT", subject_credit: 4, color: "greenyellow" },
  S7: { name: "Signals", subject_credit: 4, color: "royalblue" },
};
const credit_to_maxbunks = (subject_credit) => {
  return Math.floor((subject_credit) * noOfWeeks * 0.2);
};

export default function App() {
  var [activeButton, setActiveButton] = useState(null);
  

  const [bunkCounts, setBunkCounts] = useState(
    Object.keys(subjectConfig).reduce((acc, key) => ({ ...acc, [key]: 0 }), {})
  );

  // Load bunkCounts from local storage when the component mounts
  useEffect(() => {
    const storedBunkCounts = localStorage.getItem("bunkCounts");
    if (storedBunkCounts) {
      setBunkCounts(JSON.parse(storedBunkCounts));
    }
  }, []);

  // Save bunkCounts to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("bunkCounts", JSON.stringify(bunkCounts));
  }, [bunkCounts]);

  useEffect(() => {
    const metaTag = document.createElement("meta");
    metaTag.name = "viewport";
    metaTag.content =
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    document.head.appendChild(metaTag);
    return () => {
      document.head.removeChild(metaTag);
    };
  }, []);

  const handleClick = (subjectKey) => {
    setActiveButton(subjectKey);
    document.querySelector(".board").scrollIntoView({ behavior: "smooth" });
  };

  const handleBunkCountChange = (event) => {
    const newBunkCount = parseInt(event.target.value, 10);
    setBunkCounts((prevBunkCounts) => ({
      ...prevBunkCounts,
      [activeButton]: newBunkCount,
    }));
  };

  const incrementBunkCount = () => {
    setBunkCounts((prevBunkCounts) => ({
      ...prevBunkCounts,
      [activeButton]: prevBunkCounts[activeButton] + 1,
    }));
  };

  return (
    <div className="container">
      {Object.keys(subjectConfig)
        .sort() // This ensures S1, S2, etc. are in order
        .map(key => (
        <div
          key={key}
          className={`subject-button ${activeButton === key ? "active" : ""}`}
          style={{ backgroundColor: subjectConfig[key].color }}
          onClick={() => handleClick(key)}
        >
          {subjectConfig[key].name}
        </div>
      ))}

      <div className="board">
        <div className="course-button">
          {activeButton ? subjectConfig[activeButton].name : "Select a course"}
        </div>
        <div className="bunks-section">
          <div className="bunks-text">
            Bunks:-<br />
            <p className="available"> (available)</p>
          </div>
          <div className="bunks-count">
            {activeButton
              ? !isNaN(bunkCounts[activeButton])
                ? credit_to_maxbunks(subjectConfig[activeButton].subject_credit, subjectConfig[activeButton].lab) - bunkCounts[activeButton]
                : credit_to_maxbunks(subjectConfig[activeButton].subject_credit, subjectConfig[activeButton].lab)
              : "?"}
          </div>
        </div>
        <div className="bunk-button" 
             onClick={incrementBunkCount}
             style={{ userSelect: 'none' }}>
          BUNK?
        </div>
      </div>
      <div className="top-section">
        <div className="title">Set your bunk count:-</div>
        <input
          type="number"
          className="count-box"
          value={bunkCounts[activeButton]}
          onChange={handleBunkCountChange}
        />
        <div className="count-description">
          (This would store the data locally on your browser so that you never
          ever have to trace your bunk count again)
        </div>
      </div>
      <Analytics />
    </div>
  );
}
