import { io } from 'socket.io-client';

import { setBuddy } from '../features/sessionSlice';
import { appendMessage, fetchMessageHistory, setMessages } from '../features/messagesSlice';

const socket = io({ autoConnect: false });

socket.on('connect', () => {
  console.log("Socket connected: ", socket.id);
})

const socketBuddyFunctions = function(dispatch) {

  socket.on('MESSAGE_RECEIVE', payload => {
    dispatch(appendMessage(payload));
  });

  socket.on('BUDDY_UPDATE', payload => {
    console.log(payload);
    dispatch(setBuddy(payload));
  });

  socket.on('MESSAGE_HISTORY', payload => {
    dispatch(fetchMessageHistory(payload));
  });

  socket.emit('GET_BUDDY_INFO', payload => {
    dispatch(setBuddy(payload));
  });

};

const buddyFunctionsOff = function() {
  socket.off('MESSAGE_RECEIVE');
  socket.off('BUDDY_UPDATE');
  socket.off('MESSAGE_HISTORY');
};

export { socketBuddyFunctions, buddyFunctionsOff };
export default socket;

