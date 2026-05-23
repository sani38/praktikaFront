import React, { useMemo, useState } from "react";
import { Pill } from "../ui/Ui.jsx";

function DayCell({ n, state, active, onClick }) {
    const base = "h-8 w-8 rounded-lg border text-[12px] transition";
    const map = {
        present: "border-green-400 bg-green-50",
        absent: "border-red-400 bg-red-50",
        remote: "border-yellow-400 bg-yellow-50",
        none: "border-black/10 bg-white hover:bg-black/5",
    };
    const ring = active ? "ring-2 ring-[#1677ff]" : "";
    return (
        <button type="button" onClick={onClick} className={`${base} ${map[state]} ${ring}`}>
            {n}
        </button>
    );
}

function LabelDot({ color }) {
    return <span className={`inline-flex h-2 w-2 rounded-full ${color}`} />;
}

export default function StudentDiaryPage() {
    const [selectedDay, setSelectedDay] = useState(11);

    const [todayReport, setTodayReport] = useState({
        attendance: "Присутствовал",
        task: "Чем вы занимались сегодня?",
        description: "Я массажировал",
    });

    const calendar = useMemo(
        () => ({
            2: "absent",
            3: "present",
            10: "remote",
            11: "present",
        }),
        []
    );

    const history = useMemo(
        () => [
            { date: "10 мая 2025 г.", task: "Работа над первым заданием", status: "Удаленно" },
            { date: "3 мая 2025 г.", task: "Работа над первым заданием", status: "Присутствовал" },
            { date: "2 мая 2025 г.", task: "Работа над первым заданием", status: "Отсутствовал" },
        ],
        []
    );

    const statusPill = (s) => {
        if (s === "Присутствовал") return <Pill variant="green">Присутствовал</Pill>;
        if (s === "Отсутствовал") return <Pill variant="red">Отсутствовал</Pill>;
        return <Pill variant="gray">Удаленно</Pill>;
    };

    return (
        <div className="py-8">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-[20px] font-semibold text-black/80">Дневник практики</h1>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => alert("Скачать дневник (демо)")}
                        className="h-9 rounded-xl border border-[#1677ff] bg-white px-4 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                    >
                        Скачать дневник ↓
                    </button>
                    <button
                        type="button"
                        onClick={() => alert("Отправлено куратору (демо)")}
                        className="h-9 rounded-xl bg-[#1677ff] px-4 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                    >
                        Отправить куратору →
                    </button>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-12">
                {/* ЛЕВАЯ КОЛОНКА */}
                <div className="md:col-span-4 space-y-5">
                    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                        <div className="text-[14px] font-semibold text-black/75">Текущая практика</div>
                        <div className="mt-1 text-[12px] text-black/45">Информация о текущей практике</div>

                        <div className="mt-4">
                            <Pill variant="blue">ТехноСервис Казахстан</Pill>
                            <div className="mt-3 text-[14px] font-semibold text-black/75">Стажировка в IT отделе</div>
                        </div>

                        <div className="mt-4 text-[12px] text-black/55">
                            <div className="grid grid-cols-12 py-1">
                                <div className="col-span-5 text-black/45">Период:</div>
                                <div className="col-span-7 font-semibold text-black/60">15.05.2025 - 15.08.2025</div>
                            </div>
                            <div className="grid grid-cols-12 py-1">
                                <div className="col-span-5 text-black/45">Руководитель:</div>
                                <div className="col-span-7 font-semibold text-black/60">Алексей Петров</div>
                            </div>
                            <div className="grid grid-cols-12 py-1">
                                <div className="col-span-5 text-black/45">Должность:</div>
                                <div className="col-span-7 font-semibold text-black/60">Руководитель IT-отдела</div>
                            </div>
                            <div className="grid grid-cols-12 py-1">
                                <div className="col-span-5 text-black/45">Статус:</div>
                                <div className="col-span-7">{<Pill variant="green">Активна</Pill>}</div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                        <div className="text-[14px] font-semibold text-black/75">Календарь посещений</div>

                        <div className="mt-4 flex items-center justify-center gap-4 text-[12px] text-black/55">
                            <button type="button" className="text-[#1677ff]">←</button>
                            <div className="font-semibold text-black/65">Май 2025</div>
                            <button type="button" className="text-[#1677ff]">→</button>
                        </div>

                        <div className="mt-4 grid grid-cols-7 gap-2">
                            {Array.from({ length: 31 }, (_, i) => i + 1).map((n) => (
                                <DayCell
                                    key={n}
                                    n={n}
                                    state={calendar[n] || "none"}
                                    active={n === selectedDay}
                                    onClick={() => setSelectedDay(n)}
                                />
                            ))}
                        </div>

                        <div className="mt-4 space-y-2 text-[12px] text-black/55">
                            <div className="flex items-center gap-2">
                                <LabelDot color="bg-green-500" /> Присутствовал
                            </div>
                            <div className="flex items-center gap-2">
                                <LabelDot color="bg-red-500" /> Отсутствовал
                            </div>
                            <div className="flex items-center gap-2">
                                <LabelDot color="bg-yellow-400" /> Удаленно
                            </div>
                        </div>
                    </div>
                </div>

                {/* правая колонка */}
                <div className="md:col-span-8 space-y-5">
                    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                        <div className="text-[14px] font-semibold text-black/75">Отчет за сегодня</div>
                        <div className="mt-2 text-[12px] text-black/45">
                            5 мая 2025 г. - Заполните информацию о сегодняшнем дне практики
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-4">
                            <label className="block text-[11px] text-black/45">
                                Посещаемость
                                <input
                                    value={todayReport.attendance}
                                    onChange={(e) => setTodayReport((p) => ({ ...p, attendance: e.target.value }))}
                                    className="mt-2 h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                                />
                            </label>

                            <label className="block text-[11px] text-black/45">
                                Название задачи
                                <input
                                    value={todayReport.task}
                                    onChange={(e) => setTodayReport((p) => ({ ...p, task: e.target.value }))}
                                    className="mt-2 h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                                />
                            </label>

                            <label className="block text-[11px] text-black/45">
                                Описание работы
                                <textarea
                                    value={todayReport.description}
                                    onChange={(e) => setTodayReport((p) => ({ ...p, description: e.target.value }))}
                                    className="mt-2 h-28 w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                                />
                            </label>
                        </div>

                        <div className="mt-5 flex justify-end">
                            <button
                                type="button"
                                onClick={() => alert("Запись сохранена (демо)")}
                                className="h-9 rounded-xl bg-[#1677ff] px-4 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                            >
                                Сохранить запись
                            </button>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                        <div className="text-[14px] font-semibold text-black/75">История записей</div>
                        <div className="mt-2 text-[12px] text-black/45">Все записи в дневнике практики</div>

                        <div className="mt-4 overflow-hidden rounded-xl border border-black/5">
                            <div className="grid grid-cols-12 bg-[#fafbff] px-4 py-3 text-[11px] font-semibold text-black/50">
                                <div className="col-span-3">Дата</div>
                                <div className="col-span-5">Задача</div>
                                <div className="col-span-2">Присутствие</div>
                                <div className="col-span-2 text-right">Действия</div>
                            </div>

                            {history.map((x) => (
                                <div key={x.date} className="grid grid-cols-12 items-center px-4 py-4 text-[12px]">
                                    <div className="col-span-3 text-black/60">{x.date}</div>
                                    <div className="col-span-5 text-black/60">{x.task}</div>
                                    <div className="col-span-2">{statusPill(x.status)}</div>
                                    <div className="col-span-2 flex justify-end">
                                        <button
                                            type="button"
                                            className="h-8 rounded-lg border border-[#1677ff] bg-white px-3 text-[11px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                                            onClick={() => alert(`Редактирование: ${x.date} (демо)`)}
                                        >
                                            Редактировать
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 flex justify-end">
                            <button
                                type="button"
                                onClick={() => alert("Сохранено (демо)")}
                                className="h-9 rounded-xl bg-[#1677ff] px-4 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                            >
                                Сохранить запись
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-10" />
        </div>
    );
}