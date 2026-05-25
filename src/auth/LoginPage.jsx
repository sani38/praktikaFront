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
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("https://localhost:7149/api/Access/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                }),
            });

            if (!response.ok) {
                setError("Неверная почта или пароль");
                return;
            }

            const data = await response.json();

            localStorage.setItem("token", data.token);
            localStorage.setItem("roleCode", data.roleCode);

            if (data.roleCode === "admin") {
                navigate("/admin");
            } else if (data.roleCode === "student") {
                navigate("/student");
            } else if (data.roleCode === "employer") {
                navigate("/employer");
            } else if (data.roleCode === "university_staff") {
                navigate("/career");
            } else {
                navigate("/");
            }
        } catch {
            setError("Ошибка сервера");
        }
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
                            Почта
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Введите почту"
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

                {/*<div className="mt-8 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">*/}
                {/*    <p className="font-semibold mb-2">Тестовые аккаунты:</p>*/}

                {/*    <ul className="space-y-1">*/}
                {/*        <li>student / 123456</li>*/}
                {/*        <li>employer / 123456</li>*/}
                {/*        <li>career / 123456</li>*/}
                {/*        <li>admin / 123456</li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}
