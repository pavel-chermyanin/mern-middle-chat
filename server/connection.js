const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.g6hue.mongodb.net/${process.env.DB_USER}?retryWrites=true&w=majority`,
    () => console.log('mongoose connected!')
    )
