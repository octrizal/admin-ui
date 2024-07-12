import "./mylist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import MyDatatable from "../../components/mydatatable/MyDatatable";
import AddCategoryModal from "../../components/addCategoryModal/AddCategoryModal";
import Widget from "../../components/widget/Widget";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { categoryColumns } from "../../datatablesource";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const MyList = () => {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesRef = collection(db, 'categories');
      try {
        const snapshot = await getDocs(categoriesRef);
        const categoriesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async (category) => {
    try {
      const categoriesRef = collection(db, 'categories');
      const docRef = await addDoc(categoriesRef, category);
      setCategories((prevCategories) => [...prevCategories, { id: docRef.id, ...category }]);
      setModalOpen(false); // Close modal after adding category
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const categoryDoc = doc(db, 'categories', id);
      await deleteDoc(categoryDoc);
      setCategories((prevCategories) => prevCategories.filter(category => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="my-list">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
        </div>
        <div className="datatable-container" style={{ height: '400px' }}>
          <div className="buttonContainer">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setModalOpen(true)}
              style={{ marginLeft: "auto" }} // Menggeser tombol ke kanan
            >
              Add Category
            </Button>
          </div>
          <MyDatatable
            title="All Categories"
            rows={categories}
            columns={categoryColumns}
            onDelete={handleDeleteCategory}
          />
        </div>
      </div>
      <AddCategoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddCategory}
      />
    </div>
  );
};

export default MyList;
