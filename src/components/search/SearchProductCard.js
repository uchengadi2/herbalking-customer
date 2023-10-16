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

import ButtonArrow from "./../ui/ButtonArrow";
import UserLogin from "./../users/UserLogin";
import UserSignUp from "./../users/UserSignUp";
import UserPasswordReset from "./../users/UserPasswordReset";
import Bookings from "./../Bookings";
import history from "../../history";
import ProductsForCategory from "./../products/ProductsForCategory";
import ProductDetails from "./../products/ProductDetails";
import SearchPageAction from "./SearchPageAction";
import api from "./../../apis/local";

import { baseURL } from "./../../apis/util";

import theme from "./../ui/Theme";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    height: "100%",
    //height: 350,
    width: "100%",

    marginLeft: "10px",
    //borderRadius: 30,
    marginTop: "1em",
    marginBottom: "3em",
    padding: 0,
    // "&:hover": {
    //   //border: "solid",
    //   //borderColor: theme.palette.common.grey,
    // },
  },
  rootMobile: {
    maxWidth: "100%",
    //height: 440,
    height: "100%",
    width: "100%",

    // marginLeft: "10px",
    //borderRadius: 30,
    marginTop: "0.2em",
    marginBottom: "3em",
    padding: 0,
    backgroundColor: "#FFFFFF",

    "&:hover": {
      //border: "solid",
      //borderColor: theme.palette.common.grey,
    },
  },
  mediaMobile: {
    height: "100%",
    width: "100%",
    // marginLeft: "80px",
  },
  media: {
    height: "100%",
    width: "100%",
    //marginLeft: "80px",
    //marginTop: "80px",
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
}));

