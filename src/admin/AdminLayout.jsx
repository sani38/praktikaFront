import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { IconUser } from "./ui/AdminUi.jsx";
import AuthProfileMenu from "../auth/AuthProfileMenu.jsx";

function Header() {
    return (
        <header className="w-full border-b border-black/5 bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <Link to="/admin" className="inline-flex items-center">
                    <img src="/logo.png" alt="Satbayev University" className="h-12 w-auto object-contain" />
                </Link>

                <div className="flex items-center gap-3">
                    <AuthProfileMenu />

                    {/* <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg border border-[#1677ff] bg-white px-3 py-2 text-[12px] font-medium text-black/70 hover:bg-black/5 transition"
                    >
                        <span>Рус</span>
                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                            <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button> */}
                </div>
            </div>
        </header>
    );
}

function AdminNav() {
    const base = "px-2 py-3 text-[12px] text-black/45 hover:text-black/70 transition relative";
    const active =
        "text-[#1677ff] after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-[1px] after:h-[2px] after:bg-[#1677ff]";

    return (
        <div className="w-full border-b border-black/5 bg-white">
            <div className="mx-auto max-w-6xl px-6">
                <nav className="flex items-center justify-center gap-24">
                    <NavLink to="/admin/users" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
                        Пользователи
                    </NavLink>
                    <NavLink to="/admin/approvals" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
                        Подтвержденные регистрации
                    </NavLink>
                    <NavLink to="/admin/logs" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
                        Логи системы
                    </NavLink>
                    <NavLink to="/admin/settings" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
                        Настройки
                    </NavLink>
                </nav>
            </div>
        </div>
    );
}

function Footer() {
    return (
        <footer className="w-full border-t border-black/5 bg-white">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid grid-cols-12 gap-6 py-12">
                    <div className="col-span-12 md:col-span-5">
                        <div className="text-[20px] font-semibold text-black/80">Практика</div>
                        <p className="mt-4 max-w-md text-[12px] leading-6 text-black/45">
                            Единый портал практики и стажировок для студентов и выпускников в Казахстане.
                        </p>
                    </div>

                    <div className="col-span-12 md:col-span-2">
                        <div className="text-[12px] font-semibold text-black/70">Практика</div>
                        <ul className="mt-4 space-y-2 text-[12px] text-black/45">
                            <li><a href="#" className="hover:text-black/70 transition">Найти практику</a></li>
                            <li><a href="#" className="hover:text-black/70 transition">Советы по составлению резюме</a></li>
                            <li><a href="#" className="hover:text-black/70 transition">Подготовка к собеседованию</a></li>
                            <li><a href="#" className="hover:text-black/70 transition">Истории успеха</a></li>
                            <li><a href="#" className="hover:text-black/70 transition">Блог</a></li>
                        </ul>
                    </div>

                    <div className="col-span-12 md:col-span-2">
                        <div className="text-[12px] font-semibold text-black/70">Для компаний</div>
                        <ul className="mt-4 space-y-2 text-[12px] text-black/45">
                            <li><a href="#" className="hover:text-black/70 transition">Разместить вакансию</a></li>
                            <li><a href="#" className="hover:text-black/70 transition">Поиск кандидатов</a></li>
                            <li><a href="#" className="hover:text-black/70 transition">Брендинг работодателя</a></li>
                            <li><a href="#" className="hover:text-black/70 transition">Партнёрская программа</a></li>
                            <li><a href="#" className="hover:text-black/70 transition">Тарифы</a></li>
                        </ul>
                    </div>

                    <div className="col-span-12 md:col-span-3">
                        <div className="text-[12px] font-semibold text-black/70">Контакты</div>
                        <div className="mt-4 space-y-2 text-[12px] text-black/45">
                            <div>г. Алматы</div>
                            <a href="mailto:info@praktika.kz" className="block hover:text-black/70 transition">info@praktika.kz</a>
                            <a href="tel:+77172123456" className="block hover:text-black/70 transition">+7 (7172) 12-34-56</a>
                            <div className="pt-2"><a href="#" className="hover:text-black/70 transition">Свяжитесь с нами</a></div>
                            <div><a href="#" className="hover:text-black/70 transition">Вопросы и ответы</a></div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-black/5 py-6 md:flex-row md:items-center md:justify-between">
                    <div className="text-[12px] text-black/40">© 2025 Практика. Все права защищены.</div>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-black/40">
                        <a href="#" className="hover:text-black/70 transition">Условия использования</a>
                        <a href="#" className="hover:text-black/70 transition">Политика конфиденциальности</a>
                        <a href="#" className="hover:text-black/70 transition">Карта сайта</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default function AdminLayout() {
    return (
        <div className="min-h-screen bg-[#f6f7fb]">
            <Header />
            <AdminNav />
            <main className="mx-auto max-w-6xl px-6">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
