import React from "react";
import { useNavigate } from "react-router-dom";
import { AddItem } from "../components/AddItem";
import NavBar from "../components/NavBar";

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
      <AddItem />
    </div>
  );
};

export default Home;
