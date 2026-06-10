import React, { useMemo, useState } from "react";
import { Pill } from "../ui/EmployerUi.jsx";

function StatCard({ title, value }) {
    return (
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="text-[12px] text-black/45">{title}</div>
            <div className="mt-2 text-[22px] font-semibold text-[#1677ff]">{value}</div>
        </div>
    );
}

function ActionCard({ title, desc, onClick }) {
    return (
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="text-[14px] font-semibold text-black/80">{title}</div>
            <div className="mt-1 text-[12px] leading-5 text-black/45">{desc}</div>
            <button
                type="button"
                onClick={onClick}
                className="mt-4 group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1677ff] px-4 py-2.5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
            >
                Перейти <span className="transition group-hover:translate-x-0.5">→</span>
            </button>
        </div>
    );
}

function DiaryCard({ name, status, statusVariant, position, date, onOpen }) {
    return (
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-between gap-3">
                <div className="text-[12px] font-semibold text-black/75">{name}</div>
                <Pill variant={statusVariant}>{status}</Pill>
            </div>
            <div className="mt-3 text-[12px] text-black/55">{position}</div>
            <div className="mt-2 text-[11px] text-black/40">Дата: {date}</div>
            <button
                type="button"
                onClick={onOpen}
                className="mt-4 h-9 w-full rounded-xl border border-[#1677ff] bg-white text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
            >
                Открыть отчет
            </button>
        </div>
    );
}

function ApplicationCard({ status, variant, name, position, date, onMore }) {
    return (
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-between gap-3">
                <Pill variant={variant}>{status}</Pill>
            </div>
            <div className="mt-3 text-[12px] font-semibold text-black/75">{name}</div>
            <div className="mt-2 text-[12px] text-black/55">{position}</div>
            <div className="mt-2 text-[11px] text-black/40">Дата отклика: {date}</div>
            <button
                type="button"
                onClick={onMore}
                className="mt-4 h-9 w-full rounded-xl border border-[#1677ff] bg-white text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
            >
                Подробнее
            </button>
        </div>
    );
}

function RatingModal({ open, onClose }) {
    const [comment, setComment] = useState("");
    const [s1, setS1] = useState(3);
    const [s2, setS2] = useState(3);
    const [s3, setS3] = useState(3);
    const [s4, setS4] = useState(3);
    const [s5, setS5] = useState(3);
    const [finalComment, setFinalComment] = useState("");

    const avg = useMemo(() => {
        const v = (s1 + s2 + s3 + s4 + s5) / 5;
        return Math.round(v * 10) / 10;
    }, [s1, s2, s3, s4, s5]);

    if (!open) return null;

    const Field = ({ title, value, onChange }) => (
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
            {/* фон */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />

            {/* окно */}
            <div className="absolute left-1/2 top-1/2 w-[92%] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
                <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 text-[12px] text-black/45 hover:text-black/70 transition"
                >
                    <span className="text-[#1677ff]">←</span> Оценка студента
                </button>

                <div className="mt-4 max-h-[70vh] overflow-auto pr-1">
                    <input
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Комментарий (не обязательно)"
                        className="h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                    />

                    <div className="mt-4 space-y-4">
                        <Field title="Уровень профессиональных знаний" value={s1} onChange={setS1} />
                        <Field title="Качество выполнения порученных заданий" value={s2} onChange={setS2} />
                        <Field title="Инициативность и самостоятельность" value={s3} onChange={setS3} />
                        <Field title="Командная работа и коммуникация" value={s4} onChange={setS4} />

                        <div className="rounded-xl border border-black/5 bg-white p-4">
                            <div className="text-[12px] font-semibold text-black/70">Общая итоговая оценка (автоматически считает)</div>
                            <div className="mt-3 flex items-center gap-3">
                                <input type="range" min={1} max={5} step={1} value={s5} onChange={(e) => setS5(Number(e.target.value))} className="w-full accent-[#1677ff]" />
                                <div className="w-10 text-right text-[12px] font-semibold text-black/60">{avg}</div>
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

export default function EmployerDashboardPage() {
    const [openRating, setOpenRating] = useState(false);

    const diaries = [
        { name: "Алия Нурлановна", status: "Присутствовал(-а)", statusVariant: "green", position: "Стажер в IT-отдел", date: "10.04.2025" },
        { name: "Андас Малика", status: "Удаленно", statusVariant: "gray", position: "Тестировщик", date: "10.04.2025" },
        { name: "Кубранова Сания", status: "Удаленно", statusVariant: "gray", position: "Разработчик", date: "10.04.2025" },
        { name: "Сабитов Еркебулан", status: "Отсутствовал(-а)", statusVariant: "red", position: "Стажер в IT-отдел", date: "10.04.2025" },
    ];

    const apps = [
        { status: "На рассмотрении", variant: "blue", name: "Молдагулова Алия", position: "Разработчик", date: "10.04.2025" },
        { status: "Одобрено", variant: "green", name: "Касымов Данияр", position: "Стажер в IT-отдел", date: "10.04.2025" },
        { status: "Одобрено", variant: "green", name: "Кубранова Сания", position: "Тестировщик", date: "10.04.2025" },
        { status: "Отклонено", variant: "red", name: "Букина Вероника", position: "Стажер в IT-отдел", date: "10.04.2025" },
    ];

    return (
        <div className="py-10">
            <h1 className="text-[20px] font-semibold text-black/80">Личный кабинет работодателя</h1>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <StatCard title="Активные вакансии" value="5" />
                <StatCard title="Всего откликов" value="18" />
                <StatCard title="Заключено договоров" value="3" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <ActionCard title="Мои вакансии" desc="Управление размещенными вакансиями" onClick={() => (window.location.href = "/employer/vacancies")} />
                <ActionCard title="Кандидаты" desc="Просмотр и управление заявками на практику" onClick={() => (window.location.href = "/employer/candidates")} />
                <ActionCard title="Поиск соискателей" desc="Поиск студентов для прохождения практики" onClick={() => alert("Скоро")} />
                <ActionCard title="Создать вакансию" desc="Опубликовать новую вакансию для практики" onClick={() => (window.location.href = "/employer/create")} />
            </div>

            <div className="mt-8 text-[14px] font-semibold text-black/75">Дневники практик</div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
                {diaries.map((x, i) => (
                    <DiaryCard
                        key={i}
                        {...x}
                        onOpen={() => setOpenRating(true)}
                    />
                ))}
            </div>

            <div className="mt-8 text-[14px] font-semibold text-black/75">Последние отклики</div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
                {apps.map((x, i) => (
                    <ApplicationCard key={i} {...x} onMore={() => setOpenRating(true)} />
                ))}
            </div>

            <RatingModal open={openRating} onClose={() => setOpenRating(false)} />
            <div className="h-10" />
        </div>
    );
}