import React, { useMemo, useState, useEffect } from "react";
import { Pill } from "../ui/EmployerUi.jsx";
import { useNavigate } from "react-router-dom";
import { approveApplication, getEmployerApplications, rejectApplication, } from "../../shared/api/applicationApi.js";

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
function formatDate(value) {
    if (!value) return "—";
    return new Date(value).toLocaleDateString("ru-RU");
}

function statusToPill(statusCode) {
    if (statusCode === "approved") {
        return { text: "Одобрено", variant: "green" };
    }

    if (statusCode === "rejected") {
        return { text: "Отклонено", variant: "red" };
    }

    if (statusCode === "under_review") {
        return { text: "На рассмотрении", variant: "blue" };
    }

    return { text: "Неизвестно", variant: "gray" };
}
function CandidateCard({ candidate, onMore, onApprove, onReject, actionLoading }) {
    const pill = statusToPill(candidate.statusCode);
    const canChangeStatus = candidate.statusCode === "under_review";
    return (
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-between gap-3">
                <div className="text-[12px] font-semibold text-black/75"> {candidate.studentFullName || "Студент"}</div>
                <div className="flex flex-wrap items-center justify-end gap-2">
                    <Pill variant="blue">GPA: {candidate.gpa ?? "—"}</Pill>
                    <Pill variant={pill.variant}>{candidate.status || pill.text}</Pill>
                </div>
            </div>

            <div className="mt-2 text-[12px] text-black/55">Satbayev University{candidate.facultyName ? `, ${candidate.facultyName}` : ""}
                {candidate.course ? `, ${candidate.course} курс` : ""}</div>

            <div className="mt-3 text-[11px] text-black/40">Вакансия:</div>
            <div className="mt-1 text-[12px] font-semibold text-black/70">
                {candidate.jobTitle || candidate.vacancyName || "—"}
            </div>

            <div className="mt-3 text-[11px] text-black/40">Навыки:</div>
            <div className="mt-2 flex flex-wrap gap-2">
                {(candidate.skills?.length ? candidate.skills : ["Навыки не указаны"]).map((skill) => (
                    <Pill key={skill} variant="gray">
                        {skill}
                    </Pill>
                ))}
            </div>

            <div className="mt-3 text-[11px] text-black/40">Дата отклика: {formatDate(candidate.createdAt)}</div>

            <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
                <button
                    type="button"
                    className="h-9 rounded-xl border border-[#1677ff] bg-white px-4 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                    onClick={onMore}
                >
                    Подробнее
                </button>

                {canChangeStatus && (
                    <>
                        <button
                            type="button"
                            disabled={actionLoading}
                            className="h-9 rounded-xl bg-[#16a34a] px-4 text-[12px] font-semibold text-white hover:bg-[#15803d] transition disabled:opacity-60"
                            onClick={onApprove}
                        >
                            Одобрить
                        </button>

                        <button
                            type="button"
                            disabled={actionLoading}
                            className="h-9 rounded-xl bg-[#dc2626] px-4 text-[12px] font-semibold text-white hover:bg-[#b91c1c] transition disabled:opacity-60"
                            onClick={onReject}
                        >
                            Отклонить
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default function EmployerCandidatesPage() {
    const navigate = useNavigate();
    const tabs = ["Все кандидаты", "На рассмотрении", "Одобренные", "Отклоненные"];

    const [tab, setTab] = useState(tabs[0]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionId, setActionId] = useState(null);

    const statusCode = useMemo(() => {
        if (tab === "На рассмотрении") return "under_review";
        if (tab === "Одобренные") return "approved";
        if (tab === "Отклоненные") return "rejected";
        return null;
    }, [tab]);

    async function loadCandidates() {
        try {
            setLoading(true);
            setError("");
            const response = await getEmployerApplications(statusCode, "ru", 1, 100);
            setItems(response.items || []);
        } catch (err) {
            console.error("Ошибка загрузки кандидатов:", err);
            setError(err.message || "Не удалось загрузить кандидатов");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCandidates();
    }, [statusCode]);

    const handleApprove = async (applicationId) => {
        try {
            setActionId(applicationId);
            await approveApplication(applicationId);
            await loadCandidates();
        } catch (err) {
            alert(err.message || "Не удалось одобрить отклик");
        } finally {
            setActionId(null);
        }
    };

    const handleReject = async (applicationId) => {
        try {
            setActionId(applicationId);
            await rejectApplication(applicationId);
            await loadCandidates();
        } catch (err) {
            alert(err.message || "Не удалось отклонить отклик");
        } finally {
            setActionId(null);
        }
    };

    return (
        <div className="py-10">
            <div className="text-[12px] text-[#1677ff]">Кандидаты</div>
            <h1 className="mt-2 text-[20px] font-semibold text-black/80">Кандидаты</h1>

            <div className="mt-6 overflow-hidden rounded-xl border border-black/10 bg-white">
                <div className="grid grid-cols-4">
                    {tabs.map((item) => (
                        <Tab key={item} active={item === tab} onClick={() => setTab(item)}>
                            {item}
                        </Tab>
                    ))}
                </div>
            </div>

            {loading && (
                <div className="mt-6 rounded-2xl bg-white p-5 text-[13px] text-black/55">
                    Загрузка кандидатов...
                </div>
            )}

            {!loading && error && (
                <div className="mt-6 rounded-2xl bg-red-50 p-5 text-[13px] text-red-600">
                    {error}
                </div>
            )}

            {!loading && !error && items.length === 0 && (
                <div className="mt-6 rounded-2xl bg-white p-5 text-[13px] text-black/55">
                    Кандидаты не найдены.
                </div>
            )}

            {!loading && !error && items.length > 0 && (
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {items.map((candidate) => (
                        <CandidateCard
                            key={candidate.applicationId}
                            candidate={candidate}
                            actionLoading={actionId === candidate.applicationId}
                            onMore={() =>
                                navigate(`/employer/candidates/${candidate.applicationId}`, {
                                    state: { candidate },
                                })
                            }
                            onApprove={() => handleApprove(candidate.applicationId)}
                            onReject={() => handleReject(candidate.applicationId)}
                        />
                    ))}
                </div>
            )}

            <div className="h-10" />
        </div>
    );
}