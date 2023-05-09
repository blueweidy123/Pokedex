import React, { Component } from "react";
import NavBar from "./NavBar";
import pokeballTop from "../images/pbt.png";
import pokeballBot from "../images/pbb.png";
import bg from "../images/qtEkbi.png";
import F2placeHolder from "../components/F2placeHolder";
import F3placeHolder from "../components/F3placeHolder";
import F4placeHolder from "../components/F4placeHolder";
import F5placeHolder from "../components/F5placeHolder";

class Home extends Component {
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const pokeballTop = document.getElementById("pokeball-Top");
    const pokeballBot = document.getElementById("pokeball-Bottom");
    const coverB = document.getElementById("cover-bot");
    const coverT = document.getElementById("cover-top");
    const bg = document.getElementById("bg");
    const scrollPosition = window.scrollY;
    // console.log(scrollPosition);
    // pokeballTop.style.top = -scrollPosition * 2 + 100 + "px";
    // pokeballBot.style.top = scrollPosition * 2 + 100 + "px";
    // coverT.style.top = -scrollPosition * 2 + "px";
    // coverB.style.top = `calc(50% + ${scrollPosition * 2}px)`;
    // if (scrollPosition > window.innerHeight) {
    //   bg.style.transform = `translateY(-${scrollPosition}px)`;
    // } else {
    //   bg.style.transform = "none";
    // }
    if (scrollPosition > 0) {
      pokeballTop.style.top = -scrollPosition * 5 + 100 + "px";
      coverT.style.top = -scrollPosition * 5 + "px";
      pokeballBot.style.top = scrollPosition * 5 + 100 + "px";
      coverB.style.top = `calc(50% + ${scrollPosition * 5}px)`;
    } else {
    }
  };

  render() {
    return (
      <div className="container">
        <NavBar></NavBar>
        <div className="parallax">
          <div className="pokeball-Top" id="pokeball-Top">
            <img src={pokeballTop} alt=""></img>
          </div>
          <div className="pokeball-Bottom" id="pokeball-Bottom">
            <img src={pokeballBot} alt=""></img>
          </div>
          <div className="cover-bot" id="cover-bot"></div>
          <div className="cover-top" id="cover-top"></div>
        </div>
        <div className="banner">
          <div className="bg" id="bg">
            <img src={bg} alt=""></img>
          </div>
        </div>
        <div className="ph">
          <F2placeHolder></F2placeHolder>
          <F3placeHolder></F3placeHolder>
          <F4placeHolder></F4placeHolder>
          <F5placeHolder></F5placeHolder>
        </div>
      </div>
    );
  }
}

export default Home;
