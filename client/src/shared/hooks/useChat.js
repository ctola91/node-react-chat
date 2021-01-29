
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { SERVER_URL } from "../utils/constants";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = SERVER_URL;

const useChat = (roomId, name) => {
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]); // Sent and received messages
    const socketRef = useRef();


    useEffect(() => {
        const user = {
            name,
            chatRoom: roomId
        }
        // Creates a WebSocket connection
        socketRef.current = socketIOClient(SOCKET_SERVER_URL);

        socketRef.current.on('connect', () => {
            console.log('Conectado al servidor');
            socketRef.current.emit('enterChat', user, (res) => {
                setUsers(res);
            })
        })

        socketRef.current.on('disconnect', () => {
            console.log('Perdimos conexión con el servidor');
        });

        // Escuchar cambios de usuarios
        // Cuando un usuario entra o sale del chat
        socketRef.current.on('peopleList', (u) => {
            console.log(u);
            setUsers(u);
        });

        // Escuchar informacion
        // Listens for incoming messages
        socketRef.current.on('createMessage', (message) => {
            const incomingMessage = {
                ...message,
                owner: false,
            };
            setMessages((messages) => [...messages, incomingMessage]);
        });

        socketRef.current.on('privateMessage', (message) => {
            console.log('Mensaje Privado: ', message);
        });

        socketRef.current.on('disconnect', () => {
            console.log('Perdimos conexion con el servidor');
        });

        // Destroys the socket reference
        // when the connection is closed
        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId, name]);

    // Sends a message to the server that
    // forwards it to all users in the same room
    const sendMessage = (message, name) => {
        socketRef.current.emit('createMessage', {
            name,
            message
        },  (res) => {
            const incomingMessage = {
                ...res,
                owner: true,
            };
            setMessages((messages) => [...messages, incomingMessage]);
        });
    };

    return { users, messages, sendMessage };
};

export default useChat;