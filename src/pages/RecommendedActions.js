import React, { useState } from 'react';
import {
  makeStyles,
  withStyles,
  Grid,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AiRecommendationService from '../services/AiRecommendationService';
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

const aiRecommendationService = new AiRecommendationService();

const RecommendedActions = (props) => {

  const { token = '', shop = '' } = props.location && qs.parse(props.location.search);
  const { appTarget = "", routePush = '', commonHost = "" } = props;

  const history = useHistory();
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const [type, setType] = useState(0);
  const [typeText, setTypeText] = useState("Alert");

  const [aiRecommendations, setAiRecommendations] = useState({
    active: [],
    seeLater: [],
    ignored: []
  });
  const [selectedAiRecommendation, setSelectedAiRecommendation] = useState(null);

  React.useEffect(() => {
    refreshList();
  }, []);

  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

  const handleChangeType = (event, newType) => {
      let newTypeText;
      switch(newType){
        case 0: newTypeText = "Alert"; break
        case 1: newTypeText = "Config"; break
        case 2: newTypeText = "Manage"; break
      }

      setType(newType);
      setTypeText(newTypeText);
  };

  const selectAiRecommendation = (value) => {
    setSelectedAiRecommendation(value ? {...value} : null);
  }

  const refreshList = () => {
    aiRecommendationService.refreshList(typeText, 0, 0).then(res => {
        if(res){
            const { data } = res;
            const { values=[] } = data || {};

            const newActiveRecommendations = values.filter(value => value.recommendationStatus == "Active");
            const newSeeLaterRecommendations = values.filter(value => value.recommendationStatus == "SeeLater");
            const newIgnoredRecommendations = values.filter(value => value.recommendationStatus == "Ignored");

            setAiRecommendations({
                active: newActiveRecommendations,
                seeLater: newSeeLaterRecommendations,
                ignored: newIgnoredRecommendations
            });
        }
    });
  }

  const runAiRecommendation = async (inputValues) => {
    if(selectedAiRecommendation){
        const body = {
            aiRecommendationId: selectedAiRecommendation.id,
            inputValues
        }
    
        await aiRecommendationService.run(body).then(res => {
            console.log("Done!")
            window.alert("Done!");
        })
    }
  }

  return (         
            <Grid item xs={12}>
                    <Box style={{margin:"10px 80px"}}>

                        <Box className='group-button'>
                            <AppBar position="static" color='none'>
                                <Tabs
                                    value={type}
                                    onChange={handleChangeType}
                                    variant="fullWidth"
                                >
                                    <Tab label="Alert" style={{fontSize: 12}}/>
                                    <Tab label="Config Recommendations" style={{fontSize: 12}}/>
                                    <Tab label="Manage Recommendations" style={{fontSize: 12}}/>
                                </Tabs>
                            </AppBar>
                        </Box>
                        <Box style={{ display: "flex", justifyContent: "end", margin: "10px" }} >
                            <Button variant="outlined" style={{ borderBlockColor: 'green', color: 'green' }}> Refresh </Button>
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
                                    <Tab label={`Active (${aiRecommendations.active.length})`} />
                                    <Tab label={`See Later (${aiRecommendations.seeLater.length})`} />
                                    <Tab label={`Ignored (${aiRecommendations.ignored.length})`} />
                                </Tabs>
                            </AppBar>
                            <TabPanel value={value} index={0}>
                                <TableComponent
                                    rows={aiRecommendations.active}
                                    selectAiRecommendation={(value) => { selectAiRecommendation(value) }}
                                    selectedAiRecommendation={selectedAiRecommendation}
                                    runAiRecommendation={(inputValues) => { runAiRecommendation(inputValues) }}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <TableComponent
                                    rows={aiRecommendations.seeLater}
                                    selectAiRecommendation={(value) => { selectAiRecommendation(value) }}
                                    selectedAiRecommendation={selectedAiRecommendation}
                                    runAiRecommendation={(inputValues) => { runAiRecommendation(inputValues) }}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <TableComponent
                                    rows={aiRecommendations.ignored}
                                    selectAiRecommendation={(value) => { selectAiRecommendation(value) }}
                                    selectedAiRecommendation={selectedAiRecommendation}
                                    runAiRecommendation={(inputValues) => { runAiRecommendation(inputValues) }}
                                />
                            </TabPanel>
                        </Box>
                    </Box>
                    
            </Grid>    
  );
};

export default RecommendedActions;
