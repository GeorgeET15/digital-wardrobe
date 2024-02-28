import { React, useState } from "react";
import Modal from "react-modal";
import { storage, firestore } from "../firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

Modal.setAppElement("#root"); // Set the app element for react-modal

export const AddItem = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [itemName, setItemName] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFile(null);
    setItemName("");
    setBrand("");
    setColor("");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || !itemName || !brand || !color) {
      alert("Please fill in all details and upload an image.");
      return;
    }

    // Upload image to Firebase Storage
    const storageRef = ref(storage, `${type}/${file.name}`);

    try {
      // Read the file as a Data URL
      const reader = new FileReader();

      reader.onload = async (e) => {
        const dataURL = e.target.result;

        // Upload the Data URL to Firebase Storage
        await uploadString(storageRef, dataURL, "data_url");

        // Retrieve the download URL
        const downloadURL = await getDownloadURL(storageRef);

        try {
          const clothData = await addDoc(collection(firestore, type), {
            itemName,
            brand,
            color,
            downloadURL,
          });

          console.log("Document written with ID: ", clothData.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }

        console.log("Image uploaded successfully. Download URL:", downloadURL);

        closeModal();
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };
  const handleCheckboxChange = (e) => {
    const value = e.target.value;

    // Update the type state based on the checked status
    setType((prevType) => {
      if (prevType === value) {
        return ""; // Uncheck if already checked
      } else {
        return value; // Check if not checked
      }
    });
  };
  return (
    <div>
      <button className="add-button" onClick={openModal}>
        ADD
      </button>

      {/* Modal for adding clothes */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Clothes Modal"
      >
        <h2>Add Clothes</h2>
        <input type="file" onChange={handleFileChange} />
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="text"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <div>
          <input
            type="checkbox"
            id="type-shirt"
            name="type-shirt"
            value="Top"
            checked={type.includes("Top")}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="type-shirt"> Top</label>
          <br />

          <input
            type="checkbox"
            id="type-pants"
            name="type-pants"
            value="Bottom"
            checked={type.includes("Bottom")}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="type-pants"> Bottom</label>
          <br />

          <input
            type="checkbox"
            id="type-shoes"
            name="type-shoes"
            value="Foot Wear"
            checked={type.includes("Foot Wear")}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="type-shoes"> Foot Wear</label>
          <br />
        </div>
        <button onClick={handleUpload}>Upload</button>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};
