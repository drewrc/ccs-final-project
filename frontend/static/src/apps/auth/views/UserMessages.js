import Message from "../../components/Message"
import { useState, useEffect } from "react"

function UserMessages () {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const getMessages = async () => {
            const response = await fetch (`/api_v1/messages/`);
            if (!response.ok) {
                throw new Error ('Network response not OK');
            };
            const data = await response.json();
            setMessages(data);
        };
        getMessages();
    }, []);

    const messageHTML = messages.map ((message) =>
    <div key={message.id}>
        <Message
        {...message}
        />
    </div>
    )

    return (
        <div>
            I am the user messages component!
            {messageHTML}
        </div>
    )
}

export default UserMessages