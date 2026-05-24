import React, { useEffect, useMemo, useState } from "react";
import { Pill, SmallIconButton, IconEye, IconEdit, IconTrash } from "../ui/EmployerUi.jsx";
import { getMyVacancies, deleteVacancy  } from "../../shared/api/employerApi.js";
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

function VacancyCard({ v, onDelete }) {
    return (
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-between gap-4">
                <Pill variant={v.statusVariant}>{v.status}</Pill>
                <div className="flex items-center gap-2">
                    
                    <SmallIconButton title="Редактировать" variant="blue" onClick={() => alert("edit (демо)")}>
                        <IconEdit />
                    </SmallIconButton>
                    <SmallIconButton
                        title="Удалить"
                        variant="red"
                        onClick={() => onDelete(v.id)}
                    >
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
    const tabs = [
    "Все вакансии",
    "Опубликованные",
    "Черновики",
    "Удалённые",
];
    const [tab, setTab] = useState(tabs[0]);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
    async function loadVacancies() {
        try {
            const response = await getMyVacancies();

            console.log(response);

            const statusMap = {
                active: {
                    text: "Опубликовано",
                    variant: "green",
                    type: "published",
                },

                draft: {
                    text: "Черновик",
                    variant: "blue",
                    type: "draft",
                },

                deleted: {
                    text: "Удалено",
                    variant: "red",
                    type: "hidden",
                },
            };

            const mapped = response.map((x) => {
                const status = statusMap[x.vacancyStatusCode] ?? {
                    text: "Неизвестно",
                    variant: "gray",
                    type: "all",
                };

                return {
                    id: x.vacancyId,

                    status: status.text,

                    statusVariant: status.variant,

                    title:
                        x.vacancyNameRu ||
                        x.vacancyNameKk ||
                        x.vacancyNameEn,

                    tags: [],

                    desc: x.description,

                    candidates: x.responses,

                    duration: "",

                    date: new Date(x.startDate).toLocaleDateString("ru-RU"),

                    type: status.type,
                };
            });

            setData(mapped);
        } catch (error) {
            console.error("Ошибка загрузки вакансий:", error);
        } finally {
            setLoading(false);
        }
    }

    loadVacancies();
    }, []);
    
    const handleDelete = async (vacancyId) => {
    const confirmed = window.confirm(
        "Вы уверены, что хотите удалить вакансию?"
    );

    if (!confirmed) {
        return;
    }

    try {
        await deleteVacancy(vacancyId);

        setData((prev) =>
            prev.filter((x) => x.id !== vacancyId)
        );

        alert("Вакансия удалена");
    } catch (error) {
        console.error("Ошибка удаления вакансии:", error);

        alert("Не удалось удалить вакансию");
    }
};

    const filtered = useMemo(() => {
    if (tab === "Все вакансии") return data;

    if (tab === "Опубликованные") {
        return data.filter((x) => x.type === "published");
    }

    if (tab === "Черновики") {
        return data.filter((x) => x.type === "draft");
    }

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
                    <VacancyCard
                        key={v.id}
                        v={v}
                        onDelete={handleDelete}
                    />
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