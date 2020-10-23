import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListCategories from './components/category/listCategories';
import Category from './components/category/Category';
import Task from './components/task/Task';
import {connect} from 'react-redux';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: '20px 3%'
  },
}));

const Full = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
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
export default connect(mapStateToProps)(Full);