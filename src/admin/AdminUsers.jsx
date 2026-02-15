import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    const user = JSON.parse(localStorage.getItem("anik_user"));

    const fetchUsers = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users`,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        setUsers(data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        await axios.delete(
            `${import.meta.env.VITE_API_URL}/api/users/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        fetchUsers();
    };

    const updateRole = async (id, role) => {
        await axios.put(
            `${import.meta.env.VITE_API_URL}/api/users/${id}/role`,
            { role },
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        fetchUsers();
    };

    return (
        <AdminLayout>

            <div className="mb-10">
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-wide mb-2">
                    Users Management
                </h1>
                <p className="text-gray-400 text-sm">
                    Manage user accounts and permissions.
                </p>
            </div>

            {/* DESKTOP */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-300">
                    <thead className="border-b border-white/10 text-xs uppercase tracking-widest text-gray-400">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Joined</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((u, index) => (
                            <motion.tr
                                key={u._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="border-b border-white/5 hover:bg-white/5 transition"
                            >
                                <td className="px-6 py-4 font-medium">
                                    {u.name}
                                </td>

                                <td className="px-6 py-4">
                                    {u.email}
                                </td>

                                <td className="px-6 py-4">
                                    <select
                                        value={u.role}
                                        onChange={(e) =>
                                            updateRole(u._id, e.target.value)
                                        }
                                        className="bg-black/40 border border-white/10 rounded px-3 py-2 text-xs"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>

                                <td className="px-6 py-4 text-gray-400 text-xs">
                                    {new Date(u.createdAt).toLocaleDateString()}
                                </td>

                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => deleteUser(u._id)}
                                        className="text-red-400 hover:text-red-500 transition"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MOBILE */}
            <div className="lg:hidden space-y-6">
                {users.map((u) => (
                    <div
                        key={u._id}
                        className="p-6 border border-white/10 rounded-xl"
                    >
                        <h3 className="font-medium mb-2">{u.name}</h3>
                        <p className="text-xs text-gray-400 mb-3">
                            {u.email}
                        </p>

                        <div className="flex justify-between items-center">
                            <select
                                value={u.role}
                                onChange={(e) =>
                                    updateRole(u._id, e.target.value)
                                }
                                className="bg-black/40 border border-white/10 rounded px-3 py-2 text-xs"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>

                            <button
                                onClick={() => deleteUser(u._id)}
                                className="text-red-400"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </AdminLayout>
    );
};

export default AdminUsers;
