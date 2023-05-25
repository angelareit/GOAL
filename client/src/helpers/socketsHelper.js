import { io } from 'socket.io-client';
import { setBuddy, fetchBuddyProgress } from '../features/sessionSlice';
import { appendMessage, deleteMessage, fetchMessageHistory } from '../features/messagesSlice';
import { showBuddyProgressPanel, showSearchPanel } from '../features/viewManagerSlice';
import { fetchPendingBuddyRequests } from '../features/notificationSlice';
import axios from 'axios';

const socket = io({ autoConnect: false });

const socketBuddyFunctions = function(dispatch) {

  socket.on('BUDDY_UPDATE', payload => {
    console.log(payload);
    dispatch(setBuddy(payload));
    axios.get('/progress', { params: { userID: payload.id } }
    ).then(res => {
      console.log('progress', res.data);
      if (res.data.success) {
        dispatch(fetchBuddyProgress(res.data));
        dispatch(showBuddyProgressPanel());
      }
    }).catch((err) => {
      console.log(err);
    });
  });

  socket.on('MESSAGE_RECEIVE', payload => {
    dispatch(appendMessage({ message: payload, newMessage: true }));
  });

  socket.on('MESSAGE_HISTORY', payload => {
    dispatch(fetchMessageHistory(payload));
  });

  socket.on('MESSAGE_DELETE', payload => {
    console.log(payload);
    dispatch(deleteMessage(payload.message));
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

  socket.on('REMOVE_BUDDY', () => {
    dispatch(setBuddy({ name: null, id: null, online: null }));
    dispatch(showSearchPanel());
  });

  socket.on('UPDATE_REQUESTS', () => {
    axios.get("/request/incoming").then(res => {
      dispatch(fetchPendingBuddyRequests(res.data));
    });
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
  socket.off('UPDATE_REQUESTS');
  socket.disconnect();
};

export { socketBuddyFunctions, socketsDisconnect };
export default socket;

