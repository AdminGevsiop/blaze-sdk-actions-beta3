import React from 'react';
import {
  makeStyles,
  withStyles,
  Grid,
} from '@material-ui/core';
import { useHistory, Route, Routes } from 'react-router-dom';
import ExampleService from '../services/ExampleService';
import * as qs from 'query-string';
import { RecommendActionsPageDetail } from './RecommendActionsPageDetail';


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


  React.useEffect(() => {

  }, [token]);

  const exampleFunction = () => {
    // auth.login(user).then(res => {});
  }

  return (
    <Routes>
      <Route path='/' element={<RecommendActionsPageDetail />} />
    </Routes>
  );
};

export default RecommendedActions;
