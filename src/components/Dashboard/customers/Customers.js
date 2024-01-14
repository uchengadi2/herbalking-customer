import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import api from "./../../../apis/local";
import AddCustomerForm from "./AddCustomerForm";

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

function Customers(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const [open, setOpen] = React.useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/users`, {
        params: { type: "customer" },
      });
      const workingData = response.data.data.data;
      workingData.map((user) => {
        allData.push({
          id: user._id,
          name: user.name,
          email: user.email,
          type: user.type,
          role: user.role,
          phoneNumber: user.phoneNumber,
        });
      });
      setCustomerList(allData);
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
        headerName: "Customer Name",
        width: 250,

        //editable: true,
      },
      {
        field: "email",
        headerName: "Customer Email",
        width: 250,
        //editable: true,
      },
      {
        field: "phoneNumber",
        headerName: "Customer Phone Number",
        width: 250,
        //editable: true,
      },
      {
        field: "role",
        headerName: "Role",
        //type: "number",
        width: 150,
        //editable: true,
      },
      {
        field: "type",
        headerName: "Type",
        //sortable: false,
        width: 150,
      },
    ];

    customerList.map((customer, index) => {
      let row = {
        numbering: ++counter,
        id: customer.id,
        type: customer.type,
        name: customer.name.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        role: customer.role,
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
            </Grid>
            <Grid item xs={2}>
              <div>
                <Button variant="contained" onClick={handleOpen}>
                  Add Customer
                </Button>
                <Dialog
                  //style={{ zIndex: 1302 }}
                  fullScreen={matchesXS}
                  open={open}
                  // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                  onClose={() => [setOpen(false)]}
                >
                  <DialogContent>
                    <AddCustomerForm
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

export default Customers;
