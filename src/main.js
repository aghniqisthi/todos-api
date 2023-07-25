require('dotenv').config() //bakal dipake semua librarynya

const express = require('express');
const userRouter = require('./routes/user.route')
const todoRouter = require('./routes/todo.route')

require('./middleware/passport')

const app = express();
// const PORT = 5000;
const PORT = process.env.PORT //|| 5000

app.use(express.json());
app.use('/user', userRouter);
app.use('/todo', todoRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

//  http://localhost:5000/
