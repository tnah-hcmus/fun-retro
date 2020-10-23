import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
} from '@material-ui/core';
import { DeleteForever} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { red, green, blue } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit'
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles((theme) => ({
    card: {
      width: 360,
      height: 200,
      padding: '5% auto',
    },
    top: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '20px',
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
    }
  }));
const BoardItem = () => {
  const classes = useStyles();
  return (
      <Card className = {classes.card}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom component="div">
            <div className = {classes.top}>
              <div>
                {"2 tiếng trước"}
              </div>
              <div className = {classes.button}>
                  <IconButton className = {classes.share}>
                    <ShareIcon />
                  </IconButton>
                  <IconButton className = {classes.delete}>
                    <DeleteForever />
                  </IconButton>
              </div>
            </div>
          </Typography>
          <Typography variant="h4" component="h2">
            {"Hello"}
            <IconButton className = {classes.edit}>
              <EditIcon />
            </IconButton>
          </Typography>
          <Typography color="textSecondary" style={{ marginTop: 20 }}>
            {"Tạo bởi"} <em>{"Trương Nguyễn Anh Hoàng"}</em>
          </Typography>
        </CardContent>
      </Card>
  );
};


export default BoardItem;
