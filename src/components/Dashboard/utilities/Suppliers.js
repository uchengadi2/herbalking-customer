import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import api from "./../../../apis/local";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function Suppliers(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [supplierList, setSupplierList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/suppliers`);
      const workingData = response.data.data.data;
      workingData.map((supplier) => {
        allData.push({
          id: supplier._id,
          name: supplier.name,
          refNumber: supplier.refNumber,
          type: supplier.type,
          description: supplier.description,
          country: supplier.country,
          address: supplier.address,
          contactPerson: supplier.contactPerson,
          contactPersonEmail: supplier.contactPersonEmail,
          contactPhoneNumber: supplier.contactPhoneNumber,
          product: supplier.product,
          bankDetails: supplier.bankDetails,
        });
      });
      setSupplierList(allData);
      setLoading(false);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const renderDataGrid = () => {
    let rows = [];
    let counter = 0;
    const columns = [
      // { field: "id", headerName: "ID", width: 100 },
      {
        field: "numbering",
        headerName: "S/n",
        width: 100,
      },
      {
        field: "name",
        headerName: "Supplier Name",
        width: 350,

        //editable: true,
      },
      {
        field: "refNumber",
        headerName: "Reference Number",
        width: 150,
        //editable: true,
      },
      {
        field: "type",
        headerName: "Type",
        //type: "number",
        width: 150,
        //editable: true,
      },

      {
        field: "address",
        headerName: "Address",
        sortable: false,
        width: 250,
      },
      {
        field: "country",
        headerName: "Country",
        sortable: false,
        width: 250,
      },
    ];

    supplierList.map((supplier, index) => {
      let row = {
        numbering: ++counter,
        id: supplier.id,
        refNumber: supplier.refNumber,
        type: supplier.type
          ? supplier.type.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        name: supplier.name
          ? supplier.name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",

        address: supplier.address
          ? supplier.address.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",

        country: supplier.country[0].name
          ? supplier.country[0].name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
      };
      rows.push(row);
    });

    return (
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          boxShadow: 3,
          border: 3,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
      />
    );
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} direction="column">
        <Grid item xs>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              {/* <Item>xs=8</Item> */}
              <Typography variant="h4">Suppliers</Typography>
            </Grid>
            <Grid item xs={2}>
              <div>
                <Button variant="contained" onClick={handleOpen}>
                  Add Supplier
                </Button>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={open}
                  onClick={handleClose}
                >
                  {/* <CircularProgress color="inherit" /> */}
                </Backdrop>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ height: 700, width: "100%" }}>
            {loading && <CircularProgress style={{ marginLeft: "50%" }} />}
            {!loading && renderDataGrid()}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Suppliers;
