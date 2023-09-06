import React, { useState, useRef, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import api from "../../apis/local";
import { CREATE_CART, EDIT_CART } from "../../actions/types";
import history from "../../history";
import { FaBullseye } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  root: {
    //width: 600,
  },
  formStyles: {
    width: 600,
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 200,
    marginLeft: 80,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },

  submitToCartButton: {
    borderRadius: 10,
    height: 40,
    width: 150,
    marginLeft: 110,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.grey,
    "&:hover": {
      backgroundColor: theme.palette.common.grey,
    },
  },
}));

const renderRequestedQuantityField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      //error={touched && invalid}
      helperText="How many learners slot do you need?"
      variant="outlined"
      label={label}
      id={input.name}
      //value={input.value}
      fullWidth
      //required
      type={type}
      //defaultValue={quantity}
      {...custom}
      onChange={input.onChange}
      InputProps={{
        inputProps: {
          min: 1,
          style: {
            height: 1,
          },
        },
        readOnly: true,
      }}
    />
  );
};

const renderPreferredStartDateField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      //error={touched && invalid}
      helperText="Enter your preferred start date"
      variant="outlined"
      label={label}
      id={input.name}
      //value={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      //disabled
      // defaultValue={`${minimumQuantity}`}
      onChange={input.onChange}
      InputProps={{
        inputProps: {
          min: 1,
          style: {
            height: 1,
          },
        },
      }}
    />
  );
};

