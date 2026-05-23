import React from "react";
import { useNavigate } from "react-router-dom";

function ActionCard({ title, desc, to }) {
    const navigate = useNavigate();
    return (
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="text-[14px] font-semibold text-black/80">{title}</div>
            <div className="mt-1 text-[12px] leading-5 text-black/45">{desc}</div>

            <button
                type="button"
                onClick={() => navigate(to)}
                className="mt-4 group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1677ff] px-4 py-2.5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
            >
                Перейти <span className="transition group-hover:translate-x-0.5">→</span>
            </button>
        </div>
    );
}

export default function AdminDashboardPage() {
    return (
        <div className="py-10">
            <h1 className="text-[20px] font-semibold text-black/80">Панель управления администратора</h1>
            <div className="mt-1 text-[12px] text-black/45">
                Управляйте пользователями, просматривайте логи и настраивайте систему
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <ActionCard
                    title="Управление пользователями"
                    desc="Просмотр, редактирование и удаление пользователей системы"
                    to="/admin/users"
                />
                <ActionCard
                    title="Подтверждение регистрации"
                    desc="Подтверждение новых регистраций и назначение ролей"
                    to="/admin/approvals"
                />
                <ActionCard
                    title="Логи системы"
                    desc="Мониторинг действий пользователей и ошибок системы"
                    to="/admin/logs"
                />
                <ActionCard
                    title="Настройки системы"
                    desc="Конфигурация параметров системы"
                    to="/admin/settings"
                />
            </div>

            <div className="h-10" />
        </div>
    );
}