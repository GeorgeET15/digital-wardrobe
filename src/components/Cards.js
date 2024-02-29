// Cards.js
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const Cards = ({ id, itemName, brand, color, imageUrl, onDelete, onClick }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(id);
    setOpenDialog(false);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <div className="card" onClick={onClick}>
      <div className="card-image-container">
        <img src={imageUrl} alt={itemName} className="card-image" />
      </div>
      <div className="card-details">
        <h2 className="item-name">{itemName}</h2>
        <p className="brand-color">Brand: {brand}</p>
        <p className="brand-color">Color: {color}</p>
        <button className="delete-button" onClick={handleDeleteClick}>
          <DeleteIcon />
        </button>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Item?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Cards;
