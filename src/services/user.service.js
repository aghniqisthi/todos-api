const dbPool = require('../config/database')
// const { use } = require('express/lib/application')
const { nanoid } = require('nanoid')
const users = [] //temporary database

const register = async (body) => {
    const query = `INSERT INTO 
                        USERS (username, email, password)
                        VALUES ('${body.username}', '${body.email}', '${body.password}')`
    return dbPool.execute(query)

    // const id = nanoid(4) //4 digits id (1234, etc)

    // const newUser = {
    //     id: id,
    //     username: body.username,
    //     email: body.email,
    //     password: body.password
    // }

    // users.push(newUser);

    // return isSuccess = users.filter((user) => user.id = id).length > 0
}

const login = async (body) => {
    const query = `SELECT id, username, email FROM users WHERE email = '${body.email}' AND password = '${body.password}'`
    return dbPool.execute(query)

    // const user = users.filter((user) => (user.email === body.email && user.password === body.password))[0]
    // return user
}

const update = async(id, body) => {
    const query = `UPDATE users 
    SET username = '${body.username}', email = '${body.email}', password = '${body.password}'
    WHERE id = '${id}'`
    return dbPool.execute(query)
}

const viewUser = async() => {
    const query = `SELECT id, username, email FROM users`
    return dbPool.execute(query)
}

const deleteUser = async(id) => {
    const query = `DELETE FROM users WHERE id = ${id}`
    return dbPool.execute(query)
}

const getUserByEmail = async(email) => {
    const query = `SELECT id, username, email FROM users WHERE email='${email}'`
    return dbPool.execute(query)
}

const getUserById = async(id) => {
    const query = `SELECT id, username, email FROM users WHERE id='${id}'`
    return dbPool.execute(query)
}

module.exports = {register, login, update, viewUser, deleteUser, getUserByEmail, getUserById}