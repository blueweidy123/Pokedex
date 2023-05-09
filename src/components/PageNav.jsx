import React, { Component } from "react";

class PageNav extends Component {
  constructor(props) {
    super(props);
  }

  handleSetFragment = (setActive) => {
    const { onFragmentChange } = this.props;
    onFragmentChange(setActive);
  };

  setActiveFragment = (frag) => {
    this.handleSetFragment(frag);
  };

  handlePageChange = (newPage) => {
    const { onPageChange } = this.props;
    onPageChange(newPage);
  };

  handlePreviousPage = () => {
    const { page } = this.props;
    if (page > 1) {
      this.handlePageChange(page - 1);
    }
  };

  handleNextPage = () => {
    const { page } = this.props;
    this.handlePageChange(page + 1);
  };

  handlePageInputChange = (event) => {
    const newPage = parseInt(event.target.value);
    if (!isNaN(newPage)) {
      this.handlePageChange(newPage);
    }
  };

  render() {
    const { page } = this.props;

    return (
      <div className="fragments">
        <div className="fragment-Set">
          <ul>
            <li onClick={() => this.setActiveFragment(0)}>Pokemons</li>
            <li onClick={() => this.setActiveFragment(1)}>fragment 2</li>
            <li onClick={() => this.setActiveFragment(2)}>fragment 3</li>
            <li onClick={() => this.setActiveFragment(3)}>fragment 4</li>
            <li onClick={() => this.setActiveFragment(4)}>fragment 5</li>
          </ul>
        </div>
        <div className="page-Set">
          <button onClick={this.handlePreviousPage}>
            <ion-icon name="chevron-back-outline"></ion-icon>
          </button>
          <input
            type="number"
            id="pageSet"
            value={page}
            onChange={this.handlePageInputChange}
          ></input>
          <button onClick={this.handleNextPage}>
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </button>
        </div>
      </div>
    );
  }
}

export default PageNav;
