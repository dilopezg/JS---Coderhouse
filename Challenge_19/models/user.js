import mongoose from 'mongoose'
const Schema = mongoose.Schema

const user = new Schema({
    password: { type: String, require: true },
    email: { type: String, require: true, unique: true, index: true, validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/},
}, { timestamps: true })


const User= mongoose.model('User', user)
export default User
