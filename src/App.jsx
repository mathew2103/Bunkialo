import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [bunkCounts, setBunkCounts] = useState({
    Maths: 0,
    English: 0,
    CP: 0,
    EC: 0,
    German: 0,
    IT: 0,
    Network: 0,
  });
  const data =
  {Maths: 8,
  English: 6,
  CP: 8,
  EC: 8,
  German: 2,
  IT: 8,
  Network: 8,
}

  // Load bunkCounts from local storage when the component mounts
  useEffect(() => {
    const storedBunkCounts = localStorage.getItem('bunkCounts');
    if (storedBunkCounts) {
      setBunkCounts(JSON.parse(storedBunkCounts));
    }
  }, []);

  // Save bunkCounts to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('bunkCounts', JSON.stringify(bunkCounts));
  }, [bunkCounts]);

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleBunkCountChange = (event) => {
    const newBunkCount = parseInt(event.target.value, 10) ;
    setBunkCounts((prevBunkCounts) => ({
      ...prevBunkCounts,
      [activeButton]: newBunkCount,
    }));
  };

  const incrementBunkCount = () => {
    setBunkCounts((prevBunkCounts) => ({
      ...prevBunkCounts,
      [activeButton]: (prevBunkCounts[activeButton] ) + 1,
    }));
  };

  return (
    <div className="container">
      <div
        className={`subject-button ${activeButton === 'Maths' ? 'active' : ''}`}
        style={{ backgroundColor: 'cyan' }}
        onClick={() => handleClick('Maths')}
      >
        Maths
      </div>
      <div
        className={`subject-button ${activeButton === 'English' ? 'active' : ''}`}
        style={{ backgroundColor: 'rgb(178, 54, 79)' }}
        onClick={() => handleClick('English')}
      >
        English
      </div>
      <div
        className={`subject-button ${activeButton === 'CP' ? 'active' : ''}`}
        style={{ backgroundColor: 'limegreen' }}
        onClick={() => handleClick('CP')}
      >
        CP
      </div>
      <div
        className={`subject-button ${activeButton === 'EC' ? 'active' : ''}`}
        style={{ backgroundColor: 'orange' }}
        onClick={() => handleClick('EC')}
      >
        EC
      </div>
      <div
        className={`subject-button ${activeButton === 'German' ? 'active' : ''}`}
        style={{ backgroundColor: 'blueviolet' }}
        onClick={() => handleClick('German')}
      >
        German
      </div>
      <div
        className={`subject-button ${activeButton === 'IT' ? 'active' : ''}`}
        style={{ backgroundColor: 'greenyellow' }}
        onClick={() => handleClick('IT')}
      >
        IT
      </div>
      <div
        className={`subject-button ${activeButton === 'Network' ? 'active' : ''}`}
        style={{ backgroundColor: 'royalblue' }}
        onClick={() => handleClick('Network')}
      >
        Network
      </div>

      <div className="board">
        <div className="top-section">
          <div className="title">Do you remember your bunk count?</div>
          <input
            type="number"
            className="count-box"
            value={bunkCounts[activeButton] }
            onChange={handleBunkCountChange}
          />
          <div className="count-description">
            (This would store the data locally on your browser so that you never
            ever have to trace your bunk count again)
          </div>
        </div>
        <div className="course-section">
          <div className="course-button">{activeButton ? activeButton : "Select a course"}</div>
        </div>
        <div className="bunks-section">
          <div className="bunks-text">
            Bunks:- <span className="available">(available)</span>
          </div>
          <div className="bunks-count">{data[activeButton]-bunkCounts[activeButton]}</div>
        </div>
        <div className="bunk-button" onClick={incrementBunkCount}>BUNK?</div>
      </div>
    </div>
  );
};

export default App;