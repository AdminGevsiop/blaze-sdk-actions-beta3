import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Box, Icon } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  noData: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700
  }
}))

const NoData = ({message}) => {
  const classes = useStyles();

  return (
    <Box px={3} py={5} className={classes.noData}>
      <Box mr={2} clone>
        <Icon className="icon-alarm" color="primary" />
      </Box>
      {message}
    </Box>
  )
}

export default NoData;