import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Snackbar from "@material-ui/core/Snackbar";
import Box from "@material-ui/core/Box";

import ButtonArrow from "./../ui/ButtonArrow";
import UserLogin from "./../users/UserLogin";
import UserSignUp from "./../users/UserSignUp";
import UserPasswordReset from "./../users/UserPasswordReset";
import Bookings from "./../Bookings";
import history from "../../history";
import ProductsForCategory from "./../products/ProductsForCategory";
import ProductDetails from "./../products/ProductDetails";
import api from "./../../apis/local";
import CoverImage from "./../../assets/images/home/course5.jpg";
//import MobileCoverImage from "/../../assets/images/home/mobile/cover2.png";
import MobileCoverImage from "./../../assets/images/home/mobile/cover2.png";
import background from "./../../assets/images/home/course5.jpg";

import { baseURL } from "./../../apis/util";

import theme from "./../ui/Theme";
import VendorPartner from "../VendorPartner";

//import CheckoutActionPage from "./CheckoutActionPage";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1500,
    //height: 440,
    //height: 550,
    width: 1330,

    marginLeft: "10px",
    //borderRadius: 30,
    marginTop: "10rem",
    marginBottom: "1.5em",
    padding: 0,
    // "&:hover": {
    //   //border: "solid",
    //   //borderColor: theme.palette.common.grey,
    // },
  },
  rootMobile: {
    maxWidth: 600,
    //height: 440,
    height: 800,
    width: 400,

    marginLeft: "10px",
    //borderRadius: 30,
    marginTop: "250em",
    marginBottom: "3em",
    padding: 0,

    // "&:hover": {
    //   //border: "solid",
    //   //borderColor: theme.palette.common.grey,
    // },
  },
  imageContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  image: {
    //height: 550,
    width: 650,
    marginLeft: -15,
    padding: 0,
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "6.5em",
    },
  },
  imageMobile: {
    height: 650,
    width: 500,
    marginLeft: 10,
    padding: 0,
    [theme.breakpoints.down("md")]: {
      height: "7.5em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "28.5em",
      width: "22.5em",
    },
  },
  // media: {
  //   height: 550,
  //   width: 650,
  // },

  media: {
    height: 350,
    width: 350,
    marginLeft: "0px",
    marginTop: "0px",
  },

  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    marginTop: "55px",
    marginLeft: "160px",
    border: `2px solid ${theme.palette.common.blue}`,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  homeButton: {
    ...theme.typography.estimate,
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    height: 45,
    width: 180,
    marginRight: 10,
    marginTop: 80,
    marginLeft: 160,
    fontWeight: 500,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.common.green,
      color: "white",
    },
  },
  homeMobileButton: {
    ...theme.typography.estimate,
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    height: 45,
    width: 220,
    marginRight: 10,
    marginTop: 80,
    marginLeft: 40,
    fontWeight: 500,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
      color: "white",
    },
  },
  dialog: {
    //maxWidth: 325,
    maxWidth: 500,
    //height: 450,
    marginLeft: "10px",
    borderRadius: 30,
    //marginTop: "10em",
    padding: 0,
    marginTop: -20,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "250px",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  background: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "60em",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
}));

