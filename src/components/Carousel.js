import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { firestore } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Carousel = ({ val }) => {
  const [tops, setTops] = useState([]);

  useEffect(() => {
    const fetchTops = async () => {
      try {
        const topsRef = collection(firestore, val);
        const snapshot = await getDocs(topsRef);
        const topsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTops(topsData);
      } catch (error) {
        console.error("Error fetching tops:", error);
      }
    };

    fetchTops();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="top-carousel-container">
      <h2>Explore {val}</h2>
      {tops.length > 0 ? (
        <Slider {...settings}>
          {tops.map((top) => (
            <div key={top.id} className="top-card">
              <img src={top.downloadURL} alt={top.itemName} />
              <p>{top.itemName}</p>
            </div>
          ))}
        </Slider>
      ) : (
        <p>No tops available</p>
      )}
    </div>
  );
};

export default Carousel;
