// src/App.jsx
import React from "react";
import PropDrilling from "./PropDrilling";
import Context from "./Context";

function App() {
  return (
    <div style={{ padding: "2rem", fontSize: "2rem" }}>
      <h2>Prop Drilling</h2>
      <PropDrilling />

      <h2 style={{ marginTop: "2rem" }}>Context API</h2>
      <Context />
    </div>
  );
}

export default App;
