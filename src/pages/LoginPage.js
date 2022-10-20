import React from 'react';
import {
  makeStyles,
  withStyles,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Button,
  Container,
  Grid,
  Box,
  Paper,
  OutlinedInput,
  FormControl,
  InputLabel,
  Link,
  Typography
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LoginCoverColor from 'assets/images/login_cover_color.jpg';
import AuthService from '../services/api/AuthService';
import validateInput, { saveUser } from '../libs/utils';
import * as qs from 'query-string';
import SnackBarPortal from '../ui/Portal/SnackBarPortal';
import CloseIcon from '@material-ui/icons/Close';
import DocusignModal from './DocusignModal';
import NoAccessPage from './NoAccessPage';
import Loader from "react-loader-advanced";


const useStyles = makeStyles(theme => ({
  authBlock: {
    position: 'relative',
    maxHeight: 'calc(100vh - 57px - ' + theme.spacing(8) + 'px)',
    margin: theme.spacing(10, 0),
    display: 'flex',
    flexDirection: 'column',
    '& .titleBlock': {
      display: 'flex',
      alignItems: 'center',
      fontSize: theme.typography.fontSize * 1.85,
      fontWeight: 500,
      padding: theme.spacing(3, 5),
      borderBottom: '1px solid rgba(224, 224, 224, 0.4)',
    },
    '& .contentBlock': {
      padding: theme.spacing(3, 5),
      overflowY: 'auto',
    },
  },
  buttonProgress: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    zIndex: 9,
  },
}));

const styles = theme => ({
  button: {
  	marginTop: 30
  },
  textCenter: {
  	textAlign: 'center'
  },
  form: {
  	padding: '20px'
  }

});

const LoginOutlinedInput = withStyles(theme => ({
  root: {
    fontSize: '1.25rem',
  },
  input: {
    padding: '18.5px 14px',
  },
}))(OutlinedInput);

