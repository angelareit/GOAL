import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const NoBuddy = () => {
  return (
    <>
      <div className='container'>
        <div className='searchIcon'>
          <FontAwesomeIcon className='fa-2xl' icon={faMagnifyingGlass} />
        </div>

        <p>You currently have no Accountability Buddy.</p>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .searchIcon {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 10px;
          width: 3em;
          height: 3em;
        }
      `}</style>
    </>
  );
};

export default NoBuddy;
