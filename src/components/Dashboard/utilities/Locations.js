import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
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
import AddLocationForm from "./AddLocationForm";

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

function Locations(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const [open, setOpen] = React.useState(false);

  const [locationList, setLocationList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/locations`);
      const workingData = response.data.data.data;
      workingData.map((location) => {
        allData.push({
          id: location._id,
          name: location.name,
          refNumber: location.refNumber,
          type: location.type,
          description: location.description,
          country: location.country,
          state: location.state,
          city: location.city,
          address: location.address,
          contactPerson: location.contactPerson,
          contactPersonEmail: location.contactPersonEmail,
          contactPhoneNumber: location.contactPhoneNumber,
          region: location.region,
        });
      });
      setLocationList(allData);
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
        field: "name",
        headerName: "Location Name",
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
        field: "region",
        headerName: "Region",
        sortable: false,
        width: 250,
        // valueGetter: (params) =>
        //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
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
      {
        field: "state",
        headerName: "State/Region",
        sortable: false,
        width: 250,
      },
      {
        field: "city",
        headerName: "City",
        sortable: false,
        width: 250,
      },
    ];

    locationList.map((location, index) => {
      let row = {
        numbering: ++counter,
        id: location.id,
        refNumber: location.refNumber,
        type: location.type,
        name: location.name
          ? location.name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        region: location.region
          ? location.region.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        address: location.address
          ? location.address.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        city: location.city[0].name
          ? location.city[0].name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        state: location.city[0].state[0].name
          ? location.city[0].state[0].name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        country: location.city[0].country[0].name
          ? location.city[0].country[0].name.replace(
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
              <Typography variant="h4">Locations</Typography>
            </Grid>
            <Grid item xs={2}>
              <div>
                <Button variant="contained" onClick={handleOpen}>
                  Add Location
                </Button>
                <Dialog
                  //style={{ zIndex: 1302 }}
                  fullScreen={matchesXS}
                  open={open}
                  // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                  onClose={() => [setOpen(false)]}
                >
                  <DialogContent>
                    <AddLocationForm
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

export default Locations;
