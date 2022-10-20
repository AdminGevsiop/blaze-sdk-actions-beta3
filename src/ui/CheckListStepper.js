import React from 'react';
import {
  makeStyles,
  Typography,
  IconButton,
  Card,
  Box,
  Grid,
  Checkbox,
} from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  runProgress: {
    position: 'relative',
    overflow: 'hidden',
    transform: `translateX(${theme.spacing(-3)}px)`,
    '& .runProgress-block': {
      position: 'relative',
      width: '100%',
      padding: theme.spacing(1.5),
      paddingLeft: theme.spacing(5),

      '&::before': {
        content: "''",
        position: 'absolute',
        right: -theme.spacing(4),
        top: 0,
        bottom: 0,
        height: 0,
        width: 0,
        margin: 'auto',
        borderColor: 'transparent rgba(205, 205, 205, 0.5)',
        borderStyle: 'solid',
        borderWidth: theme.spacing(6, 0, 6, 4),
        zIndex: 1,
      },
      '&::after': {
        content: "''",
        position: 'absolute',
        right: -(theme.spacing(4) - 1),
        top: 0,
        bottom: 0,
        height: 0,
        width: 0,
        margin: 'auto',
        borderColor: 'transparent #ffffff',
        borderStyle: 'solid',
        borderWidth: theme.spacing(6, 0, 6, 4),
        zIndex: 1,
      },

      '&.runProgress-success': {
        background: '#F6FBF9',
        '&::after': {
          borderColor: 'transparent #F6FBF9',
        },
      },

      '& .runProgress-content': {
        width: '100%',
        '& .runProgress-data': {
          display: 'flex',
          alignItems: 'center',
          '& .runProgress-data-bg': {
            display: 'flex',
            alignItems: 'center',
            background: '#F7F9FA',
            padding: theme.spacing(0.25, 2),
            borderRadius: 8,
          },
        },
      },
    },
    '& .runProgress-grid': {
      '&:last-child': {
        '& .runProgress-block': {
          '&::before, &::after': {
            display: 'none',
          },
        },
      },
    },
  },
  runprogressVal: {
    fontSize: 10,
    '& .runProgress-date': {
      fontWeight: 600,
    },
  },
  runprogressEmptyVal: {
    minWidth: 60,
    fontWeight: 600,
  },
}));

const CheckListStepper = props => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card style={{overflow: 'auto',whiteSpace: 'nowrap'}}>
        <Grid container className={classes.runProgress} style={{width: props.checkListTasks.length > 4 ? (100 + (props.checkListTasks.length - 4) * (props.checkListTasks.length > 8 ? 32 : 20)) + '%' : '100%' }}>
          {
              props.checkListTasks && props.checkListTasks.map( ( ck,index )=>{
                return <Grid key={index} item xs className="runProgress-grid" style={{lineHeight: '1.5em', width: '100%', whiteSpace: 'nowrap'}}>
                          <div className="runProgress-block">
                            <div className="runProgress-content">
                              <Typography variant="subtitle2" gutterBottom>
                                {ck.checkListTask.name}
                              </Typography>
                              <div className="runProgress-data">
                                <Box ml={-1.5} clone>
                                  <Checkbox
                                    defaultChecked={ck.checked}
                                    onChange={e => { props.handleChange(e); props.checkCheckListTask(ck) } }
                                    value={ck.checked}
                                    color="primary"
                                    disabled={ ck.checked && ck.checkedBy != props.user.employee.id ? true : false }
                                  />
                                </Box>
                                <div className={classes.runprogressVal}>
                                  <div className="runProgress-date">{ ck.checked ? moment(new Date(ck.checkedDate)).format('MM/DD/YYYY HH:mm') : null }</div>
                                  <div className="runProgress-text">{ ck.checked ? ck.employee.name : null }</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Grid>
              })
          }
        </Grid>
      </Card>
    </React.Fragment>
  );
};

export default CheckListStepper;
