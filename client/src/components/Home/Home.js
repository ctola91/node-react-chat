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
        <div className="row">
            <div className="col s12 m6 offset-m3">
                <div className="card">
                    <div className="card-content">
                        <input type="text" placeholder="Room Chat" value={roomName} onChange={handleRoomNameChange} className="text-input-field" />
                        <input type="text" placeholder="Name" value={userName} onChange={handleUserNameChange} className="text-input-field" />
                    </div>
                    <div className="card-action">
                        <Link to={`/${roomName}?name=${userName}`} className="btn">Join Room</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;