export default function SearchProductCard(props) {
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
  const [minLearnerSlot, setMinLearnerSlot] = useState(1);

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

  //get the product details
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/products/${props.product}`);
      const product = response.data.data.data;

      allData.push({
        id: product._id,
        name: product.name,
        imageCover: product.imageCover,
        mainImage: product.mainImage,
        images: product.images,
        shortDescription: product.shortDescription,
        fullDescription: product.fullDescription,
        features: product.features,
        totalUnit: product.totalUnits,
        remainingUnits: product.remainingUnits,
        pricePerUnit: product.pricePerUnit,
        category: product.category,
        currency: product.currency,
        minQuantity: product.minQuantity,
        refNumber: product.refNumber,
        unit: product.unit,
        isFeaturedProduct: product.isFeaturedProduct,
        configuration: product.configuration,
        displayOnStore: product.displayOnStore,
        expiryDate: product.expiryDate,
        manufacturer: product.manufacturer,
        benefits: product.benefits,
        sideEffects: product.sideEffects,
        model: product.model,
        yearManufactured: product.yearManufactured,
        brand: product.brand,
        make: product.make,
        source: product.source,
        dosage: product.dosage,
        ingredients: product.ingredients,
        salesPreference: product.salesPreference,
        keyword1: product.keyword1,
        keyword2: product.keyword2,
        keyword3: product.keyword3,
        remainingUnits: product.remainingUnits,
        shopsAvailable: product.shopsAvailable,
        slug: product.slug,
        requestQuote: product.requestQuote,
        allowSubscription: product.allowSubscription,
        video: product.video,
        type: product.type,
        createBy: product.createBy,
        howToUse: product.howToUse,
        pricingMechanism: product.pricingMechanism,

        weightInKg: product.weightInKg,
        presentWeightUnitIn: product.presentWeightUnitIn,
        isVatable: product.isVatable,
        revenueMargin: product.revenueMargin,
        revenueMarginShouldPrevail: product.revenueMarginShouldPrevail,
        origins: product.origins,

        minimumDaysToEffectiveReview: product.minimumDaysToEffectiveReview,
      });

      if (!allData) {
        return;
      }
      setProduct({
        id: allData[0].id,
        name: allData[0].name,
        image: allData[0].imageCover,
        mainImage: allData[0].image,
        images: allData[0].images,
        shortDescription: allData[0].shortDescription,
        fullDescription: allData[0].fullDescription,
        features: allData[0].features,
        totalUnit: allData[0].totalUnit,
        remainingUnits: allData[0].remainingUnits,
        price: allData[0].pricePerUnit,
        category: allData[0].category,
        minQuantity: allData[0].minQuantity,
        currency: allData[0].currency,
        unit: allData[0].unit,
        refNumber: allData[0].refNumber,
        isFeaturedProduct: allData[0].isFeaturedProduct,
        configuration: allData[0].configuration,
        displayOnStore: allData[0].displayOnStore,
        expiryDate: allData[0].expiryDate,
        manufacturer: allData[0].manufacturer,
        benefits: allData[0].benefits,
        sideEffects: allData[0].sideEffects,
        model: allData[0].model,
        yearManufactured: allData[0].yearManufactured,
        brand: allData[0].brand,
        make: allData[0].make,
        source: allData[0].source,
        dosage: allData[0].dosage,
        ingredients: allData[0].ingredients,
        salesPreference: allData[0].salesPreference,
        keyword1: allData[0].keyword1,
        keyword2: allData[0].keyword2,
        keyword3: allData[0].keyword3,
        remainingUnits: allData[0].remainingUnits,
        shopsAvailable: allData[0].shopsAvailable,
        channel: allData[0].channel,
        slug: allData[0].slug,
        requestQuote: allData[0].requestQuote,
        allowSubscription: allData[0].allowSubscription,
        video: allData[0].video,
        type: allData[0].type,
        createBy: allData[0].createBy,
        howToUse: allData[0].howToUse,
        pricingMechanism: allData[0].pricingMechanism,

        weightInKg: allData[0].weightInKg,
        presentWeightUnitIn: allData[0].presentWeightUnitIn,
        isVatable: allData[0].isVatable,
        revenueMargin: allData[0].revenueMargin,
        revenueMarginShouldPrevail: allData[0].revenueMarginShouldPrevail,
        origins: allData[0].origins,
        minimumDaysToEffectiveReview: allData[0].minimumDaysToEffectiveReview,
      });
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/currencies/${props.policy.currency}`);
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

  let imageUrl = "";
  if (product) {
    imageUrl = `${baseURL}/images/products/${product.image}`;
  }

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
          {/* <CardActionArea disableRipple> */}
          <Grid container direction="row">
            <Grid item style={{ width: "26.94%" }}>
              <CardMedia
                className={classes.media}
                component="img"
                alt={product.name}
                image={imageUrl}
                //title={product.name}
                crossOrigin="anonymous"
              />
            </Grid>
            <Grid item style={{ width: "46.19%", border: "1px dotted grey" }}>
              <CardContent disableRipple>
                {product.configuration ? (
                  <Typography variant="h4" color="textSecondary" component="p">
                    {product.name}
                    <span style={{ fontSize: 16, fontWeight: 700 }}>
                      <em> ({product.configuration})</em>
                    </span>
                  </Typography>
                ) : (
                  <Typography variant="h4" color="textSecondary" component="p">
                    {product.name}
                  </Typography>
                )}
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
                      {product.price
                        ? product.price
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                        : 0}{" "}
                      &nbsp;
                      <span
                        style={{ fontSize: 12 }}
                      >{`per ${product.unit}`}</span>
                    </strong>
                  </span>
                </Typography>
                {product.refNumber !== undefined && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Reference Number/Sku:</strong>
                    </span>
                    {product.refNumber}
                  </Typography>
                )}
                {product.minQuantity !== undefined && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Minimum Quantity Required:</strong>
                    </span>
                    {product.minQuantity
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    &nbsp;
                    {product.minQuantity > 1
                      ? product.unit + "s"
                      : product.unit}
                  </Typography>
                )}
                {product.remainingUnits !== undefined && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Quantity in Stock:</strong>
                    </span>
                    {product.remainingUnits
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    &nbsp;
                    {product.remainingUnits > 1
                      ? product.unit + "s"
                      : product.unit}
                  </Typography>
                )}
                {product.salesPreference !== undefined && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Sales Preference:</strong>
                    </span>
                    {product.salesPreference}
                  </Typography>
                )}
                {product.type !== undefined && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Type:</strong>
                    </span>
                    {product.type}
                  </Typography>
                )}
                {product.dosage !== undefined && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Dosage:</strong>
                    </span>
                    {product.dosage}
                  </Typography>
                )}
              </CardContent>
            </Grid>

            <Grid item style={{ width: "26.50%", border: "1px dotted grey" }}>
              <SearchPageAction
                price={product.price}
                minimumQuantity={minLearnerSlot}
                benefits={product.benefits}
                productId={product.id}
                slug={product.slug}
                targetAudience={product.targetAudience}
                categoryId={product.category}
                token={props.token}
                userId={props.userId}
                currency={product.currency}
                handleMakeOpenLoginFormDialogStatus={
                  handleMakeOpenLoginFormDialogStatus
                }
                handleFailedSnackbar={handleFailedSnackbar}
                handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
                getCurrencyCode={getCurrencyCode}
                handleCartItemForCheckoutBox={
                  props.handleCartItemForCheckoutBox
                }
              />
            </Grid>
          </Grid>
          {/* </CardActionArea> */}
        </Card>
      ) : (
        <Card className={classes.rootMobile} disableRipple>
          <CardActionArea disableRipple>
            <Grid container direction="row">
              <Grid item style={{ width: "100%" }}>
                <CardMedia
                  className={classes.mediaMobile}
                  component="img"
                  alt={product.name}
                  image={imageUrl}
                  //title={product.name}
                  crossOrigin="anonymous"
                />
              </Grid>
              <Grid item style={{ width: "100%", border: "1px dotted grey" }}>
                <CardContent disableRipple>
                  {product.configuration ? (
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      component="p"
                    >
                      {product.name}
                      <span style={{ fontSize: 16, fontWeight: 700 }}>
                        <em> ({product.configuration})</em>
                      </span>
                    </Typography>
                  ) : (
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      component="p"
                    >
                      {product.name}
                    </Typography>
                  )}
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    component="p"
                    style={{ marginTop: 10 }}
                  >
                    {Str(product.shortDescription).limit(200, "...").get()}
                  </Typography>
                  <Typography
                    variant="h4"
                    color="textSecondary"
                    component="p"
                    style={{ marginTop: 5, marginBottom: 15 }}
                  >
                    <span style={{ marginLeft: "5%", marginTop: 10 }}>
                      <strong>
                        {getCurrencyCode()}
                        {product.price
                          ? product.price
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                          : 0}
                        <span
                          style={{ fontSize: 12 }}
                        >{`per ${product.unit}`}</span>
                      </strong>
                    </span>
                  </Typography>
                  {product.refNumber !== undefined && (
                    <Typography
                      variant="h5"
                      style={{ color: "black", fontSize: 15 }}
                    >
                      <span style={{ marginRight: 20 }}>
                        {" "}
                        <strong>Reference Number/Sku:</strong>
                      </span>
                      {product.refNumber}
                    </Typography>
                  )}
                  {product.minQuantity !== undefined && (
                    <Typography
                      variant="h5"
                      style={{ color: "black", fontSize: 15 }}
                    >
                      <span style={{ marginRight: 20 }}>
                        {" "}
                        <strong>Minimum Quantity Required:</strong>
                      </span>
                      {product.minQuantity
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      &nbsp;
                      {product.minQuantity > 1
                        ? product.unit + "s"
                        : product.unit}
                    </Typography>
                  )}
                  {product.remainingUnits !== undefined && (
                    <Typography
                      variant="h5"
                      style={{ color: "black", fontSize: 15 }}
                    >
                      <span style={{ marginRight: 20 }}>
                        {" "}
                        <strong>Quantity in Stock:</strong>
                      </span>
                      {product.remainingUnits
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      &nbsp;
                      {product.remainingUnits > 1
                        ? product.unit + "s"
                        : product.unit}
                    </Typography>
                  )}
                  {product.salesPreference !== undefined && (
                    <Typography
                      variant="h5"
                      style={{ color: "black", fontSize: 15 }}
                    >
                      <span style={{ marginRight: 20 }}>
                        {" "}
                        <strong>Sales Preference:</strong>
                      </span>
                      {product.salesPreference}
                    </Typography>
                  )}
                  {product.type !== undefined && (
                    <Typography
                      variant="h5"
                      style={{ color: "black", fontSize: 15 }}
                    >
                      <span style={{ marginRight: 20 }}>
                        {" "}
                        <strong>Type:</strong>
                      </span>
                      {product.type}
                    </Typography>
                  )}
                  {product.dosage !== undefined && (
                    <Typography
                      variant="h5"
                      style={{ color: "black", fontSize: 15 }}
                    >
                      <span style={{ marginRight: 20 }}>
                        {" "}
                        <strong>Dosage:</strong>
                      </span>
                      {product.dosage}
                    </Typography>
                  )}
                </CardContent>
              </Grid>

              <Grid item style={{ width: "100%", border: "1px dotted grey" }}>
                <SearchPageAction
                  price={product.price}
                  minimumQuantity={minLearnerSlot}
                  benefits={product.benefits}
                  productId={product.id}
                  slug={product.slug}
                  targetAudience={product.targetAudience}
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
                />
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
      )}
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          style: {
            paddingTop: matchesXS ? "1em" : "3em",
            marginTop: 110,
            height: 540,
            paddingBottom: "3em",
            paddingLeft: matchesXS
              ? 0
              : matchesSM
              ? "3em"
              : matchesMD
              ? "10em"
              : "2em",
            paddingRight: matchesXS
              ? 0
              : matchesSM
              ? "5em"
              : matchesMD
              ? "10em"
              : "2em",
          },
        }}
      >
        <DialogContent>
          <Card className={classes.dialog}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                component="img"
                alt={product.name}
                image={imageUrl}
                crossOrigin="anonymous"
              />
            </CardActionArea>
          </Card>
        </DialogContent>
      </Dialog>
      {renderLoginForm()}
      {renderSignUpForm()}
      {renderForgotPasswordForm()}

      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{
          style: { backgroundColor: alert.backgroundColor },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />
    </>
  );
}
