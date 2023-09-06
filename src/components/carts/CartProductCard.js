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
import api from "./../../apis/local";

import { baseURL } from "./../../apis/util";

import theme from "./../ui/Theme";
import CartUpdateAndDeliveryForm from "./CartUpdateAndDeliveryForm";
import AllCourses from "../homePageCards/AllCourses";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    //height: 440,
    height: "100%",
    width: "100%",

    marginLeft: "10px",
    //borderRadius: 30,
    marginTop: "2em",
    marginBottom: "3em",
    padding: 0,
    // "&:hover": {
    //   //border: "solid",
    //   //borderColor: theme.palette.common.grey,
    // },
  },
  media: {
    // height: 700,
    // width: 350,
    height: "100%",
    width: "100%",
    //padding: 20,
  },
  rootMobile: {
    //maxWidth: 600,
    maxWidth: "100%",
    height: "100%",
    //height: 780,
    //width: 400,
    width: "95%",

    marginLeft: "3px",
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
    // height: 200,
    // width: 200,
    height: "100%",
    width: "100%",
    //marginLeft: "80px",
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

export default function CartProductCard(props) {
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
  const [isOnPromo, setIsOnPromo] = useState(false);
  const [promoPrice, setPromoPrice] = useState();
  const [promoMinQuantity, setPromoMinQuantity] = useState();
  const [price, setPrice] = useState();
  const [minQuantity, setMinQuantity] = useState(1);
  const [course, setCourse] = useState({});

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

  useEffect(() => {
    setPrice(props.course.price);
    setMinQuantity(props.course.minimumQuantity);
  }, [props]);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  //get the product details
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/courses/${props.course}`);
      const course = response.data.data.data;

      allData.push({
        id: course._id,
        title: course.title,
        imageCover: course.imageCover,
        shortDescription: course.shortDescription,
        longDescription: course.longDescription,
        features: course.features,
        deliveryMethod: course.deliveryMethod,
        duration: course.duration,
        category: course.category,
        commencementDate: course.commencementDate,
        price: course.price,
        currency: course.currency,
        venue: course.venue,
        refNumber: course.refNumber,
        sessionDuration: course.sessionDuration,
        sessionPeriod: course.sessionPeriod,
        studyPeriod: course.studyPeriod,
        lectureDuration: course.lectureDuration,
        projectDuration: course.projectDuration,
        instructor: course.instructor,
        image: course.imageCover,
        createBy: course.createBy,
        prerequisites: course.prerequisites,
        tools: course.tools,
        targetAudience: course.targetAudience,
        whatToLearn: course.whatToLearn,
        venueLink: course.venueLink,
        commencementWeekdaysDate: course.commencementWeekdaysDate,
        commencementWeekendsDate: course.commencementWeekendsDate,
        genericWeekdayStartDateText: course.genericWeekdayStartDateText,
        genericWeekendStartDateText: course.genericWeekendStartDateText,
        showGenericWeekdayStartDateText: course.showGenericWeekdayStartDateText,
        showGenericWeekendStartDateText: course.showGenericWeekendStartDateText,
        weekdaySessionPeriod: course.weekdaySessionPeriod,
        weekendSessionPeriod: course.weekendSessionPeriod,
        paymentOptions: course.paymentOptions,
        track: course.track,
        isCourseAuditable: course.isCourseAuditable,
        weekdayAuditDays: course.weekdayAuditDays,
        weekendAuditDays: course.weekendAuditDays,
        hasMentorshipCredit: course.hasMentorshipCredit,
        mentorshipCredit: course.mentorshipCredit,
        mentorshipDuration: course.mentorshipDuration,
        hasSeries: course.hasSeries,
        series: course.series,
        costPerMentorshipCredit: course.costPerMentorshipCredit,
        isInstallmentalPaymentAllowed: course.isInstallmentalPaymentAllowed,
        maximumInstallmentalPayment: course.maximumInstallmentalPayment,
      });

      if (!allData) {
        return;
      }
      setCourse({
        id: allData[0].id,
        title: allData[0].title,
        imageCover: allData[0].imageCover,
        shortDescription: allData[0].shortDescription,
        longDescription: allData[0].longDescription,
        features: allData[0].features,
        deliveryMethod: allData[0].deliveryMethod,
        duration: allData[0].duration,
        category: allData[0].category,
        commencementDate: allData[0].commencementDate,
        price: allData[0].price,
        currency: allData[0].currency,
        venue: allData[0].venue,
        refNumber: allData[0].refNumber,
        sessionDuration: allData[0].sessionDuration,
        sessionPeriod: allData[0].sessionPeriod,
        studyPeriod: allData[0].studyPeriod,
        lectureDuration: allData[0].lectureDuration,
        projectDuration: allData[0].projectDuration,
        instructor: allData[0].instructor,
        image: allData[0].image,
        createBy: allData[0].createBy,
        prerequisites: allData[0].prerequisites,
        tools: allData[0].tools,
        targetAudience: allData[0].targetAudience,
        whatToLearn: allData[0].whatToLearn,
        venueLink: allData[0].venueLink,
        commencementWeekdaysDate: allData[0].commencementWeekdaysDate,
        commencementWeekendsDate: allData[0].commencementWeekendsDate,
        genericWeekdayStartDateText: allData[0].genericWeekdayStartDateText,
        genericWeekendStartDateText: allData[0].genericWeekendStartDateText,
        showGenericWeekdayStartDateText:
          allData[0].showGenericWeekdayStartDateText,
        showGenericWeekendStartDateText:
          allData[0].showGenericWeekendStartDateText,
        weekdaySessionPeriod: allData[0].weekdaySessionPeriod,
        weekendSessionPeriod: allData[0].weekendSessionPeriod,
        paymentOptions: allData[0].paymentOptions,
        track: allData[0].track,
        isCourseAuditable: allData[0].isCourseAuditable,
        weekdayAuditDays: allData[0].weekdayAuditDays,
        weekendAuditDays: allData[0].weekendAuditDays,
        hasMentorshipCredit: allData[0].hasMentorshipCredit,
        mentorshipCredit: allData[0].mentorshipCredit,
        mentorshipDuration: allData[0].mentorshipDuration,
        hasSeries: allData[0].hasSeries,
        series: allData[0].series,
        costPerMentorshipCredit: allData[0].costPerMentorshipCredit,
        isInstallmentalPaymentAllowed: allData[0].isInstallmentalPaymentAllowed,
        maximumInstallmentalPayment: allData[0].maximumInstallmentalPayment,
      });
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  let imageUrl = "";
  if (course) {
    imageUrl = `${baseURL}/images/courses/${course.imageCover}`;
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

  const handleSuccessfulLoginDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setOpenLoginForm(false);
    setAlert({
      open: true,
      message: message,
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedLoginDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message: message,

      backgroundColor: "#FF3232",
    });
    setOpenLoginForm(false);
  };

  const handleSuccessfulSignUpDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setOpenSignUpForm(false);
    setAlert({
      open: true,
      message: message,
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedSignUpDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message: message,

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

  if (!course) {
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
                alt={course.title}
                image={imageUrl}
                //title={product.name}
                crossOrigin="anonymous"
              />
            </Grid>
            <Grid item style={{ width: "46.19%", border: "1px dotted grey" }}>
              <CardContent disableRipple>
                {course.hasSeries ? (
                  <Typography variant="h4" color="textSecondary" component="p">
                    {course.title}
                    <span style={{ fontSize: 16, fontWeight: 700 }}>
                      <em> ({course.series})</em>
                    </span>
                  </Typography>
                ) : (
                  <Typography variant="h4" color="textSecondary" component="p">
                    {course.title}
                  </Typography>
                )}
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  component="p"
                  style={{ marginTop: 20 }}
                >
                  {Str(course.shortDescription).limit(200, "...").get()}
                </Typography>
                <Typography
                  variant="h5"
                  color="textSecondary"
                  component="p"
                  style={{ marginTop: 30 }}
                >
                  <span style={{ marginLeft: 130 }}>
                    <strong>
                      {getCurrencyCode()}
                      {course.price
                        ? course.price
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                        : ""}
                    </strong>
                  </span>
                </Typography>
                {course.refNumber !== undefined && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Reference Number:</strong>
                    </span>
                    {course.refNumber}
                  </Typography>
                )}
                {course.duration !== undefined && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Duration:</strong>
                    </span>
                    {course.duration}
                  </Typography>
                )}
                {course.commencementDate !== undefined && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Start date:</strong>
                    </span>
                    {course.commencementDate
                      ? new Date(course.commencementDate).toDateString()
                      : "Coming Soon"}
                  </Typography>
                )}
                {course.deliveryMethod !== undefined && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Delivery Method:</strong>
                    </span>
                    {course.deliveryMethod}
                  </Typography>
                )}
                {course.venue !== undefined && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Venue:</strong>
                    </span>
                    {course.venue}
                  </Typography>
                )}
                {course.track !== undefined && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Track:</strong>
                    </span>
                    {course.track}
                  </Typography>
                )}
                {course.commencementWeekdaysDate !== undefined && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      <strong>Weekday Start Date(s):</strong>
                    </span>
                    <span style={{ marginLeft: 3, textAlign: "center" }}>
                      {course.commencementWeekdaysDate.join("|")}
                    </span>
                  </Typography>
                )}
                {course.commencementWeekendsDate !== undefined && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      <strong>Weekend Start Date(s):</strong>
                    </span>
                    <span style={{ marginLeft: 3, textAlign: "center" }}>
                      {course.commencementWeekendsDate.join("|")}
                    </span>
                  </Typography>
                )}
                <Typography
                  variant="h5"
                  style={{ color: "black", fontSize: 15 }}
                >
                  <span style={{ marginRight: 20 }}>
                    <strong>Weekday Lecture Period:</strong>
                  </span>
                  <span style={{ marginLeft: 3, textAlign: "center" }}>
                    {course.weekdaySessionPeriod}
                  </span>
                </Typography>
                <Typography
                  variant="h5"
                  style={{ color: "black", fontSize: 15 }}
                >
                  <span style={{ marginRight: 20 }}>
                    <strong>Weekend Lecture Period:</strong>
                  </span>
                  <span style={{ marginLeft: 3, textAlign: "center" }}>
                    {course.weekendSessionPeriod}
                  </span>
                </Typography>
                {course.hasMentorshipCredit && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      <strong>Mentorship Credit:</strong>
                    </span>
                    <span style={{ marginLeft: 3, textAlign: "center" }}>
                      {course.mentorshipCredit}&nbsp; Units &nbsp; (to be used
                      after graduation)
                    </span>
                  </Typography>
                )}
                {course.hasMentorshipCredit && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      <strong>Total Value of Mentorship Credit:</strong>
                    </span>
                    <span style={{ marginLeft: 3, textAlign: "center" }}>
                      {getCurrencyCode()}
                      {(
                        course.mentorshipCredit * course.costPerMentorshipCredit
                      )
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                    </span>
                  </Typography>
                )}
                {course.hasMentorshipCredit && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      <strong>Mentorship Duration:</strong>
                    </span>
                    <span style={{ marginLeft: 3, textAlign: "center" }}>
                      {course.mentorshipDuration}&nbsp;&nbsp; ( from the day of
                      graduation)
                    </span>
                  </Typography>
                )}
                {course.isInstallmentalPaymentAllowed === "yes" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      <strong>Is Installmental Payment Allowed :</strong>
                    </span>
                    <span style={{ marginLeft: 3, textAlign: "center" }}>
                      {course.isInstallmentalPaymentAllowed
                        .charAt(0)
                        .toUpperCase() +
                        course.isInstallmentalPaymentAllowed.slice(1)}
                    </span>
                  </Typography>
                )}
                {course.isInstallmentalPaymentAllowed === "yes" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      <strong>
                        Maximum Number of Installmental Payment Allowed :
                      </strong>
                    </span>
                    <span style={{ marginLeft: 3, textAlign: "center" }}>
                      {course.maximumInstallmentalPayment}&nbsp;times
                    </span>
                  </Typography>
                )}
                {course.passGrade !== undefined && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Minimum NextChamp Grade:</strong>
                    </span>
                    {course.passGrade}
                  </Typography>
                )}
                <br /> <br />
                {course.isCourseAuditable && (
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
                        <span>{course.weekdayAuditDays}</span>
                      </strong>
                      &nbsp;. You only make payment afterwards when you are sure
                      the course is a good fit for you
                    </span>
                  </Typography>
                )}
              </CardContent>
            </Grid>

            <Grid item style={{ width: "26.50%", border: "1px dotted grey" }}>
              {course.price && (
                <CartUpdateAndDeliveryForm
                  price={course.price}
                  minimumQuantity={course.minimumQuantity}
                  courseId={course.id}
                  currency={course.currency}
                  preferredStartDate={props.preferredStartDate}
                  cartCounterHandler={props.cartCounterHandler}
                  token={props.token}
                  userId={props.userId}
                  quantity={props.quantity}
                  cartId={props.cartId}
                  handleMakeOpenLoginFormDialogStatus={
                    handleMakeOpenLoginFormDialogStatus
                  }
                  handleSuccessfulCreateSnackbar={
                    props.handleSuccessfulCreateSnackbar
                  }
                  handleFailedSnackbar={props.handleFailedSnackbar}
                  getCurrencyCode={getCurrencyCode}
                  handleCartItemForCheckoutBox={
                    props.handleCartItemForCheckoutBox
                  }
                  renderCartUpdate={props.renderCartUpdate}
                  renderCartUpdateAfterRemoval={
                    props.renderCartUpdateAfterRemoval
                  }
                />
              )}
            </Grid>
          </Grid>
        </Card>
      ) : (
        <Card className={classes.rootMobile} disableRipple>
          {/* <CardActionArea disableRipple> */}
          <Grid container direction="column">
            <Grid item style={{ width: "100%" }}>
              <CardMedia
                className={classes.mediaMobile}
                component="img"
                alt={course.title}
                image={imageUrl}
                //title={product.name}
                crossOrigin="anonymous"
              />
            </Grid>
            <Grid item style={{ width: "100%", border: "1px dotted grey" }}>
              <CardContent disableRipple>
                {course.hasSeries ? (
                  <Typography variant="h4" color="textSecondary" component="p">
                    {course.title}
                    <span style={{ fontSize: 16, fontWeight: 700 }}>
                      <em> ({course.series})</em>
                    </span>
                  </Typography>
                ) : (
                  <Typography variant="h4" color="textSecondary" component="p">
                    {course.title}
                  </Typography>
                )}
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  component="p"
                >
                  {Str(course.shortDescription).limit(200, "...").get()}
                </Typography>
                <Typography
                  variant="h5"
                  color="textSecondary"
                  component="p"
                  style={{ marginTop: 5 }}
                >
                  <span style={{ marginLeft: 130 }}>
                    <strong>
                      {getCurrencyCode()}
                      {course.price
                        ? course.price
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                        : ""}
                    </strong>
                  </span>
                </Typography>
                {course.refNumber !== undefined && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Reference Number:</strong>
                    </span>
                    {course.refNumber}
                  </Typography>
                )}
                {course.duration !== undefined && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Duration:</strong>
                    </span>
                    {course.duration}
                  </Typography>
                )}
                {course.commencementDate !== undefined && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Start date:</strong>
                    </span>
                    {course.commencementDate
                      ? new Date(course.commencementDate).toDateString()
                      : "Coming Soon"}
                  </Typography>
                )}
                {course.deliveryMethod !== undefined && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Delivery Method:</strong>
                    </span>
                    {course.deliveryMethod}
                  </Typography>
                )}
                {course.venue !== undefined && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Venue:</strong>
                    </span>
                    {course.venue}
                  </Typography>
                )}
                {course.track !== undefined && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Track:</strong>
                    </span>
                    {course.track}
                  </Typography>
                )}
                {course.commencementWeekdaysDate !== undefined && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      <strong>Weekday Start Date():</strong>
                    </span>
                    <span style={{ marginLeft: 3, textAlign: "center" }}>
                      {course.commencementWeekdaysDate.join("|")}
                    </span>
                  </Typography>
                )}
                {course.commencementWeekendsDate !== undefined && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      <strong>Weekend Start Date(s):</strong>
                    </span>
                    <span style={{ marginLeft: 3, textAlign: "center" }}>
                      {course.commencementWeekendsDate.join("|")}
                    </span>
                  </Typography>
                )}
                <Typography
                  variant="h5"
                  style={{ color: "black", fontSize: 15 }}
                >
                  <span style={{ marginRight: 20 }}>
                    <strong>Weekday Lecture Period:</strong>
                  </span>
                  <span style={{ marginLeft: 3, textAlign: "center" }}>
                    {course.weekdaySessionPeriod}
                  </span>
                </Typography>
                <Typography
                  variant="h5"
                  style={{ color: "black", fontSize: 15 }}
                >
                  <span style={{ marginRight: 20 }}>
                    <strong>Weekend Lecture Period:</strong>
                  </span>
                  <span style={{ marginLeft: 3, textAlign: "center" }}>
                    {course.weekendSessionPeriod}
                  </span>
                </Typography>
                {course.hasMentorshipCredit && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      <strong>Mentorship Credit:</strong>
                    </span>
                    <span style={{ marginLeft: 3, textAlign: "center" }}>
                      {course.mentorshipCredit}&nbsp; Units &nbsp;
                    </span>
                  </Typography>
                )}
                {course.hasMentorshipCredit && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      <strong>Mentorship Credit Value:</strong>
                    </span>
                    <span style={{ marginLeft: 1, textAlign: "center" }}>
                      {getCurrencyCode()}
                      {(
                        course.mentorshipCredit * course.costPerMentorshipCredit
                      )
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                    </span>
                  </Typography>
                )}
                {course.hasMentorshipCredit && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      <strong>Mentorship Duration:</strong>
                    </span>
                    <span style={{ marginLeft: 3, textAlign: "center" }}>
                      {course.mentorshipDuration}&nbsp;&nbsp;
                    </span>
                  </Typography>
                )}
                {course.isInstallmentalPaymentAllowed === "yes" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      <strong>Installmental Payment Allowed :</strong>
                    </span>
                    <span style={{ marginLeft: 3, textAlign: "center" }}>
                      {course.isInstallmentalPaymentAllowed
                        .charAt(0)
                        .toUpperCase() +
                        course.isInstallmentalPaymentAllowed.slice(1)}
                    </span>
                  </Typography>
                )}
                {course.isInstallmentalPaymentAllowed === "yes" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      <strong>No. of Installmental Payment:</strong>
                    </span>
                    <span style={{ marginLeft: 3, textAlign: "center" }}>
                      {course.maximumInstallmentalPayment}&nbsp;times
                    </span>
                  </Typography>
                )}
                {course.passGrade !== undefined && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Minimum NextChamp Grade:</strong>
                    </span>
                    {course.passGrade}
                  </Typography>
                )}
                <br /> <br />
                {course.isCourseAuditable && (
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
                        <span>{course.weekdayAuditDays}</span>
                      </strong>
                      &nbsp;. You only make payment afterwards when you are sure
                      the course is a good fit for you
                    </span>
                  </Typography>
                )}
              </CardContent>
            </Grid>

            <Grid item style={{ width: "100%", border: "1px dotted grey" }}>
              {course.price && (
                <CartUpdateAndDeliveryForm
                  price={course.price}
                  minimumQuantity={course.minimumQuantity}
                  courseId={course.id}
                  currency={course.currency}
                  preferredStartDate={props.preferredStartDate}
                  cartCounterHandler={props.cartCounterHandler}
                  token={props.token}
                  userId={props.userId}
                  quantity={props.quantity}
                  cartId={props.cartId}
                  handleMakeOpenLoginFormDialogStatus={
                    handleMakeOpenLoginFormDialogStatus
                  }
                  handleSuccessfulCreateSnackbar={
                    props.handleSuccessfulCreateSnackbar
                  }
                  handleFailedSnackbar={props.handleFailedSnackbar}
                  getCurrencyCode={getCurrencyCode}
                  handleCartItemForCheckoutBox={
                    props.handleCartItemForCheckoutBox
                  }
                  renderCartUpdate={props.renderCartUpdate}
                  renderCartUpdateAfterRemoval={
                    props.renderCartUpdateAfterRemoval
                  }
                />
              )}
            </Grid>
          </Grid>
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

          <Bookings
            token={props.token}
            userId={props.userId}
            handleBookingsOpenDialogStatus={handleBookingsOpenDialogStatus}
          />
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
