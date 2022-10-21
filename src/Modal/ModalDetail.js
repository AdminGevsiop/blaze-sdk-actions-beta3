import { Box, Card, Divider, makeStyles, Modal, Slider, Typography } from '@material-ui/core'
import React from 'react'

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}  

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

export const ModalDetail = (props) => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const { open, handleClose } = props
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Card style={modalStyle} className={classes.paper}>
                <Typography>Recommendation</Typography>
                <Divider/>
                <Typography variant="subtitle1" gutterBottom >Situation</Typography>
                <Typography variant="body1" gutterBottom>there are some regions without Hours of Operations</Typography>
            </Card>
        </Modal>
    )
}
