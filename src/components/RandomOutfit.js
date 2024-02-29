// RandomOutfit.js
import React, { useState } from "react";
import { firestore } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const RandomOutfit = () => {
  const [outfit, setOutfit] = useState(null);

  const shuffleOutfit = async () => {
    // Fetch random items from Firestore
    const randomTop = await getRandomItem("Top");
    const randomBottom = await getRandomItem("Bottom");
    const randomFootwear = await getRandomItem("Foot Wear");

    // Set the outfit state with the random items
    setOutfit({
      top: randomTop,
      bottom: randomBottom,
      footwear: randomFootwear,
    });
  };

  const getRandomItem = async (category) => {
    const itemsRef = collection(firestore, category);
    const snapshot = await getDocs(itemsRef);
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Pick a random item from the category
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  };

  return (
    <div className="random-outfit-container">
      {/* Display the shuffled outfit */}
      {outfit && (
        <div className="outfit-display">
          <h2>Your Random Outfit</h2>
          <div className="outfit-card">
            <img src={outfit.top.downloadURL} alt="Top" />
            <img src={outfit.bottom.downloadURL} alt="Bottom" />
            <img src={outfit.footwear.downloadURL} alt="Footwear" />
          </div>
        </div>
      )}

      {/* Shuffle button with animation */}
      <button className="shuffle-button" onClick={shuffleOutfit}>
        SHUFFLE OUTFIT
      </button>
    </div>
  );
};

export default RandomOutfit;
