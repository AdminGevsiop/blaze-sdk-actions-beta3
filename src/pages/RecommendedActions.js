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

  const [data, setData] = React.useState([]);
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

  const activeValues = data.filter(value => value.recommendationStatus === "Active" ) || []
  const seeLaterValues = data.filter(value => value.recommendationStatus === "SeeLater" ) || []
  const ignoredValues = data.filter(value => value.recommendationStatus === "Ignored" ) || []

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
                                    rows={activeValues}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <TableComponent
                                    rows={seeLaterValues}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <TableComponent
                                    rows={ignoredValues}
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
