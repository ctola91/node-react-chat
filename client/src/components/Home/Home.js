import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [roomName, setRoomName] = useState("");
    const [userName, setUserName] = useState("");

    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value);
    }

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    }

    return (
        <div className="home-container">
            <input type="text" placeholder="Room Chat" value={roomName} onChange={handleRoomNameChange} className="text-input-field" />
            <input type="text" placeholder="Name" value={userName} onChange={handleUserNameChange} className="text-input-field" />
            <Link to={`/${roomName}?name=${userName}`} className="enter-room-button">Join Room</Link>
        </div>
    )
};

export default Home;
