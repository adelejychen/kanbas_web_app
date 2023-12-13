import User from '../models/User.js';


// 获取所有用户
export const getAllUsers = async (req, res) => {
    // ...实现函数体
    try {
        const users = await User.find(); // 使用 Mongoose 的 find 方法获取所有用户
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 创建用户
export const createUser = async (req, res) => {
    // ...实现函数体
    const newUser = new User(req.body); // 创建一个新 User 实例
    try {
        const savedUser = await newUser.save(); // 保存用户到数据库
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 根据用户 ID 查找用户
export const findUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 根据用户名查找用户
export const findUserByUsername = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 根据用户名和密码查找用户
export const findUserByCredentials = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username, password: req.body.password });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 更新用户信息
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.updateOne({ _id: req.params.userId }, { $set: req.body });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 删除用户
export const deleteUser = async (req, res) => {
    try {
        const result = await User.deleteOne({ _id: req.params.userId });
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
