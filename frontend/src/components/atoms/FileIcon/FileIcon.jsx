import React from "react";
import {
  FaJs,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaPython,
  FaJava,
  FaPhp,
  FaDatabase,
  FaTerminal,
  FaDocker,
  FaGitAlt,
  FaCode,
  FaCog,
  FaRegFileAlt,
  FaFileAlt,
} from "react-icons/fa";

import {
  SiTypescript,
  SiReact,
  SiSass,
  SiGo,
  SiRust,
  SiMarkdown,
} from "react-icons/si";


import { VscJson } from "react-icons/vsc";

export default function FileIcon({ extension }) {
    const fileStyle = {
        height: "20px",
        width: "20px",
        marginTop: "10px",
        paddingTop: "8px"
    }

    const iconMapper = {
  // JavaScript / TypeScript
  js: <FaJs color="#f7df1e" style={fileStyle} />,
  jsx: <FaReact color="#61dafb" style={fileStyle} />,
  ts: <SiTypescript color="#3178c6" style={fileStyle} />,
  tsx: <SiReact color="#61dafb" style={fileStyle} />,

  // Web
  html: <FaHtml5 color="#e34c26" style={fileStyle} />,
  css: <FaCss3Alt color="#1572b6" style={fileStyle} />,
  scss: <SiSass color="#cc6699" style={fileStyle} />,

  // Backend
  json: <VscJson color="#f7df1e" style={fileStyle} />,
  sql: <FaDatabase color="#4db33d" style={fileStyle} />,
  py: <FaPython color="#3776ab" style={fileStyle} />,
  java: <FaJava color="#f89820" style={fileStyle} />,
  php: <FaPhp color="#777bb4" style={fileStyle} />,
  go: <SiGo color="#00add8" style={fileStyle} />,
  rs: <SiRust color="#dea584" style={fileStyle} />,

  // Config / Docs
  md: <SiMarkdown color="#ffffff" style={fileStyle} />,
  yaml: <VscJson color="#cb171e" style={fileStyle} />,
  yml: <VscJson color="#cb171e" style={fileStyle} />,
  xml: <FaCode color="#ff9800" style={fileStyle} />,
  txt: <FaRegFileAlt color="#cfcfcf" style={fileStyle} />,
  env: <FaCog color="#888888" style={fileStyle} />,

  // Shell
  sh: <FaTerminal color="#4caf50" style={fileStyle} />,
  bash: <FaTerminal color="#4caf50" style={fileStyle} />,

  // Misc
  dockerfile: <FaDocker color="#2496ed" style={fileStyle} />,
  gitignore: <FaGitAlt color="#f05032" style={fileStyle} />,
  log: <FaFileAlt color="#9e9e9e" style={fileStyle} />,
};

  return (
    <>
      {iconMapper[extension]}     
    </>
  );
}
