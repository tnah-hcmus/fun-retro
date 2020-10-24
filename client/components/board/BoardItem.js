import React, {useState, useRef} from 'react';
import {
  Card,
  CardContent,
  TextField,
  Typography,
  IconButton,
} from '@material-ui/core';
import { DeleteForever} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { red, green, blue, grey } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit'
import ShareIcon from '@material-ui/icons/Share';
import LockIcon from '@material-ui/icons/Lock';
import moment from 'moment';
import {PUBLIC_BOARD} from '../../actions/board/types';
import {updateBoardWServer, deleteBoardWServer} from '../../actions/board/action';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ConfirmDialog from '../common/dialog/ConfirmDialog';

const useStyles = makeStyles((theme) => ({
    card: {
      width: 340,
      height: 200,
      padding: '5% auto',
      margin: '30px 50px'
    },
    top: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '20px',
    },
    bottom: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20
    },
    button: {
        position: 'relative',
        left: '12px',
    },
    delete: {
      color: red[500]
    },
    edit: {
      color: green[500],
      marginLeft: 5
    },
    share: {
      color: blue[400]
    },
    lock: {
      color: grey[900]
    }
  }));
moment.locale('vi');
const BoardItem = ({board, shareBoard, deleteBoard, protectBoard, newName}) => {
  const classes = useStyles();
  const [allowEdit, setAllowEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const editRef = useRef();
  const handleEditBoardName = () => {
    const value = editRef.current.value;
    newName(board.id, value);
    setAllowEdit(false);
  }
  const handleShareBoard = () => {
    shareBoard(board.id);
    navigator.clipboard.writeText(`http://localhost:3000/board/${board.id}`).then(() => console.log('Copied'));
  }
  return (
    <>
        <Card className = {classes.card}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom component="div">
              <div className = {classes.top}>
                <div>
                  {moment(Number(board.timestamp)).fromNow()}
                </div>
                <div className = {classes.button}>
                    <IconButton className = {classes.share} onClick = {handleShareBoard}>
                      <ShareIcon />
                    </IconButton>
                    <IconButton className = {classes.lock} onClick = {() => protectBoard(board.id)}>
                      <LockIcon />
                    </IconButton>
                    <IconButton className = {classes.delete} onClick = {() => setModal(true)}>
                      <DeleteForever />
                    </IconButton>
                </div>
              </div>
            </Typography>
            {!allowEdit
              ? <Typography variant="h4" component="h2" style = {{marginTop: 20}}>
                  {board.name}
                  <IconButton className = {classes.edit} onClick = {() => setAllowEdit(true)}>
                    <EditIcon />
                  </IconButton>
                </Typography>
              :   <TextField
                label="Edit board name" 
                placeholder = "Nhập tên mới cho board" 
                fullWidth 
                multiline
                inputRef = {editRef}
                onBlur={handleEditBoardName}
                />
            }
            <div className = {classes.bottom}>
                <div>
                  <Typography color="textSecondary" style={{marginBot: 15 }}>
                    {"Tạo bởi"} <em>{board.owner}</em>
                  </Typography>
                  <Typography color="textSecondary">
                    {'Chế độ:'} {<em>{board.permission === PUBLIC_BOARD ?  'Công khai' : 'Cá nhân'}</em>}
                  </Typography>
                </div>
                <div className = {classes.button}>
                    <IconButton className = {classes.share} component={Link} to={`/board/${board.id}`}>
                      <ExitToAppIcon fontSize = "large" />
                    </IconButton>
                </div>
              </div>
          </CardContent>      
      </Card>
      <ConfirmDialog openStatus = {modal} handleClose = {() => setModal(false)} ifAccept = {() => deleteBoard(board.id)}/>
    </>
  );
};

const mapDispatchToProps = {
  shareBoard: (id) => updateBoardWServer(id, 'share'), 
  deleteBoard: deleteBoardWServer, 
  protectBoard: (id) => updateBoardWServer(id, 'protect'), 
  newName: (id, name) => updateBoardWServer(id, 'name', name)
}
export default connect(null, mapDispatchToProps)(BoardItem);
