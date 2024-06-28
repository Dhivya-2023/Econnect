import { useState,useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Home from './Components/Home';
import './App.css'

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    // if (LS.get("id")) {
    //   navigate("User/Dashboard");
    // }
  });
  return (
    <div className="h-screen w-screen">
      <Home />
    </div>
  );
}

export default App;