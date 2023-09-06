import React, { useState, useRef, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import api from "./../../apis/local";
import {
  CREATE_ORDER,
  DELETE_CART,
  CREATE_TRANSACTION,
  FETCH_TRANSACTION,
} from "../../actions/types";
import CheckoutPage from "./CheckoutPage";
import Paystack from "../../Paystack";
import history from "../../history";
import ThankYou from "../thankyou/ThankYou";

const useStyles = makeStyles((theme) => ({
  root: {
    //width: 600,
    marginLeft: 15,
    height: 350,
  },
  rootMobile: {
    maxWidth: "100%",
    //height: 440,
    height: 950,
    width: "100%",

    //marginLeft: "-10px",
    //borderRadius: 30,
    marginTop: "2em",
    marginBottom: "3em",
    padding: 0,
    backgroundColor: "#FFFFFF",

    "&:hover": {
      //border: "solid",
      //borderColor: theme.palette.common.grey,
    },
  },
  formStyles: {
    width: 600,
  },

  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 180,
    marginLeft: 200,
    marginTop: 10,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  submitAuditButton: {
    borderRadius: 10,
    height: 40,
    width: 280,
    marginLeft: 150,
    marginTop: 10,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  submitButtonMobile: {
    borderRadius: 10,
    height: 40,
    width: 180,
    marginLeft: 150,
    marginTop: 10,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },

  submitAuditButtonMobile: {
    borderRadius: 10,
    height: 40,
    width: 250,
    marginLeft: 70,
    marginTop: 10,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  offDeliveryLocationButton: {
    borderRadius: 10,
    height: 40,
    width: 220,
    marginLeft: 60,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  checkout: {
    borderRadius: 10,
    height: 40,
    width: 190,
    marginLeft: 80,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  bankDetails: {
    fontSize: 12,
    marginBottom: 4,
    padding: 10,
  },
  info: {
    fontSize: 15,
    marginBottom: 4,
    padding: 10,
  },
}));

const renderRecipientNameField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      error={touched && invalid}
      //placeholder="category description"
      variant="outlined"
      helperText="Recipient Name"
      label={label}
      id={input.name}
      name={input.name}
      fullWidth
      type={type}
      //style={{ marginTop: 10, width: 600 }}
      onChange={input.onChange}
      InputProps={{
        inputProps: {
          min: 1,
          style: {
            height: 1,
            //fontSize: "2em",
          },
        },
      }}
    />
  );
};

const renderRecipientAddressField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      error={touched && invalid}
      //placeholder="category description"
      variant="outlined"
      helperText="Recipient Address"
      label={label}
      id={input.name}
      name={input.name}
      fullWidth
      type={type}
      //style={{ marginTop: 10, width: 300 }}
      onChange={input.onChange}
      multiline
      minRows={4}
    />
  );
};

const renderRecipientPhoneNumberField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      error={touched && invalid}
      //placeholder="category description"
      variant="outlined"
      helperText="Recipient Phone Number"
      label={label}
      id={input.name}
      name={input.name}
      fullWidth
      type={type}
      //style={{ marginTop: 10, width: 300 }}
      onChange={input.onChange}
      InputProps={{
        inputProps: {
          min: 1,
          style: {
            height: 1,
            //fontSize: "2em",
          },
        },
      }}
    />
  );
};

