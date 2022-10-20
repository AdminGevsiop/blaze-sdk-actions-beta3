import React from 'react';
import {
  makeStyles,
  Typography,
  IconButton,
  Card,
  Box,
  Grid,
  Checkbox,
  Popover,
  MenuItem
} from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import moment from 'moment';
import ForwardIcon from '@material-ui/icons/Forward';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  activityCircle: {
    paddingTop: '10px',
    width:'148px',
    height:'120px',
    borderRadius:'6px',
    border:'1px solid',
    display:'flex',
    //alignItems:'center',
    justifyContent:'center',
    marginLeft:'auto',
    marginRight:'auto'
  },
  activityCircleStatus:{
    color:'white',
    borderRadius:'15%',
    padding:'0px 10px'
  },
  activityArrow: {
    height:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  moreMenu: {
    '& .MuiPaper-root': {
      minWidth: 160,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: theme.palette.primary.main,
      '& .MuiMenuItem-root': {
        padding: theme.spacing(1),
        textAlign: 'left',
        fontSize: theme.typography.fontSize * 0.875,
        '&:not(:last-child)': {
          borderBottom: '1px solid #E1E1E1',
        },
      },
    },
  },
}));

const ActivitiesGraphics = props => {
  const classes = useStyles();

  const [anchorActivityEl, setAnchorActivityEl] = React.useState(null);
  const [activityPopOpened, setActivityPopOpened] = React.useState(null);

  const handleActivityMenuOpen = (event, activity) => {
    event.stopPropagation();
    setActivityPopOpened(activity.activityId);
    setAnchorActivityEl(event.currentTarget);
  }
  const handleActivityMenuClose = (event) => {
    event.stopPropagation();
    setActivityPopOpened(null);
    setAnchorActivityEl(null);
  }

  const finishActivity = (activity,lot,e) => {
    props.completeLotActivity({
      variables: {
        lotId: lot.id,
        activityId: activity.activityId
      }
    })
    handleActivityMenuClose(e);
  }

  var scheduleds = 0;
  if(props.activities){
    props.activities.map( (activity,i) => {
      if(!activity.completed){
        scheduleds++;
      }
    })
  }

  return (
    <React.Fragment>
      <Grid container justify="center">
        {
          props.activities && props.activities.map( (activity,index) => {
            let mhValue = (100 - ((activity.projectedManHours-activity.completedManHours) * 100 / activity.projectedManHours));
            let completedPieces = (Math.round(parseFloat(activity.completedPieces)*100)/100);
            let completedPercent = (Math.round(parseFloat( (activity.completedPieces * 100 / activity.projectedPieces))*100)/100)

            return <React.Fragment key={index}>
              <Grid item xs={4} md={2} style={{textAlign:'center',marginTop:'15px'}}>
                <div className={classes.activityCircle} style={{borderColor: '#e0e0e0',position:'relative'}}>
                  <Typography style={{width:'100%'}}>
                    <div>
                      <span style={{color:'rgba(0, 203, 132, 0.94)',fontSize: '16px',fontWeight: 'bold'}}>{ completedPercent || 0  }%</span>
                      <div style={{marginTop:'5px',fontSize:'11px'}}>
                      <p>
                         P: { completedPieces + '/' + activity.projectedPieces  }
                       </p>
                       <p style={{marginTop:'5px'}}>
                       MH%: <span style={{color: activity.projectedManHours-activity.completedManHours < 0 ? 'red' : ''}}>{Math.round(parseFloat(mhValue)*100)/100}</span>
                       </p>
                      </div>

                    </div>
                    <div style={{width: '100%',marginTop: '17px',background: activity.completed ? 'rgba(0, 203, 132, 0.94)' : '#c7c6c7',fontWeight:'bold',fontSize: '11px',color: 'white',height: '25px',paddingTop: '6px'}}>
                        {activity.completed ? 'Completed' : 'Scheduled'}
                    </div>
                  </Typography>
                  {
                      props.user && ['Admin', 'Manager'].indexOf(props.user.employee.role.name)>=0 && !activity.completed && (index == props.activities.length-scheduleds) && (props.lot.status=='InProgress' || props.lot.status=='Created') && (
                        <div style={{position: 'absolute',right: '-2px',top: '2px'}}>
                          <IconButton size="small" onClick={(e) => handleActivityMenuOpen(e, activity)}>
                            <MoreVertIcon />
                          </IconButton>
                          <Popover
                            anchorEl={anchorActivityEl}
                            keepMounted
                            open={ activityPopOpened === activity.activityId}
                            onClose={handleActivityMenuClose}
                            elevation={1}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'center',
                            }}
                            transformOrigin={{
                              horizontal: 'right',
                              vertical: 'top',
                            }}
                            className={classes.moreMenu}
                          >
                            <MenuItem onClick={e => finishActivity(activity,props.lot,e)}>
                              Finish Activity
                            </MenuItem>
                          </Popover>
                        </div>
                      )
                    }
                </div>

                <Typography style={{marginTop:'10px'}}> <small> { activity.activity.name ? activity.activity.name : ' '} </small> </Typography>




                {/* <Grid container>
                  <Grid item xs={1}>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography style={{textAlign:'center'}}>
                      <small className={classes.activityCircleStatus} style={{backgroundColor: activity.completed ? '#49B1B2' : '#4B4D4B'}}> {activity.completed ? 'Completed' : 'Scheduled'} </small>
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    {
                      props.user && ['Admin', 'Manager'].indexOf(props.user.employee.role.name)>=0 && !activity.completed && (
                        <React.Fragment>
                          <IconButton size="small" onClick={(e) => handleActivityMenuOpen(e, activity)}>
                            <MoreVertIcon />
                          </IconButton>
                          <Popover
                            anchorEl={anchorActivityEl}
                            keepMounted
                            open={ activityPopOpened === activity.activityId}
                            onClose={handleActivityMenuClose}
                            elevation={1}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'center',
                            }}
                            transformOrigin={{
                              horizontal: 'right',
                              vertical: 'top',
                            }}
                            className={classes.moreMenu}
                          >
                            <MenuItem onClick={e => finishActivity(activity,props.lot,e)}>
                              Finish Activity
                            </MenuItem>
                          </Popover>
                        </React.Fragment>
                      )
                    }
                  </Grid>
                </Grid> */}
              </Grid>
              {/* {
                index+1 == props.activities.length ? null : (
                  <Grid item xs={1} style={{textAlign:'center'}}>
                    <div className={classes.activityArrow}>
                      <ForwardIcon style={{color:'#B1B1B1',fontSize:'60px'}} />
                    </div>
                  </Grid>
                )
              } */}
            </React.Fragment>
          })
        }
      </Grid>
    </React.Fragment>
  );
};

export default ActivitiesGraphics;
