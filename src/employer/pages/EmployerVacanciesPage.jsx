import React, { useMemo, useState } from "react";
import { Pill, SmallIconButton, IconEye, IconEdit, IconTrash } from "../ui/EmployerUi.jsx";

function Tab({ active, children, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`h-10 px-4 text-[12px] transition ${active ? "bg-[#f6f7fb] font-semibold text-black/70" : "text-black/45 hover:bg-black/5"
                }`}
        >
            {children}
        </button>
    );
}

function VacancyCard({ v }) {
    return (
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-between gap-4">
                <Pill variant={v.statusVariant}>{v.status}</Pill>
                <div className="flex items-center gap-2">
                    <SmallIconButton title="Скрыть/Показать" variant="blue" onClick={() => alert("toggle (демо)")}>
                        <IconEye />
                    </SmallIconButton>
                    <SmallIconButton title="Редактировать" variant="blue" onClick={() => alert("edit (демо)")}>
                        <IconEdit />
                    </SmallIconButton>
                    <SmallIconButton title="Удалить" variant="red" onClick={() => alert("delete (демо)")}>
                        <IconTrash />
                    </SmallIconButton>
                </div>
            </div>

            <div className="mt-3 text-[14px] font-semibold text-black/80">{v.title}</div>

            <div className="mt-2 flex flex-wrap gap-2">
                {v.tags.map((t) => (
                    <Pill key={t} variant="gray">
                        {t}
                    </Pill>
                ))}
            </div>

            <div className="mt-3 text-[12px] leading-6 text-black/55">{v.desc}</div>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-[12px] text-[#1677ff]">
                <span>👤 {v.candidates} соискателей</span>
                <span>📅 {v.duration}</span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
                <div className="text-[11px] text-black/35">Дата размещения: {v.date}</div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="h-9 rounded-xl border border-[#1677ff] bg-white px-4 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                        onClick={() => alert("Посмотреть заявку (демо)")}
                    >
                        Посмотреть заявку
                    </button>
                    <button
                        type="button"
                        className="h-9 rounded-xl bg-[#1677ff] px-4 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                        onClick={() => alert("Управление (демо)")}
                    >
                        Управление
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function EmployerVacanciesPage() {
    const tabs = ["Все вакансии", "Опубликованные", "Скрытые"];
    const [tab, setTab] = useState(tabs[0]);

    const data = useMemo(
        () => [
            {
                id: 1,
                status: "На рассмотрении",
                statusVariant: "blue",
                title: "Стажировка в IT-отделе",
                tags: ["IT", "Программирование", "Удаленно"],
                desc:
                    "Стажировка в IT-отделе компании ТехноСервис. Работа с современными технологиями, участие в разработке веб-приложений.",
                candidates: 12,
                duration: "3 месяца",
                date: "10.04.2025",
                type: "all",
            },
            {
                id: 2,
                status: "Отклонено",
                statusVariant: "red",
                title: "Стажировка в IT-отделе",
                tags: ["IT", "Программирование", "Удаленно"],
                desc:
                    "Стажировка в IT-отделе компании ТехноСервис. Работа с современными технологиями, участие в разработке веб-приложений.",
                candidates: 12,
                duration: "3 месяца",
                date: "10.04.2025",
                type: "hidden",
            },
            {
                id: 3,
                status: "Опубликовано",
                statusVariant: "green",
                title: "Стажировка в маркетинге",
                tags: ["IT", "Программирование", "Удаленно"],
                desc:
                    "Стажировка в маркетинговом отделе компании БрендМастер. Изучение стратегии продвижения и анализа рынка.",
                candidates: 12,
                duration: "3 месяца",
                date: "10.04.2025",
                type: "published",
            },
            {
                id: 4,
                status: "Опубликовано",
                statusVariant: "green",
                title: "Ассистент по продажам",
                tags: ["Торговля", "Коммуникации", "Офис"],
                desc:
                    "Помощь в управлении клиентскими отношениями и поддержка команды продаж.",
                candidates: 8,
                duration: "6 месяцев",
                date: "15.04.2025",
                type: "published",
            },
            {
                id: 5,
                status: "Опубликовано",
                statusVariant: "green",
                title: "Дизайнер пользовательского интерфейса",
                tags: ["Дизайн", "Графика", "Удаленно"],
                desc:
                    "Разработка дизайн-концептов для веб-приложений и мобильных интерфейсов.",
                candidates: 10,
                duration: "4 месяца",
                date: "20.04.2025",
                type: "published",
            },
            {
                id: 6,
                status: "Опубликовано",
                statusVariant: "green",
                title: "Дизайнер пользовательского интерфейса",
                tags: ["Дизайн", "Графика", "Удаленно"],
                desc:
                    "Разработка дизайн-концептов для веб-приложений и мобильных интерфейсов.",
                candidates: 10,
                duration: "4 месяца",
                date: "20.04.2025",
                type: "published",
            },
        ],
        []
    );

    const filtered = useMemo(() => {
        if (tab === "Все вакансии") return data;
        if (tab === "Опубликованные") return data.filter((x) => x.type === "published");
        return data.filter((x) => x.type === "hidden");
    }, [tab, data]);

    return (
        <div className="py-10">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <div className="text-[12px] text-[#1677ff]">Мои вакансии</div>
                    <h1 className="mt-2 text-[20px] font-semibold text-black/80">Мои вакансии</h1>
                </div>

                <button
                    type="button"
                    className="h-10 rounded-xl bg-[#1677ff] px-5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                    onClick={() => alert("Создать вакансию (демо)")}
                >
                    Создать вакансию
                </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-black/10 bg-white">
                <div className="grid grid-cols-3">
                    {tabs.map((t) => (
                        <Tab key={t} active={t === tab} onClick={() => setTab(t)}>
                            {t}
                        </Tab>
                    ))}
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {filtered.map((v) => (
                    <VacancyCard key={v.id} v={v} />
                ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-[12px] text-black/45">
                <button className="h-8 w-8 rounded-lg border border-black/10 bg-white hover:bg-black/5">←</button>
                <span className="h-8 w-8 rounded-lg bg-[#1677ff] text-white flex items-center justify-center">1</span>
                <span className="h-8 w-8 rounded-lg border border-black/10 bg-white flex items-center justify-center">2</span>
                <span className="h-8 w-8 rounded-lg border border-black/10 bg-white flex items-center justify-center">3</span>
                <span className="px-2">…</span>
                <span className="border border-black/10 rounded-lg h-8 px-3 flex items-center bg-white">123</span>
                <button className="h-8 w-8 rounded-lg border border-black/10 bg-white hover:bg-black/5">→</button>
            </div>

            <div className="h-10" />
        </div>
    );
}