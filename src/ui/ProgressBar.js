import React from 'react';
import clsx from 'clsx';
import { makeStyles, fade, withStyles } from '@material-ui/core';
import { Box, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  progressBarGroup: {
    display: "flex",
    alignItems: "center",
    fontSize: theme.typography.fontSize * .875
  },
  progressBarPrimary: {
    backgroundColor: theme.palette.primary.main
  },
  progressBarSecondary: {
    backgroundColor: theme.palette.secondary.main
  },
  progressBarSuccess: {
    backgroundColor: theme.palette.success.main
  },
  progressBarInfo: {
    backgroundColor: theme.palette.info.main
  },
  progressBarWarning: {
    backgroundColor: theme.palette.warning.main
  },
  progressBarError: {
    backgroundColor: theme.palette.error.main
  }
}))

const StyledProgressBar = withStyles( theme => ({
  root: {
    marginTop: 8,
    marginBottom: 8,
    height: 8,
    borderRadius: 4,
    width: "100%",
    minWidth: 120
  },
  bar: {
    borderRadius: 4
  },
  colorPrimary: {
    backgroundColor: fade(theme.palette.primary.main , .1)
  },
  barColorPrimary: {}
}))(LinearProgress);

const ProgressBar = ({label, value, maxValue, showValue, className, color, extraLabel, extraValue, setStyle}) => {
  const classes = useStyles();
  const fullVal = parseFloat(maxValue);
  const oriVal = parseFloat(value);
  const oriExtraValue = parseFloat(extraValue);
  const styles = setStyle;

  if(extraValue && oriVal>oriExtraValue){
    color = 'error';
  }
  const progressColor = (function() {
		switch(color) {
			case 'primary':
			return classes.progressBarPrimary;
			case 'secondary':
			return classes.progressBarSecondary;
			case 'success':
			return classes.progressBarSuccess;
			case 'info':
			return classes.progressBarInfo;
			case 'warning':
			return classes.progressBarWarning;
			case 'error':
			return classes.progressBarError;
			default:
			return classes.progressBarPrimary;
		}
  })(color);

  return (
    <div style={styles}>
      <div className={clsx(classes.progressBarGroup, className)}>
        {label && <Box mr={1}>{label}:</Box>}
        <StyledProgressBar
          variant="determinate"
          color="primary"
          classes={{
            barColorPrimary: progressColor
          }}
          value={(oriVal / fullVal) * 100}
        />
        { showValue &&
          <Box ml={1}>
            {value}
          </Box>
        }
      </div>
      {(extraLabel ? <div align="center" style={ {fontSize: '11px'} }>
        <p>{extraLabel}: <b>{extraValue}</b></p>
      </div> :  null)
      }
    </div>
  )
}

export default ProgressBar;
