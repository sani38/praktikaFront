import React, { useMemo, useState } from "react";
import { Pill } from "../ui/EmployerUi.jsx";
import { useNavigate } from "react-router-dom";

function Tab({ active, children, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`h-10 px-4 text-[12px] transition ${active
                    ? "bg-[#f6f7fb] font-semibold text-black/70"
                    : "text-black/45 hover:bg-black/5"
                }`}
        >
            {children}
        </button>
    );
}

function CandidateCard({ c, onMore }) {
    return (
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-between gap-3">
                <div className="text-[12px] font-semibold text-black/75">{c.name}</div>
                <div className="flex items-center gap-2">
                    <Pill variant="blue">GPA: {c.gpa}</Pill>
                    {c.statusPill && <Pill variant={c.statusVariant}>{c.statusPill}</Pill>}
                </div>
            </div>

            <div className="mt-2 text-[12px] text-black/55">{c.edu}</div>

            <div className="mt-3 text-[11px] text-black/40">Навыки:</div>
            <div className="mt-2 flex flex-wrap gap-2">
                {c.skills.map((s) => (
                    <Pill key={s} variant="gray">
                        {s}
                    </Pill>
                ))}
            </div>

            <div className="mt-3 text-[11px] text-black/40">Дата отклика: {c.date}</div>

            <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
                <button
                    type="button"
                    className="h-9 rounded-xl border border-[#1677ff] bg-white px-4 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                    onClick={onMore}
                >
                    Подробнее
                </button>

                {c.canInvite ? (
                    <button
                        type="button"
                        className="h-9 rounded-xl bg-[#eef5ff] px-4 text-[12px] font-semibold text-[#1677ff] hover:bg-[#e7f0ff] transition"
                        onClick={() => alert(`Приглашение отправлено: ${c.name}`)}
                    >
                        Пригласить на интервью
                    </button>
                ) : c.invited ? (
                    <button
                        type="button"
                        disabled
                        className="h-9 cursor-not-allowed rounded-xl bg-black/10 px-4 text-[12px] font-semibold text-black/40"
                    >
                        Кандидат приглашен
                    </button>
                ) : null}
            </div>
        </div>
    );
}

export default function EmployerCandidatesPage() {
    const navigate = useNavigate();

    const tabs = ["Все кандидаты", "Отклоненные", "Одобренные"];
    const [tab, setTab] = useState(tabs[0]);

    const data = useMemo(
        () => [
            {
                id: 1,
                name: "Алия Нурлановна",
                gpa: "3.7/4",
                edu: "Satbayev University, Computer Science, 3 курс",
                skills: ["Python", "Django", "SQL", "Data Viz"],
                date: "10.04.2025",
                status: "approved",
                statusPill: "Одобрено",
                statusVariant: "green",
                canInvite: true,
            },
            {
                id: 2,
                name: "Алия Нурлановна",
                gpa: "3.7/4",
                edu: "Satbayev University, Computer Science, 3 курс",
                skills: ["Python", "Django", "SQL", "Data Viz"],
                date: "10.04.2025",
                status: "rejected",
                statusPill: "Отклонено",
                statusVariant: "red",
                canInvite: true,
            },
            {
                id: 3,
                name: "Алия Нурлановна",
                gpa: "3.7/4",
                edu: "Satbayev University, Computer Science, 3 курс",
                skills: ["Python", "Django", "SQL", "Data Viz"],
                date: "10.04.2025",
                status: "pending",
                statusPill: "На рассмотрении",
                statusVariant: "blue",
                canInvite: false,
                invited: true,
            },
            {
                id: 4,
                name: "Алия Нурлановна",
                gpa: "3.7/4",
                edu: "Satbayev University, Computer Science, 3 курс",
                skills: ["Python", "Django", "SQL", "Data Viz"],
                date: "10.04.2025",
                status: "approved",
                statusPill: "Одобрено",
                statusVariant: "green",
                canInvite: false,
                invited: false,
            },
            {
                id: 5,
                name: "Данияр Турсунов",
                gpa: "3.5/4",
                edu: "KazNU, Software Engineering, 2 курс",
                skills: ["Java", "Spring", "NoSQL", "Machine Learning"],
                date: "15.04.2025",
                status: "approved",
                statusPill: "Одобрено",
                statusVariant: "green",
                canInvite: false,
                invited: false,
            },
            {
                id: 6,
                name: "Лейла Сайфуллина",
                gpa: "3.9/4",
                edu: "Nazarbayev University, Data Science, 1 курс",
                skills: ["R", "Tableau", "Python", "Statistics"],
                date: "20.04.2025",
                status: "approved",
                statusPill: "Одобрено",
                statusVariant: "green",
                canInvite: false,
                invited: false,
            },
            {
                id: 7,
                name: "Данияр Турсунов",
                gpa: "3.5/4",
                edu: "KazNU, Software Engineering, 2 курс",
                skills: ["Java", "Spring", "NoSQL", "Machine Learning"],
                date: "15.04.2025",
                status: "approved",
                statusPill: "Одобрено",
                statusVariant: "green",
                canInvite: false,
                invited: false,
            },
            {
                id: 8,
                name: "Лейла Сайфуллина",
                gpa: "3.9/4",
                edu: "Nazarbayev University, Data Science, 1 курс",
                skills: ["R", "Tableau", "Python", "Statistics"],
                date: "20.04.2025",
                status: "approved",
                statusPill: "Одобрено",
                statusVariant: "green",
                canInvite: false,
                invited: false,
            },
        ],
        []
    );

    const filtered = useMemo(() => {
        if (tab === "Все кандидаты") return data;
        if (tab === "Отклоненные") return data.filter((x) => x.status === "rejected");
        return data.filter((x) => x.status === "approved");
    }, [tab, data]);

    return (
        <div className="py-10">
            <div className="text-[12px] text-[#1677ff]">Кандидаты</div>
            <h1 className="mt-2 text-[20px] font-semibold text-black/80">Кандидаты</h1>

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
                {filtered.map((c) => (
                    <CandidateCard
                        key={c.id}
                        c={c}
                        onMore={() => navigate(`/employer/candidates/${c.id}`)}
                    />
                ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-[12px] text-black/45">
                <button className="h-8 w-8 rounded-lg border border-black/10 bg-white hover:bg-black/5">
                    ←
                </button>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1677ff] text-white">
                    1
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white">
                    2
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white">
                    3
                </span>
                <span className="px-2">…</span>
                <span className="flex h-8 items-center rounded-lg border border-black/10 bg-white px-3">
                    123
                </span>
                <button className="h-8 w-8 rounded-lg border border-black/10 bg-white hover:bg-black/5">
                    →
                </button>
            </div>

            <div className="h-10" />
        </div>
    );
}