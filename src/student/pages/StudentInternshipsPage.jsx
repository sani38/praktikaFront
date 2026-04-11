import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { internships } from "../data/internships.js";
import { Pill, Pagination, IconPin, IconCalendar, IconClock, IconBriefcase } from "../ui/Ui.jsx";

function Select({ value, onChange, children, w = "min-w-[92px]" }) {
    return (
        <select
            value={value}
            onChange={onChange}
            className={`h-9 ${w} rounded-lg border border-black/10 bg-white px-3 text-[12px] text-black/60 outline-none focus:border-[#1677ff]`}
        >
            {children}
        </select>
    );
}

function InternshipCard({ x, onOpen }) {
    const statusVariant = x.status === "Опубликовано" ? "green" : "blue";

    return (
        <div
            className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)] cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition"
            onClick={onOpen}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" ? onOpen() : null)}
        >
            <div className="flex items-start justify-between gap-4">
                <Pill variant="blue">{x.company}</Pill>
                <Pill variant={statusVariant}>{x.status}</Pill>
            </div>

            <div className="mt-3 text-[16px] font-semibold text-black/80">{x.title}</div>

            <div className="mt-2 flex flex-wrap gap-2">
                {x.tagsTop.map((t) => (
                    <Pill key={t} variant="outline">
                        {t}
                    </Pill>
                ))}
            </div>

            <div className="mt-4 text-[12px] leading-6 text-black/55">{x.shortDesc}</div>

            <div className="mt-4 rounded-xl bg-black/[0.03] p-4">
                <div className="text-[11px] font-semibold text-black/55">{x.requirementsTitle}</div>
                <div className="mt-1 text-[11px] leading-5 text-black/45">{x.requirementsText}</div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-[#1677ff]">
                <span className="inline-flex items-center gap-1.5">
                    <IconPin /> {x.city}
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <IconCalendar /> {x.duration}
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <IconClock /> {x.pay}
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <IconBriefcase /> {x.schedule}
                </span>
            </div>

            <div className="mt-4 text-[11px] text-black/35">Дата размещения: {x.date}</div>

            <div className="mt-4 flex items-center justify-end gap-3">
                <button
                    type="button"
                    className="h-9 rounded-xl border border-[#1677ff] bg-white px-4 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                    onClick={(e) => {
                        e.stopPropagation();
                        onOpen();
                    }}
                >
                    Подробнее
                </button>
                <button
                    type="button"
                    className="h-9 rounded-xl bg-[#1677ff] px-4 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                    onClick={(e) => {
                        e.stopPropagation();
                        alert(`Отклик отправлен (демо): ${x.title}`);
                    }}
                >
                    Откликнуться
                </button>
            </div>
        </div>
    );
}

export default function StudentInternshipsPage() {
    const navigate = useNavigate();

    const [q, setQ] = useState("");
    const [page, setPage] = useState(1);

    const [city, setCity] = useState("Город");
    const [pay, setPay] = useState("Оплата");
    const [duration, setDuration] = useState("Длительность");
    const [category, setCategory] = useState("Категория");

    const filtered = useMemo(() => {
        const query = q.trim().toLowerCase();

        return internships.filter((x) => {
            const byQuery =
                !query ||
                x.title.toLowerCase().includes(query) ||
                x.company.toLowerCase().includes(query);

            const byCity = city === "Город" || x.city === city;
            const byPay = pay === "Оплата" || x.pay === pay;
            const byDur = duration === "Длительность" || x.duration === duration;

            const byCat =
                category === "Категория" ||
                x.tagsTop.some((t) => t.toLowerCase() === category.toLowerCase());

            return byQuery && byCity && byPay && byDur && byCat;
        });
    }, [q, city, pay, duration, category]);

    const pageSize = 3;
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const safePage = Math.min(page, totalPages);
    const pageItems = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

    return (
        <div className="py-8">
            <h1 className="text-[20px] font-semibold text-black/80">Поиск практики</h1>

            <div className="mt-6 flex items-center gap-3">
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Какую практику вы ищете?"
                    className="h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                />
                <button
                    type="button"
                    className="h-10 rounded-xl bg-[#1677ff] px-5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                    onClick={() => setPage(1)}
                >
                    Поиск
                </button>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[12px] font-semibold text-black/60">
                <span className="inline-flex items-center gap-2">
                    <span className="text-black/50">⚑</span> Фильтры
                </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
                <Select value={city} onChange={(e) => { setCity(e.target.value); setPage(1); }}>
                    <option>Город</option>
                    <option>Алматы</option>
                    <option>Астана</option>
                    <option>Шымкент</option>
                </Select>

                <Select value={pay} onChange={(e) => { setPay(e.target.value); setPage(1); }}>
                    <option>Оплата</option>
                    <option>По договоренности</option>
                </Select>

                <Select value={duration} onChange={(e) => { setDuration(e.target.value); setPage(1); }}>
                    <option>Длительность</option>
                    <option>1 месяц</option>
                    <option>2 месяца</option>
                    <option>3 месяца</option>
                </Select>

                <Select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} w="min-w-[110px]">
                    <option>Категория</option>
                    <option>IT</option>
                    <option>Программирование</option>
                    <option>Удаленно</option>
                    <option>Маркетинг</option>
                    <option>Дизайн</option>
                    <option>Аналитика</option>
                    <option>Продажи</option>
                </Select>
            </div>

            <div className="mt-6 space-y-4">
                {pageItems.map((x) => (
                    <InternshipCard key={x.id} x={x} onOpen={() => navigate(`/student/internships/${x.id}`)} />
                ))}
            </div>

            <Pagination page={safePage} totalPages={totalPages} onPage={setPage} />
        </div>
    );
}