function CheckoutDeliveryAndPayment(props) {
  const theme = useTheme();
  const { totalCost, currency, token, userId } = props;
  const [quantity, setQuantity] = useState(+props.quantity);
  const [productQuantityInCart, setProductQuantityInCart] = useState();
  const [productLocation, setProductLocation] = useState();
  const [productLocationCountry, setProductLocationCountry] = useState();
  const [cartHolder, setCartHolder] = useState();
  const [cartId, setCartId] = useState();
  const [location, setLocation] = useState();
  const [country, setCountry] = useState();
  const [recipientName, setRecipientName] = useState();
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState();
  const [recipientAddress, setRecipientAddress] = useState();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const [isVisible, setIsVisible] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("audit");
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
  const [provideDeliveryCost, setProvideDeliveryCost] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const [ordered, setOrdered] = useState(false);
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);
  const [customerEmail, setCustomerEmail] = useState();
  const [customerName, setCustomerName] = useState();
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState();
  const [currencyName, setCurrencyName] = useState("naira");
  const [total, setTotal] = useState();
  const [ukRate, setUkRate] = useState(650);
  const [usRate, setUsRate] = useState(560);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [orderNumber, setOrderNumber] = useState(
    "OR-" + Math.floor(Math.random() * 10000000000000) + "-" + "ES"
  );

  const dispatch = useDispatch();

  const classes = useStyles();
  // const [total, setTotal] = useState(
  //   price
  //     ? (+props.quantity * price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
  //     : 0
  // );
  const [loading, setLoading] = useState();

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  //get the email address of the customer

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/users/${props.userId}`);
      const user = response.data.data.data;
      allData.push({
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phoneNumber,
      });
      setCustomerEmail(allData[0].email);
      setCustomerName(allData[0].name);
      setCustomerPhoneNumber(allData[0].phone);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  console.log("props.courseList.length:", props.courseList.length);

  const onRecipientNameChange = (e) => {
    setRecipientName(e.target.value);
  };

  const onRecipientPhoneNumberChange = (e) => {
    setRecipientPhoneNumber(e.target.value);
  };

  const onRecipientAddressChange = (e) => {
    setRecipientAddress(e.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    if (event.target.value === productLocation) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    setIsCheckoutVisible(false);
    setProvideDeliveryCost(true);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    if (event.target.value === "card") {
      setIsOnlinePayment(true);
    } else {
      setIsOnlinePayment(false);
    }
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  //get the state list
  const renderLocationList = () => {
    return stateList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the country list
  const renderCountryList = () => {
    return countryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
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

  const renderProductCountryField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined">
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="locationCountry"
            id="locationCountry"
            value={country}
            onChange={handleCountryChange}
            label="Country"
            style={
              matchesMD
                ? { width: 350, marginLeft: 0, height: 38 }
                : { width: 350, height: 38, marginTop: 10 }
            }
            //{...input}
          >
            {renderCountryList()}
          </Select>
          <FormHelperText>Country</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderProductLocationField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined">
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="location"
            id="location"
            value={location}
            onChange={handleLocationChange}
            label="Location"
            style={
              matchesMD
                ? { width: 415, marginLeft: 20, height: 38 }
                : { width: 350, height: 38, marginTop: 10 }
            }
            //{...input}
          >
            {renderLocationList()}
          </Select>
          <FormHelperText style={{ marginLeft: 0 }}>
            State/Region
          </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderPaymentMethodField = () => {
    return (
      <Box>
        <FormControl variant="outlined" className={classes.accountType}>
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="paymentMethod"
            id="paymentMethod"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            label="Payment Method"
            style={{ height: 38, width: 300, marginTop: 0, marginLeft: 10 }}
          >
            <MenuItem value={"audit"}>Audit Course(s) for Free</MenuItem>
            <MenuItem value={"card"}>Credit/Debit Card</MenuItem>
            <MenuItem value={"foreigner"}>Foreigner</MenuItem>
          </Select>
          <FormHelperText>
            Payment Method (Choose "Credit/Debit Card" if you are paying with
            'Naira' otherwise choose 'Foreigner'")
          </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  let totalDeliveryCost = 0;

  const totalProductCost = parseFloat(totalCost) + totalDeliveryCost;
  const totalProductCostForUk = totalProductCost / +ukRate;
  const totalProductCostForUS = totalProductCost / +usRate;
  const totalProductCostForDisplay = totalProductCost
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  const totalProductCostForUkForDisplay = totalProductCostForUk
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  const totalProductCostForUsForDisplay = totalProductCostForUS
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  const totalDeliveryCostForDisplay = totalDeliveryCost
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");

  const amountForPayment = +totalProductCost.toFixed(2) * 100;

  const buttonContent = () => {
    return <React.Fragment>Make Payment</React.Fragment>;
  };

  const buttonAuditContent = () => {
    return (
      <React.Fragment>
        {props.courseList.length === 1
          ? "Audit this Course for FREE"
          : "Audit these Courses for FREE"}
      </React.Fragment>
    );
  };

  const renderThankYou = () => {
    return <ThankYou />;
  };

  const onSubmit = () => {
    setLoading(true);

    if (!paymentMethod) {
      props.handleFailedSnackbar("the payment method field cannot be empty");
      setLoading(false);
      return;
    }

    const transData = {
      orderNumber: orderNumber,
      recipientName: customerName,
      recipientPhoneNumber: customerPhoneNumber,
      recipientEmailAddress: customerEmail,
      totalDeliveryCost: totalDeliveryCost ? totalDeliveryCost.toFixed(2) : 0,
      totalProductCost: totalProductCost,
      totalProductCostUk: totalProductCostForUk,
      totalProductCostUs: totalProductCostForUS,

      paymentMethod: paymentMethod,
      paymentStatus: "to-be-confirmed",
      orderedBy: props.userId,
      productCurrency: "Pound Sterling or US Dollars",
    };

    //write to the transaction table first
    if (transData) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/transactions`, transData);

        const transId = response.data.data.data.id;

        if (response.data.status === "success") {
          dispatch({
            type: CREATE_TRANSACTION,
            payload: response.data.data.data,
          });

          setLoading(false);

          props.courseList.map((cart, index) => {
            const data = {
              orderNumber: orderNumber,
              transactionId: transId,
              product: cart.course,
              orderedPrice: cart.price,
              recipientName: customerName,
              recipientPhoneNumber: customerPhoneNumber,
              recipientEmailAddress: customerEmail,
              preferredStartDate: cart.preferredStartDate,

              totalDeliveryCost: totalDeliveryCost
                ? totalDeliveryCost.toFixed(2)
                : 0,
              totalProductCostUk: totalProductCostForUk,
              totalProductCostUs: totalProductCostForUS,

              totalProductCost: totalProductCost,

              cartId: cart.id,
              quantityAdddedToCart: cart.quantity,
              orderedQuantity: cart.quantity,
              dateAddedToCart: cart.dateAddedToCart,
              productCurrency: currencyName,
              paymentMethod: paymentMethod,
              paymentStatus: "to-be-confirmed",
              orderedBy: cart.cartHolder,
            };

            if (data) {
              const createForm = async () => {
                api.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${props.token}`;
                const response2 = await api.post(`/orders`, data);

                if (response2.data.status === "success") {
                  dispatch({
                    type: CREATE_ORDER,
                    payload: response2.data.data.data,
                  });

                  setLoading(false);
                } else {
                  props.handleFailedSnackbar(
                    "Something went wrong, please try again!!!"
                  );
                }
              };
              createForm().catch((err) => {
                //props.handleFailedSnackbar();
                console.log("err:", err.message);
              });
            } else {
              //props.handleFailedSnackbar("Something went wrong, please try again!!!");
            }
          });
        } else {
          // props.handleFailedSnackbar(
          //   "Something went wrong, please try again!!!"
          // );
        }
      };
      createForm().catch((err) => {
        //props.handleFailedSnackbar();
        console.log("err:", err.message);
      });
    }

    const cartData = {
      status: "checkedout",
    };

    //change the status of this cart items
    props.courseList.map((cart, index) => {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        await api.delete(`/carts/${cart.id}`);

        dispatch({
          type: DELETE_CART,
          //payload: response2.data.data.data,
        });
      };
      createForm().catch((err) => {
        props.handleFailedSnackbar();
        console.log("err:", err.message);
      });
    });
    props.handleSuccessfulCreateSnackbar(
      `Thank you for your patronage, we will process your request as soon as possible`
    );
    history.push("/thankyou");
  };

  const onAuditSubmit = () => {
    setLoading(true);

    if (!paymentMethod) {
      props.handleFailedSnackbar("the payment method field cannot be empty");
      setLoading(false);
      return;
    }

    const transData = {
      orderNumber: orderNumber,
      recipientName: customerName,
      recipientPhoneNumber: customerPhoneNumber,
      recipientEmailAddress: customerEmail,
      totalDeliveryCost: totalDeliveryCost ? totalDeliveryCost.toFixed(2) : 0,
      totalProductCost: totalProductCost,
      totalProductCostUk: totalProductCostForUk,
      totalProductCostUs: totalProductCostForUS,

      paymentMethod: paymentMethod,
      paymentStatus: "to-be-confirmed",
      orderedBy: props.userId,
      productCurrency: "any",
    };

    //write to the transaction table first
    if (transData) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/transactions`, transData);

        const transId = response.data.data.data.id;

        if (response.data.status === "success") {
          dispatch({
            type: CREATE_TRANSACTION,
            payload: response.data.data.data,
          });

          setLoading(false);

          props.courseList.map((cart, index) => {
            const data = {
              orderNumber: orderNumber,
              transactionId: transId,
              product: cart.course,
              orderedPrice: cart.price,
              recipientName: customerName,
              recipientPhoneNumber: customerPhoneNumber,
              recipientEmailAddress: customerEmail,
              //preferredStartDate: cart.preferredStartDate,

              totalDeliveryCost: totalDeliveryCost
                ? totalDeliveryCost.toFixed(2)
                : 0,
              totalProductCostUk: totalProductCostForUk,
              totalProductCostUs: totalProductCostForUS,

              totalProductCost: totalProductCost,

              cartId: cart.id,
              quantityAdddedToCart: cart.quantity,
              orderedQuantity: cart.quantity,
              dateAddedToCart: cart.dateAddedToCart,
              productCurrency: "any",
              paymentMethod: paymentMethod,
              paymentStatus: "to-be-confirmed",
              orderedBy: cart.cartHolder,
            };

            if (data) {
              const createForm = async () => {
                api.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${props.token}`;
                const response2 = await api.post(`/orders`, data);

                if (response2.data.status === "success") {
                  dispatch({
                    type: CREATE_ORDER,
                    payload: response2.data.data.data,
                  });

                  setLoading(false);
                } else {
                  props.handleFailedSnackbar(
                    "Something went wrong, please try again!!!"
                  );
                }
              };
              createForm().catch((err) => {
                //props.handleFailedSnackbar();
                console.log("err:", err.message);
              });
            } else {
              //props.handleFailedSnackbar("Something went wrong, please try again!!!");
            }
          });
        } else {
          // props.handleFailedSnackbar(
          //   "Something went wrong, please try again!!!"
          // );
        }
      };
      createForm().catch((err) => {
        //props.handleFailedSnackbar();
        console.log("err:", err.message);
      });
    }

    const cartData = {
      status: "checkedout",
    };

    //change the status of this cart items
    props.courseList.map((cart, index) => {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        await api.delete(`/carts/${cart.id}`);

        dispatch({
          type: DELETE_CART,
          //payload: response2.data.data.data,
        });
      };
      createForm().catch((err) => {
        props.handleFailedSnackbar();
        console.log("err:", err.message);
      });
    });
    props.handleSuccessfulCreateSnackbar(
      `Thank you for your patronage, see you in class `
    );
    history.push("/thankyou");
  };

  const renderOnlinePayment = (
    email,
    amount,
    orderNumber,
    phoneNumber,
    name
  ) => {
    const data = {
      orderNumber: orderNumber,

      recipientName: name,
      recipientPhoneNumber: phoneNumber,
      recipientEmailAddress: email,

      totalDeliveryCost: totalDeliveryCost ? totalDeliveryCost.toFixed(2) : 0,
      totalProductCost: totalProductCost ? totalProductCost.toFixed(2) : 0,
      totalProductCostUk: totalProductCostForUk,

      totalProductCostUs: totalProductCostForUS,
      productCurrency: currencyName,
      paymentMethod: paymentMethod,
      paymentStatus: "to-be-confirmed",
      orderedBy: props.userId,
    };
    return (
      <Paystack
        email={email}
        amount={parseInt(amount)}
        text={"Make Payment"}
        orderNumber={orderNumber}
        data={data}
        productList={props.courseList}
        token={props.token}
        handleSuccessfulCreateSnackbar={props.handleSuccessfulCreateSnackbar}
        handleFailedSnackbar={props.handleFailedSnackbar}
      />
    );
  };

  return (
    <>
      {matchesMD ? (
        <Grid container direction="row" className={classes.root}>
          <Grid
            item
            container
            style={{
              width: "60%",
              marginLeft: 5,
              border: "1px dashed grey",
              padding: 15,
            }}
          >
            <Grid
              item
              container
              direction="column"
              style={{ marginTop: 10, marginBottom: 10 }}
              justifyContent="center"
            >
              <Box
                sx={{
                  //width: 1200,
                  //height: 450,
                  width: "80%",
                }}
                noValidate
                autoComplete="off"
              >
                <Typography variant="h5">
                  Enrolling from the United Kingdom:
                </Typography>
                <Typography>
                  <strong>Expected Amount:</strong> &nbsp; &nbsp; &#163;
                  {totalProductCostForUkForDisplay}
                </Typography>
                <Typography>
                  <strong>Pay To:</strong>
                </Typography>
                <Typography>
                  <strong>Beneficiary:</strong> &nbsp; &nbsp; ControlSoft
                  Limited
                </Typography>
                <Typography>
                  <strong>Bank Name: </strong>&nbsp; &nbsp; Barclays Bank
                </Typography>
                <Typography>
                  <strong>Account Number: </strong>&nbsp; &nbsp; 02313927
                </Typography>
                <Typography>
                  <strong>Sort Code:</strong> &nbsp; &nbsp; 231486
                </Typography>
                <Typography style={{ marginTop: 15 }}>
                  Send proof of payment to: &nbsp; &nbsp; payment@nextchamp.co
                </Typography>

                <Typography>
                  =======================================================================================
                </Typography>

                <Typography variant="h5">
                  Enrolling from the United States or Other Countries outside
                  Nigeria:
                </Typography>
                <Typography>
                  <strong>Expected Amount:</strong>&nbsp; &nbsp; $
                  {totalProductCostForUsForDisplay}
                </Typography>
                <Typography>
                  <strong>Pay To:</strong>
                </Typography>
                <Typography>
                  <strong>Beneficiary:</strong> &nbsp; &nbsp; ControlSoft
                  Limited
                </Typography>
                <Typography>
                  <strong>Bank Name: </strong>&nbsp; &nbsp; First Century Bank
                </Typography>
                <Typography>
                  <strong>Account Number: </strong>&nbsp; &nbsp; 4010187581108
                </Typography>
                <Typography>
                  <strong>Routing (ABA):</strong> &nbsp; &nbsp; 061120084
                </Typography>
                <Typography style={{ marginTop: 15 }}>
                  Send proof of payment to: &nbsp; &nbsp; payment@nextchamp.co
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            container
            style={{
              width: "35%",
              marginLeft: 15,
              border: "1px dashed grey",
              padding: 15,
            }}
          >
            <Typography
              style={{
                width: 300,
                fontSize: 20,
                marginTop: 15,
                marginLeft: 10,
              }}
            >
              Total Cost:{getCurrencyCode()}
              {totalProductCostForDisplay}
            </Typography>

            {renderPaymentMethodField()}
            {!isOnlinePayment && paymentMethod === "foreigner" && (
              <Typography className={classes.bankDetails}>
                Make payment to the accounts as detailed on the adjacent blocks
              </Typography>
            )}
            {!isOnlinePayment && paymentMethod === "foreigner" && (
              <Button
                variant="contained"
                className={classes.submitButton}
                onClick={onSubmit}
              >
                {loading ? (
                  <CircularProgress size={30} color="inherit" />
                ) : (
                  buttonContent()
                )}
              </Button>
            )}

            {!isOnlinePayment && paymentMethod === "audit" && (
              <Button
                variant="contained"
                className={classes.submitAuditButton}
                onClick={onAuditSubmit}
              >
                {loading ? (
                  <CircularProgress size={30} color="inherit" />
                ) : (
                  buttonAuditContent()
                )}
              </Button>
            )}

            {isOnlinePayment &&
              renderOnlinePayment(
                customerEmail,
                amountForPayment,
                orderNumber,
                customerPhoneNumber,
                customerName
              )}
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="column" className={classes.rootMobile}>
          <Grid
            item
            container
            style={{
              //width: "60%",
              marginLeft: 15,
              border: "1px dashed grey",
              padding: 15,
            }}
          >
            <Grid
              item
              container
              direction="column"
              style={{ marginTop: 10, marginBottom: 10 }}
              justifyContent="center"
            >
              <Box
                sx={{
                  //width: 1200,
                  //height: 450,
                  width: "80%",
                }}
                noValidate
                autoComplete="off"
              >
                <Typography variant="h5">
                  Enrolling from the United Kingdom? Use the details below:
                </Typography>
                <Typography>
                  <strong>Expected Amount:</strong> &nbsp; &nbsp; &#163;
                  {totalProductCostForUkForDisplay}
                </Typography>
                <Typography>
                  <strong>Pay To:</strong>
                </Typography>
                <Typography>
                  <strong>Beneficiary:</strong> &nbsp; &nbsp; ControlSoft
                  Limited
                </Typography>
                <Typography>
                  <strong>Bank Name: </strong>&nbsp; &nbsp; Barclays Bank
                </Typography>
                <Typography>
                  <strong>Account Number: </strong>&nbsp; &nbsp; 02313927
                </Typography>
                <Typography>
                  <strong>Sort Code:</strong> &nbsp; &nbsp; 231486
                </Typography>
                <Typography style={{ marginTop: 15 }}>
                  Send proof of payment to: &nbsp; &nbsp; payment@nextchamp.co
                </Typography>

                <Typography>=====================================</Typography>

                <Typography variant="h5">
                  Enrolling from the United States or Other Countries outside
                  Nigeria? Use the details below:
                </Typography>
                <Typography>
                  <strong>Expected Amount:</strong>&nbsp; &nbsp; $
                  {totalProductCostForUsForDisplay}
                </Typography>
                <Typography>
                  <strong>Pay To:</strong>
                </Typography>
                <Typography>
                  <strong>Beneficiary:</strong> &nbsp; &nbsp; ControlSoft
                  Limited
                </Typography>
                <Typography>
                  <strong>Bank Name: </strong>&nbsp; &nbsp; First Century Bank
                </Typography>
                <Typography>
                  <strong>Account Number: </strong>&nbsp; &nbsp; 4010187581108
                </Typography>
                <Typography>
                  <strong>Routing (ABA):</strong> &nbsp; &nbsp; 061120084
                </Typography>
                <Typography style={{ marginTop: 15 }}>
                  Send proof of payment to: &nbsp; &nbsp; payment@nextchamp.co
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Grid
            item
            container
            style={{
              // width: "34%",
              marginLeft: 15,
              border: "1px dashed grey",
              padding: 15,
            }}
          >
            <Typography
              style={{
                width: 300,
                fontSize: 20,
                marginTop: 15,
                marginLeft: 10,
              }}
            >
              Total Cost:{getCurrencyCode()}
              {totalProductCostForDisplay}
            </Typography>

            {renderPaymentMethodField()}
            {!isOnlinePayment && paymentMethod && (
              <Typography className={classes.bankDetails}>
                Make payment to the accounts as detailed on the adjacent blocks
              </Typography>
            )}
            {!isOnlinePayment && paymentMethod === "foreigner" && (
              <Button
                variant="contained"
                className={classes.submitButtonMobile}
                onClick={[onSubmit, <ThankYou />]}
              >
                {loading ? (
                  <CircularProgress size={30} color="inherit" />
                ) : (
                  buttonContent()
                )}
              </Button>
            )}
            {!isOnlinePayment && paymentMethod === "audit" && (
              <Button
                variant="contained"
                className={classes.submitAuditButtonMobile}
                onClick={onAuditSubmit}
              >
                {loading ? (
                  <CircularProgress size={30} color="inherit" />
                ) : (
                  buttonAuditContent()
                )}
              </Button>
            )}

            {isOnlinePayment &&
              renderOnlinePayment(customerEmail, amountForPayment, orderNumber)}
            {isSuccessful && <ThankYou />}
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default reduxForm({
  form: "checkoutDeliveryAndPayment",
})(CheckoutDeliveryAndPayment);
