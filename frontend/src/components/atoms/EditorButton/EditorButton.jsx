import React from "react";
import "./EditorButton.css";

export default function EditorButton({ isActive  }) {


    function handleClick() {
        console.log("clicked")
    }

  return (
    <button className="editor-button" style={{
        color: isActive ?"white": "#959eba",
        backgroundColor: isActive ? "#303242" : "#4a4859",
        borderTop: isActive ? "3px solid #07691e" : "none",
    }}
    onClick={handleClick}>
      file.js
    </button>
  );
}
