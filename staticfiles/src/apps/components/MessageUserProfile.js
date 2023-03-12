 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import { faUserXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'

function MessageFriendProfile ({username, id}) {
    return (
        <div key={id}>
            <div>profile pic placeholder</div>
            <p>{username}</p>
            <p>
                <button>
                <FontAwesomeIcon icon={faUserXmark} /> Remove or Block
                </button>
                </p>
                
            <p>
                <FontAwesomeIcon icon={faLocationDot} /> Location
            </p>
            <p>
                About: 
            </p>
            <p>
                Activities: 
            </p>
        </div>
    );
};

export default MessageFriendProfile