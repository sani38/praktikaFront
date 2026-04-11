import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
    return (
        <header className="w-full border-b border-black/5 bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <div className="text-[14px] text-black/70">Лого</div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#f1f5ff] px-3 py-2 text-[12px] font-medium text-[#1f66ff] hover:bg-[#e9f0ff] transition"
                    >
                        <span className="inline-flex h-4 w-4 items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                                <path d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-1c0-2.761-3.582-5-8-5z" />
                            </svg>
                        </span>
                        <span>Вход / Регистрация</span>
                    </button>

                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg border border-[#1677ff] bg-white px-3 py-2 text-[12px] font-medium text-black/70 hover:bg-black/5 transition"
                    >
                        <span>Рус</span>
                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                            <path
                                d="M7 10l5 5 5-5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}

function Card({ title, desc, onClick }) {
    return (
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="text-[14px] font-semibold text-black/80">{title}</div>
            <div className="mt-1 text-[12px] leading-5 text-black/45">{desc}</div>

            <div className="mt-4">
                <button
                    type="button"
                    onClick={onClick}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1677ff] px-4 py-2.5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                >
                    <span>Перейти</span>
                    <span className="inline-flex translate-x-0 transition group-hover:translate-x-0.5">→</span>
                </button>
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
                            <a href="mailto:info@praktika.kz" className="block hover:text-black/70 transition">
                                info@praktika.kz
                            </a>
                            <a href="tel:+77271234556" className="block hover:text-black/70 transition">
                                +7 (727) 12-34-56
                            </a>
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

export default function StudentCabinetPage() {
    const navigate = useNavigate();

    const cards = [
        { title: "Поиск практики", desc: "Найдите подходящую практику или стажировку", to: "/student/internships" },
        { title: "Мои заявки", desc: "Просмотр статуса поданных заявок на практику", to: "/student/applications" },
        { title: "Работодатели", desc: "Изучите компании, предлагающие практику", to: "/student/employers" },
        { title: "Мои договоры", desc: "Управление договорами на прохождение практики", to: "/student/contracts" },
        { title: "Создать резюме", desc: "Создайте и обновите ваше профессиональное резюме", to: "/student/resume" },
        { title: "Дневник практики", desc: "Ведите дневник практики и отмечайте посещаемость", to: "/student/diary" },
    ];

    return (
        <div className="min-h-screen bg-[#f6f7fb]">
            <Header />

            <main className="mx-auto max-w-6xl px-6">
                <div className="py-10">
                    <h1 className="text-[20px] font-semibold text-black/80">Личный кабинет студента</h1>

                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                        {cards.map((c) => (
                            <Card key={c.title} title={c.title} desc={c.desc} onClick={() => navigate(c.to)} />
                        ))}
                    </div>
                </div>

                <div className="h-8" />
            </main>

            <Footer />
        </div>
    );
}