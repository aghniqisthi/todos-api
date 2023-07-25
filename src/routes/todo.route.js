const express = require('express');
const todoController = require('../controllers/todo.controller');
const router = express.Router();
const passport = require('passport');

router.post('/create', passport.authenticate('jwt', {session:false}), todoController.createTodo);
router.get('/view', passport.authenticate('jwt', {session:false}), todoController.viewAll)
router.get('/view/:id', passport.authenticate('jwt', {session:false}), todoController.viewTodo)
router.put('/edit/:id', passport.authenticate('jwt', {session:false}), todoController.update);
router.delete('/delete/:id', passport.authenticate('jwt', {session:false}), todoController.deleteTask)

module.exports = router