import React, { useMemo, useState } from "react";
import { Pill } from "../ui/EmployerUi.jsx";

function Select({ value, onChange, children, w = "min-w-[160px]" }) {
    return (
        <select
            value={value}
            onChange={onChange}
            className={`h-9 ${w} rounded-xl border border-black/10 bg-white px-3 text-[12px] text-black/60 outline-none focus:border-[#1677ff]`}
        >
            {children}
        </select>
    );
}

function StudentCard({ s }) {
    const canDownload = s.hasCv;

    return (
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-between gap-3">
                <div className="text-[12px] font-semibold text-black/75">{s.name}</div>
                <Pill variant="blue">GPA: {s.gpa}</Pill>
            </div>

            <div className="mt-2 text-[12px] text-black/55">{s.edu}</div>

            <div className="mt-3 text-[11px] text-black/40">Навыки:</div>
            <div className="mt-2 flex flex-wrap gap-2">
                {s.skills.map((x) => (
                    <Pill key={x} variant="gray">
                        {x}
                    </Pill>
                ))}
            </div>

            <div className="mt-3 text-[11px] text-black/40">Дата отклика: {s.date}</div>

            <div className="mt-4 flex items-center justify-end gap-2">
                <button
                    type="button"
                    disabled={!canDownload}
                    className={`h-9 rounded-xl px-4 text-[12px] font-semibold transition ${canDownload
                            ? "border border-[#1677ff] bg-white text-[#1677ff] hover:bg-[#eef5ff]"
                            : "cursor-not-allowed border border-black/10 bg-black/5 text-black/30"
                        }`}
                    onClick={() => (canDownload ? alert(`Скачать CV/Резюме: ${s.name} (демо)`) : null)}
                >
                    Скачать CV / Резюме
                </button>

                <button
                    type="button"
                    className="h-9 rounded-xl bg-[#eef5ff] px-4 text-[12px] font-semibold text-[#1677ff] hover:bg-[#e7f0ff] transition"
                    onClick={() => alert(`Подробнее: ${s.name} (демо)`)}
                >
                    Подробнее
                </button>
            </div>
        </div>
    );
}

export default function EmployerSearchPage() {
    const [u, setU] = useState("Университет");
    const [p, setP] = useState("Факультет / программа");
    const [c, setC] = useState("Курс обучения");
    const [g, setG] = useState("Средний балл (GPA)");
    const [sk, setSk] = useState("Навыки");
    const [t, setT] = useState("Тип практики");
    const [a, setA] = useState("Период доступности");
    const [cv, setCv] = useState("Наличие резюме / портфолио");

    const data = useMemo(
        () => [
            {
                id: 1,
                name: "Алия Нурлановна",
                gpa: "3.7/4",
                edu: "Satbayev University, Computer Science, 3 курс",
                skills: ["Python", "Django", "SQL", "Data Viz"],
                date: "10.04.2025",
                hasCv: true,
            },
            {
                id: 2,
                name: "Алия Нурлановна",
                gpa: "3.7/4",
                edu: "Satbayev University, Computer Science, 3 курс",
                skills: ["Python", "Django", "SQL", "Data Viz"],
                date: "10.04.2025",
                hasCv: true,
            },
            {
                id: 3,
                name: "Марат Айдарович",
                gpa: "3.9/4",
                edu: "Al-Farabi Kazakh National University, Information Technology, 2 курс",
                skills: ["JavaScript", "React", "Node.js", "Machine Learning"],
                date: "12.05.2025",
                hasCv: false,
            },
            {
                id: 4,
                name: "Салтанат Ерлановна",
                gpa: "3.5/4",
                edu: "Kazakhstan–British Technical University, Software Engineering, 1 курс",
                skills: ["Java", "Spring", "MongoDB", "Cloud Computing"],
                date: "15.06.2025",
                hasCv: true,
            },
            {
                id: 5,
                name: "Марат Айдарович",
                gpa: "3.9/4",
                edu: "Al-Farabi Kazakh National University, Information Technology, 2 курс",
                skills: ["JavaScript", "React", "Node.js", "Machine Learning"],
                date: "12.05.2025",
                hasCv: false,
            },
            {
                id: 6,
                name: "Салтанат Ерлановна",
                gpa: "3.5/4",
                edu: "Kazakhstan–British Technical University, Software Engineering, 1 курс",
                skills: ["Java", "Spring", "MongoDB", "Cloud Computing"],
                date: "15.06.2025",
                hasCv: true,
            },
        ],
        []
    );

    const reset = () => {
        setU("Университет");
        setP("Факультет / программа");
        setC("Курс обучения");
        setG("Средний балл (GPA)");
        setSk("Навыки");
        setT("Тип практики");
        setA("Период доступности");
        setCv("Наличие резюме / портфолио");
    };

    return (
        <div className="py-10">
            <div className="text-[12px] text-[#1677ff]">Поиск соискателей</div>
            <h1 className="mt-2 text-[20px] font-semibold text-black/80">Поиск соискателей</h1>

            <div className="mt-6">
                <div className="flex items-center gap-2 text-[12px] font-semibold text-black/60">
                    <span className="text-black/50">⚑</span> Фильтры
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Select value={u} onChange={(e) => setU(e.target.value)}>
                        <option>Университет</option>
                        <option>Satbayev University</option>
                        <option>KazNU</option>
                        <option>KBTU</option>
                        <option>NU</option>
                    </Select>

                    <Select value={p} onChange={(e) => setP(e.target.value)}>
                        <option>Факультет / программа</option>
                        <option>Computer Science</option>
                        <option>Information Technology</option>
                        <option>Software Engineering</option>
                        <option>Data Science</option>
                    </Select>

                    <Select value={c} onChange={(e) => setC(e.target.value)} w="min-w-[140px]">
                        <option>Курс обучения</option>
                        <option>1 курс</option>
                        <option>2 курс</option>
                        <option>3 курс</option>
                        <option>4 курс</option>
                    </Select>

                    <Select value={g} onChange={(e) => setG(e.target.value)} w="min-w-[160px]">
                        <option>Средний балл (GPA)</option>
                        <option>3.0+</option>
                        <option>3.5+</option>
                        <option>3.7+</option>
                        <option>3.9+</option>
                    </Select>

                    <Select value={sk} onChange={(e) => setSk(e.target.value)} w="min-w-[120px]">
                        <option>Навыки</option>
                        <option>Python</option>
                        <option>Java</option>
                        <option>SQL</option>
                        <option>React</option>
                    </Select>

                    <Select value={t} onChange={(e) => setT(e.target.value)} w="min-w-[140px]">
                        <option>Тип практики</option>
                        <option>Производственная</option>
                        <option>Преддипломная</option>
                        <option>Учебная</option>
                    </Select>

                    <Select value={a} onChange={(e) => setA(e.target.value)} w="min-w-[160px]">
                        <option>Период доступности</option>
                        <option>Июль 2025</option>
                        <option>Август 2025</option>
                        <option>Сентябрь 2025</option>
                    </Select>

                    <Select value={cv} onChange={(e) => setCv(e.target.value)} w="min-w-[190px]">
                        <option>Наличие резюме / портфолио</option>
                        <option>Есть</option>
                        <option>Нет</option>
                    </Select>

                    <button
                        type="button"
                        onClick={reset}
                        className="h-9 rounded-xl border border-black/10 bg-white px-4 text-[12px] font-semibold text-black/60 hover:bg-black/5 transition"
                    >
                        Сбросить <span className="ml-2">×</span>
                    </button>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {data.map((s) => (
                    <StudentCard key={s.id} s={s} />
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