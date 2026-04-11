import React, { useMemo, useState } from "react";
import { Modal, Pill } from "../ui/AdminUi.jsx";

function Select({ value, onChange, children, className = "" }) {
    return (
        <select
            value={value}
            onChange={onChange}
            className={`h-9 rounded-xl border border-black/10 bg-white px-3 text-[12px] text-black/60 outline-none focus:border-[#1677ff] ${className}`}
        >
            {children}
        </select>
    );
}

function IconEdit() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92 2.83H5v-.92l9.06-9.06.92.92-9.06 9.06zM20.71 7.04a1.003 1.003 0 0 0 0-1.42L18.37 3.29a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.83z" />
        </svg>
    );
}
function IconBan() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm6.93 9H13V5.07A8.013 8.013 0 0 1 18.93 11zM11 5.07V11H5.07A8.013 8.013 0 0 1 11 5.07zM5.07 13H11v5.93A8.013 8.013 0 0 1 5.07 13zM13 18.93V13h5.93A8.013 8.013 0 0 1 13 18.93z" />
        </svg>
    );
}
function IconTrash() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <path d="M6 7h12l-1 14H7L6 7zm3-3h6l1 2H8l1-2z" />
        </svg>
    );
}

function RolePill({ role }) {
    const map = {
        Студент: "info",
        Работодатель: "blue",
        "Центр карьеры": "yellow",
        Администратор: "gray",
    };
    const v = map[role] || "gray";
    // В AdminUi нет blue/yellow в pill — используем info/gray/green/red/yellow из AdminUi:
    // поэтому нормализуем:
    const variant = v === "blue" ? "info" : v;
    return <Pill variant={variant}>{role}</Pill>;
}

function StatusPill({ status }) {
    if (status === "Активен") return <Pill variant="green">{status}</Pill>;
    if (status === "Заблокирован") return <Pill variant="red">{status}</Pill>;
    if (status === "Ожидает подтверждения") return <Pill variant="yellow">{status}</Pill>;
    return <Pill variant="gray">{status}</Pill>;
}

