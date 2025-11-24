import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const backgrounds = [
    'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWx2YXVzNHhtY3c0NHdzNHJndWEzNWp6OWxsODcxZDd2eHkxYjJpYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT39D4UZcI7cCuKuOY/giphy.gif',
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDNvamxsYndiMDhuOWt0NjVuc24wejJic29nYWprOGc4ZTFoaWtyNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6vXQ5is5adp8K0bC/giphy.gif',
    'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXY5aWIwY2VmeHNxZGplNnNleng5dzBjazA4bTcwdXVhcWdibXducSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Gh9J8X1ERxMZCy6Zne/giphy.gif',
    'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeW80ZWZnc2JtdTIydjA0ZDU1eWJtdWM2ZDA1eGFtbTVrbDI0dDg1dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2fFWIieH05favZ2PLb/giphy.gif'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [fadeOut, setFadeOut] = useState(false);
  const [crabs, setCrabs] = useState([]);

  useEffect(() => {
    const crabArray = [];
    for (let i = 0; i < 20; i++) {
      crabArray.push({
        id: i,
        left: Math.random() * 90,
        top: Math.random() * 90,
        opacity: 1
      });
    }
    setCrabs(crabArray);
  }, []);

  useEffect(() => {
    const moveCrabs = () => {
      setCrabs(prevCrabs =>
        prevCrabs.map(crab => ({
          ...crab,
          opacity: 0
        }))
      );

      setTimeout(() => {
        setCrabs(prevCrabs =>
          prevCrabs.map(crab => ({
            ...crab,
            left: Math.random() * 90,
            top: Math.random() * 90,
            opacity: 1
          }))
        );
      }, 1000);
    };

    const interval = setInterval(moveCrabs, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOut(true);

      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % backgrounds.length);
        setFadeOut(false);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [nextIndex, backgrounds.length]);

  return (
    <div className="App">
      <div className="aquarium-container">
        <img
          src={backgrounds[currentIndex]}
          alt="Aquarium background"
          className={`aquarium-background ${fadeOut ? 'fade-out' : ''}`}
        />
        <img
          src={backgrounds[nextIndex]}
          alt="Aquarium background"
          className={`aquarium-background aquarium-background-next ${fadeOut ? 'fade-in' : ''}`}
        />
        {crabs.map((crab) => (
          <div
            key={crab.id}
            className="crab"
            style={{
              left: `${crab.left}%`,
              top: `${crab.top}%`,
              opacity: crab.opacity
            }}
          >
            🦀
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
