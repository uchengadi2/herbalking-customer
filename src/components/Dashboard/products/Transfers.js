import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import api from "./../../../apis/local";
import TransferForm from "./TransferForm";

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

function Transfers(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const [open, setOpen] = useState(false);
  const [transfersList, setTransfersList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/transfers`);
      const workingData = response.data.data.data;
      workingData.map((transfer) => {
        allData.push({
          id: transfer._id,
          product: transfer.product,
          inventory: transfer.inventory,
          source: transfer.source,
          destination: transfer.destination,
          quantity: transfer.quantity,
          unit: transfer.unit,
          totalProductCost: transfer.totalProductCost,
          totalTrasferCost: transfer.totalTrasferCost,
          sku: transfer.sku,
          barcode: transfer.barcode,
          transferredBy: transfer.transferredBy,
          dateTransferred: transfer.dateTransferred,
          batchNumber: transfer.batchNumber,
        });
      });
      setTransfersList(allData);
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

  const onRowsSelectionHandler = (ids, rows) => {
    const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
    setSelectedRows(selectedRowsData);
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
        field: "source",
        headerName: "Source Location",
        width: 150,

        //editable: true,
      },
      {
        field: "destination",
        headerName: "Destination Location",
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
        headerName: "Inventory Before Transfer",
        width: 250,

        //editable: true,
      },

      {
        field: "quantity",
        headerName: "Transferred Quantity",
        width: 150,

        //editable: true,
      },
      // {
      //   field: "totalProductCost",
      //   headerName: "Total Product Cost",
      //   width: 150,

      //   //editable: true,
      // },
      // {
      //   field: "totalTrasferCost",
      //   headerName: "Total Trasfer Cost",
      //   width: 150,

      //   //editable: true,
      // },
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
      // {
      //   field: "editaction",
      //   headerName: "",
      //   width: 30,
      //   description: "Update row",
      //   renderCell: (params) => (
      //     <strong>

      //       <EditIcon
      //         style={{ cursor: "pointer" }}
      //         onClick={() => [
      //           // this.setState({
      //           //   editOpen: true,
      //           //   id: params.id,
      //           //   params: params.row,
      //           // }),
      //           // history.push(`/products/onboard/${params.id}`),
      //         ]}
      //       />
      //     </strong>
      //   ),
      // },
      // {
      //   field: "deleteaction",
      //   headerName: "",
      //   width: 30,
      //   description: "Update row",
      //   renderCell: (params) => (
      //     <strong>

      //       <DeleteIcon
      //         style={{ cursor: "pointer" }}
      //         onClick={() => [
      //           // this.setState({
      //           //   editOpen: true,
      //           //   id: params.id,
      //           //   params: params.row,
      //           // }),
      //           // history.push(`/products/onboard/${params.id}`),
      //         ]}
      //       />
      //     </strong>
      //   ),
      // },
    ];

    transfersList.map((transfer, index) => {
      let row = {
        numbering: ++counter,
        id: transfer.id,
        product: transfer.product[0].name.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),
        batchNumber: transfer.batchNumber.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),
        sku: transfer.sku.toUpperCase(),
        barcode: transfer.barcode.toUpperCase(),
        source: transfer.source[0].name,
        destination: transfer.destination[0].name,
        quantity: transfer.quantity + " " + transfer.unit + "s",
        totalTrasferCost: transfer.totalTrasferCost,
        totalProductCost: transfer.totalProductCost,
        inventory:
          transfer.inventory[0].remainingQuantity +
          " " +
          transfer.inventory[0].unit +
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
        checkboxSelection
        disableRowSelectionOnClick
        onSelectionModelChange={(ids) => onRowsSelectionHandler(ids, rows)}
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
              <Typography variant="h4">Transfers</Typography>
            </Grid>
            <Grid item xs={2}>
              <div>
                <Button variant="contained" onClick={handleOpen}>
                  Transfer Product
                </Button>
                <Dialog
                  //style={{ zIndex: 1302 }}
                  fullScreen={matchesXS}
                  open={open}
                  // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                  onClose={() => [setOpen(false)]}
                >
                  <DialogContent>
                    <TransferForm
                    // token={token}
                    // userId={userId}
                    // handleDialogOpenStatus={handleDialogOpenStatus}
                    // handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
                    // handleFailedSnackbar={handleFailedSnackbar}
                    />
                  </DialogContent>
                </Dialog>
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

export default Transfers;
