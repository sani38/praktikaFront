import React, { useMemo, useState } from "react";
import { Pill, IconPin, IconClock, IconMoney } from "../ui/CareerUi.jsx";

function Select({ value, onChange, children }) {
    return (
        <select
            value={value}
            onChange={onChange}
            className="h-9 rounded-xl border border-black/10 bg-white px-3 text-[12px] text-black/60 outline-none focus:border-[#1677ff]"
        >
            {children}
        </select>
    );
}

function MiniStat({ label, value }) {
    return (
        <div className="rounded-2xl border border-black/5 bg-[#f6f7fb] p-4">
            <div className="text-[11px] text-black/45">{label}</div>
            <div className="mt-2 text-[16px] font-semibold text-[#1677ff]">{value}</div>
        </div>
    );
}

function EmployerCard({ e }) {
    return (
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-between gap-3">
                <Pill variant="blue">{e.category}</Pill>
                <Pill variant={e.statusVariant}>{e.status}</Pill>
            </div>

            <div className="mt-3 text-[14px] font-semibold text-black/80">{e.name}</div>

            <div className="mt-2 flex flex-wrap gap-2">
                {e.tags.map((t) => (
                    <Pill key={t} variant="gray">{t}</Pill>
                ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
                <MiniStat label="Вакансий" value={e.vacancies} />
                <MiniStat label="Студентов" value={e.students} />
                <MiniStat label="Практик" value={e.practices} />
            </div>

            <div className="mt-4 rounded-2xl bg-[#f6f7fb] p-4">
                <div className="text-[11px] text-black/40">Контактное лицо:</div>
                <div className="mt-1 text-[12px] text-black/60">{e.contact}</div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-[12px] text-[#1677ff]">
                <span className="inline-flex items-center gap-2"><IconPin /> {e.city}</span>
                <span className="inline-flex items-center gap-2"><IconClock /> {e.duration}</span>
                <span className="inline-flex items-center gap-2"><IconMoney /> {e.salary}</span>
                <span className="inline-flex items-center gap-2">🕘 {e.format}</span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
                <div className="text-[11px] text-black/35">Создано: {e.created}</div>
                <button
                    type="button"
                    className="h-9 rounded-xl border border-[#1677ff] bg-white px-4 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                >
                    Подробнее
                </button>
            </div>
        </div>
    );
}

export default function CareerEmployersPage() {
    const [q, setQ] = useState("");
    const [industry, setIndustry] = useState("Все отрасли");
    const [city, setCity] = useState("Все города");
    const [status, setStatus] = useState("Все статусы");

    const data = useMemo(() => [
        {
            id: 1,
            category: "IT-сервис",
            status: "На модерации",
            statusVariant: "blue",
            name: "TechVision LLP",
            tags: ["IT", "Программирование"],
            vacancies: 3, students: 3, practices: 3,
            contact: "Дана Алмазхан, +7 701 565-88-33",
            city: "Алматы",
            duration: "3 месяца",
            salary: "По договоренности",
            format: "Полный рабочий день",
            created: "19.05.2025",
        },
        {
            id: 2,
            category: "Консалтинг",
            status: "На модерации",
            statusVariant: "blue",
            name: "Insight Consulting",
            tags: ["Business", "Анализ данных"],
            vacancies: 3, students: 3, practices: 3,
            contact: "Ирина Петрова",
            city: "Нур-Султан",
            duration: "4 месяца",
            salary: "100 000 ₸",
            format: "Частичная занятость",
            created: "15.06.2025",
        },
        {
            id: 3,
            category: "Маркетинг",
            status: "Активен",
            statusVariant: "green",
            name: "Creative Minds",
            tags: ["Marketing", "Социальные сети"],
            vacancies: 3, students: 3, practices: 3,
            contact: "Алексей Смирнов",
            city: "Шымкент",
            duration: "1 месяц",
            salary: "150 000 ₸",
            format: "Полный рабочий день",
            created: "22.06.2025",
        },
        {
            id: 4,
            category: "Дизайн",
            status: "Активен",
            statusVariant: "green",
            name: "Artistic Touch",
            tags: ["Design", "Графический дизайн"],
            vacancies: 3, students: 3, practices: 3,
            contact: "Евгения Лукина",
            city: "Алматы",
            duration: "2 месяца",
            salary: "По договоренности",
            format: "Частичная занятость",
            created: "01.07.2025",
        },
    ], []);

    const filtered = useMemo(() => {
        const qq = q.trim().toLowerCase();
        return data.filter((x) => !qq || x.name.toLowerCase().includes(qq));
    }, [q, data]);

    const reset = () => {
        setIndustry("Все отрасли");
        setCity("Все города");
        setStatus("Все статусы");
    };

    return (
        <div className="py-10">
            <div className="text-[12px] text-[#1677ff]">Работодатели</div>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-[20px] font-semibold text-black/80">Работодатели</h1>
                    <div className="mt-1 text-[12px] text-black/45">Всего работодателей: 128</div>
                </div>

                <button
                    type="button"
                    className="h-10 rounded-xl bg-[#1677ff] px-5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                >
                    Добавить работодателя <span className="ml-2">＋</span>
                </button>
            </div>

            <div className="mt-5 flex items-center gap-3">
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Найти работодателя"
                    className="h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                />
                <button
                    type="button"
                    className="h-10 rounded-xl bg-[#1677ff] px-5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                >
                    Поиск
                </button>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[12px] font-semibold text-black/60">
                <span className="text-black/50">⚑</span> Фильтры
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
                <Select value={industry} onChange={(e) => setIndustry(e.target.value)}>
                    <option>Все отрасли</option>
                    <option>IT</option>
                    <option>Маркетинг</option>
                    <option>Образование</option>
                </Select>

                <Select value={city} onChange={(e) => setCity(e.target.value)}>
                    <option>Все города</option>
                    <option>Алматы</option>
                    <option>Астана</option>
                    <option>Шымкент</option>
                    <option>Павлодар</option>
                </Select>

                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option>Все статусы</option>
                    <option>Активен</option>
                    <option>На модерации</option>
                </Select>

                <button
                    type="button"
                    onClick={reset}
                    className="h-9 rounded-xl border border-black/10 bg-white px-4 text-[12px] font-semibold text-black/60 hover:bg-black/5 transition"
                >
                    Сбросить <span className="ml-2">×</span>
                </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {filtered.map((e) => (
                    <EmployerCard key={e.id} e={e} />
                ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-[12px] text-black/45">
                <button className="h-8 w-8 rounded-lg border border-black/10 bg-white hover:bg-black/5">←</button>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1677ff] text-white">1</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white">2</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white">3</span>
                <span className="px-2">…</span>
                <span className="flex h-8 items-center rounded-lg border border-black/10 bg-white px-3">123</span>
                <button className="h-8 w-8 rounded-lg border border-black/10 bg-white hover:bg-black/5">→</button>
            </div>

            <div className="h-10" />
        </div>
    );
}