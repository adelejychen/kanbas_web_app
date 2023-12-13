import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {BsFillCheckCircleFill, BsPencil, BsTrash, BsPlusCircleFill } from "react-icons/bs";
import * as client from "./client";

function Admin() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [showAddUser, setShowAddUser] = useState(false);
    const [newUser, setNewUser] = useState({ username: "", password: "", firstName: "", lastName: "", role: "USER" });

    // 检查用户是否为管理员
    useEffect(() => {
        const checkAdmin = async () => {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                throw new Error("User not found");
            }
            const account = await client.findUserById(userId);
            if (account.role !== 'ADMIN') {
                navigate("/project/signin");
            } else {
                fetchAllUsers();
            }
        };
        checkAdmin();
    }, [navigate]);

    // 获取所有用户
    const fetchAllUsers = async () => {
        const users = await client.users();
        setUsers(users);
    };

    // 处理用户信息的编辑
    const startEditing = (user) => {
        setEditingUser({ ...user });
    };

    // 处理用户信息的更改
    const handleEditChange = (event, field) => {
        setEditingUser({ ...editingUser, [field]: event.target.value });
    };

    // 保存用户信息
    const saveUser = async () => {
        await client.updateUser(editingUser);
        setEditingUser(null);
        fetchAllUsers();
    };
    // 删除用户
    const deleteUser = async (userId) => {
        // 删除之前进行一次判断
        const flag = window.confirm("are you delete item");
        if(flag){
            await client.deleteUser(userId);
            fetchAllUsers();
        }

    };
    // 创建新用户
    // 创建新用户
    const createNewUser = async () => {
        await client.createUser(newUser);
        setNewUser({ username: "", password: "", firstName: "", lastName: "", role: "USER" });
        setShowAddUser(false);
        fetchAllUsers();
    };
    return (
        <div>
            <h1>Admin</h1>
            <button onClick={() => setShowAddUser(true)}>
                <BsPlusCircleFill /> Add User
            </button>
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>dob</th>
                        <th>role</th>
                        <th>Actions</th>
                    </tr>
                    {showAddUser && (
                        <tr>
                            <td><input value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} /></td>
                            <td><input value={newUser.password} type="password" onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} /></td>
                            <td><input value={newUser.firstName} onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} /></td>
                            <td><input value={newUser.lastName} onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} /></td>
                            <td><input value={newUser.dob} onChange={(e) => setNewUser({ ...newUser, dob: e.target.value })} /></td>

                            <td>
                                <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                                    <option value="USER">User</option>
                                    <option value="ADMIN">Admin</option>
                                    <option value="FACULTY">Faculty</option>
                                    <option value="STUDENT">Student</option>
                                </select>
                            </td>
                            <td>
                                <BsFillCheckCircleFill onClick={createNewUser} />
                            {/*    取消 */}
                                <BsTrash onClick={() => setShowAddUser(false)} />
                            </td>
                        </tr>
                    )}
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>
                                {editingUser && editingUser._id === user._id ? (
                                    <input
                                        value={editingUser.username}
                                        onChange={(e) => handleEditChange(e, 'username')}
                                    />
                                ) : (
                                    user.username
                                )}
                            </td>
                            <td>
                                {editingUser && editingUser._id === user._id ? (
                                    <input
                                        value={editingUser.password}
                                        onChange={(e) => handleEditChange(e, 'username')}
                                    />
                                ) : (
                                    user.password
                                )}
                            </td>

                            <td>
                                {editingUser && editingUser._id === user._id ? (
                                    <input
                                        value={editingUser.firstName}
                                        onChange={(e) => handleEditChange(e, 'username')}
                                    />
                                ) : (
                                    user.firstName
                                )}
                            </td>
                            <td>
                                {editingUser && editingUser._id === user._id ? (
                                    <input
                                        value={editingUser.lastName}
                                        onChange={(e) => handleEditChange(e, 'username')}
                                    />
                                ) : (
                                    user.lastName
                                )}
                            </td>
                            <td>
                                {editingUser && editingUser._id === user._id ? (
                                    <input
                                        value={editingUser.dob}
                                        onChange={(e) => handleEditChange(e, 'username')}
                                    />
                                ) : (
                                    user.dob
                                )}
                            </td>

                            <td>
                                {editingUser && editingUser._id === user._id ? (
                                    <select name="" id=""  onChange={(e) => handleEditChange(e, 'role')}>
                                        <option value="user">user</option>
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="Faculty">Faculty </option>
                                        <option value="Student">Student</option>
                                    </select>

                                ) : (
                                    user.role
                                )}
                            </td>
                            <td>
                                {editingUser && editingUser._id === user._id ? (
                                    <BsFillCheckCircleFill onClick={saveUser} />
                                ) : (
                                    <>
                                    <BsPencil onClick={() => startEditing(user)} />

                                    <BsTrash onClick={() => deleteUser(user._id)} />
                                    </>
                                )}


                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Admin;
