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
import AddStateForm from "./AddStateForm";

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

function States(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const [open, setOpen] = useState(false);
  const [stateList, setStateList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/states`);
      const workingData = response.data.data.data;
      workingData.map((state) => {
        allData.push({
          id: state._id,
          name: state.name,
          country: state.country,
          region: state.region,
          code: state.code,
        });
      });
      setStateList(allData);
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
      //{ field: "id", headerName: "ID", width: 100 },
      {
        field: "numbering",
        headerName: "S/n",
        width: 100,
      },
      {
        field: "name",
        headerName: "State",
        width: 250,

        //editable: true,
      },
      {
        field: "country",
        headerName: "Country",
        width: 250,
        //editable: true,
      },
      {
        field: "code",
        headerName: "Code",
        type: "number",
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
    ];

    stateList.map((state, index) => {
      console.log("state.country[0].name:", state.country[0].name);
      console.log("state:", state);
      let row = {
        numbering: ++counter,
        id: state.id,
        code: state.code,
        name: state.name
          ? state.name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        country: state.country[0].name
          ? state.country[0].name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        region: state.region
          ? state.region.replace(
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
              <Typography variant="h4">States/Regions</Typography>
            </Grid>
            <Grid item xs={2}>
              <div>
                <Button variant="contained" onClick={handleOpen}>
                  Add State/Region
                </Button>
                <Dialog
                  //style={{ zIndex: 1302 }}
                  fullScreen={matchesXS}
                  open={open}
                  // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                  onClose={() => [setOpen(false)]}
                >
                  <DialogContent>
                    <AddStateForm
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

export default States;
