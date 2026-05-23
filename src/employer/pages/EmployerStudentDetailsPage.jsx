import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pill } from "../ui/EmployerUi.jsx";

function RatingModal({ open, onClose }) {
    const [generalComment, setGeneralComment] = useState("");
    const [s1, setS1] = useState(3);
    const [s2, setS2] = useState(3);
    const [s3, setS3] = useState(3);
    const [s4, setS4] = useState(3);
    const [finalComment, setFinalComment] = useState("");

    const avg = useMemo(() => {
        const v = (s1 + s2 + s3 + s4) / 4;
        return Math.round(v * 10) / 10;
    }, [s1, s2, s3, s4]);

    if (!open) return null;

    const Block = ({ title, value, onChange }) => (
        <div className="rounded-xl border border-black/5 bg-white p-4">
            <div className="text-[12px] font-semibold text-black/70">{title}</div>
            <div className="mt-3 flex items-center gap-3">
                <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="w-full accent-[#1677ff]"
                />
                <div className="w-6 text-right text-[12px] font-semibold text-black/60">{value}</div>
            </div>
            <input
                placeholder="Комментарий (не обязательно)"
                className="mt-3 h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
            />
        </div>
    );

    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />

            <div className="absolute left-1/2 top-1/2 w-[92%] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
                <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 text-[12px] text-black/45 hover:text-black/70 transition"
                >
                    <span className="text-[#1677ff]">←</span> Оценка студента
                </button>

                <div className="mt-4 max-h-[72vh] overflow-auto pr-1">
                    <input
                        value={generalComment}
                        onChange={(e) => setGeneralComment(e.target.value)}
                        placeholder="Комментарий (не обязательно)"
                        className="h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                    />

                    <div className="mt-4 space-y-4">
                        <Block title="Уровень профессиональных знаний" value={s1} onChange={setS1} />
                        <Block title="Качество выполнения порученных заданий" value={s2} onChange={setS2} />
                        <Block title="Инициативность и самостоятельность" value={s3} onChange={setS3} />
                        <Block title="Командная работа и коммуникация" value={s4} onChange={setS4} />

                        <div className="rounded-xl border border-black/5 bg-white p-4">
                            <div className="text-[12px] font-semibold text-black/70">
                                Общая итоговая оценка (автоматически считает)
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                                <div className="text-[12px] text-black/55">Среднее значение</div>
                                <div className="text-[12px] font-semibold text-black/70">{avg}</div>
                            </div>
                            <input
                                placeholder="Комментарий (не обязательно)"
                                className="mt-3 h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                            />
                        </div>

                        <div className="rounded-xl border border-black/5 bg-white p-4">
                            <div className="text-[12px] font-semibold text-black/70">Итоговый отзыв</div>
                            <textarea
                                value={finalComment}
                                onChange={(e) => setFinalComment(e.target.value)}
                                placeholder="Комментарий (не обязательно)"
                                className="mt-3 h-24 w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-5 flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => {
                            alert(`Итоговая оценка отправлена (демо): ${avg}`);
                            onClose();
                        }}
                        className="h-10 flex-1 rounded-xl bg-[#1677ff] px-4 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                    >
                        Отправить итоговую оценку ({avg})
                    </button>
                    <button
                        type="button"
                        onClick={() => alert("Черновик сохранен (демо)")}
                        className="h-10 flex-1 rounded-xl border border-[#1677ff] bg-white px-4 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                    >
                        Сохранить черновик
                    </button>
                </div>
            </div>
        </div>
    );
}

function DiaryCard({ date, status, variant }) {
    return (
        <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <Pill variant={variant}>{status}</Pill>
            <div className="mt-2 text-[11px] text-black/45">Дата: {date}</div>
            <button
                type="button"
                className="mt-3 h-9 w-full rounded-xl border border-[#1677ff] bg-white text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                onClick={() => alert("Открыть отчет (демо)")}
            >
                Открыть отчет
            </button>
        </div>
    );
}

