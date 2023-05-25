import './Chat.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { useSelector } from 'react-redux';

function BuddyStatus() {

  const buddyState = useSelector(state => state.session.buddy);

  return (
    <section className="BuddyStatus">
      <FontAwesomeIcon icon={solid("user-group")} size="xl" />
      {buddyState.online ?
        <h3 title="Online">  {buddyState.name} <FontAwesomeIcon icon={solid("circle")} size="xs" style={{ color: "#20C549", margin: '5px' }} /></h3> :
        <h3 title="Offline"> {buddyState.name} <FontAwesomeIcon icon={solid("circle")} size="xs" style={{ color: "#f02a14", margin: '5px' }} /></h3>}
    </section>
  );
}

export default BuddyStatus;
