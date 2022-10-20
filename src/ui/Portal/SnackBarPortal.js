import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

/*const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};*/

const SnackbarBlock = ({ message, type, handleClose }) => {
  return (
    <Snackbar
      open={message ? true : false}
      onClose={handleClose}
      autoHideDuration={4000}
    >
      <Alert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={type ? type : 'success'}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

const SnackBarPortal = ({ children, type, handleClose }) => {
  let portEle = React.useRef();
  const portalRoot = document.getElementsByTagName('BODY')[0];
  useEffect(() => {
    portEle.current = document.createElement('div');
    portalRoot.appendChild(portEle.current);
    return () => portEle.current.remove();
  }, []);
  if (children) {
    return createPortal(
      <SnackbarBlock
        message={children}
        type={type}
        handleClose={handleClose}
      />,
      portEle.current
    );
  }
  return '';
};

export default SnackBarPortal;