function SendCourseToCheckoutForm(props) {
  const { courseId, token, userId } = props;
  const [quantity, setQuantity] = useState(1);
  const [newQuantity, setNewQuantity] = useState(1);
  const [price, setPrice] = useState();
  const [productQuantityInCart, setProductQuantityInCart] = useState();
  const [productLocation, setProductLocation] = useState();
  const [productLocationCountry, setProductLocationCountry] = useState();
  const [cartHolder, setCartHolder] = useState();
  const [minimumQuantity, setMinimumQuantity] = useState(1);
  const [cartId, setCartId] = useState();
  const [total, setTotal] = useState();
  const [sameProductAlreadyInCart, setSameProductAlreadyInCart] =
    useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setQuantity(newQuantity);
    setPrice(props.price);
  }, [props, newQuantity]);

  useEffect(() => {
    if (!quantity) {
      return;
    }
    if (!price) {
      return;
    }

    const sum = (+quantity * +price)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");

    setTotal(sum);
  }, [quantity, price]);

  const classes = useStyles();
  // const [total, setTotal] = useState(
  //   price
  //     ? (
  //     : 0
  // );
  const [loading, setLoading] = useState();
  const [isLoading, setIsLoading] = useState();

  //get the currency name
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/carts`, {
        params: {
          cartHolder: userId,
          //productLocation: location,
          product: courseId,
        },
      });

      const item = response.data.data.data;

      allData.push({
        id: item[0]._id,
        quantity: item[0].quantity,
        // location: item[0].productLocation,
        // locationCountry: item[0].locationCountry,
        cartHolder: item[0].cartHolder,
      });

      if (allData[0].quantity) {
        setProductQuantityInCart(allData[0].quantity);
      }
      // if (allData[0].location) {
      //   setProductLocation(allData[0].location);
      // }
      // if (allData[0].locationCountry) {
      //   setProductLocationCountry(allData[0].locationCountry);
      // }
      if (allData[0].cartHolder) {
        setCartHolder(allData[0].cartHolder);
      }

      setSameProductAlreadyInCart(true);
      if (allData[0].id) {
        setCartId(allData[0].id);
      }
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  const onQuantityChange = (e) => {
    const newQuantity = parseFloat(e.target.value);

    const newTotal = newQuantity * parseFloat(price);
    setTotal(newTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"));
    setNewQuantity(newQuantity);
  };

  const renderTotalField = ({
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
        helperText="Amount"
        label={label}
        id={input.name}
        name={input.name}
        value={total}
        fullWidth
        type={type}
        style={{ marginTop: 3, width: 240 }}
        onChange={input.onChange}
        InputProps={{
          inputProps: {
            min: 1,
            style: {
              height: 38,
              fontSize: "2em",
            },
            readOnly: true,
          },
        }}
      />
    );
  };

  const buttonContent = () => {
    return <React.Fragment> Enrol</React.Fragment>;
  };

  const cartButtonContent = () => {
    return <React.Fragment>Add to Cart</React.Fragment>;
  };

  console.log("props.token:", props.token);

  const onSubmit = (formValues) => {
    setLoading(true);

    //console.log("preferredStartDate is:", formValues.preferredStartDate);

    if (props.token === undefined) {
      props.handleMakeOpenLoginFormDialogStatus();
      setLoading(false);

      return;
    }

    if (!newQuantity) {
      props.handleFailedSnackbar("The order quantity cannot be empty");
      setLoading(false);

      return;
    }

    if (newQuantity <= 0) {
      props.handleFailedSnackbar(
        "The order quantity cannot be lower than the Minimum Quantity Required(MQR)"
      );
      setLoading(false);

      return;
    }

    if (newQuantity < +minimumQuantity) {
      props.handleFailedSnackbar(
        "The order quantity cannot be lower than the Minimum Quantity Required(MQR)"
      );
      setLoading(false);

      return;
    }

    const data = {
      course: props.courseId,
      refNumber: formValues.refNumber
        ? formValues.refNumber
        : "PRO-" + Math.floor(Math.random() * 1000000000) + "-CT",

      quantity: quantity,
      cartHolder: props.userId,
      isDeleted: false,
      price: price,
      currency: props.currency,
      status: "marked-for-checkout",
      //preferredStartDate: formValues.preferredStartDate,
    };

    //create a new cart and add the product
    if (data) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/carts`, data);

        if (response.data.status === "success") {
          dispatch({
            type: CREATE_CART,
            payload: response.data.data.data,
          });

          // props.handleSuccessfulCreateSnackbar(
          //   `item(s) successfully added to cart. Please visit the cart to continue to checkout and payment`
          // );
          history.push(`/checkouts`);
          setLoading(false);
        } else {
          props.handleFailedSnackbar(
            "Something went wrong, please try again!!!"
          );
        }
      };
      createForm().catch((err) => {
        props.handleFailedSnackbar();
        console.log("err:", err.message);
      });
    } else {
      props.handleFailedSnackbar("Something went wrong, please try again!!!");
    }
  };

  const onSubmitToCart = (formValues) => {
    setIsLoading(true);

    if (props.token === undefined) {
      props.handleMakeOpenLoginFormDialogStatus();
      setIsLoading(false);
      return;
    }

    if (!newQuantity) {
      props.handleFailedSnackbar("The order quantity cannot be empty");
      setIsLoading(false);
      return;
    }

    if (newQuantity <= 0) {
      props.handleFailedSnackbar(
        "The order quantity cannot be lower than the Minimum Quantity Required(MQR)"
      );
      setIsLoading(false);
      return;
    }

    if (newQuantity < +minimumQuantity) {
      props.handleFailedSnackbar(
        "The order quantity cannot be lower than the Minimum Quantity Required(MQR)"
      );
      setIsLoading(false);
      return;
    }

    const data = {
      course: props.courseId,
      refNumber: formValues.refNumber
        ? formValues.refNumber
        : "PRO-" + Math.floor(Math.random() * 1000000000) + "-CT",

      quantity: quantity,
      cartHolder: props.userId,
      isDeleted: false,
      price: price,
      currency: props.currency,
      status: "unmarked-for-checkout",
      //preferredStartDate: formValues.preferredStartDate,
    };

    //create a new cart and add the product
    if (data) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/carts`, data);

        if (response.data.status === "success") {
          dispatch({
            type: CREATE_CART,
            payload: response.data.data.data,
          });

          props.handleSuccessfulCreateSnackbar(
            `item(s) successfully added to cart. Please visit the cart to continue to checkout and payment`
          );
          props.cartCounterHandler(1);

          history.push(`/`);
          setIsLoading(false);
        } else {
          props.handleFailedSnackbar(
            "Something went wrong, please try again!!!"
          );
        }
      };
      createForm().catch((err) => {
        props.handleFailedSnackbar();
        console.log("err:", err.message);
      });
    } else {
      props.handleFailedSnackbar("Something went wrong, please try again!!!");
    }
  };

  return (
    <form id="sendCourseToCheckoutForm">
      <Box
        sx={{
          width: 200,
          //height: 450,
        }}
        noValidate
        autoComplete="off"
      >
        <Grid
          item
          container
          style={{ marginTop: 10, marginBottom: 10 }}
          justifyContent="center"
        ></Grid>

        <Grid container direction="row">
          <Grid item style={{ width: 50, marginTop: 45, fontSize: 45 }}>
            <span style={{ color: "grey" }}>&#8358;</span>
          </Grid>
          <Grid item style={{ marginLeft: 10, width: 100 }}>
            <Field
              label=""
              id="total"
              name="total"
              defaultValue={total}
              type="text"
              component={renderTotalField}
              style={{ width: 100 }}
            />
          </Grid>
          {/* <Grid
            item
            style={{ marginTop: 10, marginBottom: 10 }}
            justifyContent="center"
          >
            <Field
              label=""
              id="preferredStartDate"
              name="preferredStartDate"
              type="date"
              component={renderPreferredStartDateField}
              style={{ width: 300, marginBottom: 20 }}
            />
          </Grid> */}
        </Grid>

        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          {loading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            buttonContent()
          )}
        </Button>

        <Button
          variant="text"
          className={classes.submitToCartButton}
          onClick={props.handleSubmit(onSubmitToCart)}
        >
          {isLoading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            cartButtonContent()
          )}
        </Button>
      </Box>
    </form>
  );
}

export default reduxForm({
  form: "sendCourseToCheckoutForm",
})(SendCourseToCheckoutForm);
