import './Chat.scss';

function BuddyStatus(props) {
  return (
    <section className="BuddyStatus">
      {props.online ? <p title="Online">🟢 {props.name}</p> : <p title="Offline">🔴 {props.name}</p>}
    </section>
  );
}

export default BuddyStatus;
