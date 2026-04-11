//import React from "react";
//import { Outlet, Link } from "react-router-dom";

//function Header() {
//    return (
//        <header className="w-full bg-white">
//            <div className="mx-auto max-w-6xl px-6">
//                <div className="flex items-center justify-between py-4">
//                    <Link to="/" className="text-[14px] text-black/70 hover:text-black/80 transition">
//                        Лого
//                    </Link>

//                    <div className="flex items-center gap-3">
//                        <button
//                            type="button"
//                            className="inline-flex items-center gap-2 rounded-lg bg-[#f1f5ff] px-3 py-2 text-[12px] font-medium text-[#1f66ff] hover:bg-[#e9f0ff] transition"
//                        >
//                            <span className="inline-flex h-4 w-4 items-center justify-center">
//                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
//                                    <path d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-1c0-2.761-3.582-5-8-5z" />
//                                </svg>
//                            </span>
//                            <span>Вход / Регистрация</span>
//                        </button>

//                        <button
//                            type="button"
//                            className="inline-flex items-center gap-2 rounded-lg border border-[#1677ff] bg-white px-3 py-2 text-[12px] font-medium text-black/70 hover:bg-black/5 transition"
//                        >
//                            <span>Рус</span>
//                            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
//                                <path
//                                    d="M7 10l5 5 5-5"
//                                    stroke="currentColor"
//                                    strokeWidth="2"
//                                    strokeLinecap="round"
//                                    strokeLinejoin="round"
//                                />
//                            </svg>
//                        </button>
//                    </div>
//                </div>
//            </div>
//        </header>
//    );
//}

//function Footer() {
//    return (
//        <footer className="w-full bg-white">
//            <div className="mx-auto max-w-6xl px-6">
//                <div className="grid grid-cols-12 gap-6 py-12">
//                    <div className="col-span-12 md:col-span-5">
//                        <div className="text-[20px] font-semibold text-black/80">Практика</div>
//                        <p className="mt-4 max-w-md text-[12px] leading-6 text-black/45">
//                            Единый портал практики и стажировок для студентов и выпускников в Казахстане.
//                        </p>
//                    </div>

//                    <div className="col-span-12 md:col-span-2">
//                        <div className="text-[12px] font-semibold text-black/70">Практика</div>
//                        <ul className="mt-4 space-y-2 text-[12px] text-black/45">
//                            <li><a href="#" className="hover:text-black/70 transition">Найти практику</a></li>
//                            <li><a href="#" className="hover:text-black/70 transition">Советы по составлению резюме</a></li>
//                            <li><a href="#" className="hover:text-black/70 transition">Подготовка к собеседованию</a></li>
//                            <li><a href="#" className="hover:text-black/70 transition">Истории успеха</a></li>
//                            <li><a href="#" className="hover:text-black/70 transition">Блог</a></li>
//                        </ul>
//                    </div>

//                    <div className="col-span-12 md:col-span-2">
//                        <div className="text-[12px] font-semibold text-black/70">Для компаний</div>
//                        <ul className="mt-4 space-y-2 text-[12px] text-black/45">
//                            <li><a href="#" className="hover:text-black/70 transition">Разместить вакансию</a></li>
//                            <li><a href="#" className="hover:text-black/70 transition">Поиск кандидатов</a></li>
//                            <li><a href="#" className="hover:text-black/70 transition">Брендинг работодателя</a></li>
//                            <li><a href="#" className="hover:text-black/70 transition">Партнёрская программа</a></li>
//                            <li><a href="#" className="hover:text-black/70 transition">Тарифы</a></li>
//                        </ul>
//                    </div>

//                    <div className="col-span-12 md:col-span-3">
//                        <div className="text-[12px] font-semibold text-black/70">Контакты</div>
//                        <div className="mt-4 space-y-2 text-[12px] text-black/45">
//                            <div>г. Алматы</div>
//                            <a href="mailto:info@praktika.kz" className="block hover:text-black/70 transition">
//                                info@praktika.kz
//                            </a>
//                            <a href="tel:+77172123456" className="block hover:text-black/70 transition">
//                                +7 (7172) 12-34-56
//                            </a>
//                            <div className="pt-2"><a href="#" className="hover:text-black/70 transition">Свяжитесь с нами</a></div>
//                            <div><a href="#" className="hover:text-black/70 transition">Вопросы и ответы</a></div>
//                        </div>
//                    </div>
//                </div>

