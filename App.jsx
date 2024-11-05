import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Navbar component
const Navbar = () => (
    <nav className="navbar">
        <h2>Best Cardle on the madafakin madafakin world</h2>
    </nav>
);

// Footer component
const Footer = () => (
    <footer className="footer">
        <p>&copy; 2024 Cardle.</p>
    </footer>
);

// Dark Mode Toggle component
const DarkModeToggle = ({ onToggle }) => (
    <div className="toggle-switch">
        <input type="checkbox" id="dark-mode-toggle" onChange={onToggle} />
        <label htmlFor="dark-mode-toggle"></label>
    </div>
);

const App = () => {
    const [carImage, setCarImage] = useState('');
    const [carName, setCarName] = useState('');
    const [userGuess, setUserGuess] = useState('');
    const [chances, setChances] = useState(5);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [score, setScore] = useState(0);
    const [totalGames, setTotalGames] = useState(0);

    // Function to fetch car data from API
    const fetchCarData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://api.auto-data.net/image-database/random');
            setCarImage(response.data.image);
            setCarName(response.data.name.toLowerCase());
            setChances(5);
            setUserGuess('');
            setMessage('');
            setLoading(false);
        } catch (error) {
            setMessage('Error loading car data. Please try again.');
            setLoading(false);
        }
    };

    // Initial data load
    useEffect(() => {
        fetchCarData();
    }, []);

    // Function to handle user guesses
    const handleGuess = () => {
        if (userGuess.toLowerCase() === carName) {
            setMessage('Congratulations! You are the goodest Hommie!');
            setScore(score + 1);
            setTotalGames(totalGames + 1);
        } else {
            setChances(chances - 1);
            if (chances - 1 === 0) {
                setMessage(`Game Over! The correct answer was: ${carName} hashahs you are the worsest`);
                setTotalGames(totalGames + 1);
            } else {
                setMessage(`Incorrect. You have ${chances - 1} chances left. brotherrrr`);
            }
        }
    };

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode');
    };

    return (
        <div className="app">
            <Navbar />
            <DarkModeToggle onToggle={toggleDarkMode} />
            <div className="main-content">
                <div className="game-container">
                    <h1>Guess the Car Game</h1>
                    {loading ? (
                        <div className="spinner"></div>
                    ) : (
                        carImage && <img src={carImage} alt="Car" className="car-image" />
                    )}
                    <input
                        type="text"
                        placeholder="Enter car name"
                        value={userGuess}
                        onChange={(e) => setUserGuess(e.target.value)}
                        disabled={chances === 0 || message.includes('Congratulations')}
                    />
                    <button onClick={handleGuess} disabled={chances === 0 || message.includes('Congratulations')}>
                        Guess
                    </button>
                    <p>{message}</p>
                    <button onClick={fetchCarData}>New Game</button>
                    <div className="scoreboard">
                        <p>Score: {score}</p>
                        <p>Total Games: {totalGames}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default App;