import React, { useEffect, useState } from 'react';
import BoardItem from './BoardItem';
import { makeStyles } from '@material-ui/core/styles';
import AddBoard from './AddBoard';
import {connect} from 'react-redux';
import {addBoardWServer, startSetBoards} from '../../actions/board/action';
import Loading from '../common/LoadingPage';

const useStyles = makeStyles({
  mainHeader: {
    fontWeight: 100,
    fontSize: '4em',
  },
  page: {
    margin: 50,
    marginBottom: 80,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});
const ListBoard = (props) => {
  const classes = useStyles();
  const [init, setDone] = useState(false);
  const handleAddBoard = () => {
    const board = {
      name: 'Blank board',
      owner: props.user
    }
    props.add(board);
  }
  useEffect(() => {
    props.setBoard().then(() => setDone(true));
  }, [])

  return (
    <>
    {
      init
      ?
      <div className = {classes.page}>
        <h1 className = {classes.mainHeader}>{`Chào mừng bạn trở lại, ${props.user}`}</h1>
        <AddBoard addBoard = {handleAddBoard}/>
        <div className = {classes.container}>
          {props.boards.map((item) => <BoardItem board = {item}/>)}
        </div>
      </div>
      :
      <Loading/>
    }
    </>
  );
}

const mapStateToProps = state => {
  return {
    boards: state.boards,
    user: state.auth.name,
  };
};
const mapDispatchToProps = {
  add: addBoardWServer,
  setBoard: startSetBoards
}
export default connect(mapStateToProps, mapDispatchToProps)(ListBoard);
