import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Stack from "@mui/material/Stack";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import api from "./../../../apis/local";
import RemediationForm from "./RemediationForm";

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

function Remediation(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const [open, setOpen] = React.useState(false);
  const [remediationList, setRemediationList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/remediations`);
      const workingData = response.data.data.data;
      workingData.map((remediation) => {
        allData.push({
          id: remediation._id,
          product: remediation.product,
          inventory: remediation.inventory,
          location: remediation.location,
          quantity: remediation.quantity,
          unit: remediation.unit,
          totalProductCost: remediation.totalProductCost,
          totalRemediationCost: remediation.totalRemediationCost,
          sku: remediation.sku,
          barcode: remediation.barcode,
          addedBy: remediation.addedBy,
          dateAdded: remediation.dateAdded,
          batchNumber: remediation.batchNumber,
          reason: remediation.reason,
          remark: remediation.remark,
        });
      });
      setRemediationList(allData);
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
        headerName: "Inventory Before Remediation",
        width: 250,

        //editable: true,
      },

      {
        field: "quantity",
        headerName: "Quantity for Remediation",
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
      // {
      //   field: "transferaction",
      //   headerName: "",
      //   width: 30,
      //   description: "Update row",
      //   renderCell: (params) => (
      //     <strong>
      //       {/* {params.value.getFullYear()} */}
      //       <TransferWithinAStationIcon
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
      //   field: "editaction",
      //   headerName: "",
      //   width: 30,
      //   description: "Update row",
      //   renderCell: (params) => (
      //     <strong>
      //       {/* {params.value.getFullYear()} */}
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
      //   field: "delistaction",
      //   headerName: "",
      //   width: 30,
      //   description: "Update row",
      //   renderCell: (params) => (
      //     <strong>
      //       {/* {params.value.getFullYear()} */}
      //       <PlaylistRemoveIcon
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

    remediationList.map((remediation, index) => {
      let row = {
        numbering: ++counter,
        id: remediation.id,
        product: remediation.product[0].name.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),
        batchNumber: remediation.batchNumber.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),
        sku: remediation.sku.toUpperCase(),
        barcode: remediation.barcode.toUpperCase(),
        location: remediation.location[0].name,
        quantity: remediation.quantity + " " + remediation.unit + "s",
        totalRemediationCost: remediation.totalRemediationCost,
        totalProductCost: remediation.totalProductCost,
        inventory:
          remediation.inventory[0].remainingQuantity +
          " " +
          remediation.inventory[0].unit +
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
            <Grid item xs={9}>
              {/* <Item>xs=8</Item> */}
              <Typography variant="h4">Remediation</Typography>
            </Grid>
            <Grid item xs={3}>
              <div>
                <Stack direction="row" spacing={1.5}>
                  <Button variant="contained" onClick={handleOpen}>
                    Remediate
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={open}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setOpen(false)]}
                  >
                    <DialogContent>
                      <RemediationForm
                      // token={token}
                      // userId={userId}
                      // handleDialogOpenStatus={handleDialogOpenStatus}
                      // handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
                      // handleFailedSnackbar={handleFailedSnackbar}
                      />
                    </DialogContent>
                  </Dialog>
                  <Button variant="contained" onClick={handleOpen}>
                    Delist
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={open}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setOpen(false)]}
                  >
                    <DialogContent>
                      <RemediationForm
                      // token={token}
                      // userId={userId}
                      // handleDialogOpenStatus={handleDialogOpenStatus}
                      // handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
                      // handleFailedSnackbar={handleFailedSnackbar}
                      />
                    </DialogContent>
                  </Dialog>
                  <Button variant="contained" onClick={handleOpen}>
                    Edit
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={open}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setOpen(false)]}
                  >
                    <DialogContent>
                      <RemediationForm
                      // token={token}
                      // userId={userId}
                      // handleDialogOpenStatus={handleDialogOpenStatus}
                      // handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
                      // handleFailedSnackbar={handleFailedSnackbar}
                      />
                    </DialogContent>
                  </Dialog>
                </Stack>
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

export default Remediation;
