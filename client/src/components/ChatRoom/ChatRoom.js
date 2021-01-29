import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useChat from '../../shared/hooks/useChat';

import "./ChatRoom.css";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const ChatRoom = (props) => {
    const containerRef = useRef(null);
    let query = useQuery();
    const { roomId } = props.match.params;
    const name = query.get('name');
    const { messages, sendMessage, users } = useChat(roomId, name); // Creates a websocket and manages messaging
    console.log(messages);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages]);

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    }

    const handleOnKeyPress = (e) => {
        console.log(e.key);
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }

    const handleSendMessage = () => {
        sendMessage(newMessage, name);
        setNewMessage("");
        // scrollToBottom();
    }

    return (
        <>
            <ul className="sidenav">
                <li><span>Usuarios</span></li>
                {users.map(user => <li key={user.id}>{user.name}</li>)}
            </ul>
            <div className="container chat-container">
                <h3>ChatRoom: {roomId}</h3>
                <div className="messages-container">
                    <ul className="messages-list" ref={containerRef}>
                        {messages.map((message, i) => <li key={i} className={`${message.owner ? 'owner-container' : (message.name === 'Administrador' ? 'admincontainer' : 'guest-container')}`}>
                            <div>
                                {message.name !== 'Administrador' && !message.owner ? <div className="chat-image"><img src="/images/users/5.jpg" alt="user" /></div> : ''}
                                <span className={`${message.owner ? 'owner grey lighten-4' : (message.name === 'Administrador' ? 'admin red lighten-4' : 'light-blue lighten-4')}`}>{message.message}</span>
                                {message.owner ? <div className="chat-image"><img src="/images/users/1.jpg" alt="user" /></div> : ''}
                            </div>
                        </li>)}
                    </ul>
                </div>
                <div className="row">
                    <div className="col s12">
                        <div className="row">
                            <div className="input-field col s10">
                                <textarea className="materialize-textarea" value={newMessage} onChange={handleNewMessageChange} placeholder="Escriba su mensaje" onKeyPress={(e) => handleOnKeyPress(e)} />
                            </div>
                            <div className="col s2">
                                <div className="input-field">
                                    <button onClick={handleSendMessage} className="btn waves-effect waves-light"><i className="material-icons">send</i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
};

export default ChatRoom;