export default function EmployerStudentDetailsPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [openRating, setOpenRating] = useState(false);

    const student = useMemo(
        () => ({
            id,
            fullName: "Иванов Иван Иванович",
            uni: "Satbayev University",
            program: "Машиностроение и энергетика",
            course: "3 курс",
            phone: "+7 777 123 45 67",
            email: "ivanov@student.su.kz",
            type: "Производственная практика",
            period: "01 июля 2025 — 31 июля 2025",
            duration: "1 месяц",
            hours: "40 часов",
            schedule: "Пн–Пт, 09:00–18:00",
            diaries: [
                { date: "10.04.2025", status: "Присутствовал(-а)", variant: "green" },
                { date: "10.04.2025", status: "Присутствовал(-а)", variant: "green" },
                { date: "10.04.2025", status: "Присутствовал(-а)", variant: "green" },
                { date: "10.04.2025", status: "Присутствовал(-а)", variant: "green" },
                { date: "10.04.2025", status: "Присутствовал(-а)", variant: "green" },
                { date: "10.04.2025", status: "Присутствовал(-а)", variant: "green" },
                { date: "10.04.2025", status: "Присутствовал(-а)", variant: "green" },
                { date: "10.04.2025", status: "Присутствовал(-а)", variant: "green" },
                { date: "10.04.2025", status: "Присутствовал(-а)", variant: "green" },
                { date: "10.04.2025", status: "Присутствовал(-а)", variant: "green" },
            ],
        }),
        [id]
    );

    return (
        <div className="py-10">
            <button
                type="button"
                onClick={() => navigate("/employer/candidates")}
                className="inline-flex items-center gap-2 text-[12px] text-black/45 hover:text-black/70 transition"
            >
                <span className="text-[#1677ff]">←</span> Кандидаты
            </button>

            <div className="mt-2 text-[12px] text-black/55">Информация о студенте</div>

            <div className="mt-4 rounded-3xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-full bg-black/10" />
                        <div>
                            <div className="text-[14px] font-semibold text-black/75">{student.fullName}</div>
                            <div className="mt-1 text-[12px] text-black/45">
                                {student.uni} <span className="mx-2">|</span> {student.program} <span className="mx-2">|</span>{" "}
                                {student.course}
                            </div>
                            <div className="mt-1 text-[12px] text-[#1677ff]">
                                {student.phone} <span className="mx-2 text-black/30">|</span>{" "}
                                <span className="text-[#1677ff]">{student.email}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setOpenRating(true)}
                        className="h-10 rounded-xl border border-black/10 bg-white px-5 text-[12px] font-semibold text-black/70 hover:bg-black/5 transition"
                    >
                        Оценить студента
                    </button>
                </div>
            </div>

            <div className="mt-5 rounded-3xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                <div className="text-[14px] font-semibold text-black/75">Сроки практики</div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-5">
                    <div className="rounded-2xl border border-black/5 bg-white p-4">
                        <div className="text-[11px] text-black/35">Тип практики</div>
                        <div className="mt-2 text-[12px] font-semibold text-black/70">{student.type}</div>
                    </div>

                    <div className="rounded-2xl border border-black/5 bg-white p-4">
                        <div className="text-[11px] text-black/35">Период</div>
                        <div className="mt-2 text-[12px] font-semibold text-black/70">{student.period}</div>
                    </div>

                    <div className="rounded-2xl border border-black/5 bg-white p-4">
                        <div className="text-[11px] text-black/35">Продолжительность</div>
                        <div className="mt-2 text-[12px] font-semibold text-black/70">{student.duration}</div>
                    </div>

                    <div className="rounded-2xl border border-black/5 bg-white p-4">
                        <div className="text-[11px] text-black/35">Часы в неделю</div>
                        <div className="mt-2 text-[12px] font-semibold text-black/70">{student.hours}</div>
                    </div>

                    <div className="rounded-2xl border border-black/5 bg-white p-4">
                        <div className="text-[11px] text-black/35">График</div>
                        <div className="mt-2 text-[12px] font-semibold text-black/70">{student.schedule}</div>
                    </div>
                </div>
            </div>

            <div className="mt-5 rounded-3xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                <div className="text-[14px] font-semibold text-black/75">Дневники практик</div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-5">
                    {student.diaries.map((d, i) => (
                        <DiaryCard key={i} date={d.date} status={d.status} variant={d.variant} />
                    ))}
                </div>
            </div>

            <RatingModal open={openRating} onClose={() => setOpenRating(false)} />
            <div className="h-10" />
        </div>
    );
}