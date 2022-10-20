import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	statusProgressRoot: {
		position: "relative",
		fontSize: theme.typography.fontSize
	},
	statusProgressTitle: {
		fontWeight: 700,
		marginBottom: theme.spacing(2)
	},
	statusProgressBlock: {
		position: "relative",
		width: "100%",
		height: 24,
		backgroundColor: "rgba(223, 223, 226, 0.4)",
		borderRadius: 4,
		marginBottom: theme.spacing(1)
	},
	statusProgressBar: {
		position: "absolute",
		top: 0,
		left: 0,
		height: "100%",
		padding: theme.spacing(0, 1),
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		whiteSpace: "no-wrap",
		textOverflow: "ellipsis",
		overflow: "hidden",
		borderRadius: 4,
		boxShadow: "0px 1px 2px rgba(8, 35, 48, 0.24), 0px 2px 6px rgba(8, 35, 48, 0.16)"
	},
	statusProgressBarPrimary: {
		backgroundColor: theme.palette.primary.main,
		color: "#fff"
	},
	statusProgressBarSecondary: {
		backgroundColor: theme.palette.secondary.main,
		color: "#fff"
	},
	statusProgressBarSuccess: {
		backgroundColor: theme.palette.success.main,
		color: "#fff"
	},
	statusProgressBarInfo: {
		backgroundColor: theme.palette.info.main,
		color: "#fff"
	},
	statusProgressBarWarning: {
		backgroundColor: theme.palette.warning.main,
		color: "#fff"
	},
	statusProgressBarError: {
		backgroundColor: theme.palette.error.main,
		color: "#fff"
	},
	statusProgressStatus: {
		display: "flex",
		alignItems: "center",
	},
	statusProgressStatusLeft: {
		fontWeight: 700
	},
	statusProgressStatusRight: {
		marginLeft: "auto"
	}
}));

const StatusProgress = ({title, statusBar, value, maxValue, color, minWidth='30px'}) => {
	const classes = useStyles();
	const fullVal = parseFloat(maxValue);
	const oriVal = parseFloat(value);

	const progressColor = (function() {
		switch(color) {
			case 'primary':
			return classes.statusProgressBarPrimary; 
			case 'secondary':
			return classes.statusProgressBarSecondary; 
			case 'success':
			return classes.statusProgressBarSuccess; 
			case 'info':
			return classes.statusProgressBarInfo; 
			case 'warning':
			return classes.statusProgressBarWarning; 
			case 'error':
			return classes.statusProgressBarError;
			default:
			return classes.statusProgressBarPrimary;
		}
	})(color);
	
	
	
	return (
		<div className={classes.statusProgressRoot}>
			{title ? <div className={classes.statusProgressTitle}>{title}</div> : "" }
			<div className={classes.statusProgressBlock}>
				<div className={clsx(classes.statusProgressBar, progressColor)} style={{minWidth:minWidth,width:`${(oriVal / fullVal) * 100}%`,maxWidth:'100%'}}>{value}</div>
			</div>
			{statusBar &&
				<div className={classes.statusProgressStatus}>
					{statusBar.left ? 
						<div className={classes.statusProgressStatusLeft}>{statusBar.left}</div> : ""
					}
					{statusBar.right ? 
						<div className={classes.statusProgressStatusRight}>{statusBar.right}</div> : ""
					}
				</div>
			}
		</div>
	)
}

export default StatusProgress;