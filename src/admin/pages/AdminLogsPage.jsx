import React, { useMemo, useState } from "react";
import { Modal, Pill } from "../ui/AdminUi.jsx";

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

function downloadCsv(filename, rows) {
    const escapeCell = (v) => {
        const s = String(v ?? "");
        const escaped = s.replace(/"/g, '""');
        return `"${escaped}"`;
    };

    const csv = rows
        .map((r) => r.map(escapeCell).join(","))
        .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
}

export default function AdminLogsPage() {
    const [q, setQ] = useState("");
    const [level, setLevel] = useState("Все уровни");
    const [type, setType] = useState("Все типы");

    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState("");

    const [rows, setRows] = useState(() => [
        {
            dt: "2025-03-15 14:32:45",
            user: "student1@example.com",
            action: "user.login",
            level: "Информация",
            details: "Успешный вход в систему",
        },
        {
            dt: "2025-03-15 14:40:10",
            user: "admin@praktika.kz",
            action: "settings.update",
            level: "Информация",
            details: "Обновлены настройки системы",
        },
    ]);

    const filtered = useMemo(() => {
        const qq = q.trim().toLowerCase();
        return rows.filter((r) => {
            const matchesQ =
                !qq ||
                r.user.toLowerCase().includes(qq) ||
                r.action.toLowerCase().includes(qq) ||
                r.details.toLowerCase().includes(qq);

            const matchesLevel = level === "Все уровни" || r.level === level;
            const matchesType = type === "Все типы" || r.action === type;

            return matchesQ && matchesLevel && matchesType;
        });
    }, [q, level, type, rows]);

    const exportCsv = () => {
        const header = ["Дата и время", "Пользователь", "Действие", "Уровень", "Детали"];
        const body = filtered.map((r) => [r.dt, r.user, r.action, r.level, r.details]);
        downloadCsv("system_logs.csv", [header, ...body]);
    };

    const refresh = () => {
        // демо: добавляем запись
        const now = new Date();
        const pad = (n) => String(n).padStart(2, "0");
        const dt = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(
            now.getMinutes()
        )}:${pad(now.getSeconds())}`;

        setRows((prev) => [
            {
                dt,
                user: "student2@example.com",
                action: "user.logout",
                level: "Информация",
                details: "Выход из системы",
            },
            ...prev,
        ]);
    };

    return (
        <div className="py-10">
            <div className="text-[12px] text-[#1677ff]">Логи системы</div>
            <h1 className="mt-2 text-[20px] font-semibold text-black/80">Логи системы</h1>
            <div className="mt-1 text-[12px] text-black/45">Мониторинг действий пользователей и системных событий</div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <div className="text-[14px] font-semibold text-black/75">Журнал событий</div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={refresh}
                        className="h-9 rounded-xl border border-black/10 bg-white px-4 text-[12px] font-semibold text-black/60 hover:bg-black/5"
                    >
                        Обновить
                    </button>
                    <button
                        onClick={exportCsv}
                        className="h-9 rounded-xl border border-black/10 bg-white px-4 text-[12px] font-semibold text-black/60 hover:bg-black/5"
                    >
                        Экспорт
                    </button>
                </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Поиск в логах..."
                    className="h-10 flex-1 min-w-[280px] rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                />
                <Select value={level} onChange={(e) => setLevel(e.target.value)}>
                    <option>Все уровни</option>
                    <option>Информация</option>
                    <option>Предупреждение</option>
                    <option>Ошибка</option>
                </Select>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <option>Все типы</option>
                    <option>user.login</option>
                    <option>user.logout</option>
                    <option>settings.update</option>
                </Select>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-black/5 bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[880px] border-collapse text-left">
                        <thead className="bg-[#f6f7fb]">
                            <tr className="text-[11px] font-semibold text-black/55">
                                <th className="px-4 py-3">Дата и время</th>
                                <th className="px-4 py-3">Пользователь</th>
                                <th className="px-4 py-3">Действие</th>
                                <th className="px-4 py-3">Уровень</th>
                                <th className="px-4 py-3">Детали</th>
                                <th className="px-4 py-3">Действия</th>
                            </tr>
                        </thead>

                        <tbody className="text-[12px] text-black/70">
                            {filtered.map((r, i) => (
                                <tr key={i} className="border-t border-black/5">
                                    <td className="px-4 py-4">{r.dt}</td>
                                    <td className="px-4 py-4">{r.user}</td>
                                    <td className="px-4 py-4">{r.action}</td>
                                    <td className="px-4 py-4">
                                        <Pill variant="info">{r.level}</Pill>
                                    </td>
                                    <td className="px-4 py-4">{r.details}</td>
                                    <td className="px-4 py-4">
                                        <button
                                            type="button"
                                            className="h-8 rounded-xl bg-[#1677ff] px-4 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                                            onClick={() => {
                                                setDetails(
                                                    `Дата: ${r.dt}\nПользователь: ${r.user}\nДействие: ${r.action}\nУровень: ${r.level}\nДетали: ${r.details}`
                                                );
                                                setOpen(true);
                                            }}
                                        >
                                            Смотреть
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-10 text-center text-[12px] text-black/45">
                                        Ничего не найдено
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination (демо) */}
            <div className="mt-8 flex items-center justify-center gap-2 text-[12px] text-black/45">
                <button className="h-8 w-8 rounded-lg border border-black/10 bg-white hover:bg-black/5">←</button>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1677ff] text-white">1</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white">2</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white">3</span>
                <span className="px-2">…</span>
                <span className="flex h-8 items-center rounded-lg border border-black/10 bg-white px-3">123</span>
                <button className="h-8 w-8 rounded-lg border border-black/10 bg-white hover:bg-black/5">→</button>
            </div>

            <Modal open={open} title="Детали события" onClose={() => setOpen(false)}>
                <textarea
                    readOnly
                    value={details}
                    className="h-[220px] w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-[12px] leading-5 text-black/70 outline-none"
                />
                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="h-9 rounded-xl border border-black/10 bg-white px-4 text-[12px] font-semibold text-black/60 hover:bg-black/5"
                    >
                        Закрыть
                    </button>
                </div>
            </Modal>

            <div className="h-10" />
        </div>
    );
}