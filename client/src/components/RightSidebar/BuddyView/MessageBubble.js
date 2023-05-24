import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { generateTimeStamp } from '../../../helpers/helperFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function MessageBubble(props) {
  const buddy = props.buddy;
  const timeAgo = generateTimeStamp(new Date(props.message.created_at).getTime(), Date.now());

  const name = props.type === 'incoming' ? buddy.name : "You";
  const content = props.message.content;
  const className = (props.type === 'incoming' ? 'message message-incoming' : 'message message-outgoing') + (content ? '' : ' deleted');

  return (
    <article className={className}>
      <header><span className="sender-name">{name}</span><span className="timestamp">{timeAgo}</span></header>
      <blockquote>{content ? content : <i>Message removed</i>}</blockquote>
      {props.type === 'outgoing' && content && <footer><FontAwesomeIcon onClick={props.deleteMessage} icon={solid("trash")} /></footer>}
    </article>
  );
}