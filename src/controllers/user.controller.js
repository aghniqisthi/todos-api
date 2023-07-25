const { status } = require('express/lib/response');
const userService = require('../services/user.service');
const jwt =  require('jsonwebtoken');
const { use } = require('passport');

const register = async(req, res) => {
    const { body } = req;

    if(!body.username || !body.email || !body.password){
        return res.status(400).json({
            status: 'failed',
            message: 'data empty'
        });
    }

    try{
        const user = await userService.getUserByEmail(body.email);

        if(user[0][0]) {
            return res.status(409).json({
                status: 'failed',
                message: 'Email already registered'
            })
        }

        await userService.register(body);
        
        // if(user == false) error;
    
        return res.status(201).json({
            status: 'success',
            message: 'Storing Data Success!',
            data: body
        })    

    } catch(error){
        console.log(error)
        return res.status(500).json({
            status: 'failed',
            message: 'Failed Storing Data'
        })
    }
}

const login = async(req, res) => {
    const { body } = req;

    if(!body.email || !body.password){
        return res.status(400).json({
            status: 'failed',
            message: 'email and password empty'
        });
    }

    try {
        const user = await userService.login(body)
        console.log(user)

        if(!user){
            return res.status(400).json({
                status: 'failed',
                message: 'wrong email or password'
            })
        }

        const dataUser = user[0][0]
        const jwtToken = jwt.sign(
            {id:dataUser.id, email: dataUser.email}, process.env.JWT_SECRET
        )

        //status default 200 (ok) jadi diisi 200 gpp gadiisi jg gpp
        return res.status(200).json({
            status: "success",
            message: "login success!",
            token: jwtToken,
            data: dataUser
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "failed",
            message: "login failed"
        })
    }
}

const update = async (req, res) => {
    const id = req.user[0][0].id;
    const {body} = req;

    // console.log(`${id}, ${body.email}`)
    if(!body.username || !body.email || !body.password){
        return res.status(400).json({
            status: 'failed',
            message: 'data empty'
        });
    }

    try{
        const user = await userService.update(id, body);

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

const viewUser = async (req, res) => {
    try {
        const [user] = await userService.viewUser()
        return res.status(200).json({
            status: 'success',
            message: 'viewing data success',
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            message: 'failed showing data'
        })
    }
}

const deleteUser = async(req, res) => {
    try {
        if(req.user[0][0] == undefined) error
        
        const id = req.user[0][0].id;
        const user = await userService.getUserById(id)
        console.log(user)

        if(user[0][0] !=null){
            await userService.deleteUser(id)

            // statusnya bisa 200 (OK) atau 204 (No Content)
            // return res.status(204)
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

module.exports = {register, login, update, viewUser, deleteUser}