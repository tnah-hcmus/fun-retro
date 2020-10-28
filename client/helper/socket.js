import io from 'socket.io-client';

class WSClient {
  constructor() {
      this.socket = null;
  }
  connect(boardId) {
    this.socket = io.connect('http://localhost:8000', {
      query: "boardId=" + boardId
    });
  }
  submitTask(task, boardId) {
    this.socket.emit('send-new-task-list', {task, id: boardId});
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
  shutdownWS() {
    this.socket.emit('send-disconnect-request');
    this.socket = null;
  }

}
const WS = new WSClient();
export default WS;