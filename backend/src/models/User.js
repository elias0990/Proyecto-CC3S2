const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            pass: String,
            correo: String,
            direccion:String,
            nombre:String,
            apellido:String,
        }
    }, {
        timestamps: true
    });

module.exports = model('User', userSchema);