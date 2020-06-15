import React from "react";
import CustomButton from "../CustomButton";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "../../../../client/assets/scss/style.scss";

class Table extends React.Component {
  constructor(props) {
    super(props);
  }
  getColumn = type => {
    const common = [
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Description",
        accessor: "description"
      },
      {
        Header: "Action",
        accessor: "",
        Cell: row => (
          <CustomButton
            handleDelete={() => {
              this.props.handleDelete(row.value._id);
            }}
            handleEdit={() => {
              this.props.handleEdit(row.value._id);
            }}
          />
        )
      }
    ];
    switch (type) {
      case "TAG_TABLE":
        return [
          ...common.splice(0, 2),
          {
            Header: "Category List",
            accessor: "categoryList"
          },
          ...common
        ];
      case "CATEGORY_TABLE":
        return [...common];
      case "RPI_MANAGEMENT":
        return [
          { Header: "Rate", accessor: "rate" },
          { Header: "Year", accessor: "year" },
          {
            Header: "Action",
            accessor: "",
            Cell: row => (
              <CustomButton
                handleDelete={() => {
                  this.props.handleDelete(row.value._id);
                }}
                handleEdit={() => {
                  this.props.handleEdit(row.value._id);
                }}
              />
            )
          }
        ];
      case "TERTIARY_CATEGORY":
        return [
          { Header: "Name", accessor: "name" },
          { Header: "Description", accessor: "description" },
          {
            Header: "Action",
            accessor: "",
            Cell: row => (
              <CustomButton
                handleDelete={() => {
                  this.props.handleDelete(row.value._id);
                }}
                handleEdit={() => {
                  this.props.handleEdit(row.value._id);
                }}
              />
            )
          }
        ];
    case "CAR_MANAGEMENT":
        return [
          { Header: "CAPID", accessor: "CAPID", minWidth: 200 },
          { Header: "CAPCode", accessor: "CAPCode", minWidth: 200 },
          { Header: "Brand", accessor: "Brand", minWidth: 200 },
          { Header: "Model", accessor: "Model", minWidth: 200 },
          {
            Header: "Assign Tag",
            accessor: "",
            minWidth: 400,
            Cell: row => (
              <React.Fragment>
                <button
                  className=" btn btn-primary customButton"
                  onClick={() => {
                    this.props.handleViewName(row.value.CAPID);
                  }}
                >
                  Primary
                </button>
                &nbsp;&nbsp;
                {/* <button
                  className=" btn btn-primary customButton"
                  onClick={() => {
                    this.props.handleViewNameSec(row.value.CAPID);
                  }}
                >
                 Secondary
                </button>&nbsp;&nbsp; */}
                <button
                  className=" btn btn-primary customButton"
                  onClick={() => {
                    this.props.handleViewNameTer(row.value.CAPID);
                  }}
                >
                  Tertiary
                </button>
              </React.Fragment>
            )
          },

          {
            Header: "Edit Vehicle",
            accessor: "",
            maxWidth: 200,
            Cell: row => (
              <React.Fragment>
                <button
                  className=" btn btn-primary customButton"
                  onClick={() => {
                    this.props.handleVehicleEdit(row.value.CAPID);
                  }}
                >
                  Edit
                </button>
              </React.Fragment>
            )
          },
          {
            Header: "Update Cap Data",
            accessor: "",
            minWidth: 200,
            Cell: row => (
              <React.Fragment>
                <button
                  className="btn btn-primary customButton"
                  onClick={() => {
                    this.props.handleUpdateCapData(row.value.CAPID);
                  }}
                >
                  Update Data
                </button>
              </React.Fragment>
            )
          },
          {
            Header: "Images",
            accessor: "",
            minWidth: 200,
            Cell: row => (
              <React.Fragment>
                <button
                  className="btn btn-primary customButton"
                  onClick={() => {
                    this.props.handleViewImages(row.value.CAPID);
                  }}
                >
                  View Images
                </button>
              </React.Fragment>
            )
          },
          {
            Header: "Total Images",
            accessor: "",
            minWidth: 200,
            Cell: row => (
              <React.Fragment>
                {/* <button
                  className="btn btn-primary customButton"
                  onClick={() => {
                    this.props.handleViewImages(row.value.CAPID);
                  }}
                >
                  View Images
                </button> */}
                {/* <h4  >count</h4> */}
                <h4>{row.value.Images.length}</h4>
              </React.Fragment>
            )
          },
          {
            Header: "Primary Category",
            accessor: "Primary",
            minWidth: 200
          },
          {
            Header: "Action",
            accessor: "",
            minWidth: 200,
            Cell: row => (
              <button
                className="btn btn-danger customButtonDelete"
                onClick={() => {
                  this.props.handleDelete(row.value.CAPID);
                }}
              >
                Delete
              </button>
            )
          }
        ];
        case "ARVAL_TABLE":
          return [
            { Header: "UserName", accessor: "userName" },
            { Header: "Created At", accessor: "createdAt" },
            { Header: "Original File Name", accessor: "originalFileName" },
            { Header: "File Name", accessor: "fileName" }
          ];
      default:
        return [...common];
    }
  };
  calculatePageSize = () =>
    Math.max(
      this.props.minRows,
      Math.min(this.props.data.length, this.props.pageSize)
    
    );
   
  render() {
    const { data, type, hide = false, pagesize } = this.props;
   // let pgSize = (data.length > 10) ? 20 : data.length;
    return (
      <div>
        <ReactTable
          data={data}
          columns={this.getColumn(type)}
          // defaultPageSize={pagesize}
          className="-striped -highlight"
          showPagination={false}
          // showPagination={true}
          // pageSize={pgSize}
          pageSize={this.calculatePageSize()}
        />
        <br />
      </div>
    );
  }
}

export default Table;
