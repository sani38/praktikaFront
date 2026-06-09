import React, { useEffect, useMemo, useState } from "react";
import { Pill } from "../ui/Ui.jsx";
import { getCurrentVacancy } from "../../shared/api/vacancyApi.js";
import { getDiaryEntries, createOrUpdateDiaryEntry } from "../../shared/api/diaryEntryApi.js";

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
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentVacancy, setCurrentVacancy] = useState(null);
    const [currentVacancyLoading, setCurrentVacancyLoading] = useState(false);
    
    const [diaryEntries, setDiaryEntries] = useState([]);
    const [entriesLoading, setEntriesLoading] = useState(false);
    const [todayReport, setTodayReport] = useState({
        attendance: "",
        task: "",
        description: "",
    });

    const calendar = useMemo(() => {
        const result = {};

        diaryEntries.forEach((entry) => {
            const key = entry.workDate;
            result[key] = entry.attendance;
        });

        return result;
    }, [diaryEntries]);

    const history = useMemo(() => {
        return diaryEntries.map((entry) => ({
            id: entry.diaryEntryId,
            date: formatDate(entry.workDate),
            task: entry.taskName,
            status: entry.attendance,
            description: entry.description,
        }));
    }, [diaryEntries]);

    const statusPill = (s) => {
        if (s === "present") return <Pill variant="green">Присутствовал</Pill>;
        if (s === "absent") return <Pill variant="red">Отсутствовал</Pill>;
        if (s === "remote") return <Pill variant="gray">Удаленно</Pill>;

        return <Pill variant="gray">—</Pill>;
    };

    function previousMonth() {
        setCurrentDate((prev) =>
            new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
        );
    }

    function nextMonth() {
        setCurrentDate((prev) =>
            new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
        );
    }

    function getDateKey(day) {
        const date = new Date(year, month, day);
        return date.toLocaleDateString("en-CA");
    }

    function formatDate(date) {
        if (!date) return "—";
        return new Date(date).toLocaleDateString("ru-RU");
    }

    async function saveDiaryEntry() {
        try {
            const today = new Date().toISOString().slice(0, 10);

            await createOrUpdateDiaryEntry({
                workDate: today,
                attendance: todayReport.attendance,
                taskName: todayReport.task,
                description: todayReport.description,
            });

            const data = await getDiaryEntries();
            setDiaryEntries(Array.isArray(data) ? data : []);

            alert("Запись сохранена");
        } catch (error) {
            console.error("Ошибка сохранения записи дневника:", error);
            alert("Ошибка при сохранении записи");
        }
    }

    useEffect(() => {
        async function loadCurrentVacancy() {
            try {
                setCurrentVacancyLoading(true);

                const data = await getCurrentVacancy();

                setCurrentVacancy(data);
            } catch (error) {
                console.error("Ошибка загрузки текущей практики:", error);
                setCurrentVacancy(null);
            } finally {
                setCurrentVacancyLoading(false);
            }
        }

        loadCurrentVacancy();
    }, []);

    useEffect(() => {
        async function loadDiaryEntries() {
            try {
                setEntriesLoading(true);

                const data = await getDiaryEntries();

                setDiaryEntries(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Ошибка загрузки записей дневника:", error);
                setDiaryEntries([]);
            } finally {
                setEntriesLoading(false);
            }
        }

        loadDiaryEntries();
    }, []);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthName = currentDate.toLocaleDateString("ru-RU", {
        month: "long",
        year: "numeric",
    });

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const firstDay = new Date(year, month, 1).getDay();
    const offset = firstDay === 0 ? 6 : firstDay - 1;

    console.log(currentDate);
    console.log(monthName);
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
                        Скачать дневник
                    </button>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-12">
                {/* ЛЕВАЯ КОЛОНКА */}
                <div className="md:col-span-4 space-y-5">
                    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                        <div className="text-[14px] font-semibold text-black/75">Текущая практика</div>
                        <div className="mt-1 text-[12px] text-black/45">Информация о текущей практике</div>

                        {currentVacancyLoading && (
                            <div className="mt-4 text-[12px] text-black/45">Загрузка...</div>
                        )}

                        {!currentVacancyLoading && !currentVacancy && (
                            <div className="mt-4 text-[12px] text-black/45">
                                Текущая практика не найдена
                            </div>
                        )}

                        {!currentVacancyLoading && currentVacancy && (
                            <>
                                <div className="mt-4">
                                    <Pill variant="blue">{currentVacancy.companyName}</Pill>
                                    <div className="mt-3 text-[14px] font-semibold text-black/75">
                                        {currentVacancy.jobTitle}
                                    </div>
                                </div>

                                <div className="mt-4 text-[12px] text-black/55">
                                    <div className="grid grid-cols-12 py-1">
                                        <div className="col-span-5 text-black/45">Период:</div>
                                        <div className="col-span-7 font-semibold text-black/60">
                                            {formatDate(currentVacancy.startDate)} - {formatDate(currentVacancy.endDate)}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-12 py-1">
                                        <div className="col-span-5 text-black/45">Руководитель:</div>
                                        <div className="col-span-7 font-semibold text-black/60">
                                            {currentVacancy.supervisorFullName}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-12 py-1">
                                        <div className="col-span-5 text-black/45">Статус:</div>
                                        <div className="col-span-7">
                                            <Pill variant="green">Активна</Pill>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                        <div className="text-[14px] font-semibold text-black/75">Календарь посещений</div>

                        <div className="mt-4 flex items-center justify-center gap-4 text-[12px] text-black/55">
                            <button
                                type="button"
                                onClick={previousMonth}
                                className="text-[#1677ff]"
                            >
                                ←
                            </button>

                            <div
                                key={`${year}-${month}`}
                                className="font-semibold text-black/65"
                            >
                                {monthName}
                            </div>

                            <button
                                type="button"
                                onClick={nextMonth}
                                className="text-[#1677ff]"
                            >
                                →
                            </button>
                        </div>

                        <div key={`${year}-${month}`} className="mt-4 grid grid-cols-7 gap-2">
                            {[
                                ...Array(offset).fill(null),
                                ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
                            ].map((n, index) => {
                                if (n === null) {
                                    return <div key={`empty-${year}-${month}-${index}`} />;
                                }

                                const dateKey = getDateKey(n);

                                return (
                                    <DayCell
                                        key={dateKey}
                                        n={n}
                                        state={calendar[dateKey] || "none"}
                                        active={n === selectedDay}
                                        onClick={() => setSelectedDay(n)}
                                    />
                                );
                            })}
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
                                <select
                                    value={todayReport.attendance}
                                    onChange={(e) => setTodayReport((p) => ({ ...p, attendance: e.target.value }))}
                                    className="mt-2 h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                                >
                                    <option value="">Выберите</option>
                                    <option value="present">Присутствовал</option>
                                    <option value="absent">Отсутствовал</option>
                                    <option value="remote">Удаленно</option>
                                </select>
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
                                onClick={saveDiaryEntry}
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
                            </div>

                            {history.map((x) => (
                                <div key={x.date} className="grid grid-cols-12 items-center px-4 py-4 text-[12px]">
                                    <div className="col-span-3 text-black/60">{x.date}</div>
                                    <div className="col-span-5 text-black/60">{x.task}</div>
                                    <div className="col-span-2">{statusPill(x.status)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-10" />
        </div>
    );
}