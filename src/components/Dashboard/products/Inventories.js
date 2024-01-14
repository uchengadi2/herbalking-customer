import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RedeemIcon from "@mui/icons-material/Redeem";
import Divider from "@mui/material/Divider";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
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

function Inventories(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [inventoryList, setInventoryList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/inventories`);
      const workingData = response.data.data.data;
      workingData.map((inventory) => {
        allData.push({
          id: inventory._id,
          product: inventory.product,
          onboardProduct: inventory.onboardProduct,
          location: inventory.location,
          batchNumber: inventory.batchNumber,
          totalQuantity: inventory.totalQuantity,
          remainingQuantity: inventory.remainingQuantity,
          totalCost: inventory.totalCost,
          sku: inventory.sku,
          barcode: inventory.barcode,
          costPerItem: inventory.costPerItem,
          deliveryCost: inventory.deliveryCost,
          source: inventory.source,
          hasVariant: inventory.hasVariant,
          hasSizeVariant: inventory.hasSizeVariant,
          hasColourVariant: inventory.hasColourVariant,
          hasMaterialVariant: inventory.hasMaterialVariant,
          hasStyleVariant: inventory.hasStyleVariant,
          variant: inventory.variant,
          dateOnBoarded: inventory.dateOnBoarded,
          dateCreated: inventory.dateCreated,
          createdBy: inventory.createdBy,
        });
      });
      setInventoryList(allData);
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
        field: "batchNumber",
        headerName: "Batch Number",
        width: 150,

        //editable: true,
      },
      {
        field: "location",
        headerName: "Location",
        width: 250,

        //editable: true,
      },
      {
        field: "product",
        headerName: "Product",
        width: 350,

        //editable: true,
      },
      {
        field: "totalQuantity",
        headerName: "Total Quantity Supplied",
        width: 200,

        //editable: true,
      },
      {
        field: "remainingQuantity",
        headerName: "Remaining Quantity",
        width: 150,

        //editable: true,
      },
      {
        field: "sku",
        headerName: "Sku",
        width: 100,

        //editable: true,
      },
      {
        field: "barcode",
        headerName: "Barcode",
        width: 100,

        //editable: true,
      },
      // {
      //   field: "redeemaction",
      //   headerName: "",
      //   width: 30,
      //   description: "Redeem Product",
      //   renderCell: (params) => (
      //     <strong>

      //       <RedeemIcon
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
      //   description: "Delist Product",
      //   renderCell: (params) => (
      //     <strong>

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

    inventoryList.map((inventory, index) => {
      let row = {
        numbering: ++counter,
        id: inventory.id,
        product: inventory.onboardProduct[0].product[0].name.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),
        batchNumber: inventory.batchNumber.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),
        sku: inventory.sku.toUpperCase(),
        barcode: inventory.barcode.toUpperCase(),
        location: inventory.location[0].name,
        totalQuantity: inventory.totalQuantity,
        remainingQuantity: inventory.remainingQuantity,
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
            <Grid item xs={9.5}>
              <Typography variant="h4">Inventories</Typography>
            </Grid>

            <Grid item xs={2.5}>
              <div>
                <Stack direction="row" spacing={1.5}>
                  <Button variant="contained" onClick={handleOpen}>
                    Remediate
                  </Button>

                  {/* <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={open}
                  onClick={handleClose}
                >
                 
                </Backdrop> */}

                  <Button variant="contained" onClick={handleOpen}>
                    Delist
                  </Button>
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

export default Inventories;
