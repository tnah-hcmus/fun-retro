import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {red} from '@material-ui/core/colors'
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