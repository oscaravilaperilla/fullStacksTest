import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Box, Typography } from "@material-ui/core";

const Block = ({ item }) => {
  const classes = useStyles();
  return (
    <Box m={0.5} className={classes.summaryContent}>
      <Typography m={0.5} className={classes.idTitle}>
        {item.id}
      </Typography>
      <Typography m={0.5}>{item.attributes.data}</Typography>
    </Box>
  );
};

export default Block;

Block.propTypes = {
  item: PropTypes.object.isRequired,
};

const useStyles = makeStyles(() => ({
  summaryContent: {
    display: "inline-block",
    backgroundColor: "lightgray",
    width: "100%",
  },
  idTitle: {
    color: "blue",
  },
}));
