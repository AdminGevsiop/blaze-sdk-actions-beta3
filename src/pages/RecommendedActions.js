import React from 'react';
import {
  makeStyles,
  withStyles,
  Grid,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ExampleService from '../services/ExampleService';
import * as qs from 'query-string';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TableComponent } from '../Component';
import { Box, Link, Breadcrumbs, Typography, Card, ButtonGroup, Button, BottomNavigation, BottomNavigationAction } from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
      <Box
          role="tabpanel"
          hidden={value !== index}
          id={`tabpanel-${index}`}
          aria-labelledby={`tab-${index}`}
          {...other}
      >
          {value === index && (
              <Box sx={{ p: 3 }}>
                  <Typography>{children}</Typography>
              </Box>
          )}
      </Box>
  );
}

const rows = [
  {
      _id: 1,
      name: "there are some regions without Hours of Operations (list)",
      module: "region",
      actionType: "Automatic",
      field: "list",
      formInputs: [
          {
              recomendatio: "recomendation 1"
          },
          {
              recomendatio: "recomendation 2"
          },
          {
              recomendatio: "recomendation 3"
          }
      ]
  },
  {
      _id: 2,
      name: "there are some regions without Hours of Operations (options)",
      module: "region",
      actionType: "Automatic",
      field: "Select",
      options:[{ id: "", name: "region1" }, { id: "", name: "region2" }, { id: "", name: "region3" }]
  },
  {
      _id: 3,
      name: "there are some regions without Hours of Operations",
      module: "region",
      actionType: "Automatic",
  },
  {
      _id: 4,
      name: "there are some regions without Hours of Operations",
      module: "region",
      actionType: "Automatic",
  },
  {
      _id: 5,
      name: "there are some regions without Hours of Operations",
      module: "region",
      actionType: "Automatic",
  },
  {
      _id: 6,
      name: "there are some regions without Hours of Operations",
      module: "region",
      actionType: "Automatic",
  }
];

const rows2 = [
  {
      _id:1,
      name: "there are some regions without Hours of Operations 1",
      module: "region",
      actionType: "Automatic",
  },
  {
      _id:2,
      name: "there are some regions without Hours of Operations 1",
      module: "region",
      actionType: "Automatic",
  }
];

const rows3 = [
  {
      _id:1,
      name: "there are some regions without Hours of Operations 2",
      module: "region",
      actionType: "Automatic",
  }
];

const useStyles = makeStyles(theme => ({
  example: {

  }
}));

const auth = new ExampleService();

const RecommendedActions = (props) => {

  const { token = '', shop = '' } = props.location && qs.parse(props.location.search);
  const { appTarget = "", routePush = '', commonHost = "" } = props;

  const history = useHistory();
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const [section, setSection] = React.useState(0);

  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

  const handleChangeSection = (event, newValue) => {
      setSection(newValue);
  };


  React.useEffect(() => {

  }, [token]);

  const exampleFunction = () => {
    // auth.login(user).then(res => {});
  }

  return (
    <Box className='container'>
            <Grid container>
                <Grid item xs={12}>
                    <Card>
                        <Card className='card-title'>
                            <Breadcrumbs style={{ color: 'white' }}>
                                <Typography>Recommendations</Typography>
                            </Breadcrumbs>
                        </Card>

                        <Box className='group-button'>
                            <AppBar position="static" color='none'>
                                <Tabs
                                    value={section}
                                    onChange={handleChangeSection}
                                    variant="fullWidth"
                                >
                                    <Tab label="Alert" style={{fontSize: 12}}/>
                                    <Tab label="App Recommendations" style={{fontSize: 12}}/>
                                    <Tab label="Manage Recommendations" style={{fontSize: 12}}/>
                                </Tabs>
                            </AppBar>
                        </Box>
                        <Box style={{ display: "flex", justifyContent: "end", marginRight: 100 }} >
                            <Button variant="outlined" style={{ marginRight: 10, borderBlockColor: 'green', color: 'green' }}> Refresh </Button>
                        </Box>

                        <Box className='table'>
                            <AppBar position="static" style={{ background: '#EB8D48' }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="secondary"
                                    textColor="inherit"
                                    variant="fullWidth"
                                >
                                    <Tab label="All" />
                                    <Tab label="see Later" />
                                    <Tab label="Ignored" />
                                </Tabs>
                            </AppBar>
                            <TabPanel value={value} index={0}>
                                <TableComponent
                                    rows={rows}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <TableComponent
                                    rows={rows2}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <TableComponent
                                    rows={rows3}
                                />
                            </TabPanel>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
  );
};

export default RecommendedActions;
