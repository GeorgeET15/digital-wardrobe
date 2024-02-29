// Cards.js
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const Cards = ({ id, itemName, brand, color, imageUrl, onDelete, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-image-container">
        <img src={imageUrl} alt={itemName} className="card-image" />
      </div>
      <div className="card-details">
        <h2 className="item-name">{itemName}</h2>
        <p className="brand-color">Brand: {brand}</p>
        <p className="brand-color">Color: {color}</p>
        <button className="delete-button" onClick={() => onDelete(id)}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default Cards;
