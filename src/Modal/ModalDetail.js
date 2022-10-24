import React from 'react'
import { Box, Button, Card, Divider, Grid, makeStyles, MenuItem, Modal, Select, Typography } from '@material-ui/core'
import { CustomInput } from '../Component/CustomInput';

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
    width: "700px"
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
  const { open, handleClose, aiRecommendationCase = {} } = props
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [inputValues, setInputValues] = React.useState([]);

  const onSetInputValues = (newValue) => {
    setInputValues([...inputValues, newValue]);
  }

  const prepareAiRecommendation = () => {
    props.runAiRecommendation(inputValues);
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Card style={modalStyle} className={classes.paper}>
        <Typography variant="h5">Recommendation</Typography>
        <Divider />
        <Card style={{ margin: '30px 0px', padding: '10px 30px' }}>
          <Typography variant="h5" gutterBottom >Event</Typography>
          <Typography variant="body1" gutterBottom>{aiRecommendationCase.title}</Typography>

          <br />
          <Typography variant="h5" gutterBottom style={{ marginTop: 25 }}>Description</Typography>
          <Typography variant="body1" gutterBottom>{aiRecommendationCase.description}</Typography>

          <br />
          <Typography variant="h5" gutterBottom style={{ marginTop: 25 }}>Actions to do</Typography>
          {
            aiRecommendationCase.actions &&
            <ol>
              {aiRecommendationCase.actions.map((value) => (
                <li>{value}</li>
              ))}
            </ol>
          }

          <br />
          <Typography variant="h5" gutterBottom style={{ marginTop: 25 }}>Required info</Typography>
          {
            aiRecommendationCase.useForm && aiRecommendationCase.formInputs && (
              aiRecommendationCase.formInputs.map(input => {
                return (
                  <CustomInput 
                    key={input.order} 
                    onSetInputValues={(newValue) => onSetInputValues(newValue)}
                    {...input}
                    inputKey={input.key}
                  />
                )
              })
            )
            
            
          }
        </Card>

        <Divider />
        <Box className="bottom-buttons">
          <Button variant="contained" color="primary" style={{ marginRight: 20 }} onClick={prepareAiRecommendation}>Save</Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>Cancel</Button>
        </Box>
      </Card>
    </Modal>
  )
}
