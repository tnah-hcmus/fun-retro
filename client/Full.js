import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListCategories from './components/category/listCategories';
import Category from './components/category/Category';
import Task from './components/task/Task';
import { Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {connect} from 'react-redux';
import { green } from '@material-ui/core/colors';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: '20px 3%'
  },
  boardName: {
    fontWeight: 300,
  },
  icon: {
    marginLeft: 5,
    color: green[600]
  }
}));

const BoardView = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant = "h3" align = "center" >
            Đây là cái tên nè
            <EditIcon fontSize = "large" className = {classes.icon}/>
          </Typography>
        </Grid>
        {ListCategories.map((category) => 
            <Category category = {category}>
                {props.task.filter((task) => task.category === category.id)
                           .map((task) => <Task task = {task}/>)}
            </Category>
        )}
      </Grid>
    </div>
  );
}
const mapStateToProps = state => {
    return {
      task: state.task
    };
  };
export default connect(mapStateToProps)(BoardView);