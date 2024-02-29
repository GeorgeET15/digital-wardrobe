import React from "react";
import { useNavigate } from "react-router-dom";
import AddItem from "../components/AddItem";
import NavBar from "../components/NavBar";

import RandomOutfit from "../components/RandomOutfit";
import Carousel from "../components/Carousel";

const Home = () => {
  const navigate = useNavigate();

  const openTop = () => {
    navigate("/top");
  };

  const openBottom = () => {
    navigate("/bottom");
  };

  const openFootWear = () => {
    navigate("/foot");
  };

  return (
    <>
      <div className="home-container">
        <NavBar />
        <h1 className="heading">Your Online Wardrobe</h1>
        <div className="buttons-container">
          <button className="category-button button" onClick={openTop}>
            Explore Tops
          </button>
          <button className="category-button button" onClick={openBottom}>
            Discover Bottoms
          </button>
          <button className="category-button button" onClick={openFootWear}>
            Browse Footwear
          </button>
        </div>

        <RandomOutfit />
      </div>
      <Carousel val={"Top"} />
      <Carousel val={"Bottom"} />
      <Carousel val={"Foot Wear"} />
    </>
  );
};

export default Home;
