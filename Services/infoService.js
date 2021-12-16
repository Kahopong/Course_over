//list edit info for shops and users


class InfoService {
    constructor(knex) {
        this.knex = knex
    }

    listUser(id) {
        return this.knex('users').select('*').where('id', id).then((info) => {
            if (info.length > 0) {
                return info
            } else {
                throw new Error('User not existing, cannot list info.')
            }
        })
    }

    listShop(id) {
        return this.knex('shop').select('*').where('id', id).then((info) => {
            if (info.length > 0) {
                return this.knex('shop').join('shop_pic', 'shop.id', '=', 'shop_pic.shop_id').select('*').where('shop.id', id)
            } else {
                throw new Error('Shop not existing, cannot list info.')
            }
        })
    }

    editUser(id, edit) {
        return this.knex('users').select('*').where('id', id).then((info) => {
            if (info.length > 0) {
                return this.knex('users').where('id', id).update({
                    username: edit.username,
                    surname: edit.surname,
                    firstName: edit.firstName,
                    tel: edit.tel,
                    sex: edit.sex,
                    dob: edit.dob,
                    profilePic: edit.profilePic
                })
            } else {
                throw new Error('User not existing, cannot edit info.')
            }
        })
    }

    editShop(id, edit) {
        return this.knex('shop').select('*').where('id', id).then((info) => {
            if (info.length > 0) {
                return this.knex('shop').where('id', id).update({
                    company: edit.company,
                    tel: edit.tel,
                    email: edit.email,
                }).then(() => {
                    // console.log(edit.logo, edit.banner)
                    if (!(edit.logo === undefined && edit.banner === undefined)) {
                        return this.knex('shop_pic').where('shop_id', id).update({
                            logo: edit.logo,
                            banner: edit.banner
                        })
                    }
                })
            } else {
                throw new Error('Shop not existing, cannot edit info.')
            }
        })
    }





}

module.exports = InfoService;


//For trying individual js files

// const knexFile = require('../knexfile').development;
// const knex = require('knex')(knexFile);
// let infoService = new InfoService(knex);
// infoService.listUser(1).then((a) => console.log(a))
// infoService.listShop(1).then((a) => console.log(a))


// let editUser = {
//     username: 'iamsidseedseed',
//     surname: 'The',
//     firstName: 'Sidsid',
//     tel: '69696969',
//     sex: 'F',
//     dob: '1989-06-20'
// }
// infoService.editUser(3, editUser).then(() => {
//     infoService.listUser(3).then((a) => console.log(a))
// })

// let editShop = {
//     company: 'footballking',
//     tel: '51005222',
//     email: 'footballking@gmail.com',
//     logo: null,
//     banner: null,
// }

// infoService.editShop(3, editShop).then(() => {
//     infoService.listShop(3).then((a) => console.log(a))
// })