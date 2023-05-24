import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import axios from "axios";

const NoBuddy = () => {
  return (
    <div className='no-buddy'>
      <FontAwesomeIcon icon={solid("user-group")} size="xl" />
      <p>You currently have no Accountability Buddy.</p>
    </div>
  )
}

export default NoBuddy;
