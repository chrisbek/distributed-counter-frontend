import io from 'socket.io-client';

const SOCKET_URL = 'http://172.30.1.11:8000'
const socket = io(SOCKET_URL, {
        timeout: 5000,
        withCredentials: false,
        transports: ['websocket']
    }
);

class SocketService {
    add_error_handler_listener() {
        socket.on("connect_error", (e) => {
            console.error(e);
            socket.close();
        });
    }

    add_connection_handler(callback) {
        socket.on('connect', (socket) => {
            console.log('connected');
        });
    }

    add_handler(event_name, callback) {
        socket.on(event_name, (payload) => {
            callback(payload);
        });
    }

    send_event(event_name, data) {
        socket.emit(event_name, data);
    }

    remove_listeners() {
        socket.close();
    }

    register_to_rooms(roomIdentifiers) {
        socket.emit('register_room', {
            'rooms': roomIdentifiers
        });
    }

    emit(topicName, data) {
        socket.emit(topicName, data);
    }

}

export default new SocketService();