//                <div className="flex flex-col gap-3 border-t border-black/5 py-6 md:flex-row md:items-center md:justify-between">
//                    <div className="text-[12px] text-black/40">© 2025 Практика. Все права защищены.</div>
//                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-black/40">
//                        <a href="#" className="hover:text-black/70 transition">Условия использования</a>
//                        <a href="#" className="hover:text-black/70 transition">Политика конфиденциальности</a>
//                        <a href="#" className="hover:text-black/70 transition">Карта сайта</a>
//                    </div>
//                </div>
//            </div>
//        </footer>
//    );
//}

//export default function PublicLayout() {
//    return (
//        <div className="min-h-screen bg-white">
//            <Header />
//            <main className="mx-auto max-w-6xl px-6">
//                <Outlet />
//            </main>
//            <Footer />
//        </div>
//    );
//}



import React, { useMemo, useState } from "react";
import heroImg from "../assets/hero.jpg";
import { useNavigate } from "react-router-dom";

function Chip({ children, active, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`h-7 rounded-lg border px-3 text-[11px] transition ${active
                    ? "border-[#1677ff] bg-[#eef5ff] text-[#1677ff]"
                    : "border-black/10 bg-white text-black/55 hover:bg-black/5"
                }`}
        >
            {children}
        </button>
    );
}

function MiniFeature({ title, desc, icon }) {
    return (
        <div className="flex items-start gap-3 rounded-xl border border-black/5 bg-white px-4 py-3">
            <div className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#eef5ff] text-[#1677ff]">
                {icon}
            </div>
            <div>
                <div className="text-[11px] font-semibold text-black/70">{title}</div>
                <div className="mt-1 text-[10px] leading-5 text-black/45">{desc}</div>
            </div>
        </div>
    );
}

function BigStat({ title, value }) {
    return (
        <div className="rounded-2xl bg-[#1677ff] p-5 text-white">
            <div className="text-[11px] text-white/85">{title}</div>
            <div className="mt-2 text-[36px] font-semibold leading-none">{value}</div>
        </div>
    );
}

function Step({ n, title, desc }) {
    return (
        <div className="rounded-2xl bg-[#f3f7ff] p-5">
            <div className="text-[34px] font-semibold text-[#1677ff] leading-none">{n}</div>
            <div className="mt-2 text-[12px] font-semibold text-black/70">{title}</div>
            <div className="mt-1 text-[11px] leading-5 text-black/45">{desc}</div>
        </div>
    );
}

function OrangeTip() {
    return (
        <div className="rounded-2xl border border-[#ffb38a] bg-[#fff6f0] p-5">
            <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#ffe7d8] text-[#ff6b00]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V6h2v6z" />
                    </svg>
                </div>
                <div className="text-[11px] leading-5 text-[#ff6b00]">
                    Платформа уведомит тебя о статусе заявки и свяжет с ответственным представителем организации.
                </div>
            </div>
        </div>
    );
}

