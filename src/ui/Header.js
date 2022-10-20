import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import { AppBar, Toolbar, IconButton, Button, Menu, MenuItem, Avatar, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';
import Logo from 'assets/images/Logo.png'
import EditLogEntry from 'forms/EditLogEntry';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    borderBottom: "1px solid rgba(224, 224, 224, 0.4)",
    boxShadow: "none",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  brandImg: {
    height: "24px",
    '& img': {
      height: "100%"
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  avatarProfile: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: 12,
    marginRight: theme.spacing(1)
  }
}));

const Header = () => {
  const history = useHistory();
  const classes = useStyles();
  const [open] = React.useState(false);
  const [openHeaderMenu, setopenHeaderMenu] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleHeaderMenu = event => {
    openHeaderMenu == null ? setopenHeaderMenu(event.currentTarget) : setopenHeaderMenu(null)
  };

  const handleLogout = () => {
    history.push("/");
  }

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };


  return (
    <>
      <AppBar
        color="inherit"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton> */}
          <div className={classes.brandImg}>
            <img src={Logo} alt="" />
          </div>
          <div className={classes.grow} />
          <div>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleHeaderMenu}>
            <Avatar className={classes.avatarProfile}>H</Avatar>
            Demo User
            {Boolean(openHeaderMenu) ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={openHeaderMenu}
            keepMounted
            open={Boolean(openHeaderMenu)}
            onClose={handleHeaderMenu}
          >
            <MenuItem onClick={handleHeaderMenu}>Profile</MenuItem>
            <MenuItem onClick={handleHeaderMenu}>My account</MenuItem>
            <MenuItem onClick={handleDialogOpen}>Edit Log</MenuItem>
            <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
          </Menu>
            <IconButton color="primary" onClick={() => handleLogout()}><PowerSettingsNewIcon/></IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Dialog
        fullWidth
        maxWidth="md"
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="newRun"
      >
        <DialogTitle id="newRun">
          Edit Log Entry
          <Box position="absolute" right={8} top={8} clone>
            <IconButton aria-label="close" onClick={handleDialogClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <EditLogEntry />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="default" onClick={handleDialogClose} disableElevation>
            <Box px={3}>Cancel</Box>
          </Button>
          <Button variant="contained" color="primary" disableElevation>
            <Box px={3}>Create</Box>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Header;