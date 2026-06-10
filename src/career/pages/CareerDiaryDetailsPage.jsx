import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pill } from "../ui/CareerUi.jsx";
import { getDiaryDetails } from "../../shared/api/careerApi.js";

function StatusPill({ status }) {
    if (status === "На проверке") return <Pill variant="blue">{status}</Pill>;
    if (status === "Согласовано") return <Pill variant="green">{status}</Pill>;
    if (status === "Отклонено") return <Pill variant="red">{status}</Pill>;

    return <Pill variant="gray">{status || "Без статуса"}</Pill>;
}

function getPresenceVariant(status) {
    if (status === "Присутствовал") return "green";
    if (status === "Отсутствовал") return "red";
    if (status === "Удаленно") return "yellow";

    return "gray";
}

function Modal({ open, title, children, onClose }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/30" onClick={onClose} />

            <div className="relative w-full max-w-[720px] rounded-2xl bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                <div className="flex items-start justify-between gap-3">
                    <div className="text-[14px] font-semibold text-black/80">{title}</div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="h-8 w-8 rounded-lg border border-black/10 bg-white text-black/60 hover:bg-black/5"
                        aria-label="Закрыть"
                    >
                        ×
                    </button>
                </div>

                <div className="mt-4">{children}</div>
            </div>
        </div>
    );
}

