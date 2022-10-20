import React from 'react';
import {
  makeStyles,
  withStyles,
  Button,
  Grid,
  Paper,
  OutlinedInput,
  Box
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LoginCoverColor from 'assets/images/login_cover_color.jpg';
import AuthService from '../services/api/AuthService';
import * as qs from 'query-string';
import SnackBarPortal from '../ui/Portal/SnackBarPortal';
import DocusignModal from './DocusignModal';


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

const NoAccessPage = props => {

  const history = useHistory();
  const classes = useStyles();
  const auth = new AuthService();

  const {  email= ''} = props.location && qs.parse(props.location.search);
  const { docuSignClick, docuRes } = props;

  const [errorMessage, setErrorMessage] = React.useState('');
  const [alertType, setAlertType] = React.useState('');

  const [showDocusignModal, setShowDocusignModal] = React.useState(false);

  React.useEffect(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('tabs');
    localStorage.removeItem('docuSign');
  }, []);

  if (typeof window !== "undefined") {
    if (window.Appcues) {
      window.Appcues.start();
      window.Appcues.page();
    }
  }

  const onDocusignAccept = (agreement) => {
    setShowDocusignModal(false);
    if(agreement.status=="agreed"){
      auth.saveCompanyAgreement(docuRes.companyId, agreement.clickwrapId).then(res => {
        window.localStorage.removeItem('docuSign')
        history.push('/login');
        window.location.reload();
      });
    }
  }

  const onDocusignDecline = (agreement) => {
    setShowDocusignModal(false);
  }

  const onViewTerms = () => {
    setShowDocusignModal(true);
  }

  var h = window.innerHeight;

  return (
    <Grid className="rightBlockLogin">
      <Grid container direction="row" justify="center">
        <Grid item xs={12} md={8}>
          <Paper className={classes.authBlock}>
            <div className="contentBlock">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div>
                    <h3 className="" style={{textAlign:'center'}}>{docuRes && docuRes.notificationTitle || ""}</h3>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <p className="slim-heading" style={{textAlign:'center'}}>{docuRes && docuRes.notificationBody || ""}</p>
                  </div>
                </Grid>
                <Grid item xs={12} style={{textAlign:'center'}}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={onViewTerms}
                    disableElevation
                  >
                    <Box py={0.5} px={3}>
                      {docuRes && docuRes.notificationButton || ""}
                    </Box>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <SnackBarPortal type={alertType} handleClose={() => { setShowUserNotificationModal(false) }}>
        {errorMessage ? errorMessage : ''}
      </SnackBarPortal>
      {
        showDocusignModal && (
            <DocusignModal
                onAccept={onDocusignAccept}
                onDecline={onDocusignDecline}
                docuRes={docuRes}
                docuSignClick={docuSignClick}
            />
        )
      }
    </Grid>
  );
};

class NoAccess extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return <NoAccessPage {...this.props} />
  }
}

export default withStyles(styles)(NoAccess);
