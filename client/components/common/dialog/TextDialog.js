import React, {useRef} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

 const EditDialog = ({openStatus, handleClose, ifAccept}) => {
  const ref = useRef();
  const saveHandler = () => {
    if(ref.current.value) ifAccept(ref.current.value);
    handleClose();
  }
  return (
    <div>
      <Dialog
        open={openStatus}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Thay đổi thông tin cá nhân"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Điền thông tin cá nhân của bạn vào các ô phía dưới
          </DialogContentText>
        </DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            inputRef = {ref}
            style = {{maxWidth: '90%', marginLeft: '5%'}}
          />
        <DialogActions>
          <Button onClick={saveHandler} color="primary">
            Lưu
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Huỷ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default EditDialog;