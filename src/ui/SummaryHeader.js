import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Typography, Paper, Box } from '@material-ui/core';
import LabelStatus from '../ui/LabelStatus';


const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  pageHeader: {
    display: "flex",
    flexWrap: "wrap",
    position: "relative",
    alignItems: "center",
    padding: theme.spacing(3),
    minHeight: 88,
    borderBottom: "1px solid rgba(224, 224, 224, 0.4)",
  },
  pageTitle: {
    fontSize: theme.typography.fontSize * 1.85,
    fontWeight: 500
  }
}));

const PageHeader = ({PageIcon, PageTitle, SummaryProgress, PageActions, PageStatus, PageTabs }) => {
  const classes = useStyles();
  
  return (
    <Paper elevation={0} square className={classes.pageHeader} >
      <Box mr={1} >
        {PageIcon}
      </Box>
      <Box display="flex">
        <Typography variant="h4" className={classes.pageTitle}>{PageTitle}</Typography>
        <Box>
          {SummaryProgress}
        </Box>
      </Box>
      <Box component="div" ml="auto">
        <Box>
          {PageActions}
        </Box>
      </Box>
        {
           (
              PageStatus?
              <Box component="div" ml={4} mb={1} mt={1} width="100%">
                <Box>
                  <LabelStatus label={PageStatus}/>
                </Box>
              </Box> : null
          ) 
        }
      <Box component="div" mb={-3} mt={2} width="100%">
        <Box>
          {PageTabs}
        </Box>
      </Box>
    </Paper>
  )
}

export default PageHeader;