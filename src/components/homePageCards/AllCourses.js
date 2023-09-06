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
import CoverImage from "./../../assets/images/home/course6.jpg";
//import MobileCoverImage from "/../../assets/images/home/mobile/cover2.png";
import MobileCoverImage from "./../../assets/images/home/mobile/cover2.png";
import background from "./../../assets/images/home/course6.jpg";
import CourseInfo from "./CourseInfo";

import { baseURL } from "./../../apis/util";

import theme from "./../ui/Theme";
import VendorPartner from "../VendorPartner";

//import CheckoutActionPage from "./CheckoutActionPage";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    //height: 440,
    //height: 550,
    width: "100%",

    marginLeft: "10px",
    //borderRadius: 30,
    marginTop: "5rem",
    marginBottom: "1.5em",
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

    marginLeft: "0px",
    //borderRadius: 30,
    marginTop: "3.5em",
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
    width: "100%",
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
    height: "100%",
    width: "100%",
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
    height: "100%",
    width: "100%",
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

export default function AllCourses(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openSignUpForm, setOpenSignUpForm] = useState(false);
  const [openForgotPasswordForm, setOpenForgotPasswordForm] = useState(false);

  const [currencyName, setCurrencyName] = useState("naira");
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

  let imageUrl = "";
  if (product) {
    imageUrl = `${baseURL}/images/courses/${props.image}`;
  }
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
        <Card className={classes.root}>
          {/* <CardActionArea disableRipple> */}
          <Grid container direction="row">
            <Grid item style={{ width: "26.94%" }}>
              <CardMedia
                className={classes.media}
                component="img"
                alt={props.title}
                image={imageUrl}
                //title={product.name}
                crossOrigin="anonymous"
              />
            </Grid>
            <Grid item style={{ width: "46.19%", border: "1px dotted grey" }}>
              <CardContent>
                {props.hasSeries ? (
                  <Typography variant="h4" color="textSecondary" component="p">
                    {props.title}
                    <span style={{ fontSize: 16, fontWeight: 700 }}>
                      <em> ({props.series})</em>
                    </span>
                  </Typography>
                ) : (
                  <Typography variant="h4" color="textSecondary" component="p">
                    {props.title}
                  </Typography>
                )}
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  component="p"
                >
                  {Str(props.shortDescription).limit(200, "...").get()}
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
                      {props.price
                        ? props.price
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                        : 0}
                    </strong>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10, marginTop: 20 }}>
                    <strong>Delivery Method:</strong> &nbsp;
                    <span>{props.deliveryMethod}</span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong> Venue:</strong>
                    <span>{props.venue}</span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong> Total Course Duration:</strong>
                    <span>{props.duration} </span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong>Weekday Lecture Period:</strong>
                    <span>{props.weekdaySessionPeriod} </span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong>Weekend Lecture Period:</strong>
                    <span>{props.weekendSessionPeriod} </span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong>Course Track:</strong>
                    <span>{props.track}</span>
                  </span>
                </Typography>
                {(props.track === "weekdays" ||
                  props.track === "weekdays/weekends") && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong>Weekday Start Date(s): </strong>&nbsp;&nbsp;
                      {!props.showGenericWeekdayStartDateText
                        ? props.commencementWeekdaysDate.toString()
                        : props.genericWeekdayStartDateText}
                    </span>
                  </Typography>
                )}
                {(props.track === "weekends" ||
                  props.track === "weekdays/weekends") && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong>Weekend Start Date(s): </strong>&nbsp;&nbsp;
                      {!props.showGenericWeekendStartDateText
                        ? props.commencementWeekendsDate.toString()
                        : props.genericWeekendStartDateText}
                    </span>
                  </Typography>
                )}
                {props.hasMentorshipCredit && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong>Mentorship Credit:</strong>
                      <span>
                        {props.mentorshipCredit}&nbsp;Units&nbsp;&nbsp; (to be
                        used after graduation)
                      </span>
                    </span>
                  </Typography>
                )}
                {props.hasMentorshipCredit && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong>Total Value of Mentorship Credit:</strong>
                      <span>
                        {getCurrencyCode()}
                        {(
                          props.mentorshipCredit * props.costPerMentorshipCredit
                        )
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                      </span>
                    </span>
                  </Typography>
                )}
                {props.hasMentorshipCredit && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong>Mentorship Duration:</strong>
                      <span>
                        {props.mentorshipDuration}&nbsp;&nbsp; (from the day of
                        graduation )
                      </span>
                    </span>
                  </Typography>
                )}
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong>Payment Options:</strong>
                    <span>{props.paymentOptions}</span>
                  </span>
                </Typography>
                {props.isInstallmentalPaymentAllowed === "yes" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong>Is installmental Payment Allowed?:</strong>
                      <span>
                        {props.isInstallmentalPaymentAllowed
                          .charAt(0)
                          .toUpperCase() +
                          props.isInstallmentalPaymentAllowed.slice(1)}
                      </span>
                    </span>
                  </Typography>
                )}
                {props.isInstallmentalPaymentAllowed === "yes" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong>
                        Maximum Number of Installmental Payment Allowed:
                      </strong>
                      <span>
                        {props.maximumInstallmentalPayment}&nbsp;times
                      </span>
                    </span>
                  </Typography>
                )}
                <br /> <br />
                {props.isCourseAuditable && (
                  <Typography>
                    <span
                      style={{
                        fontSize: 18,
                        marginLeft: 14,
                        //textAlign: "center",
                      }}
                    >
                      You can audit this course for FREE for up to
                      <strong>
                        <span>{props.weekdayAuditDays}</span>
                      </strong>
                      &nbsp;. You only make payment afterwards when you are sure
                      the course is a good fit for you
                    </span>
                  </Typography>
                )}
              </CardContent>
            </Grid>

            <Grid item style={{ width: "26.50%", border: "1px dotted grey" }}>
              <CourseInfo
                prerequisites={props.prerequisites}
                tools={props.tools}
                targetAudience={props.targetAudience}
                whatToLearn={props.whatToLearn}
                venueLink={props.venueLink}
                categoryId={props.category}
                productId={props.courseId}
                slug={props.slug}
                categorySlug={props.categorySlug}
                updateLearningPathInfoInfo={props.updateLearningPathInfoInfo}
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
                  alt={props.title}
                  image={imageUrl}
                  //title={product.name}
                  crossOrigin="anonymous"
                />
              </Grid>
              <Grid item style={{ width: "100%", border: "1px dotted grey" }}>
                <CardContent disableRipple>
                  {props.hasSeries ? (
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      component="p"
                    >
                      {props.title}
                      <span style={{ fontSize: 16, fontWeight: 700 }}>
                        <em> ({props.series})</em>
                      </span>
                    </Typography>
                  ) : (
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      component="p"
                    >
                      {props.title}
                    </Typography>
                  )}
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    component="p"
                  >
                    {Str(props.shortDescription).limit(200, "...").get()}
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
                        {props.price
                          ? props.price
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                          : 0}
                      </strong>
                    </span>
                  </Typography>
                  <Typography>
                    <span
                      style={{ fontSize: 14, marginLeft: 10, marginTop: 20 }}
                    >
                      <strong>Delivery Method:</strong> &nbsp;
                      <span>{props.deliveryMethod}</span>
                    </span>
                  </Typography>

                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Venue:</strong>
                      <span>{props.venue}</span>
                    </span>
                  </Typography>
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Total Course Duration:</strong>
                      <span>{props.duration} </span>
                    </span>
                  </Typography>
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Weekday Lecture Period:</strong>
                      <span>{props.weekdaySessionPeriod} </span>
                    </span>
                  </Typography>
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Weekend Lecture Period:</strong>
                      <span>{props.weekendSessionPeriod} </span>
                    </span>
                  </Typography>

                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong>Course Track:</strong>
                      <span>{props.track}</span>
                    </span>
                  </Typography>
                  {(props.track === "weekdays" ||
                    props.track === "weekdays/weekends") && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        <strong>Weekday Start Date(s): </strong>&nbsp;&nbsp;
                        {!props.showGenericWeekdayStartDateText
                          ? props.commencementWeekdaysDate.toString()
                          : props.genericWeekdayStartDateText}
                      </span>
                    </Typography>
                  )}

                  {(props.track === "weekends" ||
                    props.track === "weekdays/weekends") && (
                    <Typography>
                      <span style={{ fontSize: 15, marginLeft: 10 }}>
                        <strong>Weekend Start Date(s): </strong>&nbsp;&nbsp;
                        {!props.showGenericWeekendStartDateText
                          ? props.commencementWeekendsDate.toString()
                          : props.genericWeekendStartDateText}
                      </span>
                    </Typography>
                  )}
                  {props.hasMentorshipCredit && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        <strong>Mentorship Credit:</strong>
                        <span>
                          {props.mentorshipCredit}&nbsp;Units&nbsp;&nbsp; (to be
                          used after graduation)
                        </span>
                      </span>
                    </Typography>
                  )}
                  {props.hasMentorshipCredit && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        <strong>Total Value of Mentorship Credit:</strong>
                        <span>
                          {getCurrencyCode()}
                          {(
                            props.mentorshipCredit *
                            props.costPerMentorshipCredit
                          )
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                        </span>
                      </span>
                    </Typography>
                  )}
                  {props.hasMentorshipCredit && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        <strong>Mentorship Duration:</strong>
                        <span>
                          {props.mentorshipDuration}&nbsp;&nbsp; (from the day
                          of graduation )
                        </span>
                      </span>
                    </Typography>
                  )}
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong>Payment Options:</strong>
                      <span>{props.paymentOptions}</span>
                    </span>
                  </Typography>
                  {props.isInstallmentalPaymentAllowed === "yes" && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        <strong>Is installmental Payment Allowed?:</strong>
                        <span>
                          {props.isInstallmentalPaymentAllowed
                            .charAt(0)
                            .toUpperCase() +
                            props.isInstallmentalPaymentAllowed.slice(1)}
                        </span>
                      </span>
                    </Typography>
                  )}
                  {props.isInstallmentalPaymentAllowed === "yes" && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        <strong>
                          Maximum Number of Installmental Payment Allowed:
                        </strong>
                        <span>
                          {props.maximumInstallmentalPayment}&nbsp;times
                        </span>
                      </span>
                    </Typography>
                  )}
                  <br />
                  <br />
                  {props.isCourseAuditable && (
                    <Typography>
                      <span
                        style={{
                          fontSize: 18,
                          marginLeft: 14,
                          //textAlign: "center",
                        }}
                      >
                        You can audit this course for FREE for up to
                        <strong>
                          <span>{props.weekdayAuditDays}</span>
                        </strong>
                        &nbsp;. You only make payment afterwards when you are
                        sure the course is a good fit for you
                      </span>
                    </Typography>
                  )}
                </CardContent>
              </Grid>

              <Grid item style={{ width: "100%", border: "1px dotted grey" }}>
                <CourseInfo
                  prerequisites={props.prerequisites}
                  tools={props.tools}
                  targetAudience={props.targetAudience}
                  whatToLearn={props.whatToLearn}
                  venueLink={props.venueLink}
                  categoryId={props.category}
                  productId={props.courseId}
                  slug={props.slug}
                  categorySlug={props.categorySlug}
                  updateLearningPathInfoInfo={props.updateLearningPathInfoInfo}
                />
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
      )}
    </>
  );
}
