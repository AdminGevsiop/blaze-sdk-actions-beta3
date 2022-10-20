import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/index';
import { Typography, Paper, Box } from '@material-ui/core/index';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';


const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  pageHeader: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    padding: theme.spacing(3),
    borderBottom: "1px solid rgba(224, 224, 224, 0.4)",
  },
  pageTitle: {
    fontSize: theme.typography.fontSize * 1.85,
    fontWeight: 500
  }
}));

const PageHeader = ({headerIcon, title, children }) => {
  const classes = useStyles();
  
  return (
    <Fragment>
    <Paper elevation={0} square className={classes.pageHeader} >
      <Box mr={1} clone >
        {headerIcon ? headerIcon : <DirectionsRunIcon color="primary" />}
      </Box>
      <Typography variant="h4" className={classes.pageTitle}>{title}</Typography>
      <div className={classes.grow} />
      <div>
        {children}
      </div>
    </Paper>
  </Fragment>
  )
}

export default PageHeader;