export default function CareerDiaryDetailsPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [diary, setDiary] = useState(null);
    const [loading, setLoading] = useState(true);

    const [status, setStatus] = useState("");
    const [grade, setGrade] = useState("Не оценено");

    const [openEntry, setOpenEntry] = useState(false);
    const [entryText, setEntryText] = useState("");

    const [openReject, setOpenReject] = useState(false);
    const [rejectReason, setRejectReason] = useState("");

    useEffect(() => {
        async function loadDiary() {
            try {
                const response = await getDiaryDetails(id);

                const mapped = {
                    studentId: response.studentId,
                    student: response.studentFullName,
                    faculty: response.facultyName,
                    company: response.companyName,
                    period: response.period,
                    status: response.statusName,
                    entries: (response.entries || []).map((x) => ({
                        id: x.diaryId,
                        date: x.date,
                        task: x.task,
                        description: x.description,
                        presence: x.presenceStatusName,
                        presenceVariant: getPresenceVariant(x.presenceStatusName),
                    })),
                };

                setDiary(mapped);
                setStatus(mapped.status);
            } catch (error) {
                console.error("Ошибка загрузки дневника:", error);
            } finally {
                setLoading(false);
            }
        }

        loadDiary();
    }, [id]);

    const openEntryModal = (entry) => {
        setEntryText(
            `Дата: ${entry.date || "-"}\n` +
            `Задача: ${entry.task || "-"}\n` +
            `Статус: ${entry.presence || "-"}\n\n` +
            `Описание:\n${entry.description || "-"}`
        );

        setOpenEntry(true);
    };

    const approveDiary = () => {
        setStatus("Согласовано");
    };

    const rejectDiary = () => {
        setStatus("Отклонено");
        setOpenReject(false);
    };

    if (loading) {
        return (
            <div className="py-10">
                <div className="rounded-2xl border border-black/5 bg-white p-5 text-[12px] text-black/45">
                    Загрузка дневника...
                </div>
            </div>
        );
    }

    if (!diary) {
        return (
            <div className="py-10">
                <button
                    type="button"
                    onClick={() => navigate("/career/diary")}
                    className="text-[12px] text-black/50 hover:text-black/70"
                >
                    ← Дневник практики
                </button>

                <div className="mt-6 rounded-2xl border border-black/5 bg-white p-5 text-[12px] text-black/45">
                    Дневник не найден
                </div>
            </div>
        );
    }

    return (
        <div className="py-10">
            <button
                type="button"
                onClick={() => navigate("/career/diary")}
                className="text-[12px] text-black/50 hover:text-black/70"
            >
                ← Дневник практики
            </button>

            <div className="mt-2 text-[12px] text-black/45">Просмотр дневника</div>
            <h1 className="mt-1 text-[20px] font-semibold text-black/80">Дневник практики</h1>

            <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <div className="text-[14px] font-semibold text-black/80">{diary.student}</div>

                        <div className="mt-2 text-[12px] text-black/55">
                            {diary.faculty} • {diary.company}
                        </div>

                        <div className="mt-1 text-[11px] text-black/40">
                            Период: {diary.period}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <StatusPill status={status} />
                        <Pill variant="gray">Записей: {diary.entries.length}</Pill>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                    <div className="rounded-2xl bg-[#f6f7fb] p-4">
                        <div className="text-[11px] text-black/45">Оценка</div>
                        <div className="mt-2 text-[12px] font-semibold text-black/70">{grade}</div>
                    </div>

                    <div className="rounded-2xl bg-[#f6f7fb] p-4">
                        <div className="text-[11px] text-black/45">Факультет</div>
                        <div className="mt-2 text-[12px] font-semibold text-black/70">{diary.faculty}</div>
                    </div>

                    <div className="rounded-2xl bg-[#f6f7fb] p-4">
                        <div className="text-[11px] text-black/45">Компания</div>
                        <div className="mt-2 text-[12px] font-semibold text-black/70">{diary.company}</div>
                    </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
                    

                    

                    {status === "Согласовано" ? (
                        <button
                            type="button"
                            disabled
                            className="h-10 cursor-not-allowed rounded-xl bg-black/10 px-5 text-[12px] font-semibold text-black/40"
                        >
                            Уже согласовано
                        </button>
                    ) : status === "Отклонено" ? (
                        <button
                            type="button"
                            disabled
                            className="h-10 cursor-not-allowed rounded-xl bg-black/10 px-5 text-[12px] font-semibold text-black/40"
                        >
                            Отклонено
                        </button>
                    ) : (
                        <>
                           
                        </>
                    )}
                </div>
            </div>

            <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                <div className="text-[14px] font-semibold text-black/80">История записей</div>
                <div className="mt-1 text-[12px] text-black/45">Все записи в дневнике практики</div>

                <div className="mt-4 overflow-hidden rounded-2xl border border-black/5">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[820px] border-collapse text-left">
                            <thead className="bg-[#f6f7fb]">
                                <tr className="text-[11px] font-semibold text-black/55">
                                    <th className="px-4 py-3">Дата</th>
                                    <th className="px-4 py-3">Задача</th>
                                    <th className="px-4 py-3">Присутствие</th>
                                    <th className="px-4 py-3">Действия</th>
                                </tr>
                            </thead>

                            <tbody className="text-[12px] text-black/70">
                                {diary.entries.map((entry) => (
                                    <tr key={entry.id} className="border-t border-black/5">
                                        <td className="px-4 py-4">{entry.date}</td>
                                        <td className="px-4 py-4">{entry.task}</td>
                                        <td className="px-4 py-4">
                                            <Pill variant={entry.presenceVariant}>{entry.presence}</Pill>
                                        </td>
                                        <td className="px-4 py-4">
                                            <button
                                                type="button"
                                                className="h-9 rounded-xl border border-[#1677ff] bg-white px-4 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                                                onClick={() => openEntryModal(entry)}
                                            >
                                                Просмотр
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {diary.entries.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-4 py-10 text-center text-[12px] text-black/45">
                                            Записей нет
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal open={openEntry} title="Запись дневника" onClose={() => setOpenEntry(false)}>
                <textarea
                    value={entryText}
                    onChange={(e) => setEntryText(e.target.value)}
                    className="h-[260px] w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-[12px] leading-5 text-black/70 outline-none focus:border-[#1677ff]"
                />

                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        onClick={() => setOpenEntry(false)}
                        className="h-9 rounded-xl border border-black/10 bg-white px-4 text-[12px] font-semibold text-black/60 hover:bg-black/5"
                    >
                        Закрыть
                    </button>
                </div>
            </Modal>

            <Modal open={openReject} title="Отклонить дневник" onClose={() => setOpenReject(false)}>
                <div className="text-[12px] text-black/55">Укажите причину отклонения.</div>

                <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="mt-3 h-[110px] w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                    placeholder="Причина..."
                />

                <div className="mt-4 flex items-center justify-end gap-2">
                    <button
                        type="button"
                        onClick={() => setOpenReject(false)}
                        className="h-9 rounded-xl border border-black/10 bg-white px-4 text-[12px] font-semibold text-black/60 hover:bg-black/5"
                    >
                        Отмена
                    </button>

                    <button
                        type="button"
                        onClick={rejectDiary}
                        className="h-9 rounded-xl bg-[#ff3b30] px-4 text-[12px] font-semibold text-white hover:brightness-95"
                    >
                        Отклонить
                    </button>
                </div>
            </Modal>

            <div className="h-10" />
        </div>
    );
}