import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { internships } from "../data/internships.js";
import { Pill, IconPin, IconCalendar, IconClock, IconBriefcase, Pagination } from "../ui/Ui.jsx";

function Chip({ children }) {
    return (
        <span className="inline-flex items-center rounded-xl bg-[#f3f4f6] px-3 py-2 text-[11px] text-black/55">
            {children}
        </span>
    );
}

function BulletList({ items }) {
    return (
        <ul className="mt-3 list-disc space-y-2 pl-5 text-[12px] leading-6 text-black/55">
            {items.map((t) => (
                <li key={t}>{t}</li>
            ))}
        </ul>
    );
}

export default function StudentInternshipDetailsPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const item = useMemo(() => {
        const n = Number(id);
        return internships.find((x) => x.id === n) || null;
    }, [id]);

    if (!item) {
        return (
            <div className="py-10">
                <div className="rounded-2xl border border-black/5 bg-white p-6">
                    <div className="text-[14px] font-semibold text-black/70">Практика не найдена</div>
                    <button
                        type="button"
                        className="mt-4 rounded-xl bg-[#1677ff] px-4 py-2.5 text-[12px] font-semibold text-white"
                        onClick={() => navigate("/student/internships")}
                    >
                        Вернуться к поиску
                    </button>
                </div>
            </div>
        );
    }

    const statusVariant = item.status === "Опубликовано" ? "green" : "blue";

    return (
        <div className="py-8">
            {/* Карточка */}
            <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                <div className="flex items-start justify-between gap-4">
                    <Pill variant="blue">{item.company}</Pill>
                    <Pill variant={statusVariant}>{item.status}</Pill>
                </div>

                <div className="mt-3 text-[18px] font-semibold text-black/85">{item.title}</div>

                <div className="mt-3 flex flex-wrap gap-2">
                    {item.tagsTop.map((t) => (
                        <Pill key={t} variant="gray">
                            {t}
                        </Pill>
                    ))}
                </div>

                <div className="mt-4 text-[12px] leading-6 text-black/60">{item.shortDesc}</div>

                <div className="mt-4 rounded-xl bg-black/[0.03] p-4">
                    <div className="text-[11px] font-semibold text-black/55">{item.requirementsTitle}</div>
                    <div className="mt-1 text-[11px] leading-5 text-black/45">{item.requirementsText}</div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-[#1677ff]">
                    <span className="inline-flex items-center gap-1.5">
                        <IconPin /> {item.city}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <IconCalendar /> {item.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <IconClock /> {item.pay}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <IconBriefcase /> {item.schedule}
                    </span>
                </div>

                <div className="mt-6 text-[14px] font-semibold text-black/75">{item.skillsTitle}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                    {item.skills.map((s) => (
                        <Chip key={s}>{s}</Chip>
                    ))}
                </div>

                <BulletList items={item.bullets1} />
                <BulletList items={item.bullets2} />
                <BulletList items={item.bullets3} />

                <div className="mt-6 flex items-center justify-between gap-3">
                    <div className="text-[11px] text-black/35">Дата размещения: {item.date}</div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            className="h-10 rounded-xl border border-[#1677ff] bg-white px-5 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                            onClick={() => navigate("/student/internships")}
                        >
                            Назад
                        </button>
                        <button
                            type="button"
                            className="h-10 rounded-xl bg-[#1677ff] px-5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                            onClick={() => alert(`Отклик отправлен (демо): ${item.title}`)}
                        >
                            Откликнуться
                        </button>
                    </div>
                </div>
            </div>

            <Pagination page={1} totalPages={123} onPage={() => navigate("/student/internships")} />
        </div>
    );
}