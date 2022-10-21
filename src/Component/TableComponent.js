import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SearchIcon from '@material-ui/icons/Search';
import { Button, Grid, InputBase, makeStyles, Paper, InputAdornment } from '@material-ui/core';
import { CustomDialog, ModalDetail } from '../Modal';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: 440,
  },
  container: {
    maxHeight: 400,
  },
  search: {
    display: 'flex',
    justifyContent: 'start',
    margin: '10px 30px'
  }
});


export const TableComponent = (props) => {
  const { rows } = props
  const [openDialogSeeLater, setOpenDialogSeeLater] = React.useState(false);
  const [openDialogIgnore, setOpenDialogIgnore] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [item, setItem] = React.useState({});
  const classes = useStyles();

  const onClickDialogSeeLater = () => {
    setOpenDialogSeeLater(true);
  };

  const handleCloseDialogSeeLater = () => {
    setOpenDialogSeeLater(false);
  };

  const onClickDialogIgnore = () => {
    setOpenDialogIgnore(true);
  };

  const handleCloseDialogIgnore = () => {
    setOpenDialogIgnore(false);
  };
 
  const handleOpenModal = (item) => {
    setItem(item)
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Paper className={classes.root}>
      <Grid item xs={12} className={classes.search}>
        <InputBase
          placeholder="Search..."
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          onChange={() => { }}
        />
      </Grid>
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell align="right">Module</TableCell>
              <TableCell align="right">Action Type</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="right">{row.module}</TableCell>
                <TableCell align="right">{row.actionType}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" style={{ marginRight: 10, borderBlockColor: 'green', color: 'green' }} onClick={() => {handleOpenModal(row)}}> View </Button>
                  <Button variant="outlined" style={{ marginRight: 10, borderBlockColor: 'orange', color: 'orange' }} onClick={onClickDialogSeeLater}> See Later </Button>
                  <Button variant="outlined" onClick={onClickDialogIgnore}> Ignore </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CustomDialog
        open={openDialogSeeLater}
        handleClose={handleCloseDialogSeeLater}
        title={"See Later"}
        message={"this recommendation will be shown again in 7 days"}
      />

      <CustomDialog
        open={openDialogIgnore}
        handleClose={handleCloseDialogIgnore}
        title={"Ignore the recommendation"}
        message={"Are you sure to ignore this recommendation?"}
      />

      <ModalDetail
        open={openModal}
        handleClose={handleCloseModal}
        item={item}
      />

    </Paper>
  )
}
