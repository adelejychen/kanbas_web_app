import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    // 定义模式字段
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: String,
    dob: Date,
    role: {
        type: String,
        enum: ["STUDENT", "FACULTY", "ADMIN", "USER"],
        default: "USER"
    },

// ...其他字段
}, {collection: "users"});

const User = mongoose.model('User', userSchema);

export default User;
