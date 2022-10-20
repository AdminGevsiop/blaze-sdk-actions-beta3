import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  blockedNumberGroup: {
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  blockedNumber: {
    display: "inline-block",
    width: 24,
    height: 20,
    background: "#F0F0F0",
    borderRadius: 4,
    marginRight: 2,
    textAlign: "center",
    lineHeight: "20px"
  }
}))

const MeterBox = params => {
  const classes = useStyles();
  const splitText = String(params.value).split(/(?:)/u);

  if(splitText !== []) {
    return (
      <div className={classes.blockedNumberGroup}>
        {splitText.map((splitVal, i) => 
          <span className={classes.blockedNumber} key={i}>{splitVal}</span>
        )}
      </div>
    )
  } else {
    return params.value
  }
}

export default MeterBox;