//Sample


//******** Note Service *********
//================================

class NoteService {
    constructor(knex) {
        this.knex = knex
    }

    // 1. List Notes of the user
    // ==================================
    list(user) {
        return this.knex.select('id').from('users').where('username', user).then((data) => {
            if (data.length > 0) {
                return this.knex.select('*').from('notes')
                    .where('users_id', function() {
                        return this.select('id').from('users').where('username', user)
                    }).orderBy('id')
            } else {
                throw new Error('Cannot list notes to a non-existing user')
            }
        })

    }

    // 2. Add a note for the user
    // ==================================
    add(note, user) {
        return this.knex.select('id').from('users').where('username', user).then((data) => {
            if (data.length > 0) {
                return this.knex('notes').insert({
                    note: note,
                    users_id: function() {
                        this.select('id').from('users').where('username', user)
                    },
                    important: false
                }).then(() => this.list(user))
            } else {
                throw new Error('Cannot add notes to a non-existing user')
            }
        })
    }

    // 3. Update a note of the user
    // ==================================
    update(index, note, user) {
        return this.knex.select('id').from('users').where('username', user).then((data) => {
            if (data.length > 0) {
                return this.list(user).then((data) => {
                    if (data[index] !== undefined) {
                        return this.knex('notes').where('id', data[index]['id']).update({ note: note })
                    } else throw new Error('Cannot update notes of an incorrect index')
                }).then(() => this.list(user))
            } else {
                throw new Error('Cannot update notes to a non-existing user')
            }
        })
    }

    // 4. Remove a note of the user
    // ==================================
    remove(index, user) {
        return this.knex.select('id').from('users').where('username', user).then((data) => {
            if (data.length > 0) {
                return this.list(user).then((data) => {
                    if (data[index] !== undefined) {
                        return this.knex('notes').where('id', data[index]['id']).del()
                    } else throw new Error('Cannot remove notes of an incorrect index')
                }).then(() => this.list(user))

            } else {
                throw new Error('Cannot remove notes from a non-existing user')
            }
        })
    }
}

module.exports = NoteService;


const knexFile = require('../knexfile').development;
const knex = require('knex')(knexFile);
let noteService = new NoteService(knex);

// noteService.list('sam').then((data) => console.log(data));
// noteService.add('trial', 'sam').then((data) => console.log(data));
// noteService.update(2, 'updated', 'sam').then((data) => console.log(data));
// noteService.remove(2, 'sam').then((data) => console.log(data));