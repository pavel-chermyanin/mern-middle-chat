const express = require('express');
const app = express();
const cors = require('cors')
const userRoutes = require('./routes/userRoutes.js')

const rooms = ['general', 'tech', 'finance', 'crypto'];
// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

// Rotes
app.use('/users',userRoutes)
// connect DB
require('./connection')

// create server
const server = require('http').createServer(app);
const PORT = 5001;

//connect socket
const io  = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

server.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
})