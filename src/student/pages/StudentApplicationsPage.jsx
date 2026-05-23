import React, { useMemo, useState } from "react";
import { Pill, Pagination, IconPin, IconCalendar, IconClock, IconBriefcase } from "../ui/Ui.jsx";

const initialApps = [
    {
        id: 1,
        company: "ТехноСервис Казахстан",
        title: "Стажировка в IT-отделе",
        desc:
            "Стажировка в IT-отделе компании ТехноСервис. Работа с современными технологиями, участие в разработке веб-приложений.",
        city: "Алматы",
        duration: "3 месяца",
        pay: "По договоренности",
        schedule: "Полный рабочий день",
        date: "10.04.2025",
        status: "На рассмотрении",
        decision: "Отклонено",
        published: true,
        canSign: false,
    },
    {
        id: 2,
        company: "МедиаГрупп",
        title: "Стажировка в маркетинге",
        desc:
            "Стажировка в отделе маркетинга с акцентом на digital-стратегии и анализ рынка.",
        city: "Алматы",
        duration: "3 месяца",
        pay: "По договоренности",
        schedule: "Полный рабочий день",
        date: "10.04.2025",
        status: "На рассмотрении",
        decision: "Отклонено",
        published: true,
        canSign: false,
    },
    {
        id: 3,
        company: "Финансовая Компания",
        title: "Стажировка в финансах",
        desc:
            "Стажировка в финансовом департаменте с одновременным обучением основам инвестиционного анализа.",
        city: "Алматы",
        duration: "3 месяца",
        pay: "По договоренности",
        schedule: "Полный рабочий день",
        date: "10.04.2025",
        status: "На рассмотрении",
        decision: "Отклонено",
        published: true,
        canSign: true,
    },
    {
        id: 4,
        company: "Туристическое Агентство",
        title: "Стажировка в туристическом бизнесе",
        desc:
            "Стажировка в туристическом агентстве, включающая работу с клиентами и организацию туров.",
        city: "Алматы",
        duration: "3 месяца",
        pay: "По договоренности",
        schedule: "Полный рабочий день",
        date: "10.04.2025",
        status: "На рассмотрении",
        decision: "Отклонено",
        published: true,
        canSign: false,
    },
    {
        id: 5,
        company: "ЭкоПроект",
        title: "Стажировка в экологии",
        desc:
            "Стажировка в проекте по охране окружающей среды с практическими заданиями и исследованиями.",
        city: "Алматы",
        duration: "3 месяца",
        pay: "По договоренности",
        schedule: "Полный рабочий день",
        date: "10.04.2025",
        status: "На рассмотрении",
        decision: "Отклонено",
        published: true,
        canSign: false,
    },
    {
        id: 6,
        company: "Креативное Агентство",
        title: "Стажировка в креативном направлении",
        desc:
            "Стажировка, ориентированная на разработку креативных концепций и управление проектами в области рекламы.",
        city: "Алматы",
        duration: "3 месяца",
        pay: "По договоренности",
        schedule: "Полный рабочий день",
        date: "10.04.2025",
        status: "На рассмотрении",
        decision: "Отклонено",
        published: true,
        canSign: false,
    },
];

function Tabs({ value, onChange }) {
    const tabs = ["Все заявки", "На рассмотрении", "Одобренные", "Отклоненные", "С договором"];
    return (
        <div className="mt-6 overflow-hidden rounded-xl border border-black/10 bg-white">
            <div className="grid grid-cols-5">
                {tabs.map((t) => {
                    const active = t === value;
                    return (
                        <button
                            key={t}
                            type="button"
                            onClick={() => onChange(t)}
                            className={`h-10 text-[12px] transition ${active ? "bg-[#f6f7fb] font-semibold text-black/70" : "text-black/45 hover:bg-black/5"
                                }`}
                        >
                            {t}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function AppCard({ x, onWithdraw, onSign }) {
    return (
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-between gap-4">
                <Pill variant="blue">{x.company}</Pill>
                <div className="flex items-center gap-2">
                    <Pill variant="blue">{x.status}</Pill>
                    <Pill variant="red">{x.decision}</Pill>
                    {x.published && <Pill variant="green">Опубликовано</Pill>}
                </div>
            </div>

            <div className="mt-3 text-[16px] font-semibold text-black/80">{x.title}</div>
            <div className="mt-3 text-[12px] leading-6 text-black/55">{x.desc}</div>

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

            <div className="mt-6 flex items-center justify-between gap-3">
                <div className="text-[11px] text-black/35">Дата размещения: {x.date}</div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="h-9 rounded-xl border border-[#1677ff] bg-white px-4 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                        onClick={() => onWithdraw(x.id)}
                    >
                        Отозвать заявку
                    </button>

                    {x.canSign && (
                        <button
                            type="button"
                            className="h-9 rounded-xl bg-[#1677ff] px-4 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                            onClick={() => onSign(x.id)}
                        >
                            Подписать договор
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function StudentApplicationsPage() {
    const [tab, setTab] = useState("Все заявки");
    const [page, setPage] = useState(1);
    const [apps, setApps] = useState(initialApps);

    const list = useMemo(() => {
        if (tab === "Все заявки") return apps;
        if (tab === "На рассмотрении") return apps.filter((x) => x.status === "На рассмотрении");
        if (tab === "Одобренные") return apps.filter((x) => x.decision === "Одобрено");
        if (tab === "Отклоненные") return apps.filter((x) => x.decision === "Отклонено");
        if (tab === "С договором") return apps.filter((x) => x.canSign);
        return apps;
    }, [apps, tab]);

    const pageSize = 3;
    const totalPages = Math.max(1, Math.ceil(list.length / pageSize));
    const safePage = Math.min(page, totalPages);
    const pageItems = list.slice((safePage - 1) * pageSize, safePage * pageSize);

    const onWithdraw = (id) => {
        const item = apps.find((x) => x.id === id);
        if (!item) return;
        const ok = confirm(`Отозвать заявку: "${item.title}"?`);
        if (!ok) return;
        setApps((p) => p.filter((x) => x.id !== id));
    };

    const onSign = (id) => {
        const item = apps.find((x) => x.id === id);
        if (!item) return;
        alert(`Договор подписан (демо): ${item.title}`);
        setApps((p) => p.map((x) => (x.id === id ? { ...x, canSign: false, decision: "Одобрено" } : x)));
    };

    return (
        <div className="py-8">
            <h1 className="text-[20px] font-semibold text-black/80">Мои заявки</h1>

            <Tabs
                value={tab}
                onChange={(t) => {
                    setTab(t);
                    setPage(1);
                }}
            />

            <div className="mt-6 space-y-4">
                {pageItems.map((x) => (
                    <AppCard key={x.id} x={x} onWithdraw={onWithdraw} onSign={onSign} />
                ))}
            </div>

            <Pagination page={safePage} totalPages={totalPages} onPage={setPage} />
        </div>
    );
}