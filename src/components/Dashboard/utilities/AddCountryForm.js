import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import api from "./../../../apis/local";
// import { CREATE_COUNTRY } from "../../../actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
  },
  formStyles: {
    width: 600,
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 160,
    marginLeft: 170,
    marginTop: 20,
    marginBottom: 20,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

const renderCountryNameField = ({
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
      helperText="Enter Country Name"
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

      // style={{ marginTop: 10 }}

      //onChange={handleInput}
    />
  );
};

const renderCountryCodeField = ({
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
      helperText="Enter Country Code"
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

const renderCountryDescriptionField = ({
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
      helperText="Provide a description of this country"
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

const renderCountryFlagField = ({
  floatingLabelText,
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  // if (input.value && input.value[0] && input.value[0].name) {
  //   floatingLabelText = input.value[0].name;
  // }
  delete input.value;
  return (
    <TextField
      id={input.name}
      variant="outlined"
      type={type}
      fullWidth
      style={{ marginTop: 20 }}
      helperText="Upload Country Flag"
      {...custom}
      onChange={input.onChange}

      // inputProps={{ type: "file" }}
    />
  );
};

function AddCountryForm(props) {
  const classes = useStyles();

  const [continent, setContinent] = useState();
  const [region, setRegion] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleContinentChange = (event) => {
    setContinent(event.target.value);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const renderContinentField = ({
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
            labelId="continent"
            id="continent"
            value={continent}
            onChange={handleContinentChange}
            label="Prefered Currency"
            style={{ width: 300, height: 38 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"africa"}>Africa</MenuItem>
            <MenuItem value={"europe"}>Europe</MenuItem>
            <MenuItem value={"asia"}>Asia</MenuItem>
            <MenuItem value={"north-america"}>North America</MenuItem>
            <MenuItem value={"south-america"}>South America</MenuItem>
          </Select>
          <FormHelperText>Select Continent</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderContinentRegionsField = ({
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
            label="Continent Region"
            style={{ width: 190, height: 38 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
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
          <FormHelperText>Select Continent Region</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const buttonContent = () => {
    return <React.Fragment> Add Country</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);

    if (!formValues["code"]) {
      formValues["code"] = "ES-" + Math.floor(Math.random() * 10000);
    }
    const form = new FormData();
    form.append("name", formValues.name);
    form.append("code", formValues.code);
    form.append("description", formValues.description);
    form.append("continent", continent);
    form.append("region", region);
    form.append("createdBy", props.userId);
    if (formValues.flag) {
      form.append("flag", formValues.flag[0]);
    }

    if (form) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/countries`, form);

        if (response.data.status === "success") {
          dispatch({
            //type: CREATE_COUNTRY,
            payload: response.data.data.data,
          });

          props.handleSuccessfulCreateSnackbar(
            `${response.data.data.data.name} Country is added successfully!!!`
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
    <div className={classes.root}>
      <Grid item container justifyContent="center">
        <FormLabel
          style={{ color: "blue", fontSize: "1.5em" }}
          component="legend"
        >
          Add Country
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="countryForm"
        // onSubmit={onSubmit}
        sx={{
          width: 500,
          height: 450,
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
              component={renderCountryNameField}
            />
          </Grid>
          <Grid item style={{ width: "28%", marginLeft: 10 }}>
            <Field
              label=""
              id="code"
              name="code"
              type="text"
              component={renderCountryCodeField}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "60%" }}>
            <Field
              label=""
              id="continent"
              name="continent"
              type="text"
              component={renderContinentField}
            />
          </Grid>
          <Grid item style={{ width: "37%", marginLeft: 10 }}>
            <Field
              label=""
              id="region"
              name="region"
              type="text"
              component={renderContinentRegionsField}
            />
          </Grid>
        </Grid>
        <Field
          label=""
          id="description"
          name="description"
          type="text"
          component={renderCountryDescriptionField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="flag"
          name="flag"
          type="file"
          accept="image/*"
          component={renderCountryFlagField}
          floatingLabelText={"Upload Image"}
          fullWidth={true}
          style={{ marginTop: 10 }}

          // onChange={uploadScreenshotFile}
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
    </div>
  );
}

export default reduxForm({
  form: "countryForm",
})(AddCountryForm);
