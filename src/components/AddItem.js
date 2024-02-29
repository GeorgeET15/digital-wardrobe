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
  const [imagePreview, setImagePreview] = useState(null);

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

    // Display image preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || !itemName || !brand || !color || !type) {
      alert("Please fill in all details and upload an image.");
      return;
    }

    // Your remove.bg API key
    const apiKey = "QwtSq5U6bhiAaWN2eQjRji6g";

    const apiUrl = "https://api.remove.bg/v1.0/removebg";

    const storageRef = ref(storage, `${type}/${file.name}`);

    try {
      // Remove background
      const formData = new FormData();
      formData.append("image_file", file, file.name);
      formData.append("size", "auto");

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "X-Api-Key": apiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        console.error("Error removing background:", response.statusText);
        return;
      }

      const data = await response.blob();

      // Convert Blob to ArrayBuffer
      const arrayBuffer = await new Response(data).arrayBuffer();

      // Convert ArrayBuffer to base64 string
      const base64String = btoa(
        new Uint8Array(arrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      // Upload base64 string to Firebase Storage
      await uploadString(storageRef, base64String, "base64", {
        contentType: "image/jpeg",
      });

      const downloadURL = await getDownloadURL(storageRef);

      const clothData = await addDoc(collection(firestore, type), {
        itemName,
        brand,
        color,
        downloadURL,
      });

      console.log("Document written with ID: ", clothData.id);
      console.log("Image uploaded successfully. Download URL:", downloadURL);

      closeModal();
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
        <div className="image-preview-container">
          {imagePreview && <img src={imagePreview} alt="Selected" />}
        </div>
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
