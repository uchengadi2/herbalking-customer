import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

import api from "./../../../apis/local";
//import { CREATE_STATE } from "../../../actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
  },
  formStyles: {
    width: 600,
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 120,
    marginLeft: 190,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

const renderStateNameField = ({
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
      helperText="Enter State Name"
      variant="outlined"
      //label={label}
      id={input.name}
      //value={formInput.name}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
      inputProps={{
        style: {
          height: 1,
        },
      }}
    />
  );
};

const renderStateCodeField = ({
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
      helperText="Enter State Code"
      variant="outlined"
      //label={label}
      id={input.name}
      //value={formInput.name}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
      inputProps={{
        style: {
          height: 1,
        },
      }}
    />
  );
};

const renderStateDescriptionField = ({
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
      helperText="Provide a description of this state"
      variant="outlined"
      //label={label}
      id={input.name}
      //value={formInput.name}
      fullWidth
      //required
      type={type}
      {...custom}
      multiline={true}
      minRows={5}
      onChange={input.onChange}
    />
  );
};

function AddStateForm(props) {
  const classes = useStyles();

  const [country, setCountry] = useState();
  const [region, setRegion] = useState();
  const [countryList, setCountryList] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get("/countries");
      const workingData = response.data.data.data;
      workingData.map((country) => {
        allData.push({ id: country._id, name: country.name });
      });
      setCountryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

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
            style={{ width: 300, height: 38 }}
          >
            {renderCountryList()}
          </Select>
          <FormHelperText>Select Country</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderCountryRegionsField = ({
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
            labelId="region"
            id="region"
            value={region}
            onChange={handleRegionChange}
            label="Country Region"
            style={{ width: 190, height: 38 }}
          >
            <MenuItem value={"west"}>West</MenuItem>
            <MenuItem value={"east"}>East</MenuItem>
            <MenuItem value={"north"}>North</MenuItem>
            <MenuItem value={"south"}>South</MenuItem>
            <MenuItem value={"central"}>Central</MenuItem>
            <MenuItem value={"south-east"}>South East</MenuItem>
            <MenuItem value={"south-west"}>South West</MenuItem>
            <MenuItem value={"south-central"}>South Central</MenuItem>
            <MenuItem value={"south-south"}>South South</MenuItem>
            <MenuItem value={"north-east"}>North East</MenuItem>
            <MenuItem value={"north-west"}>North West</MenuItem>
            <MenuItem value={"north-central"}>North Central</MenuItem>
            <MenuItem value={"north-north"}>North North</MenuItem>
          </Select>
          <FormHelperText>Select Country Region</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const buttonContent = () => {
    return <React.Fragment> Add State</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);
    const data = {
      name: formValues.name,
      region: region,
      description: formValues.description,
      country: country,
      code: formValues.code
        ? formValues.code
        : "ST-" + Math.floor(Math.random() * 10000),
      createdBy: props.userId,
    };

    if (data) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/states`, data);

        if (response.data.status === "success") {
          dispatch({
            //type: CREATE_STATE,
            payload: response.data.data.data,
          });

          props.handleSuccessfulCreateSnackbar(
            `${response.data.data.data.name} State is added successfully!!!`
          );
          props.handleDialogOpenStatus();
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

  return (
    <>
      <Grid item container justifyContent="center">
        <FormLabel
          style={{ color: "blue", fontSize: "1.5em" }}
          component="legend"
        >
          <Typography variant="h5">Add State</Typography>
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="stateForm"
        // onSubmit={onSubmit}
        sx={{
          width: 500,
        }}
        noValidate
        autoComplete="off"
        style={{ marginTop: 10 }}
      >
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "70%" }}>
            <Field
              label=""
              id="name"
              name="name"
              type="text"
              component={renderStateNameField}
            />
          </Grid>
          <Grid item style={{ width: "28%", marginLeft: 10 }}>
            <Field
              label=""
              id="code"
              name="code"
              type="text"
              component={renderStateCodeField}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "60%" }}>
            <Field
              label=""
              id="country"
              name="country"
              type="text"
              component={renderCountryField}
            />
          </Grid>
          <Grid item style={{ width: "37%", marginLeft: 10 }}>
            <Field
              label=""
              id="region"
              name="region"
              type="text"
              component={renderCountryRegionsField}
            />
          </Grid>
        </Grid>
        <Field
          label=""
          id="description"
          name="description"
          type="text"
          component={renderStateDescriptionField}
          style={{ marginTop: 10 }}
        />

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
      </Box>
      {/* </form> */}
    </>
  );
}

export default reduxForm({
  form: "stateForm",
})(AddStateForm);
