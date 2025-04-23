import React, { useState } from "react";
import { registerUser } from "../api";

function Register() {
    const [role, setRole] = useState("student");
    const [form, setForm] = useState({ id: "", name: "", email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await registerUser(role, form);
        alert("Registered!");
    };

    return (
        <div>
            <h2>Register</h2>
            <select onChange={(e) => setRole(e.target.value)}>
                <option value="student">Student</option>
                <option value="staff">Staff</option>
            </select>
            <form onSubmit={handleSubmit}>
                {["id", "name", "email", "password"].map((field) => (
                    <input
                        key={field}
                        placeholder={field}
                        value={form[field]}
                        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                        required
                    />
                ))}
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
