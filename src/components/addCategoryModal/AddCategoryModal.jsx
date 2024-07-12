import { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import "./addCategoryModal.scss";

const AddCategoryModal = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (name.trim() === "" || description.trim() === "") return;
    onAdd({ name, description });
    setName("");
    setDescription("");
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className="modalBox">
        <h2>Add Category</h2>
        <TextField
        id='name'
          placeholder="Coffee" // Placeholder Coffee diubah menjadi label Name
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
        id='description'
          placeholder="Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginTop: '20px' }}
        />
        <Button onClick={handleAdd} variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Add
        </Button>
      </Box>
    </Modal>
  );
};

export default AddCategoryModal;
