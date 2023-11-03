import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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

function Delistments(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [delistmentsList, setDelistmentsList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/delistments`);
      const workingData = response.data.data.data;
      workingData.map((delistment) => {
        allData.push({
          id: delistment._id,
          product: delistment.product,
          inventory: delistment.inventory,
          location: delistment.location,
          quantity: delistment.quantity,
          unit: delistment.unit,
          totalProductCost: delistment.totalProductCost,
          totalDelistmentCost: delistment.totalDelistmentCost,
          sku: delistment.sku,
          barcode: delistment.barcode,
          addedBy: delistment.addedBy,
          dateAdded: delistment.dateAdded,
          batchNumber: delistment.batchNumber,
          reason: delistment.reason,
          remark: delistment.remark,
        });
      });
      setDelistmentsList(allData);
      setLoading(false);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  console.log("delistments:", delistmentsList);

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
        field: "location",
        headerName: "Location",
        width: 150,

        //editable: true,
      },
      {
        field: "batchNumber",
        headerName: "Batch Number",
        width: 150,

        //editable: true,
      },

      {
        field: "product",
        headerName: "Product",
        width: 250,

        //editable: true,
      },
      {
        field: "inventory",
        headerName: "Inventory Before delistment",
        width: 250,

        //editable: true,
      },

      {
        field: "quantity",
        headerName: "Quantity for Delistment",
        width: 150,

        //editable: true,
      },

      {
        field: "sku",
        headerName: "Sku",
        width: 150,

        //editable: true,
      },
      {
        field: "barcode",
        headerName: "Barcode",
        width: 150,

        //editable: true,
      },
      {
        field: "editaction",
        headerName: "",
        width: 30,
        description: "Update row",
        renderCell: (params) => (
          <strong>
            {/* {params.value.getFullYear()} */}
            <EditIcon
              style={{ cursor: "pointer" }}
              onClick={() => [
                // this.setState({
                //   editOpen: true,
                //   id: params.id,
                //   params: params.row,
                // }),
                // history.push(`/products/onboard/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
    ];

    delistmentsList.map((delistment, index) => {
      let row = {
        numbering: ++counter,
        id: delistment.id,
        product: delistment.product[0].name.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),
        batchNumber: delistment.batchNumber.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),
        sku: delistment.sku.toUpperCase(),
        barcode: delistment.barcode.toUpperCase(),
        location: delistment.location[0].name,
        quantity: delistment.quantity + " " + delistment.unit + "s",
        totalDelistmentCost: delistment.totalDelistmentCost,
        totalProductCost: delistment.totalProductCost,
        inventory:
          delistment.inventory[0].remainingQuantity +
          " " +
          delistment.inventory[0].unit +
          "s",
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
        //checkboxSelection
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
              <Typography variant="h4">Delistments</Typography>
            </Grid>
            <Grid item xs={2}>
              <div>
                <Button variant="contained" onClick={handleOpen}>
                  Delist Product
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

export default Delistments;
