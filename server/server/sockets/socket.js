const { io } = require('../server');
const Users = require('../classes/Users');
const { createMessage } = require('../utils/utils');

const users = new Users();

io.on('connection', (client) => {

    client.on('enterChat', (data, callback) => {


        if (!data.name || !data.chatRoom) {
            return callback({
                error: true,
                message: 'El nombre/chatRoom es necesario'
            });
        }

        client.join(data.chatRoom);
        users.addPerson(client.id, data.name, data.chatRoom);

        client.broadcast.to(data.chatRoom).emit('peopleList', users.getPeopleByChatRoom(data.chatRoom));
        client.broadcast.to(data.chatRoom).emit('createMessage', createMessage('Administrador', `${ data.name } se unió`));

        callback(users.getPeopleByChatRoom(data.chatRoom));

    });

    client.on('createMessage', (data, callback) => {

        let person = users.getPerson(client.id);

        let message = createMessage(person.name, data.message);
        client.broadcast.to(person.chatRoom).emit('createMessage', message);

        callback(message);
    });


    client.on('disconnect', () => {
        console.log(client.id);
        let deletedPerson = users.deletePerson(client.id);
        console.log(deletedPerson);
        client.broadcast.to(deletedPerson.chatRoom).emit('createMessage', createMessage('Administrador', `${ deletedPerson.name } salió`));
        client.broadcast.to(deletedPerson.chatRoom).emit('peopleList', users.getPeopleByChatRoom(deletedPerson.chatRoom));


    });

    // messages privados
    client.on('privateMessage', data => {

        let person = users.getPerson(client.id);
        client.broadcast.to(data.para).emit('privateMessage', createMessage(person.name, data.message));
    });

});