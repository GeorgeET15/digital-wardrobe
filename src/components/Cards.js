import React from "react";

function Cards({ itemName, brand, color, imageUrl }) {
  return (
    <div className="card">
      <div className="card-image-container">
        <img className="card-image" src={imageUrl} alt={itemName} />
      </div>
      <div className="card-details">
        <h2 className="card-item-name">{itemName}</h2>
        <p className="card-brand">Brand: {brand}</p>
        <p className="card-color">Color: {color}</p>
      </div>
    </div>
  );
}

export default Cards;
