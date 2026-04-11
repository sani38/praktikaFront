import React, { useMemo, useState } from "react";
import { Pill } from "../ui/CareerUi.jsx";
import { useNavigate } from "react-router-dom";


function Select({ value, onChange, children }) {
    return (
        <select
            value={value}
            onChange={onChange}
            className="h-9 rounded-xl border border-black/10 bg-white px-3 text-[12px] text-black/60 outline-none focus:border-[#1677ff]"
        >
            {children}
        </select>
    );
}

function StatusPill({ status }) {
    if (status === "На проверке") return <Pill variant="blue">{status}</Pill>;
    if (status === "Согласовано") return <Pill variant="green">{status}</Pill>;
    if (status === "Отклонено") return <Pill variant="red">{status}</Pill>;
    return <Pill variant="gray">{status}</Pill>;
}

export default function CareerDiaryPage() {
    const [q, setQ] = useState("");
    const [s, setS] = useState("Все статусы");
    const [f, setF] = useState("Все факультеты");

    const rows = useMemo(
        () => [
            {
                student: "Алексей Иванов",
                faculty: "Информационные технологии",
                company: "ТехноСервис Казахстан",
                period: "15.04.2024 - 15.07.2024",
                entries: 12,
                status: "На проверке",
                grade: "Не оценено",
            },
            ...Array.from({ length: 8 }, () => ({
                student: "text",
                faculty: "text",
                company: "text",
                period: "text",
                entries: "text",
                status: "text",
                grade: "text",
            })),
        ],
        []
    );

    const filtered = useMemo(() => {
        const qq = q.trim().toLowerCase();
        return rows.filter((r) => !qq || r.student.toLowerCase().includes(qq) || r.company.toLowerCase().includes(qq));
    }, [q, rows]);

    const reset = () => {
        setS("Все статусы");
        setF("Все факультеты");
    };
    const navigate = useNavigate();
    return (
        <div className="py-10">
            <div className="text-[12px] text-[#1677ff]">Дневник практики</div>
            <h1 className="mt-2 text-[20px] font-semibold text-black/80">Дневник практики</h1>

            {/* Поиск */}
            <div className="mt-5 flex items-center gap-3">
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Поиск по студенту или компании"
                    className="h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                />
                <button
                    type="button"
                    className="h-10 rounded-xl bg-[#1677ff] px-5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                >
                    Поиск
                </button>
            </div>

            {/* Фильтры */}
            <div className="mt-4 flex items-center gap-2 text-[12px] font-semibold text-black/60">
                <span className="text-black/50">⚑</span> Фильтры
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
                <Select value={s} onChange={(e) => setS(e.target.value)}>
                    <option>Все статусы</option>
                    <option>На проверке</option>
                    <option>Согласовано</option>
                    <option>Отклонено</option>
                </Select>

                <Select value={f} onChange={(e) => setF(e.target.value)}>
                    <option>Все факультеты</option>
                    <option>Информационные технологии</option>
                    <option>Экономика</option>
                    <option>Инженерия</option>
                </Select>

                <button
                    type="button"
                    onClick={reset}
                    className="h-9 rounded-xl border border-black/10 bg-white px-4 text-[12px] font-semibold text-black/60 hover:bg-black/5 transition"
                >
                    Сбросить <span className="ml-2">×</span>
                </button>
            </div>

            <div className="mt-6 text-[14px] font-semibold text-black/75">Дневник практики</div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-black/5 bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[980px] border-collapse text-left">
                        <thead className="bg-[#f6f7fb]">
                            <tr className="text-[11px] font-semibold text-black/55">
                                <th className="px-4 py-3">Студент</th>
                                <th className="px-4 py-3">Факультет</th>
                                <th className="px-4 py-3">Компания</th>
                                <th className="px-4 py-3">Период практики</th>
                                <th className="px-4 py-3">Записей</th>
                                <th className="px-4 py-3">Статус</th>
                                <th className="px-4 py-3">Оценка</th>
                                <th className="px-4 py-3">Действия</th>
                            </tr>
                        </thead>
                        <tbody className="text-[12px] text-black/70">
                            {filtered.map((r, idx) => (
                                <tr key={idx} className="border-t border-black/5">
                                    <td className="px-4 py-4">{r.student}</td>
                                    <td className="px-4 py-4">{r.faculty}</td>
                                    <td className="px-4 py-4">{r.company}</td>
                                    <td className="px-4 py-4">{r.period}</td>
                                    <td className="px-4 py-4">{r.entries}</td>
                                    <td className="px-4 py-4">
                                        <StatusPill status={r.status} />
                                    </td>
                                    <td className="px-4 py-4">{r.grade}</td>
                                    <td className="px-4 py-4">
                                        <button
                                            type="button"
                                            className="h-8 rounded-xl bg-[#1677ff] px-4 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                                            onClick={() => navigate(`/career/diary/${encodeURIComponent(r.student)}`)}                                        >
                                            Просмотр
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td className="px-4 py-10 text-center text-[12px] text-black/45" colSpan={8}>
                                        Ничего не найдено
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-[12px] text-black/45">
                <button className="h-8 w-8 rounded-lg border border-black/10 bg-white hover:bg-black/5">←</button>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1677ff] text-white">1</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white">2</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white">3</span>
                <span className="px-2">…</span>
                <span className="flex h-8 items-center rounded-lg border border-black/10 bg-white px-3">123</span>
                <button className="h-8 w-8 rounded-lg border border-black/10 bg-white hover:bg-black/5">→</button>
            </div>

            <div className="h-10" />
        </div>
    );
}