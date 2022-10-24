import React from 'react'
import { Box, Button, Card, Divider, Grid, makeStyles, MenuItem, Modal, Select, Typography } from '@material-ui/core'

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
  const { open, handleClose, item = {} } = props
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Card style={modalStyle} className={classes.paper}>
        <Typography variant="h5">Recommendation</Typography>
        <Divider />
        <Card style={{ margin: '30px 0px', padding: '10px 30px' }}>
          <Typography variant="h5" gutterBottom >Situation</Typography>
          <Typography variant="body1" gutterBottom>{item.title}</Typography>

          <Typography variant="h5" gutterBottom style={{ marginTop: 25 }}>Description</Typography>
          <Typography variant="body1" gutterBottom>{item.description}</Typography>

          <Typography variant="h5" gutterBottom style={{ marginTop: 25 }}>Action</Typography>
          {
            true &&
            <ol>
              {item.actions.map((value) => (
                <li>{value}</li>
              ))}
            </ol>
          }

          {
            item.useForm &&
            <Grid item xs={12} className="select">
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={age}
                onChange={handleChange}
              >
                {item.formInputs.map((value) => (
                  <MenuItem value={value.valueType}>{value.valueType}</MenuItem>
                ))}
              </Select>
            </Grid>
          }
        </Card>

        <Divider />
        <Box className="bottom-buttons">
          <Button variant="contained" color="primary" style={{ marginRight: 20 }} onClick={(e) => { }}>Save</Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>Cancel</Button>
        </Box>
      </Card>
    </Modal>
  )
}
