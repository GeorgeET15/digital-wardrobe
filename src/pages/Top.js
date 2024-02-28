import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

const Top = () => {
  const [clothesData, setClothesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clothesCollection = collection(firestore, "Top");
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

  return (
    <div>
      <div className="grid">
        {clothesData.map((clothes) => (
          <Cards
            key={clothes.id}
            itemName={clothes.itemName}
            brand={clothes.brand}
            color={clothes.color}
            imageUrl={clothes.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Top;
