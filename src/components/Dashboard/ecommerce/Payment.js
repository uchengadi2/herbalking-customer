import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ViewListIcon from "@mui/icons-material/ViewList";
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

function Payments(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [paymentsList, setPaymentsList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/payments`, {
        params: { shopType: "online" },
      });
      const workingData = response.data.data.data;
      workingData.map((payment) => {
        allData.push({
          id: payment._id,
          orderNumber: payment.orderNumber,
          transaction: payment.transaction,
          customer: payment.customer,
          totalProductAmount: payment.totalProductAmount,
          amountPaid: payment.amountPaid,
          amountAlreadyPaid: payment.amountAlreadyPaid,
          totalDeliveryCost: payment.totalDeliveryCost,
          paymentCurrency: payment.paymentCurrency,
          paymentConfirmationStatus: payment.paymentConfirmationStatus,
          paymentConfirmedBy: payment.paymentConfirmedBy,
          datePosted: payment.datePosted,
          paymentDate: payment.paymentDate,
          shopType: payment.shopType,
          deliveryMode: payment.deliveryMode,
        });
      });
      setPaymentsList(allData);
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
        field: "paymentDate",
        headerName: "Payment Date",
        width: 150,

        //editable: true,
      },
      {
        field: "orderNumber",
        headerName: "Order Number",
        width: 150,

        //editable: true,
      },
      {
        field: "shopType",
        headerName: "Transaction From",
        width: 150,

        //editable: true,
      },
      {
        field: "paymentConfirmationStatus",
        headerName: `Payment Confirmation Status`,
        width: 180,

        //editable: true,
      },
      {
        field: "deliveryMode",
        headerName: `Delivery Mode`,
        width: 180,

        //editable: true,
      },
      // {
      //   field: "transaction",
      //   headerName: "Transaction From",
      //   width: 150,

      //   //editable: true,
      // },
      {
        field: "customer",
        headerName: "Customer",
        width: 150,

        //editable: true,
      },
      {
        field: "totalProductAmount",
        headerName: `Total Product Amount`,
        width: 180,

        //editable: true,
      },
      {
        field: "totalDeliveryCost",
        headerName: `Total Delivery Cost`,
        width: 180,

        //editable: true,
      },

      // {
      //   field: "orderaction",
      //   headerName: "",
      //   width: 30,
      //   description: "transaction row",
      //   renderCell: (params) => (
      //     <strong>
      //       {/* {params.value.getFullYear()} */}
      //       <ViewListIcon
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

    paymentsList.map((payment, index) => {
      let row = {
        numbering: ++counter,
        id: payment.id,
        orderNumber: payment.orderNumber
          ? payment.orderNumber.toUpperCase()
          : "",
        totalProductAmount: payment.totalProductAmount,
        totalDeliveryCost: payment.totalDeliveryCost,
        paymentDate: payment.paymentDate
          ? new Date(payment.paymentDate).toLocaleDateString()
          : "",
        customer: payment.customer
          ? payment.customer[0].name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        shopType: payment.shopType
          ? payment.shopType.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        paymentConfirmationStatus: payment.paymentConfirmationStatus
          ? payment.paymentConfirmationStatus.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        deliveryMode: payment.deliveryMode
          ? payment.deliveryMode.replace(
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
              <Typography variant="h4">Payments</Typography>
            </Grid>
            <Grid item xs={2}>
              <div>
                <Button variant="contained" onClick={handleOpen}>
                  Process Payment
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

export default Payments;
