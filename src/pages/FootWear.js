import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

const FootWear = () => {
  const [clothesData, setClothesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clothesCollection = collection(firestore, "Foot Wear");
        const clothesSnapshot = await getDocs(clothesCollection);
        const clothesDataArray = [];

        clothesSnapshot.forEach((doc) => {
          const data = doc.data();
          clothesDataArray.push({
            id: doc.id,
            itemName: data.itemName,
            brand: data.brand,
            color: data.color,
            imageUrl: data.downloadURL,
          });
        });

        setClothesData(clothesDataArray);
      } catch (error) {
        console.error("Error fetching clothes data:", error);
      }
    };

    fetchData();
  }, []); // Run only once when the component mounts

  const handleDelete = (id) => {
    // Filter out the deleted item from the state
    setClothesData((prevData) =>
      prevData.filter((clothes) => clothes.id !== id)
    );
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1 style={{ color: "#ff6b35" }}>Foot Wear</h1>
      <div className="grid">
        {clothesData.map((clothes) => (
          <Cards
            key={clothes.id}
            id={clothes.id}
            itemName={clothes.itemName}
            brand={clothes.brand}
            color={clothes.color}
            imageUrl={clothes.imageUrl}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default FootWear;
