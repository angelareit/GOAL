import { io } from 'socket.io-client';
import { setBuddy, fetchBuddyProgress } from '../features/sessionSlice';
import { appendMessage, deleteMessage, fetchMessageHistory } from '../features/messagesSlice';

const socket = io({ autoConnect: false });

const socketBuddyFunctions = function(dispatch) {

  socket.on('BUDDY_UPDATE', payload => {
    console.log(payload);
    dispatch(setBuddy(payload));
  });

  socket.on('MESSAGE_RECEIVE', payload => {
    dispatch(appendMessage({message: payload, newMessage: true}));
  });

  socket.on('MESSAGE_HISTORY', payload => {
    dispatch(fetchMessageHistory(payload));
  });

  socket.on('MESSAGE_DELETE', payload => {
    console.log(payload);
    dispatch(deleteMessage(payload.message))
  });

  socket.emit('GET_BUDDY_INFO', payload => {
    dispatch(setBuddy(payload));
  });

  socket.emit('MESSAGE_HISTORY', payload => {
    dispatch(fetchMessageHistory(payload));
  });

  socket.on('BUDDY_PROGRESS', payload => {
    console.log('PROGRESS ON YO', payload);

    dispatch(fetchBuddyProgress(payload));
  });
/* 
  socket.emit('BUDDY_PROGRESS', payload => {
    console.log('PROGRESS EMIT YO', payload);
    dispatch(fetchBuddyProgress(payload));
  }); */

  /*   socket.emit('BUDDY_PROGRESS_UPDATE', payload => {
      dispatch(fetchBuddyProgress(payload));
    }) */
};

const socketsDisconnect = function() {
  console.log("Socket Disconnect");
  socket.off('MESSAGE_RECEIVE');
  socket.off('MESSAGE_DELETE');
  socket.off('MESSAGE_HISTORY');
  socket.off('BUDDY_UPDATE');
  socket.off('BUDDY_PROGRESS');
  socket.disconnect();
};

export { socketBuddyFunctions, socketsDisconnect };
export default socket;

