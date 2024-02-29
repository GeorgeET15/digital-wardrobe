import React, { useState } from "react";
import Modal from "react-modal";
import { storage, firestore } from "../firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

Modal.setAppElement("#root");

const AddItem = () => {
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
    setType("");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || !itemName || !brand || !color || !type) {
      alert("Please fill in all details and upload an image.");
      return;
    }

    const storageRef = ref(storage, `${type}/${file.name}`);

    try {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const dataURL = e.target.result;

        await uploadString(storageRef, dataURL, "data_url");

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

    setType((prevType) => (prevType === value ? "" : value));
  };

  return (
    <div>
      <button className="add-button" onClick={openModal}>
        <CloudUploadIcon />
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Clothes Modal"
        className="modal"
        overlayClassName="overlay"
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
            checked={type === "Top"}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="type-shirt"> Top</label>
          <br />

          <input
            type="checkbox"
            id="type-pants"
            name="type-pants"
            value="Bottom"
            checked={type === "Bottom"}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="type-pants"> Bottom</label>
          <br />

          <input
            type="checkbox"
            id="type-shoes"
            name="type-shoes"
            value="Foot Wear"
            checked={type === "Foot Wear"}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="type-shoes"> Foot Wear</label>
          <br />
        </div>
        <div className="button-container">
          <button className="upload-button" onClick={handleUpload}>
            Upload
          </button>
          <button className="close-button" onClick={closeModal}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AddItem;
