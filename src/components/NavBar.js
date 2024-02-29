import React from "react";
import AddItem from "./AddItem";

const NavBar = () => {
  return (
    <nav>
      <div>
        <h1
          style={{
            fontSize: "30px",
            color: "#ff6b35",
            marginLeft: "20px",
          }}
        >
          Wardrobe App
        </h1>
      </div>

      <button className="nav-button">
        <AddItem />
      </button>
    </nav>
  );
};

export default NavBar;
