import React, { useState } from "react";

import "./pageNav.css";
import SearchInput from "../SearchInput/SearchInput";

function PageNav({ page, onPageChange, onFragmentChange, active }) {



  const handleSetFragment = (setActive) => {
    onFragmentChange(setActive);
  };

  const setActiveFragment = (frag) => {
    handleSetFragment(frag);
  };

  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      handlePageChange(page - 1);
    }
  };

  const handleNextPage = () => {
    handlePageChange(page + 1);
  };

  const handlePageInputChange = (event) => {
    const newPage = parseInt(event.target.value);
    if (!isNaN(newPage)) {
      handlePageChange(newPage);
    }
  };




  return (
    <div className="fragments">
      {page}
      <SearchInput></SearchInput>
      <div className="fragment-Set">
        <ul>
          <li onClick={() => setActiveFragment(0)}>Pokemons</li>
          <li onClick={() => setActiveFragment(1)}>fragment 2</li>
          <li onClick={() => setActiveFragment(2)}>fragment 3</li>
          <li onClick={() => setActiveFragment(3)}>fragment 4</li>
          <li onClick={() => setActiveFragment(4)}>fragment 5</li>
        </ul>
      </div>

      <div className="page-Set">
        <button onClick={handlePreviousPage}>
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
        <input
          type="number"
          id="pageSet"
          value={page}
          onChange={handlePageInputChange}
        ></input>

        <button onClick={handleNextPage}>
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </button>
      </div>
    </div>
  );
}

export default PageNav;
