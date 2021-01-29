import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useChat from '../../shared/hooks/useChat';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const ChatRoom = (props) => {
    let query = useQuery();
    const { roomId } = props.match.params;
    const name = query.get('name');
    const { messages, sendMessage, users } = useChat(roomId, name); // Creates a websocket and manages messaging
    console.log(messages);
    const [newMessage, setNewMessage] = useState("");

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    }

    const handleSendMessage = () => {
        sendMessage(newMessage, name);
        setNewMessage("");
    }

    return (
        <div>
            <h1>ChatRoom: {roomId}</h1>
            <div className="messages-container">
                <ul className="messages-list">
                    {messages.map((message, i) => <li key={i}>{message.message}</li>)}
                </ul>
            </div>
            <textarea value={newMessage} onChange={handleNewMessageChange} placeholder="Escriba su mensaje" className="new-message-input-field" />
            <button onClick={handleSendMessage} className="send-message-button">Send</button>
            {users.map(user => <div key={user.id}>{user.name}</div>)}

        </div>
    )
};

export default ChatRoom;
