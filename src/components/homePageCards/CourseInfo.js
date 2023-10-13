import React, { useState, useRef, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import ReactMarkdown from "react-markdown";
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
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import ProductDetails from "../products/ProductDetails";
import ButtonArrow from "../ui/ButtonArrow";
import theme from "./../ui/Theme";
import api from "./../../apis/local";
import { CREATE_RATE, EDIT_RATE } from "../../actions/types";

//import CheckoutPage from "./CheckoutPage";

const useStyles = makeStyles((theme) => ({
  root: {
    //width: 600,
    marginLeft: 15,
  },
  formStyles: {
    width: 600,
  },

  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 130,
    marginLeft: 80,
    marginTop: 30,
    marginBottom: 15,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.orange,
      color: "white",
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
}));

function CourseInfo(props) {
  const {
    benefits,
    tools,
    targetAudience,
    whatToLearn,
    venueLink,
    categoryId,
    productId,

    slug,
  } = props;

  const params = useParams();

  //const user = params.userId;

  const classes = useStyles();

  const [loading, setLoading] = useState();
  const [categorySlug, setCategorySlug] = useState();

  //get the category slug

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/categories/${categoryId}`);
      const items = response.data.data.data;

      allData.push({
        id: items._id,
        slug: items.slug,
      });

      if (allData) {
        setCategorySlug(allData[0].slug);
      }
    };

    //call the function

    fetchData().catch(console.error);
  }, [categoryId, props]);

  const buttonContent = () => {
    return <React.Fragment>Show Details</React.Fragment>;
  };

  return (
    <form id="courseInfo">
      <Box
        sx={{
          width: 200,
          //height: 450,
        }}
        noValidate
        autoComplete="off"
        className={classes.root}
      >
        <Grid
          item
          container
          style={{ marginTop: 10, marginBottom: 10 }}
          justifyContent="center"
        ></Grid>

        {benefits && (
          <Typography style={{ width: 300, marginTop: 15 }}>
            <strong>Benefits:</strong>&nbsp;
            <ReactMarkdown>{benefits}</ReactMarkdown>
          </Typography>
        )}
        <br />
        {/* <Typography style={{ width: 300, marginTop: 10 }}>
          <strong>Who should attend:</strong>&nbsp;
          <ReactMarkdown>{targetAudience}</ReactMarkdown>
        </Typography> */}

        {
          <Button
            component={Link}
            // to="/mobileapps"
            // to={`/categories/${categoryId}/${productId}`}
            to={`/categories/${categorySlug}/${slug}`}
            varaint="outlined"
            className={classes.submitButton}
            onClick={() => <ProductDetails />}
          >
            {/* <span style={{ marginRight: 10 }}>Show Details </span> */}
            {loading ? (
              <CircularProgress size={30} color="inherit" />
            ) : (
              buttonContent()
            )}
            {/* <ButtonArrow
            height={10}
            width={10}
            fill={theme.palette.common.blue}
          /> */}
          </Button>
        }
      </Box>
    </form>
  );
}

export default reduxForm({
  form: "courseInfo",
})(CourseInfo);
