const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();
const passport = require('passport');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/edit', passport.authenticate('jwt', {session:false}), userController.update);
router.get('/view', passport.authenticate('jwt', {session:false}), userController.viewUser)
router.delete('/delete', passport.authenticate('jwt', {session:false}), userController.deleteUser)

module.exports = router

