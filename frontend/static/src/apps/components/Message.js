import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'

function Message ({conversation, text, id, user_from, user_to, receiver, date_created}) {
    return (
        <div>
        <p className="sender-message-object">Sender: {user_from}</p>
            <p>{text}</p>
            <p className="trash-button" >
            <button 
                className="trash-button" 
                type="submit">
                    <FontAwesomeIcon icon={faPencil} />
            </button>
            <button 
                className="trash-button" 
                type="submit">
                    <FontAwesomeIcon icon={faTrash} />
            </button>
            </p>
        </div>
    );
};

export default Message