const dbPool = require('../config/database')

const create = async (id_user, body) => {
    const query = `INSERT INTO todos (id_user, title, description, deadline) VALUES (${id_user}, '${body.title}', '${body.description}', '${body.deadline}')`
    return dbPool.execute(query)
}

const viewAll = async(id_user) => {
    const query = `SELECT * FROM todos WHERE id_user=${id_user}`
    return dbPool.execute(query)
}

const viewTodo = async(id_todo, id_user) => {
    const query = `SELECT * FROM todos WHERE id_user=${id_user} && id_todo=${id_todo}`
    return dbPool.execute(query)
}

const update = async(id_todo, id_user, body) => {
    const query = `UPDATE todos SET title = '${body.title}', description = '${body.description}', deadline = '${body.deadline}' WHERE id_todo=${id_todo} && id_user=${id_user}`
    return dbPool.execute(query)
}


const getTodoByContent = async(id_user, title, description, deadline) => {
    const query = `SELECT * FROM todos WHERE id_user=${id_user} && title='${title}' && description='${description}' && deadline='${deadline}'`
    return dbPool.execute(query)
}

const deleteTodo = async(id_todo, id_user) => {
    const query = `DELETE FROM todos WHERE id_user=${id_user} && id_todo=${id_todo}`
    return dbPool.execute(query)
}

module.exports = {create, update, viewAll, viewTodo, getTodoByContent, deleteTodo}