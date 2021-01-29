class Users {
    constructor() {
        this.people = [];
    }

    addPerson(id, name, chatRoom) {
        let person = { id, name, chatRoom };
        this.people.push(person);
        return this.people;
    }

    getPerson(id) {
        let person = this.people.filter(person => person.id === id)[0];
        return person;
    }

    getPeople() {
        return this.people;
    }

    getPeopleByChatRoom(chatRoom) {
        let peopleOnChat = this.people.filter(person => person.chatRoom === chatRoom);
        return peopleOnChat;
    }

    deletePerson(id) {
        let personDeleted = this.getPerson(id);
        this.people = this.people.filter(person => person.id !== id);
        return personDeleted;
    }
}

module.exports = Users;