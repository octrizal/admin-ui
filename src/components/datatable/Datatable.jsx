import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {collection, onSnapshot, deleteDoc, doc} from "firebase/firestore";
import { db } from "../../firebase";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const Datatable = ({columns}) => {
  const Location = useLocation();
  const type = location.pathname.split('/')[1];

  const [data, setData] = useState([]);

useEffect(() => {
  const unsub = onSnapshot(
    collection(db, type),
    (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setData(list);
    },
    (error) => {
      console.log(error);
    }
  );

  return () => {
    unsub();
  };
}, [type]); 

const handleDelete = async (id) => {
  try {
    await deleteDoc(doc(db, type, id));
    setData(data.filter((item) => item.id !== id));
  } catch (err) {
    console.log(err);
  }
};

const actionColumn = [
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={"/" + type + "/" + params.row.id} style={{ textDecoration: "none" }}>
            <span className="viewButton">View</span>
          </Link>
          <span>
	          <span
	            className="deleteButton"
	            onClick={() => handleDelete(params.row.id)}
	          >
	            Delete
	          </span>
	        </span>
        </div>
      );
    },
  },
];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {type.toUpperCase()}
        <Link to={"/" + type + "/new"} className="link">
          Add New
        </Link>
      </div>
      <DataGrid className="datagrid" 
        rows={data}
        columns={columns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;