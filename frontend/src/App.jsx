import { Route, Routes } from "react-router-dom";
import Createproject from "./pages/Createproject";
import Router from "./Router";
import {io} from "socket.io-client";

function App() {

  const socket = io("http://localhost:3000");


  return (
    <>
      <Router/>
    </>
  );
}

export default App;
