import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Dialog, Button, Typography, IconButton} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {Close, Flag} from '@material-ui/icons';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <Close />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const InfoDialogs = ({openStatus, handleClose, content}) => {
  return (
      <Dialog onClose={() => handleClose(false)} aria-labelledby="customized-dialog-title" open={openStatus}>
        <DialogTitle id="customized-dialog-title" onClose={() => handleClose(false)}>
          Thông báo
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {content}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleClose(false)} color="primary">
            Đã biết
          </Button>
        </DialogActions>
      </Dialog>
  );
}
export default React.memo(InfoDialogs);