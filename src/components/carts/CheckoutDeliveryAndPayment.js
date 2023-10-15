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
    //height: 500,
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
    marginLeft: 90,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  submitEmptyFieldButton: {
    borderRadius: 10,
    height: 40,
    width: 200,
    marginLeft: 80,
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

const renderNearestBusstopField = ({
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
      helperText="Nearest Bus Stop/Land marks(Optional)"
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

const renderPostalCodeField = ({
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
      helperText="Zip/Postal Code(Optional)"
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
  const {
    totalCost,
    currency,
    token,
    userId,
    totalWeight,
    vatRate,
    vat,
    implementVatCollection,
    policy,
    implementSalesTaxCollection,
  } = props;
  const [quantity, setQuantity] = useState(+props.quantity);
  const [productQuantityInCart, setProductQuantityInCart] = useState();
  const [productLocation, setProductLocation] = useState();
  const [productLocationCountry, setProductLocationCountry] = useState();
  const [cartHolder, setCartHolder] = useState();
  const [cartId, setCartId] = useState();
  const [location, setLocation] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();

  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const [isVisible, setIsVisible] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
  const [provideDeliveryCost, setProvideDeliveryCost] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const [ordered, setOrdered] = useState(false);
  const [isOnlinePayment, setIsOnlinePayment] = useState(true);
  const [customerEmail, setCustomerEmail] = useState();
  const [customerName, setCustomerName] = useState();
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState();
  const [currencyName, setCurrencyName] = useState();
  const [total, setTotal] = useState();
  const [ukRate, setUkRate] = useState(650);
  const [usRate, setUsRate] = useState(560);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [deliveryModeList, setDeliveryModeList] = useState([]);
  const [deliveryMode, setDeliveryMode] = useState();
  const [recipientName, setRecipientName] = useState();
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState();
  const [recipientAddress, setRecipientAddress] = useState();
  const [nearestBusstop, setNearestBusStop] = useState();
  const [postalCode, setPostalCode] = useState();

  const [orderNumber, setOrderNumber] = useState(
    "OR-" + Math.floor(Math.random() * 10000000000000) + "-" + "ES"
  );

  const [allowPayOnDelivery, setAllowPayOnDelivery] = useState(false);
  const [allowSameDayDelivery, setAllowSameDayDelivery] = useState(false);
  const [allowStandardDelivery, setAllowStandardDelivery] = useState(false);
  const [allowPriorityDelivery, setAllowPriorityDelivery] = useState(false);
  const [daysToStandardDelivery, setDaysToStandardDelivery] = useState();
  const [daysToPriorityDelivery, setDaysToPriorityDelivery] = useState();
  const [daysToSameDayDelivery, setDaysToSameDayDelivery] = useState();
  const [baseDeliveryWeight, setBaseDeliveryWeight] = useState();
  const [baseDeliveryStandardRate, setBaseDeliveryStandardRate] = useState();
  const [baseDeliveryPriorityRate, setBaseDeliveryPriorityRate] = useState();
  const [baseDeliverySameDayRate, setBaseDeliverySameDayRate] = useState();
  const [extraKgDeliveryStandardRate, setExtraKgDeliveryStandardRate] =
    useState();
  const [extraKgDeliveryPriorityRate, setExtraKgDeliveryPriorityRate] =
    useState();
  const [extraKgDeliverySameDayRate, setExtraKgDeliverySameDayRate] =
    useState();
  const [payOnDeliveryMaxWeightInKg, setPayOnDeliveryMaxWeightInKg] =
    useState();
  const [prevailingSalesTax, setPrevailingSalesTax] = useState();
  const [destinationSalesTax, setDestinationSalesTax] = useState();
  const [countryName, setCountryName] = useState();
  const [stateName, setStateName] = useState();
  const [cityName, setCityName] = useState();

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
  }, [props]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/currencies/${props.currency}`);
      const currency = response.data.data.data;

      allData.push({
        id: currency._id,
        name: currency.name,
      });
      setCurrencyName(allData[0].name);
    };

    //call the function

    fetchData().catch(console.error);
  }, [props]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/countries`);
      const workingData = response.data.data.data;
      workingData.map((country) => {
        allData.push({ id: country._id, name: country.name });
      });
      setCountryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  //get the country name
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/countries/${country}`);
      const items = response.data.data.data;
      allData.push({
        id: items._id,

        name: items.name,
      });
      setCountryName(allData[0].name);
    };

    //call the function

    fetchData().catch(console.error);
  }, [country]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/states`, {
        params: { country: country },
      });
      const workingData = response.data.data.data;
      workingData.map((state) => {
        allData.push({ id: state._id, name: state.name });
      });
      setStateList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [country]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/cities`, {
        params: { state: state },
      });
      const workingData = response.data.data.data;
      workingData.map((city) => {
        allData.push({ id: city._id, name: city.name });
      });
      setCityList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [state]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/cities/${city}`);
      const items = response.data.data.data;

      allData.push({
        id: items._id,
        allowPayOnDelivery: items.allowPayOnDelivery,
        allowSameDayDelivery: items.allowSameDayDelivery,
        allowStandardDelivery: items.allowStandardDelivery,
        allowPriorityDelivery: items.allowPriorityDelivery,
        baseDeliveryWeight: items.baseDeliveryWeight,
        daysToStandardDelivery: items.daysToStandardDelivery,
        daysToPriorityDelivery: items.daysToPriorityDelivery,
        daysToSameDayDelivery: items.daysToSameDayDelivery,
        baseDeliveryStandardRate: items.baseDeliveryStandardRate,
        baseDeliveryPriorityRate: items.baseDeliveryPriorityRate,
        baseDeliverySameDayRate: items.baseDeliverySameDayRate,
        extraKgDeliveryStandardRate: items.extraKgDeliveryStandardRate,
        extraKgDeliveryPriorityRate: items.extraKgDeliveryPriorityRate,
        extraKgDeliverySameDayRate: items.extraKgDeliverySameDayRate,
        payOnDeliveryMaxWeightInKg: items.payOnDeliveryMaxWeightInKg,
        name: items.name,
      });
      // workingData.map((city) => {
      //   allData.push({ id: city._id, name: city.deliveryMode });
      // });
      setAllowPayOnDelivery(allData[0].allowPayOnDelivery);
      setAllowSameDayDelivery(allData[0].allowSameDayDelivery);
      setAllowStandardDelivery(allData[0].allowStandardDelivery);
      setAllowPriorityDelivery(allData[0].allowPriorityDelivery);

      setDaysToStandardDelivery(allData[0].daysToStandardDelivery);
      setDaysToPriorityDelivery(allData[0].daysToPriorityDelivery);
      setDaysToSameDayDelivery(allData[0].daysToSameDayDelivery);

      setBaseDeliveryWeight(allData[0].baseDeliveryWeight);
      setBaseDeliveryStandardRate(allData[0].baseDeliveryStandardRate);
      setBaseDeliveryPriorityRate(allData[0].baseDeliveryPriorityRate);
      setBaseDeliverySameDayRate(allData[0].baseDeliverySameDayRate);

      setExtraKgDeliveryStandardRate(allData[0].extraKgDeliveryStandardRate);
      setExtraKgDeliveryPriorityRate(allData[0].extraKgDeliveryPriorityRate);
      setExtraKgDeliverySameDayRate(allData[0].extraKgDeliverySameDayRate);
      setPayOnDeliveryMaxWeightInKg(allData[0].payOnDeliveryMaxWeightInKg);

      setCityName(allData[0].name);
    };

    //call the function

    fetchData().catch(console.error);
  }, [city]);

  //origin sales tax

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/states/${props.policy.onlineOrigin}`);
      const state = response.data.data.data;

      allData.push({
        id: state._id,
        salesTaxRate: state.salesTaxRate,
        name: state.name,
      });
      setPrevailingSalesTax(allData[0].salesTaxRate);
    };

    //call the function

    fetchData().catch(console.error);
  }, [props]);

  //destination sales tax

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/states/${state}`);
      const items = response.data.data.data;

      allData.push({
        id: items._id,
        salesTaxRate: items.salesTaxRate,
        name: items.name,
      });
      setDestinationSalesTax(allData[0].salesTaxRate);
      setStateName(allData[0].name);
    };

    //call the function

    fetchData().catch(console.error);
  }, [props, state]);

  //compute the delivery cost of this order
  let deliveryCost = 0;

  if (baseDeliveryWeight && deliveryMode) {
    if (+totalWeight <= +baseDeliveryWeight) {
      if (deliveryMode === "standard") {
        deliveryCost = +baseDeliveryStandardRate;
      } else if (deliveryMode == "priority") {
        deliveryCost = +baseDeliveryPriorityRate;
      } else if (deliveryMode === "sameday") {
        deliveryCost = baseDeliverySameDayRate;
      }
    } else if (totalWeight > baseDeliveryWeight) {
      const weightDiff = +totalWeight - baseDeliveryWeight;
      if (deliveryMode === "standard") {
        const deliveryCostExtra = +weightDiff * +extraKgDeliveryStandardRate;
        deliveryCost = baseDeliveryStandardRate + deliveryCostExtra;
      } else if (deliveryMode === "priority") {
        const deliveryCostExtra = +weightDiff * +extraKgDeliveryPriorityRate;
        deliveryCost = baseDeliveryPriorityRate + deliveryCostExtra;
      } else if (deliveryMode === "sameday") {
        const deliveryCostExtra = +weightDiff * +extraKgDeliverySameDayRate;
        deliveryCost = baseDeliverySameDayRate + deliveryCostExtra;
      }
    }
  }

  const onRecipientNameChange = (e) => {
    setRecipientName(e.target.value);
  };

  const onRecipientPhoneNumberChange = (e) => {
    setRecipientPhoneNumber(e.target.value);
  };

  const onRecipientAddressChange = (e) => {
    setRecipientAddress(e.target.value);
  };

  const onNearestBusStopChange = (e) => {
    setNearestBusStop(e.target.value);
  };

  const onPostalCodeChange = (e) => {
    setPostalCode(e.target.value);
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

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleDeliveryModeChange = (event) => {
    setDeliveryMode(event.target.value);
  };

  //get the state list
  const renderStateList = () => {
    return stateList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the city list
  const renderCityList = () => {
    return cityList.map((item) => {
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

  const renderCountryField = ({
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
            labelId="country"
            id="country"
            value={country}
            onChange={handleCountryChange}
            label="Country"
            style={
              matchesMD
                ? { width: 770, marginLeft: 0, height: 38 }
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

  const renderStateField = ({
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
            labelId="state"
            id="state"
            value={state}
            onChange={handleStateChange}
            label="State"
            style={
              matchesMD
                ? { width: 770, marginLeft: 0, height: 38 }
                : { width: 350, height: 38, marginTop: 10 }
            }
            //{...input}
          >
            {renderStateList()}
          </Select>
          <FormHelperText>State/Region</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderCityField = ({
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
            labelId="city"
            id="city"
            value={city}
            onChange={handleCityChange}
            label="City"
            style={
              matchesMD
                ? { width: 770, marginLeft: 0, height: 38 }
                : { width: 350, height: 38, marginTop: 10 }
            }
            //{...input}
          >
            {renderCityList()}
          </Select>
          <FormHelperText>City</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderDeliveryModeField = ({
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
            labelId="deliveryMode"
            id="deliveryMode"
            value={deliveryMode}
            onChange={handleDeliveryModeChange}
            label="Delivery Mode"
            style={
              matchesMD
                ? { width: 770, marginLeft: 0, height: 38 }
                : { width: 350, height: 38, marginTop: 10 }
            }
            //{...input}
          >
            <MenuItem value={"sameday"}>
              {allowSameDayDelivery ? "Same Day Delivery" : " "}
            </MenuItem>
            <MenuItem value={"standard"}>
              {allowStandardDelivery ? "Standard" : " "}
            </MenuItem>
            <MenuItem value={"priority"}>
              {allowPriorityDelivery ? "Priority" : " "}
            </MenuItem>
          </Select>
          <FormHelperText>Delivery Mode/Shipping Preference</FormHelperText>
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
            <MenuItem value={"card"}>Credit/Debit Card</MenuItem>
            <MenuItem value={"payOnDelivery"}>
              {allowPayOnDelivery
                ? totalWeight <= payOnDeliveryMaxWeightInKg
                  ? "Pay On Delivery"
                  : ""
                : ""}
            </MenuItem>
          </Select>
          {/* <FormHelperText>
            Payment Method (Choose "Credit/Debit Card" if you are paying with
            'Naira' otherwise choose 'Foreigner'")
          </FormHelperText> */}
        </FormControl>
      </Box>
    );
  };

  let totalDeliveryCost = deliveryCost ? deliveryCost : 0;

  const totalProductCost = parseFloat(totalCost);
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

  let totalOrderCost = totalProductCost + deliveryCost;

  if (implementVatCollection) {
    totalOrderCost = totalOrderCost + vat;
  }

  const totalOrderCostForDisplay = totalOrderCost
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");

  const vatForDispplay = vat.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");

  const amountForPayment = +totalOrderCost.toFixed(2) * 100;

  const buttonContent = () => {
    return <React.Fragment>Place Order</React.Fragment>;
  };

  const buttonEmptyFieldsContent = () => {
    return <React.Fragment>Make Payment</React.Fragment>;
  };

  const renderThankYou = () => {
    return <ThankYou />;
  };

  //calculate the sales tax for this transaction
  let transactionSalesTax = 0;
  if (policy) {
    if (policy.implementSalesTaxCollection) {
      if (policy.allowOriginSalesTax) {
        transactionSalesTax =
          transactionSalesTax + (prevailingSalesTax / 100) * totalProductCost;
      } else {
        transactionSalesTax =
          transactionSalesTax + (destinationSalesTax / 100) * totalProductCost;
      }
    }
  }

  //revenue computation
  let totalRevenue = 0;
  if (props.policy.allowCentralCommission) {
    props.productList.map((cart) => {
      if (cart.revenueMarginShouldPrevail) {
        totalRevenue = totalRevenue + cart.revenueMargin * cart.quantity;
      } else {
        totalRevenue =
          totalRevenue +
          (policy.commissionRate / 100) * cart.price * cart.quantity;
      }
    });
  } else {
    props.productList.map((cart) => {
      totalRevenue = totalRevenue + cart.revenueMargin * cart.quantity;
    });
  }

  //get the days to delivery period
  let daysToDelivery = " ";
  if (deliveryMode === "standard") {
    daysToDelivery = daysToStandardDelivery;
  } else if (deliveryMode === "priority") {
    daysToDelivery = daysToPriorityDelivery;
  } else if (deliveryMode === "sameday") {
    daysToDelivery = daysToSameDayDelivery;
  }

  //when the delivery field are empty

  const onEmptyFieldSubmit = () => {
    setLoading(true);
    if (!recipientName) {
      props.handleFailedSnackbar("the recipient name field cannot be empty");
      setLoading(false);
      return;
    }

    if (!recipientPhoneNumber) {
      props.handleFailedSnackbar(
        "the recipient phone number field cannot be empty"
      );
      setLoading(false);
      return;
    }

    if (!recipientAddress) {
      props.handleFailedSnackbar("the recipient address field cannot be empty");
      setLoading(false);
      return;
    }

    if (!country) {
      props.handleFailedSnackbar("the country field cannot be empty");
      setLoading(false);
      return;
    }

    if (!state) {
      props.handleFailedSnackbar("the state field cannot be empty");
      setLoading(false);
      return;
    }

    if (!city) {
      props.handleFailedSnackbar("the state field cannot be empty");
      setLoading(false);
      return;
    }

    if (!deliveryMode) {
      props.handleFailedSnackbar(
        "Please select your delivery mode/shipping preference"
      );
      setLoading(false);
      return;
    }
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
      customerName: customerName,
      customerPhoneNumber: customerPhoneNumber,
      customerEmailAddress: customerEmail,
      recipientName: recipientName,
      recipientPhoneNumber: recipientPhoneNumber,
      recipientAddress: recipientAddress,
      nearestBusstop: nearestBusstop,
      postalCode: postalCode,
      recipientCountry: country,
      recipientState: state,
      recipientCity: city,
      deliveryMode: deliveryMode,
      vatRate: vatRate,
      vat: vat,
      currency: currency,
      totalWeight: totalWeight,
      payOnDeliveryMaxWeightInKg: payOnDeliveryMaxWeightInKg,
      implementVatCollection: implementVatCollection,
      recipientEmailAddress: customerEmail,
      totalDeliveryCost: deliveryCost ? deliveryCost : 0,
      totalProductCost: totalProductCost,
      paymentMethod: paymentMethod,
      paymentStatus: "collect-payment-on-delivery",
      orderedBy: userId,
      salesTax: transactionSalesTax,
      origin: policy.onlineOrigin,
      implementSalesTaxCollection: policy.implementSalesTaxCollection,
      allowOriginSalesTax: policy.allowOriginSalesTax,
      revenue: totalRevenue,

      recipientCountryName: countryName,
      recipientStateName: stateName,
      recipientCityName: cityName,
      deliveryStatus: "pending",
      deliveryMode: deliveryMode,
      daysToDelivery: daysToDelivery,

      shopType: "online",
    };

    // write to the transaction table first
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

          props.productList.map((cart, index) => {
            const data = {
              orderNumber: orderNumber,
              transactionId: transId,
              product: cart.product,
              orderedPrice: cart.price,
              customerName: customerName,
              customerPhoneNumber: customerPhoneNumber,
              customerEmailAddress: customerEmail,
              recipientName: recipientName,
              recipientPhoneNumber: recipientPhoneNumber,
              recipientAddress: recipientAddress,
              nearestBusstop: nearestBusstop,
              postalCode: postalCode,
              recipientCountry: country,
              recipientState: state,
              recipientCity: city,
              deliveryMode: deliveryMode,
              vatRate: vatRate,

              vat: policy.implementVatCollection
                ? cart.isVatable
                  ? (vatRate / 100) * cart.price * cart.quantity
                  : 0
                : 0,
              currency: currency,
              totalWeight: totalWeight,
              payOnDeliveryMaxWeightInKg: payOnDeliveryMaxWeightInKg,
              implementVatCollection: implementVatCollection,
              recipientEmailAddress: customerEmail,
              totalDeliveryCost: deliveryCost ? deliveryCost : 0,
              totalProductCost: totalProductCost,
              paymentMethod: paymentMethod,
              paymentStatus: "collect-payment-on-delivery",

              cartId: cart.id,
              quantityAdddedToCart: cart.quantity,
              orderedQuantity: cart.quantity,
              dateAddedToCart: cart.dateAddedToCart,
              currency: props.currency,
              paymentMethod: paymentMethod,

              orderedBy: cart.cartHolder,
              salesTax: policy.implementSalesTaxCollection
                ? policy.allowOriginSalesTax
                  ? (cart.price * cart.quantity * prevailingSalesTax) / 100
                  : (cart.price * cart.quantity * destinationSalesTax) / 100
                : 0,
              origin: policy.onlineOrigin,
              implementSalesTaxCollection: policy.implementSalesTaxCollection,
              allowOriginSalesTax: policy.allowOriginSalesTax,
              isVatable: cart.isVatable,
              revenue: policy.allowCentralCommission
                ? cart.revenueMarginShouldPrevail
                  ? cart.revenueMargin * cart.quantity
                  : (policy.commissionRate / 100) * cart.price * cart.quantity
                : cart.revenueMarginShouldPrevail
                ? cart.revenueMargin * cart.quantity
                : null,

              recipientCountryName: countryName,
              recipientStateName: stateName,
              recipientCityName: cityName,
              deliveryStatus: "pending",
              deliveryMode: deliveryMode,
              daysToDelivery: daysToDelivery,

              shopType: "online",
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
    props.productList.map((cart, index) => {
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

  const originSalesTaxRate = prevailingSalesTax;
  const destSalesTaxRate = destinationSalesTax;

  const renderOnlinePayment = (
    email,
    amount,
    orderNumber,
    phoneNumber,
    name
  ) => {
    const data = {
      orderNumber: orderNumber,
      customerName: customerName,
      customerPhoneNumber: customerPhoneNumber,
      customerEmailAddress: customerEmail,
      recipientName: recipientName,
      recipientPhoneNumber: recipientPhoneNumber,
      recipientAddress: recipientAddress,
      nearestBusstop: nearestBusstop,
      postalCode: postalCode,
      recipientCountry: country,
      recipientState: state,
      recipientCity: city,
      deliveryMode: deliveryMode,
      vatRate: vatRate,
      vat: vat,
      currency: currency,
      totalWeight: totalWeight,
      payOnDeliveryMaxWeightInKg: payOnDeliveryMaxWeightInKg,
      implementVatCollection: implementVatCollection,
      recipientEmailAddress: customerEmail,
      totalDeliveryCost: deliveryCost ? deliveryCost : 0,
      totalProductCost: totalProductCost,
      paymentMethod: paymentMethod,
      paymentStatus: "to-be-confirmed",
      orderedBy: userId,
      salesTax: transactionSalesTax,
      origin: policy.onlineOrigin,
      implementSalesTaxCollection: policy.implementSalesTaxCollection,
      allowOriginSalesTax: policy.allowOriginSalesTax,
      revenue: totalRevenue,
      commissionRate: policy.commissionRate,
      prevailingSalesTax: originSalesTaxRate,
      destinationSalesTax: destSalesTaxRate,
      allowCentralCommission: policy.allowCentralCommission,

      recipientCountryName: countryName,
      recipientStateName: stateName,
      recipientCityName: cityName,
      deliveryStatus: "pending",
      deliveryMode: deliveryMode,
      daysToDelivery: daysToDelivery,
    };
    return (
      <Paystack
        email={email}
        amount={parseInt(amount)}
        text={"Make Payment"}
        orderNumber={orderNumber}
        data={data}
        productList={props.productList}
        policy={props.policy}
        prevailingSalesTax={prevailingSalesTax}
        destinationSalesTax={destinationSalesTax}
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
              style={{ marginTop: 0, marginBottom: 10 }}
              justifyContent="center"
            >
              <form id="checkoutDeliveryAndPayment">
                <Box
                  sx={{
                    //width: 1200,
                    //height: 450,
                    width: "100%",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Field
                    label=""
                    id="recipientName"
                    name="recipientName"
                    type="text"
                    onChange={onRecipientNameChange}
                    component={renderRecipientNameField}
                    style={{ width: 300 }}
                  />
                  <Field
                    label=""
                    id="recipientPhoneNumber"
                    name="recipientPhoneNumber"
                    onChange={onRecipientPhoneNumberChange}
                    type="text"
                    component={renderRecipientPhoneNumberField}
                    style={{ width: 300 }}
                  />
                  <Field
                    label=""
                    id="recipientAddress"
                    name="recipientAddress"
                    //defaultValue={quantity}
                    type="text"
                    onChange={onRecipientAddressChange}
                    component={renderRecipientAddressField}
                    style={{ width: 300, marginTop: 10 }}
                  />
                  <Grid item container direction="column">
                    <Grid item>
                      <Field
                        label=""
                        id="recipientCountry"
                        name="recipientCountry"
                        //defaultValue={quantity}
                        type="text"
                        //onChange={onChange}
                        component={renderCountryField}
                        //style={{ width: 300, marginTop: 10 }}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        label=""
                        id="recipientState"
                        name="recipientState"
                        //defaultValue={quantity}
                        type="text"
                        //onChange={onChange}
                        component={renderStateField}
                        //style={{ width: 300, marginTop: 10 }}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        label=""
                        id="recipientCity"
                        name="recipientCity"
                        //defaultValue={quantity}
                        type="text"
                        //onChange={onChange}
                        component={renderCityField}
                        //style={{ width: 300, marginTop: 10 }}
                      />
                    </Grid>

                    <Grid item>
                      <Field
                        label=""
                        id="nearestBusstop"
                        name="nearestBusstop"
                        //defaultValue={quantity}
                        type="text"
                        onChange={onNearestBusStopChange}
                        component={renderNearestBusstopField}
                        //style={{ width: 300, marginTop: 10 }}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        label=""
                        id="postalCode"
                        name="postalCode"
                        //defaultValue={quantity}
                        type="text"
                        onChange={onPostalCodeChange}
                        component={renderPostalCodeField}
                        //style={{ width: 300, marginTop: 10 }}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        label=""
                        id="deliveryMode"
                        name="deliveryMode"
                        //defaultValue={quantity}
                        type="text"
                        //onChange={onChange}
                        component={renderDeliveryModeField}
                        //style={{ width: 300, marginTop: 10 }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </form>
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
              height: 400,
            }}
          >
            <Typography
              style={{
                //width: 250,
                fontSize: 20,
                fontWeight: 300,
                marginTop: 2,
                marginLeft: 10,
              }}
            >
              Total Cost of Product(s):{getCurrencyCode()}
              {totalProductCostForDisplay}
            </Typography>
            <br />
            <br />
            {implementVatCollection && (
              <Typography
                style={{
                  width: 350,
                  fontSize: 20,
                  fontWeight: 300,
                  marginTop: 2,
                  marginLeft: 10,
                }}
              >
                {`VAT(${vatRate}%)`}:{getCurrencyCode()}
                {vatForDispplay}
              </Typography>
            )}

            {deliveryMode && (
              <Typography
                style={{
                  width: 350,
                  fontSize: 20,
                  fontWeight: 300,
                  marginTop: 2,
                  marginLeft: 10,
                }}
              >
                {deliveryMode === "sameday"
                  ? "Same Day Delivery Cost"
                  : deliveryMode === "priority"
                  ? "Priority Delivery Cost"
                  : deliveryMode === "standard"
                  ? "Standard Delivery Cost"
                  : "Delivery Cost"}
                :{getCurrencyCode()}
                {totalDeliveryCostForDisplay}
              </Typography>
            )}

            <Typography
              style={{
                //width: 200,
                fontSize: 23,
                fontWeight: 700,
                marginTop: 2,
                marginLeft: 10,
              }}
            >
              Total Cost:{getCurrencyCode()}
              {totalOrderCostForDisplay}
            </Typography>

            {deliveryMode === "standard" && (
              <Typography className={classes.bankDetails}>
                {`Your order will be delivered in ${daysToStandardDelivery} from the day it was placed`}
              </Typography>
            )}
            {deliveryMode === "sameday" && (
              <Typography className={classes.bankDetails}>
                {`Your order will be delivered same day if the order was placed before noon or  ${daysToSameDayDelivery} from the time it was placed`}
              </Typography>
            )}
            {deliveryMode === "priority" && (
              <Typography className={classes.bankDetails}>
                {`Your order will be delivered in ${daysToPriorityDelivery} from the time it was placed`}
              </Typography>
            )}

            {renderPaymentMethodField()}

            {!isOnlinePayment && paymentMethod === "payOnDelivery" && (
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

            {isOnlinePayment && !deliveryMode && (
              <Button
                variant="contained"
                className={classes.submitEmptyFieldButton}
                onClick={onEmptyFieldSubmit}
              >
                {loading ? (
                  <CircularProgress size={30} color="inherit" />
                ) : (
                  buttonEmptyFieldsContent()
                )}
              </Button>
            )}
            {isOnlinePayment &&
              recipientName &&
              recipientPhoneNumber &&
              recipientAddress &&
              country &&
              state &&
              city &&
              deliveryMode &&
              renderOnlinePayment(
                customerEmail,
                amountForPayment,
                orderNumber,
                customerPhoneNumber,
                customerName
              )}
          </Grid>
          <Grid item></Grid>
        </Grid>
      ) : (
        <Grid container direction="row" className={classes.rootMobile}>
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
              <form id="checkoutDeliveryAndPayment">
                <Box
                  sx={{
                    //width: 1200,
                    //height: 450,
                    width: "100%",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Field
                    label=""
                    id="recipientName"
                    name="recipientName"
                    type="text"
                    onChange={onRecipientNameChange}
                    component={renderRecipientNameField}
                    style={{ width: 300 }}
                  />
                  <Field
                    label=""
                    id="recipientPhoneNumber"
                    name="recipientPhoneNumber"
                    onChange={onRecipientPhoneNumberChange}
                    type="text"
                    component={renderRecipientPhoneNumberField}
                    style={{ width: 300 }}
                  />
                  <Field
                    label=""
                    id="recipientAddress"
                    name="recipientAddress"
                    //defaultValue={quantity}
                    type="text"
                    onChange={onRecipientAddressChange}
                    component={renderRecipientAddressField}
                    style={{ width: 300, marginTop: 10 }}
                  />
                  <Grid item container direction="column">
                    <Grid item>
                      <Field
                        label=""
                        id="recipientCountry"
                        name="recipientCountry"
                        //defaultValue={quantity}
                        type="text"
                        //onChange={onChange}
                        component={renderCountryField}
                        //style={{ width: 300, marginTop: 10 }}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        label=""
                        id="recipientState"
                        name="recipientState"
                        //defaultValue={quantity}
                        type="text"
                        //onChange={onChange}
                        component={renderStateField}
                        //style={{ width: 300, marginTop: 10 }}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        label=""
                        id="recipientCity"
                        name="recipientCity"
                        //defaultValue={quantity}
                        type="text"
                        //onChange={onChange}
                        component={renderCityField}
                        //style={{ width: 300, marginTop: 10 }}
                      />
                    </Grid>

                    <Grid item>
                      <Field
                        label=""
                        id="nearestBusstop"
                        name="nearestBusstop"
                        //defaultValue={quantity}
                        type="text"
                        onChange={onNearestBusStopChange}
                        component={renderNearestBusstopField}
                        //style={{ width: 300, marginTop: 10 }}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        label=""
                        id="postalCode"
                        name="postalCode"
                        //defaultValue={quantity}
                        type="text"
                        onChange={onPostalCodeChange}
                        component={renderPostalCodeField}
                        //style={{ width: 300, marginTop: 10 }}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        label=""
                        id="deliveryMode"
                        name="deliveryMode"
                        //defaultValue={quantity}
                        type="text"
                        //onChange={onChange}
                        component={renderDeliveryModeField}
                        //style={{ width: 300, marginTop: 10 }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Grid>
          </Grid>

          {/* <Grid
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
            {!isOnlinePayment && paymentMethod === "payOnDelivery" && (
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
           

            {isOnlinePayment &&
              renderOnlinePayment(customerEmail, amountForPayment, orderNumber)}
            {isSuccessful && <ThankYou />}
          </Grid> */}
          <Grid
            item
            container
            style={{
              //width: "35%",
              marginLeft: 15,
              border: "1px dashed grey",
              padding: 15,
              height: 400,
            }}
          >
            <Typography
              style={{
                //width: 250,
                fontSize: 20,
                fontWeight: 300,
                marginTop: 2,
                marginLeft: 10,
              }}
            >
              Total Cost of Product(s):{getCurrencyCode()}
              {totalProductCostForDisplay}
            </Typography>
            <br />
            <br />
            {implementVatCollection && (
              <Typography
                style={{
                  width: 350,
                  fontSize: 20,
                  fontWeight: 300,
                  marginTop: 2,
                  marginLeft: 10,
                }}
              >
                {`VAT(${vatRate}%)`}:{getCurrencyCode()}
                {vatForDispplay}
              </Typography>
            )}

            {deliveryMode && (
              <Typography
                style={{
                  width: 350,
                  fontSize: 20,
                  fontWeight: 300,
                  marginTop: 2,
                  marginLeft: 10,
                }}
              >
                {deliveryMode === "sameday"
                  ? "Same Day Delivery Cost"
                  : deliveryMode === "priority"
                  ? "Priority Delivery Cost"
                  : deliveryMode === "standard"
                  ? "Standard Delivery Cost"
                  : "Delivery Cost"}
                :{getCurrencyCode()}
                {totalDeliveryCostForDisplay}
              </Typography>
            )}

            <Typography
              style={{
                //width: 200,
                fontSize: 23,
                fontWeight: 700,
                marginTop: 2,
                marginLeft: 10,
              }}
            >
              Total Cost:{getCurrencyCode()}
              {totalOrderCostForDisplay}
            </Typography>

            {deliveryMode === "standard" && (
              <Typography className={classes.bankDetails}>
                {`Your order will be delivered in ${daysToStandardDelivery} from the day it was placed`}
              </Typography>
            )}
            {deliveryMode === "sameday" && (
              <Typography className={classes.bankDetails}>
                {`Your order will be delivered same day if the order was placed before noon or  ${daysToSameDayDelivery} from the time it was placed`}
              </Typography>
            )}
            {deliveryMode === "priority" && (
              <Typography className={classes.bankDetails}>
                {`Your order will be delivered in ${daysToPriorityDelivery} from the time it was placed`}
              </Typography>
            )}

            {renderPaymentMethodField()}

            {!isOnlinePayment && paymentMethod === "payOnDelivery" && (
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

            {isOnlinePayment && !deliveryMode && (
              <Button
                variant="contained"
                className={classes.submitEmptyFieldButton}
                onClick={onEmptyFieldSubmit}
              >
                {loading ? (
                  <CircularProgress size={30} color="inherit" />
                ) : (
                  buttonEmptyFieldsContent()
                )}
              </Button>
            )}
            {isOnlinePayment &&
              recipientName &&
              recipientPhoneNumber &&
              recipientAddress &&
              country &&
              state &&
              city &&
              deliveryMode &&
              renderOnlinePayment(
                customerEmail,
                amountForPayment,
                orderNumber,
                customerPhoneNumber,
                customerName
              )}
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default reduxForm({
  form: "checkoutDeliveryAndPayment",
})(CheckoutDeliveryAndPayment);
