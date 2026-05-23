import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pill, IconPin, IconCalendar, IconClock, IconBriefcase } from "../ui/Ui.jsx";
import { getVacancyDetails } from "../../shared/api/vacancyApi.js";

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

    const [item, setItem] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadDetails() {
            try {
                setIsLoading(true);
                setError(null);

                const data = await getVacancyDetails(id);
                setItem(data);
            } catch (error) {
                console.error("Ошибка загрузки практики:", error);
                setError("Практика не найдена");
            } finally {
                setIsLoading(false);
            }
        }

        if (id) {
            loadDetails();
        }
    }, [id]);

    if (isLoading) {
        return <div className="py-10 text-[14px] text-black/60">Загрузка практики...</div>;
    }

    if (error || !item) {
        return (
            <div className="py-10">
                <div className="rounded-2xl border border-black/5 bg-white p-6">
                    <div className="text-[14px] font-semibold text-black/70">
                        Практика не найдена
                    </div>
                    <button
                        type="button"
                        className="mt-4 rounded-xl bg-[#1677ff] px-4 py-2.5 text-[12px] font-semibold text-white"
                        onClick={() => navigate("/student/internships")}
                    >
                        Вернуться к списку
                    </button>
                </div>
            </div>
        );
    }

    const statusVariant = item.status === "Опубликовано" ? "green" : "blue";

    const createdDate = item.createdAt
        ? new Date(item.createdAt).toLocaleDateString("ru-RU")
        : "-";

    return (
        <div className="py-8">
            <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                <div className="flex items-start justify-between gap-4">
                    <Pill variant="blue">{item.companyName}</Pill>
                    <Pill variant={statusVariant}>{item.status}</Pill>
                </div>

                <div className="mt-3 text-[18px] font-semibold text-black/85">
                    {item.jobTitle}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                    {item.categoryName && <Pill variant="gray">{item.categoryName}</Pill>}
                    {item.workFormatName && <Pill variant="gray">{item.workFormatName}</Pill>}
                </div>

                <div className="mt-4 text-[12px] leading-6 text-black/60">
                    {item.fullDescription}
                </div>

                <div className="mt-4 rounded-xl bg-black/[0.03] p-4">
                    <div className="text-[11px] font-semibold text-black/55">
                        Требования:
                    </div>
                    <div className="mt-1 text-[11px] leading-5 text-black/45">
                        {item.requirements}
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-[#1677ff]">
                    <span className="inline-flex items-center gap-1.5">
                        <IconPin /> {item.regionName}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <IconCalendar /> {item.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <IconClock /> {item.paymentType}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <IconBriefcase /> {item.typeOfEmployment}
                    </span>
                </div>

                {item.skills?.length > 0 && (
                    <div className="mt-6">
                        <div className="text-[14px] font-semibold text-black/75">
                            Ключевые навыки
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {item.skills.map((skill) => (
                                <Chip key={skill}>
                                    {skill}
                                </Chip>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-6 flex items-center justify-between gap-3">
                    <div className="text-[11px] text-black/35">
                        Дата размещения: {createdDate}
                    </div>

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
                            onClick={() => alert(`Отклик отправлен: ${item.jobTitle}`)}
                        >
                            Откликнуться
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}