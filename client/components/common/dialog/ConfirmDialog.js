import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from '@material-ui/core';
import {red} from '@material-ui/core/colors';

 const ConfirmDialog = ({openStatus, handleClose, ifAccept}) => {
  const acceptHandler = () => {
    ifAccept();
    handleClose();
  }
  return (
    <div>
      <Dialog
        open={openStatus}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style = {{color: red[700]}}
      >
        <DialogTitle id="alert-dialog-title">{"Bạn thực sự muốn thực hiện hành động này?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Hành động này sẽ xoá vĩnh viễn board của bạn, bạn có chắc là muốn thực hiện nó hay không ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={acceptHandler} color="primary">
            Thực hiện
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Hoàn tác
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ConfirmDialog;