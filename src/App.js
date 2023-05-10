import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import PokemonList from "./components/PokemonList";
import NavBar from "./components/NavBar";
import PageNav from "./components/PageNav";
import F2placeHolder from "./components/F2placeHolder";
import F3placeHolder from "./components/F3placeHolder";
import F4placeHolder from "./components/F4placeHolder";
import F5placeHolder from "./components/F5placeHolder";
import PokemonDetail from "./components/PokemonDetail";

import "./components/listStyle.css";
import "./components/NavBarStyle.css";
import "./components/pageNav.css";
import "./components/placeholder.css";
import "./components/homeStyle.css";
import "./components/SwitchTheme.css";

function App() {
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(0);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSetFragment = (active) => {
    setActive(active);
    console.log(active);
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home></Home>} />
      <Route
        path="/pokelist"
        element={
          <div className="container">
            <div className="nav">
              <NavBar />
            </div>
            <div className="content">
              <div className="pageNav">
                <PageNav
                  page={page}
                  onPageChange={handlePageChange}
                  active={active}
                  onFragmentChange={handleSetFragment}
                />
              </div>
              <div>
                {active === 0 && <PokemonList limit={10} page={page} />}
                {active === 1 && <F2placeHolder />}
                {active === 2 && <F3placeHolder />}
                {active === 3 && <F4placeHolder />}
                {active === 4 && <F5placeHolder />}
              </div>
            </div>
          </div>
        }
      ></Route>
      <Route path="/pokelist/:pokemonName" element={<PokemonDetail />} />
      <Route
        path="ph1"
        element={
          <div className="ph1">
            <NavBar />
            <F2placeHolder />
          </div>
        }
      />
      <Route
        path="ph2"
        element={
          <div className="ph2">
            <NavBar />
            <F3placeHolder />
          </div>
        }
      />
      <Route
        path="ph3"
        element={
          <div className="ph3">
            <NavBar />
            <F4placeHolder />
          </div>
        }
      />
      <Route
        path="*"
        element={
          <div className="ph5">
            <NavBar />
            <F5placeHolder />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
