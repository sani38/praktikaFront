import React, { useEffect, useMemo, useState } from "react";
import { Pill } from "../ui/CareerUi.jsx";
import { useNavigate } from "react-router-dom";
import { getDiaryForCareer } from "../../shared/api/careerApi.js";

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
    const navigate = useNavigate();

    const [q, setQ] = useState("");
    const [s, setS] = useState("Все статусы");
    const [f, setF] = useState("Все факультеты");

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDiary() {
            try {
                const response = await getDiaryForCareer();

                const mapped = response.map((x) => ({
                    studentId: x.studentId,
                    student: x.studentFullName,
                    faculty: x.facultyName,
                    company: x.companyName,
                    period: x.period,
                    status: x.statusName,
                }));

                setRows(mapped);
            } catch (error) {
                console.error("Ошибка загрузки дневников практики:", error);
            } finally {
                setLoading(false);
            }
        }

        loadDiary();
    }, []);

    const faculties = useMemo(() => {
        const values = rows.map((x) => x.faculty).filter(Boolean);
        return ["Все факультеты", ...new Set(values)];
    }, [rows]);

    const statuses = useMemo(() => {
        const values = rows.map((x) => x.status).filter(Boolean);
        return ["Все статусы", ...new Set(values)];
    }, [rows]);

    const filtered = useMemo(() => {
        const qq = q.trim().toLowerCase();

        return rows.filter((r) => {
            const matchesSearch =
                !qq ||
                r.student.toLowerCase().includes(qq) ||
                r.company.toLowerCase().includes(qq);

            const matchesStatus = s === "Все статусы" || r.status === s;
            const matchesFaculty = f === "Все факультеты" || r.faculty === f;

            return matchesSearch && matchesStatus && matchesFaculty;
        });
    }, [q, s, f, rows]);

    const reset = () => {
        setS("Все статусы");
        setF("Все факультеты");
    };

    return (
        <div className="py-10">
            <div className="text-[12px] text-[#1677ff]">Дневник практики</div>
            <h1 className="mt-2 text-[20px] font-semibold text-black/80">Дневник практики</h1>

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

            <div className="mt-4 flex items-center gap-2 text-[12px] font-semibold text-black/60">
                <span className="text-black/50">⚑</span> Фильтры
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
                <Select value={s} onChange={(e) => setS(e.target.value)}>
                    {statuses.map((x) => (
                        <option key={x}>{x}</option>
                    ))}
                </Select>

                <Select value={f} onChange={(e) => setF(e.target.value)}>
                    {faculties.map((x) => (
                        <option key={x}>{x}</option>
                    ))}
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
                    <table className="w-full min-w-[820px] border-collapse text-left">
                        <thead className="bg-[#f6f7fb]">
                            <tr className="text-[11px] font-semibold text-black/55">
                                <th className="px-4 py-3">Студент</th>
                                <th className="px-4 py-3">Факультет</th>
                                <th className="px-4 py-3">Компания</th>
                                <th className="px-4 py-3">Период практики</th>
                                <th className="px-4 py-3">Статус</th>
                                <th className="px-4 py-3">Действия</th>
                            </tr>
                        </thead>
                        <tbody className="text-[12px] text-black/70">
                            {loading && (
                                <tr>
                                    <td className="px-4 py-10 text-center text-[12px] text-black/45" colSpan={6}>
                                        Загрузка дневников...
                                    </td>
                                </tr>
                            )}

                            {!loading && filtered.map((r) => (
                                <tr key={r.studentId} className="border-t border-black/5">
                                    <td className="px-4 py-4">{r.student}</td>
                                    <td className="px-4 py-4">{r.faculty}</td>
                                    <td className="px-4 py-4">{r.company}</td>
                                    <td className="px-4 py-4">{r.period}</td>
                                    <td className="px-4 py-4">
                                        <StatusPill status={r.status} />
                                    </td>
                                    <td className="px-4 py-4">
                                        <button
                                            type="button"
                                            className="h-8 rounded-xl bg-[#1677ff] px-4 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                                            onClick={() => navigate(`/career/diary/${r.studentId}`)}
                                        >
                                            Просмотр
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {!loading && filtered.length === 0 && (
                                <tr>
                                    <td className="px-4 py-10 text-center text-[12px] text-black/45" colSpan={6}>
                                        Ничего не найдено
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="h-10" />
        </div>
    );
}