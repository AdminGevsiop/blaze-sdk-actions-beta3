import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, fade } from '@material-ui/core';
import {
  Drawer, List, ListItem, ListItemIcon, 
  ListItemText, Collapse, Box
} from '@material-ui/core';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';

import Dashboard from '@material-ui/icons/Dashboard';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end',
    '@media (min-width: 600px)': {
      minHeight: 56
    },
  },
  toolbar: theme.mixins.toolbar,
  subMenu: {
    paddingLeft: theme.spacing(8)
  },
  activemenulist: {
    background: fade(theme.palette.primary.main, .1),
    borderColor: theme.palette.primary.main
  },
  customIcon: {
    fontSize: "1.4em"
  }
}));

function ListItemLink(props) {
  const { primary, to, classes } = props;
  let match = useRouteMatch({
    path: to,
    exact: false
  });

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <ListItem button component={renderLink} classes={classes} selected={match ? true : false} {...props}>
      <ListItemText primary={primary} />
    </ListItem>
  );
}
ListItemLink.propTypes = {
  to: PropTypes.string.isRequired,
};

const SideBar = () => {
  const classes = useStyles();
  const [open] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [selectedIndex] = React.useState(5);

  const handleClick = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <List component="nav" className="aside-menu-list">
        {/* {['Dashboard', 'Invoice', 'Inventory', 'Purchase Order'].map((text, index) => (
          <ListItem button classes={{selected: classes.activemenulist}} key={text} selected={selectedIndex === index}>
            <ListItemIcon>{index % 2 === 0 ? <Dashboard /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
        <ListItem button selected={selectedIndex === 1}>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button selected={selectedIndex === 2}>
          <ListItemIcon>
            <span className={"icon-invoice " + classes.customIcon}></span>
          </ListItemIcon>
          <ListItemText primary="Invoice" />
        </ListItem>
        <ListItem button selected={selectedIndex === 3}>
          <ListItemIcon>
            <span className={"icon-inventory " + classes.customIcon}></span>
          </ListItemIcon>
          <ListItemText primary="Inventory" />
        </ListItem>
        <ListItem button selected={selectedIndex === 4}>
          <ListItemIcon>
            <span className={"icon-purchase-order " + classes.customIcon}></span>
          </ListItemIcon>
          <ListItemText primary="Purchase Order" />
        </ListItem>
        <ListItem button onClick={handleClick} selected={selectedIndex === 5}>
          <ListItemIcon>
            <span className={"icon-packaging " + classes.customIcon}></span>
          </ListItemIcon>
          <ListItemText primary="Manufacturing" />
          {openMenu ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </ListItem>
        <Collapse in={openMenu} timeout="auto" unmountOnExit>
          <List component="div" className={classes.subMenu + (selectedIndex === 5 ? " selectedlist" : "")} selected={selectedIndex === 5}>
            <ListItemLink to="/manufacturing/runs" primary="Runs" classes={{selected: classes.activemenulist}} />
            <ListItemLink to="/manufacturing/lots" primary="Lots" classes={{selected: classes.activemenulist}} />
            <ListItemLink to="/manufacturing/items" primary="Items" classes={{selected: classes.activemenulist}} />
            <ListItemLink to="/manufacturing/components" primary="Components" classes={{selected: classes.activemenulist}} />
          </List>
        </Collapse>
        <ListItem button selected={selectedIndex === 6}>
          <ListItemIcon>
            <span className={"icon-companies " + classes.customIcon}></span>
          </ListItemIcon>
          <ListItemText primary="Companies" />
        </ListItem>
        <ListItem button selected={selectedIndex === 7}>
          <ListItemIcon>
            <span className={"icon-expenses " + classes.customIcon}></span>
          </ListItemIcon>
          <ListItemText primary="Expenses" />
        </ListItem>
        <ListItem button selected={selectedIndex === 8}>
          <ListItemIcon>
            <span className={"icon-supervisor " + classes.customIcon}></span>
          </ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItem>
        <ListItem button selected={selectedIndex === 9}>
          <ListItemIcon>
            <span className={"icon-compliance " + classes.customIcon}></span>
          </ListItemIcon>
          <ListItemText primary="Compliance" />
        </ListItem>
        <ListItem button selected={selectedIndex === 10}>
          <ListItemIcon>
            <span className={"icon-report " + classes.customIcon}></span>
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
      </List>
      <Box mt="auto">
        <List component="nav" className="aside-menu-list">
          <ListItem button onClick={handleClick} selected={selectedIndex === 11}>
            <ListItemIcon>
              <span className={"icon-setting " + classes.customIcon}></span>
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={handleClick} selected={selectedIndex === 12}>
            <ListItemIcon>
              <span className={"icon-support " + classes.customIcon}></span>
            </ListItemIcon>
            <ListItemText primary="Support" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}

export default SideBar;