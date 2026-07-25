import React from "react";
import { FaCss3, FaJs, FaReact } from "react-icons/fa";

export default function FileIcon({ extension }) {
    const fileStyle = {
        height: "20px",
        width: "20px",
    }

    const iconMapper = {
        js: <FaJs color="yellow" style={fileStyle} />,
        jsx: <FaReact color="#61dbfa" style={fileStyle} />,
        css: <FaCss3 color="#3c99dc" style={fileStyle} />,
    }

  return (
    <>
      {iconMapper[extension]}     
    </>
  );
}
