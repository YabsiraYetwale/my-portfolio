/* eslint-disable react/no-unescaped-entities */

import "./App.css";


import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Aside from "./components/Aside";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <>
      <div className="theme-toggle-container">
        <ThemeToggle />
      </div>
      <Aside/>
      <div className="main-content">
       <Navbar/>
        <section style={{
          scrollBehavior: "smooth"
        }}><Outlet/></section>
      </div>
    </>
  );
}

export default App;
