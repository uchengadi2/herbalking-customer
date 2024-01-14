import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ViewListIcon from "@mui/icons-material/ViewList";
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

function Orders(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [transactionList, setTransactionList] = useState([]);
  const [currencyName, setCurrencyName] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/transactions`, {
        params: { shopType: "affiliate" },
      });
      const workingData = response.data.data.data;
      workingData.map((transaction) => {
        allData.push({
          id: transaction._id,
          orderNumber: transaction.orderNumber,
          currency: transaction.currency,
          totalDeliveryCost: transaction.totalDeliveryCost,
          totalProductCost: transaction.totalProductCost,
          transactionDate: transaction.transactionDate,
          orderedBy: transaction.orderedBy,
          paymentStatus: transaction.paymentStatus,
          paymentMethod: transaction.paymentMethod,
          status: transaction.status,
          rejectionReason: transaction.rejectionReason,
          customerName: transaction.customerName,
          customerPhoneNumber: transaction.customerPhoneNumber,
          customerEmailAddress: transaction.customerEmailAddress,
          customerEmailAddress: transaction.customerEmailAddress,
          recipientName: transaction.recipientName,
          recipientPhoneNumber: transaction.recipientPhoneNumber,
          recipientEmailAddress: transaction.recipientEmailAddress,
          recipientAddress: transaction.recipientAddress,
          nearestBusstop: transaction.nearestBusstop,
          postalCode: transaction.postalCode,
          recipientCountry: transaction.recipientCountry,
          recipientState: transaction.recipientState,
          recipientCity: transaction.recipientCity,
          vatRate: transaction.vatRate,
          vat: transaction.vat,
          totalWeight: transaction.totalWeight,
          payOnDeliveryMaxWeightInKg: transaction.payOnDeliveryMaxWeightInKg,
          implementVatCollection: transaction.implementVatCollection,
          salesTax: transaction.salesTax,
          revenue: transaction.revenue,
          origin: transaction.origin,
          allowOriginSalesTax: transaction.allowOriginSalesTax,
          implementSalesTaxCollection: transaction.implementSalesTaxCollection,
          deliveryStatus: transaction.deliveryStatus,
          deliveryMode: transaction.deliveryMode,
          daysToDelivery: transaction.daysToDelivery,
          recipientCountryName: transaction.recipientCountryName,
          recipientStateName: transaction.recipientStateName,
          recipientCityName: transaction.recipientCityName,
          shopType: transaction.shopType,
        });
      });
      setTransactionList(allData);
      //setCurrencyName(allData[0].currency.name.toLowerCase());

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

  const getCurrencyCode = () => {
    if (currencyName) {
      if (currencyName.toLowerCase() === "naira") {
        return <span>&#8358;</span>;
      } else {
        return;
      }
    }
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
        field: "transactionDate",
        headerName: "Transaction Date",
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
        field: "status",
        headerName: "Status",
        width: 150,

        //editable: true,
      },
      {
        field: "totalProductCost",
        headerName: `Total Product Cost`,
        width: 180,

        //editable: true,
      },
      {
        field: "totalDeliveryCost",
        headerName: `Total Delivery Cost`,
        width: 180,

        //editable: true,
      },
      {
        field: "deliveryStatus",
        headerName: `Delivery Status`,
        width: 180,

        //editable: true,
      },
      {
        field: "deliveryMode",
        headerName: `Delivery Mode`,
        width: 180,

        //editable: true,
      },
      {
        field: "daysToDelivery",
        headerName: `Days To Delivery`,
        width: 180,

        //editable: true,
      },
      {
        field: "paymentMethod",
        headerName: `Payment Method`,
        width: 180,

        //editable: true,
      },
      {
        field: "orderaction",
        headerName: "",
        width: 30,
        description: "transaction row",
        renderCell: (params) => (
          <strong>
            {/* {params.value.getFullYear()} */}
            <ViewListIcon
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

    transactionList.map((transaction, index) => {
      let row = {
        numbering: ++counter,
        id: transaction.id,
        orderNumber: transaction.orderNumber.toUpperCase(),
        totalProductCost: transaction.totalProductCost,
        totalDeliveryCost: transaction.totalDeliveryCost,
        transactionDate: transaction.transactionDate
          ? new Date(transaction.transactionDate).toLocaleDateString()
          : "",
        status: transaction.status.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),
        shopType: transaction.shopType.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),
        deliveryStatus: transaction.deliveryStatus.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),
        deliveryMode: transaction.deliveryMode.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),
        daysToDelivery: transaction.daysToDelivery.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),
        paymentMethod: transaction.paymentMethod.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),
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
              <Typography variant="h4">Transactions</Typography>
            </Grid>
            <Grid item xs={2}>
              <div>
                <Button variant="contained" onClick={handleOpen}>
                  Process Order
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

export default Orders;
