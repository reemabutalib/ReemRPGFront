// src/components/Character.jsx

import React from "react";
import axios from 'axios';
import { API_BASE_URL } from "../apiConfig";

const Character = ({ character }) => {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "1rem",
      borderRadius: "8px",
      marginBottom: "1rem",
      backgroundColor: "#f9f9f9"
    }}>
      <h3>{character.name}</h3>
      <p><strong>Class:</strong> {character.class}</p>
      <p><strong>Level:</strong> {character.level}</p>
      <p><strong>Health:</strong> {character.health}</p>
      <p><strong>Attack Power:</strong> {character.attackPower}</p>
    </div>
  );
};

export default Character;
