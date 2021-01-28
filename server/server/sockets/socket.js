const { io } = require('../server');
const { Users } = require('../classes/Users');
const { createMessage } = require('../utils/utils');

const users = new Users();

io.on('connection', (client) => {

    client.on('goChat', (data, callback) => {


        if (!data.name || !data.chat) {
            return callback({
                error: true,
                message: 'El nombre/chat es necesario'
            });
        }

        client.join(data.chat);

        users.addPerson(client.id, data.name, data.chat);

        client.broadcast.to(data.chat).emit('peopleList', users.getPeopleByChat(data.chat));
        client.broadcast.to(data.chat).emit('createMessage', createMessage('Administrador', `${ data.name } se unió`));

        callback(users.getPeopleByChat(data.chat));

    });

    client.on('createMessage', (data, callback) => {

        let person = users.getPerson(client.id);

        let message = createMessage(person.name, data.message);
        client.broadcast.to(person.chat).emit('createMessage', message);

        callback(message);
    });


    client.on('disconnect', () => {

        let deletedPerson = users.deletePerson(client.id);

        client.broadcast.to(deletedPerson.chat).emit('createMessage', createMessage('Administrador', `${ deletedPerson.name } salió`));
        client.broadcast.to(deletedPerson.chat).emit('peopleList', users.getPeopleByChat(deletedPerson.chat));


    });

    // messages privados
    client.on('privateMessage', data => {

        let person = users.getPerson(client.id);
        client.broadcast.to(data.para).emit('privateMessage', createMessage(person.name, data.message));
    });

});