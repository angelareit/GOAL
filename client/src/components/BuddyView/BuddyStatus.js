import './Chat.scss';

import { useSelector } from 'react-redux';

function BuddyStatus(props) {

  const buddyState = useSelector(state => state.session.buddy);
  
  return (
    <section className="BuddyStatus">
      {buddyState.online ? <p title="Online">🟢 {buddyState.name}</p> : <p title="Offline">🔴 {buddyState.name}</p>}
    </section>
  );
}

export default BuddyStatus;
