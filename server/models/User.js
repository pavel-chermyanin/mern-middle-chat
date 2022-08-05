const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Cant't be blank"]
        },
        email: {
            type: String,
            lowercase: true,
            required: [true, "Cant't be blank"],
            unique: true,
            index: true,
            validate: [isEmail, "invalid email"]
        },
        password: {
            type: String,
            required: [true, "Cant't be blank"]
        },
        picture: {
            type: String,
        },
        newMessages: {
            type: Object,
            default: {}
        },
        status: {
            type: String,
            default: 'online'
        }

    }, {minimize: false}
)

// прежде чем сохранить user в DB 
// захешируй пароль сохрани в поле password
// и верни управление
UserSchema.pre('save', function(next) {
    const user = this
    if(!user.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err)

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
})

// извлечь пароль из user и отдать client
UserSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    return userObject
}

// проверить email и password и вернуть client
UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user) throw new Error('invalid email or password')

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) throw new Error('invalid email or password')
    return user
}

const User = mongoose.model('User', UserSchema)

module.exports = User