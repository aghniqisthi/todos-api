require('express/lib/response');
require('passport');
const todoService = require('../services/todo.service');
const jwt =  require('jsonwebtoken');

const createTodo = async(req, res) => {
    const id_user = req.user[0][0].id;
    const {body} = req;

    if(!body.title || !body.description || !body.deadline){
        return res.status(400).json({
            status: 'failed',
            message: 'data empty'
        });
    }

    try{
        const checkTodo = await todoService.getTodoByContent(id_user, body.title, body.description, body.deadline);

        if(checkTodo[0][0]) {
            return res.status(409).json({
                status: 'failed',
                message: 'Todo already added'
            })
        }

        await todoService.create(id_user, body);
            
        return res.status(201).json({
            status: 'success',
            message: 'New Task Created!',
            data: body
        })    

    } catch(error){
        console.log(error)
        return res.status(500).json({
            status: 'failed',
            message: 'Cannot Created New Task'
        })
    }
}

const viewAll = async (req, res) => {
    try {
        const id_user = req.user[0][0].id;

        const [todos] = await todoService.viewAll(id_user)

        return res.status(200).json({
            status: 'success',
            message: 'viewing data success',
            data: todos
        })
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            message: 'failed showing data'
        })
    }
}

const viewTodo = async (req, res) => {
    try {
        const id_user = req.user[0][0].id;
        const id_todo = req.params.id;
        console.log(id_todo)

        const todos = await todoService.viewTodo(id_todo, id_user)

        if(!todos[0][0]) error
        else return res.status(200).json({
            status: 'success',
            message: 'viewing data success',
            data: todos[0][0]
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 'failed',
            message: 'failed showing data'
        })
    }
}

const update = async (req, res) => {
    const {body} = req;    
    const id_user = req.user[0][0].id;
    const id_todo = req.params.id;

    if(!body.title || !body.description || !body.deadline){
        return res.status(400).json({
            status: 'failed',
            message: 'data empty'
        });
    }

    try{
        const update = await todoService.update(id_todo, id_user, body);

        return res.status(200).json({
            status: 'success',
            message: 'update data success!',
            data: body
        })    

    } catch(error){
        console.log(error)
        return res.status(500).json({
            status: 'failed',
            message: 'failed updating data'
        })
    }
}

const deleteTask = async(req, res) => {
    try {        
        const id_user = req.user[0][0].id;
        const id_todo = req.params.id;

        const checkTodo = await todoService.viewTodo(id_todo, id_user)
        
        if(checkTodo[0][0]){
            await todoService.deleteTodo(id_todo, id_user)

            return res.status(200).json({
                status: 'success',
                message: 'success deleting data'
            })
        } else return res.status(500).json({
            status: 'failed',
            message: 'id not found'
        })
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            message: 'failed deleting data'
        })
    }
}

module.exports = {
    createTodo,
    viewAll,
    viewTodo,
    update,
    deleteTask
}