const LoginPage = props => {

  const history = useHistory();
  const classes = useStyles();
  const auth = new AuthService();

  const { token = '', shop = '' } = props.location && qs.parse(props.location.search);
  const { appTarget = "", routePush = '', commonHost="", docuSignClick } = props;
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [user, setUser] = React.useState({
    email: '',
    password: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    appTarget: appTarget,
  });
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [alertType, setAlertType] = React.useState('');

  const [showUserNotificationModal, setShowUserNotificationModal] = React.useState(false);
  const [showDocusignModal, setShowDocusignModal] = React.useState(false);
  const [docusignRes, setDocusignRes] = React.useState({});
  const [showNoAccess, setShowNoAccess] = React.useState(false);
  const [loader, setLoader] = React.useState(false);

  if (typeof window !== "undefined") {
    if (window.Appcues) {
      window.Appcues.start();
      window.Appcues.page();
    }
  }

  React.useEffect(() => {
    if(token) {
      setLoader(true)
      auth.renewSession({ Authorization: `Token ${token.split(' ').join('+')}` })
      .then((res) => {
        let { employee={}, assignedShop={}, company={} } = res.data;

        auth.reviewCompanyAgreement(employee.email, "", `Token ${token.split(' ').join('+')}`).then(docuRes => {
            if(docuRes && docuRes.data){
              if(!docuRes.data.timeout){
                onContinueRenewSession(employee, company, assignedShop, res);
              }else{
                onLogout();
                history.push("/");
              }
            }else{
              onContinueRenewSession(employee, company, assignedShop, res);
            }
        });
      })
      .catch(err => {
        setLoader(false)
        console.log("err:",err);
      });
    } else {
      if(localStorage.getItem('user')){
        const user = JSON.parse(localStorage.getItem('user'));
        if(user && user.company){
          history.push(routePush);
        }
      }
    }
  }, [token]);

  const onContinueRenewSession = (employee, company, assignedShop, res) => {
    window.Appcues && window.Appcues.identify(employee.id, {
        first_name : employee.firstName, 
        last_name : employee.lastName, 
        email : employee.email, 
        created_date_user : employee.created, 
        company : company.name, 
        plan_type : 'trial', 
        plan_tier : 'enterprise', 
        user_role : employee.role && employee.role.name, 
        product_type : assignedShop && assignedShop.appTarget, 
        location : employee.address && employee.address.state
    })
    saveUser(res.data);
    history.push(routePush);
  }

  const onLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('tabs');
    localStorage.removeItem('docuSign');
  }

  const handleError = (message, type) => {
    setErrorMessage(message);
    setAlertType(type);
  };

  const snackBarHandleClose = () => {
    setShowUserNotificationModal(false);
    onLogout();
    setErrorMessage('');
  }

  const isValid = () => {
    const { errors, isValid } = validateInput({ email: user.email, password: user.password });
    return isValid;
}

  const handleLogin = () => {
    setLoading(true);

    if(isValid()){
      // Check ClickWrap Agreement
      auth.login(user).then(res => {
        const { data } = res;
        setLoading(false);
        saveUser(data);

        auth.reviewCompanyAgreement(user.email, user.password, `Token ` + data.accessToken).then(res => {
          setLoading(false);
          setDocusignRes(res.data);

          if(res.data && res.data.endDate){
            window.localStorage.setItem('docuSign', JSON.stringify(res.data))
          }

          if(res && res.data && res.data.timeout){
            if(res.data.admin){
              setShowNoAccess(true);
            }else{
              setShowUserNotificationModal(true);
            }
          }else{
            if(res && res.data && res.data.admin){
              setShowDocusignModal(true);
            }else{
              onDocusignContinue();
            }
          }
        }).catch(error => {
          console.log("error", error.response);
          setLoading(false);
          handleError(error.response && error.response.data && error.response.data.message, 'error');
        });

      }).catch(error => {
        handleError(error.response && error.response.data && error.response.data.message, 'error');
        setLoading(false);
      });
    }else{
      handleError("Valid Email and password required", "error");
      setLoading(false);
    }
  };

  const onDocusignContinue = () => {
    history.push(routePush);
  }

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const onInputChange = eve => {
    setUser({
      ...user,
      [eve.target.name]: eve.target.value,
    });
  };

  const keyPressed = event => {
    if (event.key === 'Enter') {
      handleLogin()
    }
  }

  const onDocusignAccept = (agreement) => {
    setShowDocusignModal(false);

    if(agreement.status=="agreed"){
      auth.saveCompanyAgreement(docusignRes.companyId, agreement.clickwrapId).then(res => {
        onDocusignContinue();
      });
    }
  }

  const onDocusignDecline = (agreement) => {
    setShowDocusignModal(false);
    if(docusignRes.timeout){
      setShowNoAccess(true);
    }else{
      onDocusignContinue();
    }
  }

  var h = window.innerHeight;

  return (
    <Loader show={loader} foregroundStyle={{color: 'black'}} backgroundStyle={{backgroundColor: 'white'}} message={'Logging in...'} style={loader?{height: '100%', position: 'fixed', backgroundColor: '#fff', top: 0}: {}}>
    <Grid container className="auth-container">
      <Grid item xs={12} sm={6} md={6} lg={6} className="leftBlock" style={{ minHeight: `${h}px` }}>
        <img style={{width:'100%',height:'100%'}} src={LoginCoverColor} />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} className="rightBlock" style={{marginTop:'250px'}}>
        {
          showNoAccess ? (
            <NoAccessPage {...props} docuRes={docusignRes} />
          ) : (
            <Grid className="rightBlockLogin">
              <Grid container direction="row" justify="center">
                <Grid item xs={12} md={8}>
                  <Paper className={classes.authBlock}>
                    <div className="titleBlock">
                      Login
                    </div>
                    <div className="contentBlock">
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <FormControl variant="outlined" fullWidth margin="normal">
                            <InputLabel ref={inputLabel} shrink>
                              Email
                            </InputLabel>
                            <LoginOutlinedInput
                              type="email"
                              notched
                              labelWidth={labelWidth}
                              name="email"
                              value={user.email}
                              onChange={onInputChange}
                              onKeyPress={keyPressed}
                              disabled={loading}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl variant="outlined" fullWidth margin="normal">
                            <InputLabel ref={inputLabel} shrink>
                              Passsword
                            </InputLabel>
                            <LoginOutlinedInput
                              type="password"
                              notched
                              labelWidth={labelWidth}
                              name="password"
                              value={user.password}
                              onChange={onInputChange}
                              onKeyPress={keyPressed}
                              disabled={loading}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={handleLogin}
                            disableElevation
                            fullWidth
                            disabled={loading}
                          >
                            <Box py={0.5} px={3} fontSize={20}>
                              Login
                            </Box>
                            {loading && (
                              <CircularProgress
                                size={24}
                                className={classes.buttonProgress}
                              />
                            )}
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          )
        }
      </Grid>
      <SnackBarPortal type={alertType} handleClose={snackBarHandleClose}>
        {errorMessage ? errorMessage : ''}
      </SnackBarPortal>
      <Dialog
          fullWidth
          size="sm"
          maxWidth="sm"
          open={showUserNotificationModal}
          onClose={() => { setShowUserNotificationModal(false); onLogout(); }}
        >
        <DialogTitle>
          {docusignRes && docusignRes.notificationTitle || "Attention"} &nbsp;&nbsp;
        </DialogTitle>
        <DialogContent style={{overflowY:'hidden'}}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography style={{fontWeight:'bold', textAlign:'center', fontSize:'1.5rem'}}>
                {docusignRes && docusignRes.notificationHeader || ""}
              </Typography>
              <br />
              <Typography style={{fontWeight:'bold'}}>
                {docusignRes && docusignRes.notificationSubHeader || ""}
              </Typography>
              <br />
              <Typography>
                {docusignRes && docusignRes.notificationBody || ""}
              </Typography>
              <br />
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <p style={{fontWeight:'bold', textAlign:'center'}}>
                    Need more Help? Reach out!
                  </p>
                  <hr style={{margin:'10px 10%'}}/>
                </Grid>
                <Grid container item xs={12} style={{display:'flex', justifyContent:'center', margin:'0px', padding:'0px'}}>
                  <Grid item xs={4}>
                    <p> <b>E-mail</b> </p>
                  </Grid>
                  <Grid item xs={4}>
                    <p>{ docusignRes.supportEmail || "" }</p>
                  </Grid>
                </Grid>
                <Grid container item xs={12} style={{display:'flex', justifyContent:'center', margin:'0px', padding:'0px'}}>
                  <Grid item xs={4}>
                    <p> <b>Phone</b> </p>
                  </Grid>
                  <Grid item xs={4}>
                    <p>{ docusignRes.supportPhone || "" }</p>
                  </Grid>
                </Grid>
                <Grid container item xs={12} style={{display:'flex', justifyContent:'center', margin:'0px', padding:'0px'}}>
                  <Grid item xs={4}>
                    <p> <b>Monday - Friday</b> </p>
                  </Grid>
                  <Grid item xs={4}>
                    <p>{ docusignRes.supportWeekSchedule || "" }</p>
                  </Grid>
                </Grid>
                <Grid container item xs={12} style={{display:'flex', justifyContent:'center', margin:'0px', padding:'0px'}}>
                  <Grid item xs={4}>
                    <p> <b>Saturday - Sunday</b> </p>
                  </Grid>
                  <Grid item xs={4}>
                    <p>{ docusignRes.supportWeekendSchedule || "" }</p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <br />
        <DialogActions>
          <Button onClick={() => { setShowUserNotificationModal(false); onLogout(); }} color="primary" autoFocus>
            {docusignRes && docusignRes.notificationButton || "Close"}
          </Button>
        </DialogActions>
      </Dialog>
      {
        showDocusignModal && (
            <DocusignModal
                onAccept={onDocusignAccept}
                onDecline={onDocusignDecline}
                docuRes={docusignRes}
                docuSignClick={docuSignClick}
            />
        )
      }
    </Grid>
    </Loader>
  );
};

class Login extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return <LoginPage {...this.props} />;
  }
}

export default withStyles(styles)(Login);