export default function AdminUsersPage() {
    const [q, setQ] = useState("");
    const [roleFilter, setRoleFilter] = useState("Все роли");
    const [statusFilter, setStatusFilter] = useState("Все статусы");

    const [users, setUsers] = useState(() => [
        { id: 1, user: "Алия Нурланова", email: "aliya@student.su.kz", role: "Студент", status: "Активен", date: "10.04.2025" },
        { id: 2, user: "Данияр Турсунов", email: "daniyar@student.su.kz", role: "Студент", status: "Активен", date: "15.04.2025" },
        { id: 3, user: "HR TechLine", email: "hr@techline.kz", role: "Работодатель", status: "Активен", date: "01.03.2025" },
        { id: 4, user: "Career Center", email: "career@su.kz", role: "Центр карьеры", status: "Активен", date: "05.02.2025" },
        { id: 5, user: "Admin", email: "admin@praktika.kz", role: "Администратор", status: "Активен", date: "01.01.2025" },
        { id: 6, user: "New User", email: "new@user.com", role: "Студент", status: "Ожидает подтверждения", date: "20.05.2025" },
        { id: 7, user: "Employer Demo", email: "demo@company.kz", role: "Работодатель", status: "Заблокирован", date: "12.02.2025" },
    ]);

    const filtered = useMemo(() => {
        const qq = q.trim().toLowerCase();
        return users.filter((u) => {
            const matchesQ = !qq || u.user.toLowerCase().includes(qq) || u.email.toLowerCase().includes(qq);
            const matchesRole = roleFilter === "Все роли" || u.role === roleFilter;
            const matchesStatus = statusFilter === "Все статусы" || u.status === statusFilter;
            return matchesQ && matchesRole && matchesStatus;
        });
    }, [q, roleFilter, statusFilter, users]);

    // ---- Modals state
    const [editOpen, setEditOpen] = useState(false);
    const [blockOpen, setBlockOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [current, setCurrent] = useState(null);

    // Edit form
    const [fName, setFName] = useState("");
    const [fEmail, setFEmail] = useState("");
    const [fRole, setFRole] = useState("Студент");
    const [fStatus, setFStatus] = useState("Активен");

    const openEdit = (u) => {
        setCurrent(u);
        setFName(u.user);
        setFEmail(u.email);
        setFRole(u.role);
        setFStatus(u.status);
        setEditOpen(true);
    };

    const saveEdit = () => {
        if (!current) return;
        setUsers((prev) =>
            prev.map((x) =>
                x.id === current.id
                    ? { ...x, user: fName.trim() || x.user, email: fEmail.trim() || x.email, role: fRole, status: fStatus }
                    : x
            )
        );
        setEditOpen(false);
    };

    const openBlock = (u) => {
        setCurrent(u);
        setBlockOpen(true);
    };

    const confirmBlock = () => {
        if (!current) return;
        setUsers((prev) =>
            prev.map((x) =>
                x.id === current.id
                    ? { ...x, status: x.status === "Заблокирован" ? "Активен" : "Заблокирован" }
                    : x
            )
        );
        setBlockOpen(false);
    };

    const openDelete = (u) => {
        setCurrent(u);
        setDeleteOpen(true);
    };

    const confirmDelete = () => {
        if (!current) return;
        setUsers((prev) => prev.filter((x) => x.id !== current.id));
        setDeleteOpen(false);
    };

    return (
        <div className="py-10">
            <div className="text-[12px] text-[#1677ff]">Пользователи</div>
            <h1 className="mt-2 text-[20px] font-semibold text-black/80">Управление пользователями</h1>
            <div className="mt-1 text-[12px] text-black/45">
                Просмотр и управление всеми зарегистрированными пользователями системы
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Поиск по имени или Email..."
                    className="h-10 flex-1 min-w-[280px] rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                />

                <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                    <option>Все роли</option>
                    <option>Студент</option>
                    <option>Работодатель</option>
                    <option>Центр карьеры</option>
                    <option>Администратор</option>
                </Select>

                <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option>Все статусы</option>
                    <option>Активен</option>
                    <option>Заблокирован</option>
                    <option>Ожидает подтверждения</option>
                </Select>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-black/5 bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[980px] border-collapse text-left">
                        <thead className="bg-[#f6f7fb]">
                            <tr className="text-[11px] font-semibold text-black/55">
                                <th className="px-4 py-3">Пользователь</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Роль</th>
                                <th className="px-4 py-3">Статус</th>
                                <th className="px-4 py-3">Дата регистрации</th>
                                <th className="px-4 py-3">Действия</th>
                            </tr>
                        </thead>

                        <tbody className="text-[12px] text-black/70">
                            {filtered.map((u) => (
                                <tr key={u.id} className="border-t border-black/5">
                                    <td className="px-4 py-4">{u.user}</td>
                                    <td className="px-4 py-4">{u.email}</td>
                                    <td className="px-4 py-4">
                                        <RolePill role={u.role} />
                                    </td>
                                    <td className="px-4 py-4">
                                        <StatusPill status={u.status} />
                                    </td>
                                    <td className="px-4 py-4">{u.date}</td>

                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white text-black/60 hover:bg-black/5"
                                                title="Редактировать"
                                                onClick={() => openEdit(u)}
                                            >
                                                <IconEdit />
                                            </button>

                                            <button
                                                type="button"
                                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white text-black/60 hover:bg-black/5"
                                                title={u.status === "Заблокирован" ? "Разблокировать" : "Заблокировать"}
                                                onClick={() => openBlock(u)}
                                            >
                                                <IconBan />
                                            </button>

                                            <button
                                                type="button"
                                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white text-[#d92d20] hover:bg-[#fff0f0]"
                                                title="Удалить"
                                                onClick={() => openDelete(u)}
                                            >
                                                <IconTrash />
                                            </button>
                                        </div>
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

            {/* ---- Modals */}
            <Modal open={editOpen} title="Редактировать пользователя" onClose={() => setEditOpen(false)}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <div className="text-[11px] text-black/45">Пользователь</div>
                        <input
                            value={fName}
                            onChange={(e) => setFName(e.target.value)}
                            className="mt-2 h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                        />
                    </div>

                    <div>
                        <div className="text-[11px] text-black/45">Email</div>
                        <input
                            value={fEmail}
                            onChange={(e) => setFEmail(e.target.value)}
                            className="mt-2 h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                        />
                    </div>

                    <div>
                        <div className="text-[11px] text-black/45">Роль</div>
                        <Select value={fRole} onChange={(e) => setFRole(e.target.value)} className="mt-2 h-10 w-full">
                            <option>Студент</option>
                            <option>Работодатель</option>
                            <option>Центр карьеры</option>
                            <option>Администратор</option>
                        </Select>
                    </div>

                    <div>
                        <div className="text-[11px] text-black/45">Статус</div>
                        <Select value={fStatus} onChange={(e) => setFStatus(e.target.value)} className="mt-2 h-10 w-full">
                            <option>Активен</option>
                            <option>Заблокирован</option>
                            <option>Ожидает подтверждения</option>
                        </Select>
                    </div>
                </div>

                <div className="mt-5 flex items-center justify-end gap-2">
                    <button
                        type="button"
                        onClick={() => setEditOpen(false)}
                        className="h-9 rounded-xl border border-black/10 bg-white px-4 text-[12px] font-semibold text-black/60 hover:bg-black/5"
                    >
                        Отмена
                    </button>
                    <button
                        type="button"
                        onClick={saveEdit}
                        className="h-9 rounded-xl bg-[#1677ff] px-5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                    >
                        Сохранить
                    </button>
                </div>
            </Modal>

            <Modal open={blockOpen} title="Изменить статус пользователя" onClose={() => setBlockOpen(false)}>
                <div className="text-[12px] text-black/60">
                    Пользователь: <span className="font-semibold text-black/75">{current?.user}</span>
                </div>
                <div className="mt-2 text-[12px] text-black/45">
                    Действие:{" "}
                    <span className="font-semibold">
                        {current?.status === "Заблокирован" ? "Разблокировать" : "Заблокировать"}
                    </span>
                </div>

                <div className="mt-5 flex items-center justify-end gap-2">
                    <button
                        type="button"
                        onClick={() => setBlockOpen(false)}
                        className="h-9 rounded-xl border border-black/10 bg-white px-4 text-[12px] font-semibold text-black/60 hover:bg-black/5"
                    >
                        Отмена
                    </button>
                    <button
                        type="button"
                        onClick={confirmBlock}
                        className="h-9 rounded-xl bg-[#1677ff] px-5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                    >
                        Подтвердить
                    </button>
                </div>
            </Modal>

            <Modal open={deleteOpen} title="Удалить пользователя" onClose={() => setDeleteOpen(false)}>
                <div className="text-[12px] text-black/60">
                    Вы уверены, что хотите удалить пользователя{" "}
                    <span className="font-semibold text-black/75">{current?.user}</span>?
                </div>
                <div className="mt-2 text-[12px] text-[#d92d20] font-semibold">
                    Действие необратимо (демо).
                </div>

                <div className="mt-5 flex items-center justify-end gap-2">
                    <button
                        type="button"
                        onClick={() => setDeleteOpen(false)}
                        className="h-9 rounded-xl border border-black/10 bg-white px-4 text-[12px] font-semibold text-black/60 hover:bg-black/5"
                    >
                        Отмена
                    </button>
                    <button
                        type="button"
                        onClick={confirmDelete}
                        className="h-9 rounded-xl bg-[#d92d20] px-5 text-[12px] font-semibold text-white hover:brightness-95"
                    >
                        Удалить
                    </button>
                </div>
            </Modal>

            <div className="h-10" />
        </div>
    );
}