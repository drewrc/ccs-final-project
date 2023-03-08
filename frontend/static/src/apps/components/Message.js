

function Message ({conversation, text, id, user_from, user_to, receiver, date_created}) {
    return (
        <div>
            <p>To: {user_to}</p>
            <p>From: {user_from}</p>
            <p>Body: {text}</p>
            <p>{date_created}</p>
        </div>
    );
};

export default Message