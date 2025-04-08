import React, { useEffect, useState } from "react";
import AuthForm from "./components/AuthForm";
import axios from "axios";
import Character from "./components/Character.jsx";
import "./App.css";

function App() {
  const [user, setUser] = useState(null); // Authenticated user/token
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCharacters = async (token) => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_API_URL}/api/Character`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCharacters(res.data);
    } catch (err) {
      console.error("Failed to fetch characters:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData); // expects userData to include { token: '...' }
    fetchCharacters(userData.token);
  };

  const handleLogout = () => {
    setUser(null);
    setCharacters([]);
  };

  return (
    <div className="App" style={{ padding: "2rem" }}>
      <h1>🎮 ReemRPG</h1>

      {!user ? (
        <>
          <AuthForm isLogin={true} onAuthSuccess={handleAuthSuccess} />
          <AuthForm isLogin={false} onAuthSuccess={handleAuthSuccess} />
        </>
      ) : (
        <>
          <div style={{ marginBottom: "1rem" }}>
            <h2>Welcome!</h2>
            <button onClick={handleLogout} style={{
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer"
            }}>
              Log Out
            </button>
          </div>

          {loading ? (
            <p>Loading characters...</p>
          ) : characters.length > 0 ? (
            characters.map((char) => (
              <Character key={char.characterId} character={char} />
            ))
          ) : (
            <p>No characters found.</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
