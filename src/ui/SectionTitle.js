import React from 'react';
import { makeStyles, Typography, Box } from '@material-ui/core';
import ProgressBar from '../ui/ProgressBar';

const useStyles = makeStyles(theme => ({
  sectionTitleContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    "& h6": {
      marginBottom: 0
    }
  },
	sectionTitle: {
    position: "relative",
    paddingLeft: theme.spacing(1.5),
    "&::before": {
      content: "''",
      position: "absolute",
      width: 2,
      height: "1.25rem",
      left: 0,
      top: 0,
      bottom: 0,
      margin: "auto",
      backgroundColor: theme.palette.primary.main
    }
  },
}));

const SectionTitle = ({title, children, progress}) => {
	const classes = useStyles();

	return (
    <div className={classes.sectionTitleContainer}>
      <div className={classes.sectionTitle}>
        <Typography variant="h6" gutterBottom >{title}</Typography>
      </div>
      {
        progress && progress.enabled ?
        <ProgressBar
            label="Progress"
            className="expansionSummaryGroup-bar"
            value={`${progress.amount}%`}
            maxValue="100%"
            showValue={true}
            color="success"
            setStyle={progress.style ? progress.style : null}
        /> : null
      }
      <Box component="div" ml="auto">
        {children}
      </Box>
    </div>

	)
}

export default SectionTitle;
