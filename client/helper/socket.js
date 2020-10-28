import io from 'socket.io-client';

class WSClient {
  constructor() {
      this.socket = null;
  }
  connect(boardId) {
    this.socket = io.connect('https://retro-1712039.herokuapp.com:8000', {
      query: "boardId=" + boardId
    });
  }
  submitTaskList(task, boardId) {
    this.socket.emit('send-new-task-list', {task, id: boardId});
  }

  addTask(task, boardId) {
    if(this.socket) this.socket.emit('send-add-task-request', {task, boardId});
  }

  deleteTask(id, boardId) {
    if(this.socket) this.socket.emit('send-delete-task-request', {id, boardId});
  }

  editTask(id, boardId, newInfo) {
    if(this.socket) this.socket.emit('send-edit-task-request', {id, boardId, newInfo});
  }

  submitName(name, boardId) {
    this.socket.emit('send-new-board-name', {name, id: boardId});
  }

  startListenNewTask(setTasks) {
    this.socket.on('receive-new-task-list', (data) => {
      setTasks(data);
    });
  }

  startListenNewName(setName) {
    this.socket.on('receive-new-board-name', (data) => {
      setName(data);
    });
  }

  startListenAddTask(addTask) {
    this.socket.on('receive-add-task-request', (task) => {
      addTask(task);
    });
  }

  startListenDeleteTask(deleteTask) {
    this.socket.on('receive-delete-task-request', (id) => {
      deleteTask(id);
    });
  }

  startListenEditTask(editTask) {
    this.socket.on('receive-edit-task-request', ({id, info}) => {
      editTask(id, info);
    });
  }

  shutdownWS() {
    this.socket.emit('send-disconnect-request');
    this.socket = null;
  }

}
const WS = new WSClient();
export default WS;