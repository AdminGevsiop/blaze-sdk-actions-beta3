import React from 'react';
import {
  makeStyles,
  withStyles,
  Grid,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ExampleService from '../services/ExampleService';
import * as qs from 'query-string';


const useStyles = makeStyles(theme => ({
  example: {
    
  }
}));

const auth = new ExampleService();

const RecommendedActions = (props) => {

  const { token = '', shop = '' } = props.location && qs.parse(props.location.search);
  const { appTarget = "", routePush = '', commonHost="" } = props;

  const history = useHistory();
  const classes = useStyles();


  React.useEffect(() => {
    
  }, [token]);

  const exampleFunction = () => {
    // auth.login(user).then(res => {});
  }

  return (
    <Grid container className="auth-container">
      <Grid item xs={12} className="rightBlock">
        <h1>Hola Mundo 2</h1>
      </Grid>
    </Grid>
  );
};

export default RecommendedActions;
