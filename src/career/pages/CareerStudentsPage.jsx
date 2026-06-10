import React, { useEffect, useMemo, useState } from "react";
import { Pill } from "../ui/CareerUi.jsx";
import { getStudentsForCareer } from "../../shared/api/careerApi.js";

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

function StudentCard({ s }) {
    return (
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-between gap-3">
                <div>
                    {s.topTag && <Pill variant="blue">{s.topTag}</Pill>}
                    <div className="mt-3 text-[12px] font-semibold text-black/75">{s.name}</div>
                </div>
                <Pill variant="blue">GPA: {s.gpa}</Pill>
            </div>

            <div className="mt-2 text-[12px] text-black/55">{s.edu}</div>

            <div className="mt-3 text-[11px] text-black/40">Навыки:</div>
            <div className="mt-2 flex flex-wrap gap-2">
                {s.skills.map((x) => (
                    <Pill key={x} variant="gray">{x}</Pill>
                ))}
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    type="button"
                    className="h-9 rounded-xl border border-[#1677ff] bg-white px-4 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                >
                    Подробнее
                </button>
            </div>
        </div>
    );
}

export default function CareerStudentsPage() {
    const [q, setQ] = useState("");
    const [fac, setFac] = useState("Все факультеты");
    const [course, setCourse] = useState("Все курсы");
    const [status, setStatus] = useState("Все статусы");

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStudents() {
            try {
                const response = await getStudentsForCareer();

                const mapped = response.map((x) => ({
                    id: x.userId,
                    topTag: x.statusName || "Без статуса",
                    name: `${x.lastName} ${x.firstName}`,
                    gpa: x.gpa ?? "-",
                    edu: `${x.course} курс`,
                    skills: x.skillsMap || [],
                    course: `${x.course} курс`,
                    status: x.statusName || "Без статуса",
                }));

                setData(mapped);
            } catch (error) {
                console.error("Ошибка загрузки студентов:", error);
            } finally {
                setLoading(false);
            }
        }

        loadStudents();
    }, []);

    const filtered = useMemo(() => {
        const qq = q.trim().toLowerCase();

        return data.filter((x) => {
            const matchesSearch = !qq || x.name.toLowerCase().includes(qq);
            const matchesCourse = course === "Все курсы" || x.course === course;
            const matchesStatus = status === "Все статусы" || x.status === status;

            return matchesSearch && matchesCourse && matchesStatus;
        });
    }, [q, course, status, data]);

    const reset = () => {
        setFac("Все факультеты");
        setCourse("Все курсы");
        setStatus("Все статусы");
    };

    return (
        <div className="py-10">
            <div className="text-[12px] text-[#1677ff]">Студенты</div>
            <h1 className="mt-2 text-[20px] font-semibold text-black/80">Студенты</h1>
            <div className="mt-1 text-[12px] text-black/45">Найдено студентов: {filtered.length}</div>

            <div className="mt-5 flex items-center gap-3">
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Найти студента"
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
                <Select value={fac} onChange={(e) => setFac(e.target.value)}>
                    <option>Все факультеты</option>
                    <option>IT</option>
                    <option>Экономика</option>
                    <option>Инженерия</option>
                </Select>

                <Select value={course} onChange={(e) => setCourse(e.target.value)}>
                    <option>Все курсы</option>
                    <option>1 курс</option>
                    <option>2 курс</option>
                    <option>3 курс</option>
                    <option>4 курс</option>
                </Select>

                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option>Все статусы</option>
                    <option>На практике</option>
                    <option>Новая заявка</option>
                    <option>Без статуса</option>
                </Select>

                <button
                    type="button"
                    onClick={reset}
                    className="h-9 rounded-xl border border-black/10 bg-white px-4 text-[12px] font-semibold text-black/60 hover:bg-black/5 transition"
                >
                    Сбросить <span className="ml-2">×</span>
                </button>
            </div>

            {loading && (
                <div className="mt-6 rounded-2xl border border-black/5 bg-white p-5 text-[12px] text-black/45">
                    Загрузка студентов...
                </div>
            )}

            {!loading && filtered.length === 0 && (
                <div className="mt-6 rounded-2xl border border-black/5 bg-white p-5 text-[12px] text-black/45">
                    Студенты не найдены
                </div>
            )}

            {!loading && filtered.length > 0 && (
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {filtered.map((s) => (
                        <StudentCard key={s.id} s={s} />
                    ))}
                </div>
            )}

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