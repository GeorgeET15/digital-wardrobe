import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Cards({ itemName, brand, color, imageUrl }) {
  return (
    <div className="card">
      <div className="card-image-container">
        <img className="card-image" src={imageUrl} alt={itemName} />
      </div>
      <div className="card-details">
        <h2 className="item-name">{itemName}</h2>
        <p className="brand-color">Brand: {brand}</p>
        <p className="brand-color">Color: {color}</p>
      </div>
    </div>
  );
}

export default Cards;
