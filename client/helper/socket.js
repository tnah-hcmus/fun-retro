import io from 'socket.io-client';

const listener = (controllers) => {
  const socket = io.connect('http://localhost:8000');
  socket.on('receive_new_tasks', data => {
    console.log(data);
  })
  socket.on('receive_new_name', data => {
    console.log(data);
  })
}
export default listener;