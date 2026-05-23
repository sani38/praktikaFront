import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const USERS = [
    {
        login: "student",
        password: "123456",
        role: "student",
        redirect: "/student",
    },
    {
        login: "employer",
        password: "123456",
        role: "employer",
        redirect: "/employer",
    },
    {
        login: "career",
        password: "123456",
        role: "career",
        redirect: "/career",
    },
    {
        login: "admin",
        password: "123456",
        role: "admin",
        redirect: "/admin",
    },
];

export default function LoginPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        login: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = USERS.find(
            (item) =>
                item.login === form.login &&
                item.password === form.password
        );

        if (!user) {
            setError("Неверный логин или пароль");
            return;
        }

        localStorage.setItem(
            "authUser",
            JSON.stringify({
                login: user.login,
                role: user.role,
            })
        );

        navigate(user.redirect);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    Вход в систему
                </h1>

                <p className="text-slate-500 mb-8">
                    Система управления студенческой практикой
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Логин
                        </label>

                        <input
                            type="text"
                            name="login"
                            value={form.login}
                            onChange={handleChange}
                            placeholder="Введите логин"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Пароль
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Введите пароль"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    {error && (
                        <div className="rounded-xl bg-red-100 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Войти
                    </button>
                </form>

                <div className="mt-8 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
                    <p className="font-semibold mb-2">Тестовые аккаунты:</p>

                    <ul className="space-y-1">
                        <li>student / 123456</li>
                        <li>employer / 123456</li>
                        <li>career / 123456</li>
                        <li>admin / 123456</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
