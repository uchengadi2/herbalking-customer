import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Lottie from "react-lottie";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ButtonArrow from "./../ui/ButtonArrow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Snackbar from "@material-ui/core/Snackbar";
import ReactPlayer from "react-player";
import CircularProgress from "@material-ui/core/CircularProgress";

import CallToAction from "./../ui/CallToAction";

import revolutionBackground from "./../../assets/repeatingBackground.svg";
import infoBackground from "./../../assets/infoBackground.svg";
import ProductCard from "./../ProductCard";
import background from "./../../logistic_assets/cover_image_1.png";
import { Category } from "@material-ui/icons";
import history from "../../history";
import AboutUsFormContainer from "./../aboutus/AboutUsFormContainer";
import ContactUsContainerForm from "./../contactus/ContactUsContainerForm";
import BecomePartnerFormContainer from "./../partner/BecomePartnerFormContainer";
import CategoryProductsCard from "../CategoryProductsCard";
import ProductDetailCard from "./ProductDetailCard";
import UpperFooter from "../ui/UpperFooter";
import SendCourseToCheckoutForm from "./SendCourseToCheckoutForm";

import { baseURL } from "./../../apis/util";
import api from "./../../apis/local";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "80vh",
    // height: "100%",
    position: "relative",
    "& video": {
      objectFit: "cover",
    },
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "99rem",
    height: "42rem",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  animation: {
    // maxWidth: "100em",
    minWidth: "21em",
    marginTop: "2em",
    marginLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "30em",
    },
  },
  footer: {
    width: "100%",
    marginTop: "10rem",
  },
  estimateButton: {
    ...theme.typography.estimate,
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    height: 45,
    width: 155,
    marginRight: 40,
    fontWeight: 400,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  buttonContainer: {
    marginTop: "2.9em",
    marginLeft: "5.5em",
  },
  learnButtonHero: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 45,
    width: 145,
  },
  visitPartnerButtonsite: {
    ...theme.typography.partnerButton,
    fontSize: "0.9rem",
    height: 45,
    width: 200,
    [theme.breakpoints.down("sm")]: {
      width: 100,
    },
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },

    [theme.breakpoints.down("sm")]: {
      marginTop: "2em",
    },
  },
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    border: `2px solid ${theme.palette.common.blue}`,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  mainContainer: {
    marginTop: "5em",
    marginLeft: "2px",
    [theme.breakpoints.down("md")]: {
      marginTop: "3em",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "1em",
    },
  },
  heroTextContainer: {
    minWidth: "21.5em",
    marginLeft: "1em",
    color: "white",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  specialText: {
    fontFamily: "Pacifico",
    color: theme.palette.common.orange,
  },
  subtitle: {
    marginBottom: "1em",
  },
  icon: {
    marginLeft: "2em",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  serviceContainer: {
    marginTop: "12em",
    [theme.breakpoints.down("sm")]: {
      padding: 25,
    },
  },
  revolutionBackground: {
    backgroundImage: `url(${revolutionBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
  },
  revolutionCard: {
    position: "absolute",
    boxShadow: theme.shadows[10],
    borderRadius: 15,
    padding: "10em",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "8em",
      paddingBottom: "8em",
      paddingLeft: 0,
      paddingRight: 0,
      borderRadius: 0,
      width: "100%",
    },
  },
  infoBackground: {
    backgroundImage: `url(${infoBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
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

function ProductDetails(props) {
  const params = useParams();
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [contactUsOpen, setContactUsOpen] = useState(false);
  const [becomePartnerOpen, setBecomePartnerOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [isOnPromo, setIsOnPromo] = useState(false);
  const [promoPrice, setPromoPrice] = useState();
  const [promoMinQuantity, setPromoMinQuantity] = useState();
  const [course, setCourse] = useState({});
  const [isLoading, setIsLoading] = useState(null);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const defaultOptions = {
    loop: true,
    autoplay: false,
    // animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidyMid slice",
    },
  };

  const categorySlug = params.catSlug;
  const slug = params.slug;

  const handleBecomeAPartnerOpenDialogBox = () => {
    setBecomePartnerOpen(false);
  };

  const handleSuccessfulBecomeAPartnerOpenDialogBoxWithSnackbar = () => {
    setBecomePartnerOpen(false);
    setAlert({
      open: true,
      message: "Application successfully submitted",
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedBecomeAPartnerOpenDialogBoxWithSnackbar = () => {
    setAlert({
      open: true,
      message: "Something went wrong somewhere",
      backgroundColor: "#FF3232",
    });
    setBecomePartnerOpen(true);
  };

  //confirm if product is on promp
  // useEffect(() => {
  //   const fetchData = async () => {
  //     let allData = [];
  //     api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
  //     const response = await api.get(`/productsonsale`, {
  //       params: {
  //         course: courseId,
  //         //status: "active",
  //       },
  //     });
  //     const item = response.data.data.data;

  //     allData.push({
  //       id: item[0].id,
  //       price: item[0].salesPricePerUnit,
  //       minQuantity: item[0].minimumQuantity,
  //     });

  //     if (!allData) {
  //       return;
  //     }

  //     setPromoPrice(allData[0].price);
  //     setIsOnPromo(true);
  //     setPromoMinQuantity(allData[0].minQuantity);
  //   };

  //   //call the function

  //   fetchData().catch(console.error);
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/courses`, {
        params: { slug: slug },
      });
      const course = response.data.data.data;

      if (course.length >= 1) {
        allData.push({
          id: course[0]._id,
          title: course[0].title,
          imageCover: course[0].imageCover,
          shortDescription: course[0].shortDescription,
          longDescription: course[0].longDescription,
          features: course[0].features,
          deliveryMethod: course[0].deliveryMethod,
          duration: course[0].duration,
          category: course[0].category,
          price: course[0].price,
          currency: course[0].currency,
          venue: course[0].venue,
          refNumber: course[0].refNumber,
          sessionDuration: course[0].sessionDuration,
          sessionPeriod: course[0].sessionPeriod,
          studyPeriod: course[0].studyPeriod,
          lectureDuration: course[0].lectureDuration,
          projectDuration: course[0].projectDuration,
          instructor: course[0].instructor,
          image: course[0].imageCover,
          createBy: course[0].createBy,
          prerequisites: course[0].prerequisites,
          tools: course[0].tools,
          targetAudience: course[0].targetAudience,
          whatToLearn: course[0].whatToLearn,
          venueLink: course[0].venueLink,
          contents: course[0].contents,
          capstoneProject: course[0].capstoneProject,
          passGrade: course[0].passGrade,
          successTips: course[0].successTips,
          track: course[0].track,
          status: course[0].status,
          slug: course[0].slug,
          commencementWeekdaysDate: course[0].commencementWeekdaysDate,
          commencementWeekendsDate: course[0].commencementWeekendsDate,
          channel: course[0].channel,
          programme: course[0].programme,
          showGenericWeekdayStartDateText:
            course[0].showGenericWeekdayStartDateText,
          showGenericWeekendStartDateText:
            course[0].showGenericWeekendStartDateText,
          genericWeekdayStartDateText: course[0].genericWeekdayStartDateText,
          genericWeekendStartDateText: course[0].genericWeekendStartDateText,
          weekdaySessionPeriod: course[0].weekdaySessionPeriod,
          weekendSessionPeriod: course[0].weekendSessionPeriod,
          paymentOptions: course[0].paymentOptions,
          isCourseAuditable: course[0].isCourseAuditable,
          weekdayAuditDays: course[0].weekdayAuditDays,
          weekendAuditDays: course[0].weekendAuditDays,
          hasMentorshipCredit: course[0].hasMentorshipCredit,
          mentorshipCredit: course[0].mentorshipCredit,
          mentorshipDuration: course[0].mentorshipDuration,
          hasSeries: course[0].hasSeries,
          series: course[0].series,
          costPerMentorshipCredit: course[0].costPerMentorshipCredit,
          isInstallmentalPaymentAllowed:
            course[0].isInstallmentalPaymentAllowed,
          maximumInstallmentalPayment: course[0].maximumInstallmentalPayment,
        });

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
          contents: allData[0].contents,
          capstoneProject: allData[0].capstoneProject,
          passGrade: allData[0].passGrade,
          successTips: allData[0].successTips,
          track: allData[0].track,
          status: allData[0].status,
          commencementWeekdaysDate: allData[0].commencementWeekdaysDate,
          commencementWeekendsDate: allData[0].commencementWeekendsDate,
          channel: allData[0].channel,
          slug: allData[0].slug,
          programme: allData[0].programme,
          showGenericWeekdayStartDateText:
            allData[0].showGenericWeekdayStartDateText,
          showGenericWeekendStartDateText:
            allData[0].showGenericWeekendStartDateText,
          genericWeekdayStartDateText: allData[0].genericWeekdayStartDateText,
          genericWeekendStartDateText: allData[0].genericWeekendStartDateText,
          weekdaySessionPeriod: allData[0].weekdaySessionPeriod,
          weekendSessionPeriod: allData[0].weekendSessionPeriod,
          paymentOptions: allData[0].paymentOptions,
          isCourseAuditable: allData[0].isCourseAuditable,
          weekdayAuditDays: allData[0].weekdayAuditDays,
          weekendAuditDays: allData[0].weekendAuditDays,
          hasMentorshipCredit: allData[0].hasMentorshipCredit,
          mentorshipCredit: allData[0].mentorshipCredit,
          mentorshipDuration: allData[0].mentorshipDuration,
          hasSeries: allData[0].hasSeries,
          series: allData[0].series,
          costPerMentorshipCredit: allData[0].costPerMentorshipCredit,
          isInstallmentalPaymentAllowed:
            allData[0].isInstallmentalPaymentAllowed,
          maximumInstallmentalPayment: allData[0].maximumInstallmentalPayment,
        });

        setIsLoading(false);
      }
    };

    //call the function

    fetchData().catch(console.error);
  }, [slug]);

  const Str = require("@supercharge/strings");

  const courseData = matchesMD ? (
    <React.Fragment>
      {
        <Grid container direction="row">
          <ProductDetailCard
            course={course}
            // isOnPromo={isOnPromo}
            // promoPrice={promoPrice}
            // promoMinQuantity={promoMinQuantity}
            prerequisites={course.prerequisites}
            tools={course.tools}
            targetAudience={course.targetAudience}
            whatToLearn={course.whatToLearn}
            venueLink={course.venueLink}
            contents={course.contents}
            capstoneProject={course.capstoneProject}
            passGrade={course.passGrade}
            successTips={course.successTips}
            track={course.track}
            status={course.status}
            commencementWeekdaysDate={course.commencementWeekdaysDate}
            commencementWeekendsDate={course.commencementWeekendsDate}
            channel={course.channel}
            programme={course.programme}
            slug={course.slug}
            showGenericWeekdayStartDateText={
              course.showGenericWeekdayStartDateText
            }
            showGenericWeekendStartDateText={
              course.showGenericWeekendStartDateText
            }
            genericWeekdayStartDateText={course.genericWeekdayStartDateText}
            genericWeekendStartDateText={course.genericWeekendStartDateText}
            weekdaySessionPeriod={course.weekdaySessionPeriod}
            weekendSessionPeriod={course.weekendSessionPeriod}
            paymentOptions={course.paymentOptions}
            isCourseAuditable={course.isCourseAuditable}
            weekdayAuditDays={course.weekdayAuditDays}
            weekendAuditDays={course.weekendAuditDays}
            hasMentorshipCredit={course.hasMentorshipCredit}
            mentorshipCredit={course.mentorshipCredit}
            mentorshipDuration={course.mentorshipDuration}
            hasSeries={course.hasSeries}
            costPerMentorshipCredit={course.costPerMentorshipCredit}
            isInstallmentalPaymentAllowed={course.isInstallmentalPaymentAllowed}
            maximumInstallmentalPayment={course.maximumInstallmentalPayment}
            series={course.series}
            key={course.id}
            token={props.token}
            userId={props.userId}
            setToken={props.setToken}
            setUserId={props.setUserId}
            handleSuccessfulCreateSnackbar={
              props.handleSuccessfulCreateSnackbar
            }
            handleFailedSnackbar={props.handleFailedSnackbar}
            cartCounterHandler={props.cartCounterHandler}
          />
        </Grid>
      }
    </React.Fragment>
  ) : (
    <React.Fragment>
      {
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <ProductDetailCard
            course={course}
            // isOnPromo={isOnPromo}
            // promoPrice={promoPrice}
            // promoMinQuantity={promoMinQuantity}
            prerequisites={course.prerequisites}
            tools={course.tools}
            targetAudience={course.targetAudience}
            whatToLearn={course.whatToLearn}
            venueLink={course.venueLink}
            contents={course.contents}
            capstoneProject={course.capstoneProject}
            passGrade={course.passGrade}
            successTips={course.successTips}
            track={course.track}
            status={course.status}
            commencementWeekdaysDate={course.commencementWeekdaysDate}
            commencementWeekendsDate={course.commencementWeekendsDate}
            channel={course.channel}
            slug={course.slug}
            programme={course.programme}
            showGenericWeekdayStartDateText={
              course.showGenericWeekdayStartDateText
            }
            showGenericWeekendStartDateText={
              course.showGenericWeekendStartDateText
            }
            genericWeekdayStartDateText={course.genericWeekdayStartDateText}
            genericWeekendStartDateText={course.genericWeekendStartDateText}
            weekdaySessionPeriod={course.weekdaySessionPeriod}
            weekendSessionPeriod={course.weekendSessionPeriod}
            paymentOptions={course.paymentOptions}
            isCourseAuditable={course.isCourseAuditable}
            weekdayAuditDays={course.weekdayAuditDays}
            weekendAuditDays={course.weekendAuditDays}
            hasMentorshipCredit={course.hasMentorshipCredit}
            mentorshipCredit={course.mentorshipCredit}
            mentorshipDuration={course.mentorshipDuration}
            hasSeries={course.hasSeries}
            costPerMentorshipCredit={course.costPerMentorshipCredit}
            isInstallmentalPaymentAllowed={course.isInstallmentalPaymentAllowed}
            maximumInstallmentalPayment={course.maximumInstallmentalPayment}
            series={course.series}
            key={course.id}
            token={props.token}
            userId={props.userId}
            setToken={props.setToken}
            setUserId={props.setUserId}
            handleSuccessfulCreateSnackbar={
              props.handleSuccessfulCreateSnackbar
            }
            handleFailedSnackbar={props.handleFailedSnackbar}
            cartCounterHandler={props.cartCounterHandler}
          />
        </Grid>
      }
    </React.Fragment>
  );

  return (
    <Grid container direction="row" className={classes.root}>
      <Grid item style={{ marginTop: "10px" }}>
        {isLoading && (
          <CircularProgress
            size={100}
            color="inherit"
            style={{ marginTop: 250, marginLeft: 650 }}
          />
        )}

        {!isLoading && <Grid item>{courseData}</Grid>}

        {/*....INFORMATION BLOCK....*/}
      </Grid>
      <Grid item className={classes.footer}>
        <UpperFooter />
      </Grid>
    </Grid>
  );
}

export default ProductDetails;