export default function CourseFiveCard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openSignUpForm, setOpenSignUpForm] = useState(false);
  const [openForgotPasswordForm, setOpenForgotPasswordForm] = useState(false);

  const [currencyName, setCurrencyName] = useState();
  const [countryName, setCountryName] = useState();
  const [stateName, setStateName] = useState();
  const [product, setProduct] = useState({});
  const [vendorName, setVendorName] = useState();

  // const { token, setToken } = useToken();
  // const { userId, setUserId } = useUserId();
  const [expanded, setExpanded] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMDUp = useMediaQuery(theme.breakpoints.up("md"));

  const imageUrl = CoverImage;
  const imageMobileUrl = MobileCoverImage;

  const Str = require("@supercharge/strings");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleBookingsOpenDialogStatus = () => {
    setOpen(false);
  };
  const handleLoginDialogOpenStatus = () => {
    // history.push("/categories/new");
    setOpenLoginForm(false);
  };

  const handleLoginDialogCloseStatus = () => {
    // history.push("/categories/new");
    setOpenLoginForm(false);
  };

  const handleSuccessfulLoginDialogOpenStatusWithSnackbar = () => {
    // history.push("/categories/new");
    setOpenLoginForm(false);
    setAlert({
      open: true,
      message: "You have successfully logged in",
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedLoginDialogOpenStatusWithSnackbar = () => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message:
        "Could not logged you in. Please ensure your login credentials are correct",
      backgroundColor: "#FF3232",
    });
    setOpenLoginForm(false);
  };

  const handleSuccessfulSignUpDialogOpenStatusWithSnackbar = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(false);
    setAlert({
      open: true,
      message: "You have successfully signed up",
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedSignUpDialogOpenStatusWithSnackbar = () => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message:
        "Could not sign you up. Please ensure you are connected to the internet and all required fields are completed",
      backgroundColor: "#FF3232",
    });
    setOpenSignUpForm(false);
  };

  const handleMakeOpenLoginFormDialogStatus = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(false);
    setOpenLoginForm(true);
  };
  const handleMakeOpenForgotPasswordFormDialogStatus = () => {
    // history.push("/categories/new");
    setOpenForgotPasswordForm(true);
    setOpenLoginForm(false);
  };
  const handleMakeCloseForgotPasswordFormDialogStatus = () => {
    // history.push("/categories/new");
    setOpenForgotPasswordForm(false);
    setOpenLoginForm(false);
  };
  const handleMakeOpenSignUpDialogStatus = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(true);
    setOpenLoginForm(false);
  };

  const handleMakeCloseSignUpDialogStatus = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(false);
  };

  const handleSuccessfulCreateSnackbar = (message) => {
    // history.push("/categories/new");
    // setOpen({ open: false });
    setAlert({
      open: true,
      message: message,
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedSnackbar = (message) => {
    setAlert({
      open: true,
      message,
      backgroundColor: "#FF3232",
    });
    //setOpen({ open: false });
  };

  const renderLoginForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={openLoginForm}
        //onClose={() => [setOpenLoginForm(false), history.push("/")]}
        onClose={() => [setOpenLoginForm(false)]}
      >
        <DialogContent>
          <UserLogin
            handleLoginDialogOpenStatus={handleLoginDialogOpenStatus}
            handleMakeOpenSignUpDialogStatus={handleMakeOpenSignUpDialogStatus}
            handleMakeCloseSignUpDialogStatus={
              handleMakeCloseSignUpDialogStatus
            }
            handleLoginDialogCloseStatus={handleLoginDialogCloseStatus}
            handleMakeOpenForgotPasswordFormDialogStatus={
              handleMakeOpenForgotPasswordFormDialogStatus
            }
            handleSuccessfulLoginDialogOpenStatusWithSnackbar={
              handleSuccessfulLoginDialogOpenStatusWithSnackbar
            }
            handleFailedLoginDialogOpenStatusWithSnackbar={
              handleFailedLoginDialogOpenStatusWithSnackbar
            }
            setToken={props.setToken}
            setUserId={props.setUserId}
          />
        </DialogContent>
      </Dialog>
    );
  };

  const renderSignUpForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={openSignUpForm}
        //onClose={() => [setOpenSignUpForm(false), history.push("/")]}
        onClose={() => [setOpenSignUpForm(false)]}
      >
        <DialogContent>
          <UserSignUp
            token={props.token}
            handleMakeOpenSignUpDialogStatus={handleMakeOpenSignUpDialogStatus}
            handleMakeCloseSignUpDialogStatus={
              handleMakeCloseSignUpDialogStatus
            }
            handleMakeOpenLoginFormDialogStatus={
              handleMakeOpenLoginFormDialogStatus
            }
            handleSuccessfulSignUpDialogOpenStatusWithSnackbar={
              handleSuccessfulSignUpDialogOpenStatusWithSnackbar
            }
            handleFailedSignUpDialogOpenStatusWithSnackbar={
              handleFailedSignUpDialogOpenStatusWithSnackbar
            }
            setToken={props.setToken}
            setUserId={props.setUserId}
          />
        </DialogContent>
      </Dialog>
    );
  };

  const renderForgotPasswordForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={openForgotPasswordForm}
        //onClose={() => [setOpenForgotPasswordForm(false), history.push("/")]}
        onClose={() => [setOpenForgotPasswordForm(false)]}
      >
        <DialogContent>
          <UserPasswordReset
            token={props.token}
            userId={props.userId}
            handleMakeOpenSignUpDialogStatus={handleMakeOpenSignUpDialogStatus}
            handleMakeCloseSignUpDialogStatus={
              handleMakeCloseSignUpDialogStatus
            }
            handleMakeOpenLoginFormDialogStatus={
              handleMakeOpenLoginFormDialogStatus
            }
            handleMakeCloseForgotPasswordFormDialogStatus={
              handleMakeCloseForgotPasswordFormDialogStatus
            }
          />
        </DialogContent>
      </Dialog>
    );
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

  if (!product) {
    return <></>;
  }

  return (
    <>
      {matchesMDUp ? (
        <Card className={classes.root} disableRipple>
          <CardActionArea disableRipple>
            <Grid container direction="row">
              <Grid item style={{ width: 350 }}>
                <CardMedia
                  className={classes.media}
                  component="img"
                  alt={product.name}
                  image={imageUrl}
                  //title={product.name}
                  crossOrigin="anonymous"
                />
              </Grid>
              <Grid item style={{ width: 600, border: "1px dotted grey" }}>
                <CardContent disableRipple>
                  <Typography variant="h4" color="textSecondary" component="p">
                    {product.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    component="p"
                  >
                    {Str(product.shortDescription).limit(200, "...").get()}
                  </Typography>
                  <Typography
                    variant="h4"
                    color="textSecondary"
                    component="p"
                    style={{ marginTop: 5, marginBottom: 15 }}
                  >
                    <span style={{ marginLeft: 130 }}>
                      <strong>
                        {getCurrencyCode()}
                        {product.pricePerUnit
                          ? product.pricePerUnit
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                          : 0}
                        /unit
                      </strong>
                    </span>
                  </Typography>
                  <Typography>
                    <span
                      style={{ fontSize: 15, marginLeft: 10, marginTop: 20 }}
                    >
                      <strong>Sku:</strong> &nbsp;
                      <span>{product.sku}</span>
                    </span>
                  </Typography>

                  <Typography>
                    <span style={{ fontSize: 15, marginLeft: 10 }}>
                      <strong> Product Location:</strong>
                      <span>
                        {stateName}/{countryName}
                      </span>
                    </span>
                  </Typography>
                  <Typography>
                    <span style={{ fontSize: 15, marginLeft: 10 }}>
                      <strong>
                        Delivery Period within {stateName}/{countryName}:
                      </strong>
                      <span>
                        {product.estimatedDeliveryPeriodInDays}&nbsp;day(s)/
                        {product.estimatedDeliveryPeriodInHours}&nbsp;hour(s)/
                        {product.estimatedDeliveryPeriodInMinutes}&nbsp;minutes
                      </span>
                    </span>
                  </Typography>

                  <Typography>
                    <span style={{ fontSize: 15, marginLeft: 10 }}>
                      <strong>
                        Delivery Cost within &nbsp; {stateName}/{countryName}{" "}
                        for the initial first{" "}
                        {product.maxmumQuantityForBaselineDelivery} unit:
                      </strong>
                      <span>
                        {getCurrencyCode()}
                        {product.baselineDeliveryCostWithinProductLocation
                          ? product.baselineDeliveryCostWithinProductLocation
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                          : 0}
                      </span>
                    </span>
                  </Typography>
                  <Typography>
                    <span style={{ fontSize: 15, marginLeft: 10 }}>
                      <strong>
                        Subsequent Delivery Cost per Unit within &nbsp;{" "}
                        {stateName}/{countryName}:
                      </strong>
                      <span>
                        {getCurrencyCode()}
                        {product.deliveryCostPerUnitWithinProductLocation
                          ? product.deliveryCostPerUnitWithinProductLocation
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                          : 0}
                      </span>
                    </span>
                  </Typography>
                  {/* <Typography style={{ marginTop: 10 }}>
                    <span style={{ fontSize: 15, marginLeft: 10 }}>
                      <strong> Vendor:</strong>
                      <span>{vendorName}</span>
                    </span>
                  </Typography> */}
                </CardContent>
              </Grid>

              <Grid item style={{ width: 349, border: "1px dotted grey" }}>
                {/* <SearchPageAction
                  price={product.pricePerUnit}
                  minimumQuantity={product.minimumQuantity}
                  remainingTotalUnits={product.remainingTotalUnits}
                  weight={product.weightPerUnit}
                  productId={product.id}
                  categoryId={product.category}
                  token={props.token}
                  userId={props.userId}
                  currency={product.currency}
                  handleMakeOpenLoginFormDialogStatus={
                    handleMakeOpenLoginFormDialogStatus
                  }
                  handleFailedSnackbar={handleFailedSnackbar}
                  handleSuccessfulCreateSnackbar={
                    handleSuccessfulCreateSnackbar
                  }
                  getCurrencyCode={getCurrencyCode}
                  handleCartItemForCheckoutBox={
                    props.handleCartItemForCheckoutBox
                  }
                /> */}
                <CardActions>
                  <Button
                    component={Link}
                    // to="/mobileapps"
                    to={`/categories/${props.category}/${props.productId}`}
                    varaint="outlined"
                    className={classes.learnButton}
                    onClick={() => (
                      <ProductDetails
                        productId={props.productId}
                        token={props.token}
                      />
                    )}
                  >
                    <span style={{ marginRight: 10 }}>Show Details </span>
                    <ButtonArrow
                      height={10}
                      width={10}
                      fill={theme.palette.common.blue}
                    />
                  </Button>
                </CardActions>
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
      ) : (
        <Card className={classes.rootMobile} disableRipple>
          <CardActionArea disableRipple>
            <Grid container direction="row">
              <Grid item style={{ width: 350 }}>
                <CardMedia
                  className={classes.mediaMobile}
                  component="img"
                  alt={product.name}
                  image={imageUrl}
                  //title={product.name}
                  crossOrigin="anonymous"
                />
              </Grid>
              <Grid item style={{ width: 380, border: "1px dotted grey" }}>
                <CardContent disableRipple>
                  <Typography variant="h4" color="textSecondary" component="p">
                    {product.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    component="p"
                  >
                    {Str(product.shortDescription).limit(200, "...").get()}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="textSecondary"
                    component="p"
                    style={{ marginTop: 5, marginBottom: 15 }}
                  >
                    <span style={{ marginLeft: 130 }}>
                      <strong>
                        {getCurrencyCode()}
                        {product.pricePerUnit
                          ? product.pricePerUnit
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                          : 0}
                        /unit
                      </strong>
                    </span>
                  </Typography>
                  <Typography>
                    <span
                      style={{ fontSize: 15, marginLeft: 10, marginTop: 20 }}
                    >
                      <strong>Sku:</strong> &nbsp;
                      <span>{product.sku}</span>
                    </span>
                  </Typography>

                  <Typography>
                    <span style={{ fontSize: 15, marginLeft: 10 }}>
                      <strong> Product Location:</strong>
                      <span>
                        {stateName}/{countryName}
                      </span>
                    </span>
                  </Typography>
                  <Typography>
                    <span style={{ fontSize: 15, marginLeft: 10 }}>
                      <strong>
                        Delivery Period within {stateName}/{countryName}:
                      </strong>
                      <span>
                        {product.estimatedDeliveryPeriodInDays}&nbsp;day(s)/
                        {product.estimatedDeliveryPeriodInHours}&nbsp;hour(s)/
                        {product.estimatedDeliveryPeriodInMinutes}&nbsp;minutes
                      </span>
                    </span>
                  </Typography>

                  <Typography>
                    <span style={{ fontSize: 15, marginLeft: 10 }}>
                      <strong>
                        Delivery Cost within &nbsp; {stateName}/{countryName}{" "}
                        for the initial first{" "}
                        {product.maxmumQuantityForBaselineDelivery} unit:
                      </strong>
                      <span>
                        {getCurrencyCode()}
                        {product.baselineDeliveryCostWithinProductLocation
                          ? product.baselineDeliveryCostWithinProductLocation
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                          : 0}
                      </span>
                    </span>
                  </Typography>
                  <Typography>
                    <span style={{ fontSize: 15, marginLeft: 10 }}>
                      <strong>
                        Subsequent Delivery Cost per Unit within &nbsp;{" "}
                        {stateName}/{countryName}:
                      </strong>
                      <span>
                        {getCurrencyCode()}
                        {product.deliveryCostPerUnitWithinProductLocation
                          ? product.deliveryCostPerUnitWithinProductLocation
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                          : 0}
                      </span>
                    </span>
                  </Typography>
                  {/* <Typography style={{ marginTop: 10 }}>
                    <span style={{ fontSize: 15, marginLeft: 10 }}>
                      <strong> Vendor:</strong>
                      <span>{vendorName}</span>
                    </span>
                  </Typography> */}
                </CardContent>
              </Grid>

              <Grid item style={{ width: 360, border: "1px dotted grey" }}>
                {/* <SearchPageAction
                  price={product.pricePerUnit}
                  minimumQuantity={product.minimumQuantity}
                  remainingTotalUnits={product.remainingTotalUnits}
                  weight={product.weightPerUnit}
                  productId={product.id}
                  categoryId={product.category}
                  token={props.token}
                  userId={props.userId}
                  currency={product.currency}
                  handleMakeOpenLoginFormDialogStatus={
                    handleMakeOpenLoginFormDialogStatus
                  }
                  handleFailedSnackbar={handleFailedSnackbar}
                  handleSuccessfulCreateSnackbar={
                    handleSuccessfulCreateSnackbar
                  }
                  getCurrencyCode={getCurrencyCode}
                  handleCartItemForCheckoutBox={
                    props.handleCartItemForCheckoutBox
                  }
                /> */}
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
      )}
    </>
  );
}
