import "./Table.css";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const columns = [
  { field: "phone", headerName: "Phone", width: 200 },
  {
    field: "phoneValid",
    headerName: "Phone Valid",
    width: 150,
    valueGetter: (params) =>
      params.row.phoneValid ? 'Yes' : 'No',
  },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "emailValid",
    headerName: "Email Valid",
    width: 150,
    valueGetter: (params) =>
      params.row.emailValid ? 'Yes' : 'No',
  },
  {
    field: "time",
    headerName: "Time",
    width: 150
  }
];

export default class Table extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentId: 0
    };
  }

  updateData(newData) {
    let newResult = {
      id: this.state.currentId,
      phone: newData.phone,
      phoneValid: newData.phoneValid,
      email: newData.email,
      emailValid: newData.emailValid,
      time: new Date().toLocaleString('uk')
    }

    this.setState({ data: [newResult, ...this.state.data], currentId: this.state.currentId + 1 });
  }

  render() {
    return (

      <div className="table">
        <DataGrid
          rows={this.state.data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableColumnMenu
        />
      </div>
    );
  }
}
