// MyDatatable.jsx

import "./mydatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from '@mui/material';

const MyDatatable = ({ title, rows, columns, onDelete }) => {

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onDelete(params.row.id)}
          >
            Delete
          </Button>
        </div>
      );
    },
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">{title}</div>
      <DataGrid
        rows={rows}
        columns={[...columns, actionColumn]}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default MyDatatable;
