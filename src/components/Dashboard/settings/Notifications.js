import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function Notifications() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h5>This is the Notifications</h5>
    </div>
  );
}

export default Notifications;
