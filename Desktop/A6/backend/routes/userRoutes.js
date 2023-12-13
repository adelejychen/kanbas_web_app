import express from 'express';
const router = express.Router();

// TODO: 导入你的控制器方法
 import {  createUser,
  getAllUsers,
  findUserById ,
  findUserByUsername,
  findUserByCredentials,
  updateUser,
  deleteUser} from '../controllers/userController.js';

// 定义路由
router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:userId', findUserById);
router.get('/username/:username', findUserByUsername);
router.post('/credentials', findUserByCredentials);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);



export default router;
