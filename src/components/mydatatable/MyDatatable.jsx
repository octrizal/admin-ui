import "./mydatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "name", width: 130 },
];  

const rows = [
  { id: 1, firstName: "Jon" },
  { id: 2, firstName: "Cersei" },
  { id: 3, firstName: "Jaime" },
  { id: 4, firstName: "Arya" },
  { id: 5, firstName: "Daenerys" },
  { id: 6, firstName: null },
  { id: 7, firstName: "Ferrara" },
  { id: 8, firstName: "Rossini" },
  { id: 9, firstName: "Harvey" },
];

const actionColumn = [
  {
    width: 200,
    renderCell: () => {

    },
  },
];

const MyDatatable = () => {
  return (
    <div className="mydatatable">
      <div className="mydatatableTitle">
        All Data
      </div>
      <DataGrid
        rows={rows}
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

export default MyDatatable;
