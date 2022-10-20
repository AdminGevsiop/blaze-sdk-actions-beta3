import React from 'react';
import clsx from 'clsx';
import { makeStyles, fade, withStyles } from '@material-ui/core';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  statusPrimary: {
    backgroundColor: theme.palette.primary.main,
    color: 'white'
  },
  statusSecondary: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white'
  },
  statusSuccess: {
    backgroundColor: theme.palette.success.main,
    color: 'white'
  },
  statusInfo: {
    backgroundColor: theme.palette.info.main,
    color: 'white'
  },
  statusWarning: {
    backgroundColor: theme.palette.warning.main,
    color: 'white'
  },
  statusError: {
    backgroundColor: theme.palette.error.main,
    color: 'white'
  }
}))

const StyledChip = withStyles( theme => ({
  root: {
  },
  sizeSmall: '50px',
  colorPrimary: {},
  colorSecondary: {}
}))(Chip);

const LabelStatus = ({label}) => {
  const classes = useStyles();
  let textStatus =  '';

  const statusColor = (function() {
		switch(label) {
			case 'Created':
        textStatus = label;
			  return classes.statusPrimary; 
			case 'PendingBatchGeneration':
        textStatus = 'Pending Batch Generation';
			  return classes.statusSecondary; 
      case 'Closed': case 'Completed':
        textStatus = label;
        return classes.statusInfo;
			case 'InProgress':
        textStatus = 'In progress';
			  return classes.statusSuccess;
			case 'warning':
        textStatus = 'To review';
			  return classes.statusWarning; 
			case 'Cancel':
        textStatus = 'Canceled';
			  return classes.statusError;
			default:
			return classes.statusPrimary;
		}
  })(label);
  
  return (
    <div>
      <StyledChip
            style={{fontSize:'10px'}}
            label={textStatus}
            size="small"
            className={statusColor}
        />
    </div>
  )
}

export default LabelStatus;