import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pill } from "../ui/CareerUi.jsx";

function StatusPill({ status }) {
    if (status === "На проверке") return <Pill variant="blue">{status}</Pill>;
    if (status === "Согласовано") return <Pill variant="green">{status}</Pill>;
    if (status === "Отклонено") return <Pill variant="red">{status}</Pill>;
    return <Pill variant="gray">{status}</Pill>;
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
    const { id } = useParams(); // тут id = encodeURIComponent(student) в нашем переходе

    const diary = useMemo(
        () => ({
            student: decodeURIComponent(id),
            faculty: "Информационные технологии",
            company: "ТехноСервис Казахстан",
            period: "15.04.2024 - 15.07.2024",
            entriesCount: 12,
            status: "На проверке",
            grade: "Не оценено",
            entries: [
                { date: "10.05.2025", task: "Работа над первым заданием", presence: "Удаленно", presenceVariant: "yellow" },
                { date: "03.05.2025", task: "Работа над первым заданием", presence: "Присутствовал", presenceVariant: "green" },
                { date: "02.05.2025", task: "Работа над первым заданием", presence: "Отсутствовал", presenceVariant: "red" },
            ],
        }),
        [id]
    );

    const [status, setStatus] = useState(diary.status);
    const [grade, setGrade] = useState(diary.grade);

    const [openEntry, setOpenEntry] = useState(false);
    const [entryText, setEntryText] = useState("");
    const [openReject, setOpenReject] = useState(false);
    const [rejectReason, setRejectReason] = useState("");

    const approveDiary = () => setStatus("Согласовано");
    const rejectDiary = () => {
        setStatus("Отклонено");
        setOpenReject(false);
    };

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

            {/* Summary card */}
            <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <div className="text-[14px] font-semibold text-black/80">{diary.student}</div>
                        <div className="mt-2 text-[12px] text-black/55">
                            {diary.faculty} • {diary.company}
                        </div>
                        <div className="mt-1 text-[11px] text-black/40">Период: {diary.period}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <StatusPill status={status} />
                        <Pill variant="gray">Записей: {diary.entriesCount}</Pill>
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
                    <button
                        type="button"
                        onClick={() => {
                            setEntryText(
                                `Дата: ${diary.entries[0]?.date}\nЗадача: ${diary.entries[0]?.task}\nСтатус: ${diary.entries[0]?.presence}\n\nОписание (демо):\nВыполнил задачи дня, участвовал в встречах, подготовил отчёт...`
                            );
                            setOpenEntry(true);
                        }}
                        className="h-10 rounded-xl border border-black/10 bg-white px-5 text-[12px] font-semibold text-black/60 hover:bg-black/5 transition"
                    >
                        Открыть запись (демо)
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setGrade("Оценено: 4.5/5");
                        }}
                        className="h-10 rounded-xl border border-[#1677ff] bg-white px-5 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                    >
                        Оценить
                    </button>

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
                            <button
                                type="button"
                                onClick={() => setOpenReject(true)}
                                className="h-10 rounded-xl border border-[#ff3b30] bg-white px-5 text-[12px] font-semibold text-[#ff3b30] hover:bg-[#fff0f0] transition"
                            >
                                Отклонить
                            </button>
                            <button
                                type="button"
                                onClick={approveDiary}
                                className="h-10 rounded-xl bg-[#1677ff] px-5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                            >
                                Согласовать
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Entries table */}
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
                                {diary.entries.map((e, idx) => (
                                    <tr key={idx} className="border-t border-black/5">
                                        <td className="px-4 py-4">{e.date}</td>
                                        <td className="px-4 py-4">{e.task}</td>
                                        <td className="px-4 py-4">
                                            <Pill variant={e.presenceVariant}>{e.presence}</Pill>
                                        </td>
                                        <td className="px-4 py-4">
                                            <button
                                                type="button"
                                                className="h-9 rounded-xl border border-[#1677ff] bg-white px-4 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                                                onClick={() => {
                                                    setEntryText(
                                                        `Дата: ${e.date}\nЗадача: ${e.task}\nСтатус: ${e.presence}\n\nОписание (демо):\nСегодня выполнял(а) задачи, писал(а) код, участвовал(а) в митингах...`
                                                    );
                                                    setOpenEntry(true);
                                                }}
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

            {/* Modals */}
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
                <div className="text-[12px] text-black/55">Укажите причину отклонения (демо).</div>
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