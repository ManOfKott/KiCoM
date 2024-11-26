import { CardHeader, Card, CardContent } from "@mui/material";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";

const OperatorSection = ({ inputs, category }) => {
  const columns = [
    {
      field: "sender",
      headerName: "From",
      flex: 0.4,
    },
    {
      field: "reciever",
      headerName: "To",
      flex: 0.4,
    },
    {
      field: "value",
      headerName: "Value",
      flex: 2,
    },
    {
      field: "timestamp",
      headerName: "Timestamp",
      flex: 0.5,
      renderCell: (params) => {
        return dayjs(params.value).format("HH:mm:ss");
      },
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 0.5,
    },
  ];

  return (
    <Card
      variant="outlined"
      sx={{
        border: "1px solid grey",
        borderRadius: "0.5rem",
        height: "500px",
      }}
    >
      <CardHeader title={category}></CardHeader>
      <CardContent>
        <DataGrid
          rows={inputs}
          columns={columns}
          autoPageSize
          sx={{
            ".MuiDataGrid-footerContainer": { display: "none" },
          }}
          disableColumnFilter={true}
          disableColumnSorting={true}
          disableColumnMenu={true}
          disableRowSelectionOnClick={true}
          disableSelectionOnClick={true}
        />
      </CardContent>
    </Card>
  );
};

export default OperatorSection;
