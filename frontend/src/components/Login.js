import React, { useState } from "react";
import { loginUser } from "../api";

function Login({ setIsLoggedIn }) {
    const [role, setRole] = useState("student");
    const [form, setForm] = useState({ id: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await loginUser(role, form);
        if (res.token) {
            alert("Login Successful");
            setIsLoggedIn(true);
        } else {
            alert("Login Failed");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <select onChange={(e) => setRole(e.target.value)}>
                <option value="student">Student</option>
                <option value="staff">Staff</option>
            </select>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="ID"
                    value={form.id}
                    onChange={(e) => setForm({ ...form, id: e.target.value })}
                    required
                />
                <input
                    placeholder="Password"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
