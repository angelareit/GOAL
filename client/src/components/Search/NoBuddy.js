import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const NoBuddy = () => {
  return (
    <div className='no-buddy'>
      <FontAwesomeIcon icon={solid("user-group")} size="xl" />
      <p>You don't have an Accountability Buddy. Consider sending a request!</p>
    </div>
  );
};

export default NoBuddy;