function AdvantageCard({ title, desc, icon, orange = false }) {
    return (
        <div className={`rounded-2xl p-5 ${orange ? "bg-[#fff6f0]" : "bg-[#f6f7fb]"}`}>
            <div
                className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${orange ? "bg-[#ffe7d8] text-[#ff6b00]" : "bg-[#eef5ff] text-[#1677ff]"
                    }`}
            >
                {icon}
            </div>
            <div className="mt-3 text-[12px] font-semibold text-black/70">{title}</div>
            <div className="mt-1 text-[11px] leading-5 text-black/45">{desc}</div>
        </div>
    );
}

function ReviewCard({ name, role, text }) {
    return (
        <div className="flex gap-4 rounded-2xl border border-black/5 bg-white p-5">
            <div className="h-14 w-14 rounded-xl bg-black/15" />
            <div className="min-w-0">
                <div className="text-[12px] font-semibold text-black/70">{name}</div>
                <div className="text-[11px] text-black/40">{role}</div>
                <div className="mt-3 text-[11px] leading-5 text-black/45">{text}</div>
            </div>
        </div>
    );
}

function VacancyCard({ company, title, city, duration, tag1, tag2 }) {
    return (
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="inline-flex rounded-full bg-[#eef5ff] px-3 py-1 text-[10px] font-semibold text-[#1677ff]">
                {company}
            </div>
            <div className="mt-3 text-[12px] font-semibold text-black/75">{title}</div>
            <div className="mt-3 flex items-center gap-3 text-[11px] text-[#1677ff]">
                <span className="inline-flex items-center gap-1">
                    <span className="h-4 w-4 inline-flex items-center justify-center">📍</span> {city}
                </span>
                <span className="inline-flex items-center gap-1">
                    <span className="h-4 w-4 inline-flex items-center justify-center">📅</span> {duration}
                </span>
            </div>
            <div className="mt-3 flex gap-2">
                <span className="rounded-full bg-[#f3f4f6] px-3 py-1 text-[10px] text-black/55">{tag1}</span>
                <span className="rounded-full bg-[#f3f4f6] px-3 py-1 text-[10px] text-black/55">{tag2}</span>
            </div>
        </div>
    );
}

function PartnerLogo({ label }) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-white p-6">
            <div className="h-10 w-10 rounded-lg bg-black/10" />
            <div className="text-[11px] text-black/45">{label}</div>
        </div>
    );
}

function DigitCard({ top, title, subtitle }) {
    return (
        <div className="rounded-2xl bg-[#2f8cff] p-5 text-white">
            <div className="text-[18px] font-semibold">{top}</div>
            <div className="mt-2 text-[12px] font-semibold">{title}</div>
            <div className="mt-1 text-[11px] text-white/85">{subtitle}</div>
        </div>
    );
}

function RegionCard({ img, city, count }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-black/5 bg-white">
            <div className="h-[120px] w-full">
                <img src={img} alt={city} className="h-full w-full object-cover" draggable="false" />
            </div>
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2 text-[11px] text-black/70">
                    <span className="text-[#1677ff]">📍</span> {city}
                </div>
                <div className="rounded-full bg-[#f3f4f6] px-3 py-1 text-[10px] text-black/55">
                    {count} вакансий
                </div>
            </div>
        </div>
    );
}

export default function PublicHomePage() {
    const navigate = useNavigate();

    const [query, setQuery] = useState("");
    const [activeChip, setActiveChip] = useState("Маркетинг");

    const chips = useMemo(
        () => ["Маркетинг", "IT и Разработка", "Финансы", "Инженерное дело", "Нефть и газ"],
        []
    );

    return (
        <div className="pb-12">
            {/* HERO */}
            <section className="grid grid-cols-1 items-stretch gap-10 py-10 md:grid-cols-12">
                <div className="md:col-span-6">
                    <h1 className="text-[44px] font-semibold leading-[1.05] text-black/85">
                        Найди свою базу
                        <br />
                        практики по
                        <br />
                        всему Казахстану
                    </h1>

                    <p className="mt-4 max-w-md text-[12px] leading-6 text-black/45">
                        Удобный и быстрый способ найти место для прохождения практики в компаниях,
                        государственных учреждениях и научных
                    </p>

                    <div className="mt-5 flex items-center gap-3">
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Какую практику вы ищете?"
                            className="h-10 w-full max-w-[360px] rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                        />
                        <button
                            type="button"
                            onClick={() => navigate("/student/internships")}
                            className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#1677ff] px-5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                        >
                            Поиск
                            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                                <path
                                    d="M21 21l-4.3-4.3m1.3-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {chips.map((c) => (
                            <Chip key={c} active={c === activeChip} onClick={() => setActiveChip(c)}>
                                {c}
                            </Chip>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/student/internships")}
                        className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#1677ff] bg-white px-4 py-2.5 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                    >
                        Найти базу практик <span aria-hidden="true">→</span>
                    </button>
                </div>

                <div className="md:col-span-6">
                    <div className="relative overflow-hidden rounded-3xl bg-[#2f8cff] p-6">
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20" />
                            <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20" />
                        </div>

                        <div className="relative flex min-h-[320px] items-end justify-center">
                            <img
                                src={heroImg}
                                alt="Студенты"
                                className="max-h-[340px] w-auto select-none"
                                draggable="false"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* О ПОРТАЛЕ */}
            <section className="rounded-3xl bg-[#f6f7fb] p-8">
                <div className="text-[14px] font-semibold text-black/75">О портале</div>
                <p className="mt-3 max-w-4xl text-[12px] leading-6 text-black/45">
                    Портал баз практики — это современная платформа, созданная для студентов и работодателей со всего Казахстана.
                    Здесь студенты легко находят актуальные предложения для прохождения производственной, преддипломной и других видов практики,
                    а организации — потенциальных стажёров, мотивированных развиваться в своей сфере.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-4">
                    <MiniFeature
                        title="Поиск базы практики"
                        desc="По городу, специальности и типу организации"
                        icon={
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                                <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
                            </svg>
                        }
                    />
                    <MiniFeature
                        title="Онлайн-подача заявки"
                        desc="На практику"
                        icon={
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                                <path d="M19 3H5a2 2 0 00-2 2v14l4-4h12a2 2 0 002-2V5a2 2 0 00-2-2z" />
                            </svg>
                        }
                    />
                    <MiniFeature
                        title="Информация о компании"
                        desc="Отзывы и требования"
                        icon={
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                                <path d="M3 4h18v4H3V4zm0 6h18v10H3V10zm4 2v6h10v-6H7z" />
                            </svg>
                        }
                    />
                    <MiniFeature
                        title="Прямое взаимодействие"
                        desc="С работодателем"
                        icon={
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                                <path d="M2 8a6 6 0 0110-4.472A6 6 0 1122 8c0 2.53-1.57 4.696-3.79 5.58L12 21l-6.21-7.42A5.99 5.99 0 012 8z" />
                            </svg>
                        }
                    />
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <BigStat title="Вакансий" value="10.265" />
                    <BigStat title="Новых вакансий" value="3.265" />
                    <BigStat title="Работодателей" value="8.365" />
                </div>

                {/* Как это работает */}
                <div className="mt-8">
                    <div className="text-[14px] font-semibold text-black/75">Как это работает?</div>
                    <div className="mt-1 text-[12px] text-black/45">Всё просто — 3 шага до успешной практики</div>

                    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-4">
                        <Step n={1} title="Зарегистрируйся" desc="Создай личный кабинет студента или организации" />
                        <Step n={2} title="Найди подходящую базу" desc="Фильтруй по городу, профилю, дате начала и типу практики" />
                        <Step n={3} title="Оформи заявку" desc="Откликнись на нужную базу через портал" />
                        <OrangeTip />
                    </div>
                </div>
            </section>

            {/* ПРЕИМУЩЕСТВА ДЛЯ СТУДЕНТОВ */}
            <section className="mt-8 rounded-3xl bg-[#f6f7fb] p-8">
                <div className="text-[14px] font-semibold text-black/75">Преимущества для студентов</div>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-5">
                    <AdvantageCard
                        title="Единая база"
                        desc="Проверенных организаций по всему Казахстану"
                        icon={<span className="text-[18px]">📚</span>}
                    />
                    <AdvantageCard
                        title="Прозрачные условия"
                        desc="Требования и сроки"
                        icon={<span className="text-[18px]">⏱️</span>}
                    />
                    <AdvantageCard
                        title="Прямой контакт"
                        desc="С работодателями"
                        icon={<span className="text-[18px]">🤝</span>}
                    />
                    <AdvantageCard
                        title="Удобный кабинет"
                        desc="И история заявок"
                        icon={<span className="text-[18px]">🗂️</span>}
                    />
                    <AdvantageCard
                        title="Выбор по профилю"
                        desc="Обучения"
                        icon={<span className="text-[18px]">🎓</span>}
                    />
                </div>

                <div className="mt-5 flex justify-end">
                    <button
                        type="button"
                        onClick={() => navigate("/student")}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#1677ff] px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                    >
                        Перейти на страницу практиканта <span aria-hidden="true">→</span>
                    </button>
                </div>

                {/* ПРЕИМУЩЕСТВА ДЛЯ ОРГАНИЗАЦИЙ */}
                <div className="mt-8 text-[14px] font-semibold text-black/75">Преимущества для организаций</div>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-5">
                    <AdvantageCard
                        orange
                        title="Бесплатное размещение"
                        desc="Базы практики"
                        icon={<span className="text-[18px]">📌</span>}
                    />
                    <AdvantageCard
                        orange
                        title="Доступ к пулу"
                        desc="Студентов ведущих вузов"
                        icon={<span className="text-[18px]">👥</span>}
                    />
                    <AdvantageCard
                        orange
                        title="Автоматизация"
                        desc="Система обработки заявок"
                        icon={<span className="text-[18px]">🧩</span>}
                    />
                    <AdvantageCard
                        orange
                        title="Узнаваемость"
                        desc="Компании среди молодежи"
                        icon={<span className="text-[18px]">📈</span>}
                    />
                    <AdvantageCard
                        orange
                        title="Отбор"
                        desc="Лучших кандидатов для трудоустройства"
                        icon={<span className="text-[18px]">⭐</span>}
                    />
                </div>

                <div className="mt-5 flex justify-end">
                    <button
                        type="button"
                        onClick={() => navigate("/employer")}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#1677ff] px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                    >
                        Перейти на страницу организации <span aria-hidden="true">→</span>
                    </button>
                </div>
            </section>

            {/* ОТЗЫВЫ */}
            <section className="mt-8 rounded-3xl bg-[#f6f7fb] p-8">
                <div className="text-[14px] font-semibold text-black/75">Отзывы</div>
                <div className="mt-1 text-[12px] text-black/45">
                    Возможность отбора лучших кандидатов для дальнейшего трудоустройства
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <ReviewCard
                        name="Амина"
                        role="Студентка 3 курса"
                        text="Благодаря порталу я прошла практику в ведущей IT-компании Алматы. Удобный поиск и оперативный отклик работодателя — это то, чего не хватало раньше!"
                    />
                    <ReviewCard
                        name="HR-менеджер"
                        role="TOO «TechLine»"
                        text="Мы нашли сразу троих практикантов через портал — удобно, быстро и без лишней бюрократии."
                    />
                </div>

                <div className="mt-5 flex items-center justify-center gap-3 text-black/40">
                    <button type="button" className="h-8 w-8 rounded-lg border border-black/10 bg-white hover:bg-black/5">
                        ←
                    </button>
                    <div className="flex gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#1677ff]" />
                        <span className="h-2 w-2 rounded-full bg-black/20" />
                        <span className="h-2 w-2 rounded-full bg-black/20" />
                        <span className="h-2 w-2 rounded-full bg-black/20" />
                        <span className="h-2 w-2 rounded-full bg-black/20" />
                    </div>
                    <button type="button" className="h-8 w-8 rounded-lg border border-black/10 bg-white hover:bg-black/5">
                        →
                    </button>
                </div>
            </section>

            {/* ПОПУЛЯРНЫЕ ПРАКТИКИ */}
            <section className="mt-8 rounded-3xl bg-[#f6f7fb] p-8">
                <div className="text-[14px] font-semibold text-black/75">Популярные практики</div>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <VacancyCard company="Казтехком" title="Стажер-аналитик данных" city="Астана" duration="3 месяца" tag1="tag" tag2="Стажировка" />
                    <VacancyCard company="Казтехком" title="Стажер-аналитик данных" city="Астана" duration="3 месяца" tag1="tag" tag2="Стажировка" />
                    <VacancyCard company="Казтехком" title="Стажер-аналитик данных" city="Астана" duration="3 месяца" tag1="tag" tag2="Стажировка" />
                    <VacancyCard company="Казтехком" title="Стажер-аналитик данных" city="Астана" duration="3 месяца" tag1="tag" tag2="Стажировка" />
                    <VacancyCard company="Казтехком" title="Стажер-аналитик данных" city="Астана" duration="3 месяца" tag1="tag" tag2="Стажировка" />
                    <VacancyCard company="Казтехком" title="Стажер-аналитик данных" city="Астана" duration="3 месяца" tag1="tag" tag2="Стажировка" />
                </div>
            </section>

            {/* ПАРТНЕРЫ */}
            <section className="mt-8 rounded-3xl bg-[#f6f7fb] p-8">
                <div className="text-[14px] font-semibold text-black/75">Работодатели партнеры</div>

                <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-7">
                    {Array.from({ length: 7 }, (_, i) => (
                        <PartnerLogo key={i} label="Казатомпром" />
                    ))}
                </div>

                <div className="mt-5 flex items-center justify-center gap-3 text-black/40">
                    <button type="button" className="h-8 w-8 rounded-lg border border-black/10 bg-white hover:bg-black/5">
                        ←
                    </button>
                    <div className="flex gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#1677ff]" />
                        <span className="h-2 w-2 rounded-full bg-black/20" />
                        <span className="h-2 w-2 rounded-full bg-black/20" />
                        <span className="h-2 w-2 rounded-full bg-black/20" />
                        <span className="h-2 w-2 rounded-full bg-black/20" />
                    </div>
                    <button type="button" className="h-8 w-8 rounded-lg border border-black/10 bg-white hover:bg-black/5">
                        →
                    </button>
                </div>
            </section>

            {/* ЦИФРЫ */}
            <section className="mt-8 rounded-3xl bg-[#f6f7fb] p-8">
                <div className="text-[14px] font-semibold text-black/75">ПрактикаKZ в цифрах</div>
                <div className="mt-1 text-[12px] text-black/45">Единый портал для студентов и работодателей</div>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-4">
                    <DigitCard top="5,000+" title="Доступных практик" subtitle="По всему Казахстану" />
                    <DigitCard top="1,200+" title="Компаний" subtitle="Предлагают стажировки" />
                    <DigitCard top="17" title="Регионов" subtitle="По всей стране" />
                    <DigitCard top="24/7" title="Поддержка" subtitle="Для студентов и компаний" />
                </div>

                {/* РЕГИОНЫ */}
                <div className="mt-8">
                    <div className="text-[14px] font-semibold text-black/75">Практика по регионам</div>
                    <div className="mt-1 text-[12px] text-black/45">
                        Выберите регион и найдите подходящую практику рядом с вами или в любом другом городе Казахстана
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <RegionCard img="/img/almaty.jpg" city="Алматы" count="1234" />
                        <RegionCard img="/img/astana.jpg" city="Астана" count="1234" />
                        <RegionCard img="/img/shymkent.jpg" city="Шымкент" count="1234" />
                        <RegionCard img="/img/karaganda.jpg" city="Караганда" count="1234" />
                        <RegionCard img="/img/atyrau.jpg" city="Атырау" count="1234" />
                        <RegionCard img="/img/aktau.jpg" city="Актау" count="1234" />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="mt-8 rounded-3xl bg-[#f6f7fb] p-8">
                <div className="text-[14px] font-semibold text-black/75">Вы представитель компании?</div>
                <p className="mt-2 max-w-3xl text-[12px] leading-6 text-black/45">
                    Разместите информацию о практике или стажировке и найдите талантливых молодых специалистов для своей компании.
                    Получите доступ к базе резюме студентов и выпускников ведущих вузов Казахстана.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                        type="button"
                        onClick={() => navigate("/employer/create")}
                        className="h-10 rounded-xl bg-[#1677ff] px-5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                    >
                        Разместить практику →
                    </button>

                    <button
                        type="button"
                        onClick={() => alert("Узнать больше (демо)")}
                        className="h-10 rounded-xl border border-[#1677ff] bg-white px-5 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                    >
                        Узнать больше
                    </button>
                </div>
            </section>

            <div className="h-10" />
        </div>
    );
}