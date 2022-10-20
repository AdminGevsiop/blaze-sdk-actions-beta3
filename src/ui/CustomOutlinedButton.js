import React from 'react';
import { withStyles, Button, fade, lighten } from '@material-ui/core';

const CustomStyledButton = withStyles(theme => ({
	outlinedPrimary: {
		color: "inherit",
		borderColor: fade(theme.palette.primary.main, .4),
		backgroundColor: lighten(theme.palette.primary.main, .97)
	}
}))(Button);

const CustomOutlinedButton = (props) => {
	return (
		<CustomStyledButton
			variant="outlined"
			color="primary"
			{...props}
		>{props.children}</CustomStyledButton>
	)
};

export default CustomOutlinedButton;