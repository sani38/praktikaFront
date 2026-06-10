import React from "react";
import { Pill } from "../ui/CareerUi.jsx";

function ActionCard({ title, desc }) {
    return (
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="text-[14px] font-semibold text-black/80">{title}</div>
            <div className="mt-1 text-[12px] leading-5 text-black/45">{desc}</div>
            <button
                type="button"
                className="mt-4 group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1677ff] px-4 py-2.5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
            >
                Перейти <span className="transition group-hover:translate-x-0.5">→</span>
            </button>
        </div>
    );
}

function DiaryCard({ name, status, variant }) {
    return (
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="text-[12px] font-semibold text-black/75">{name}</div>
            <div className="mt-2">
                <Pill variant={variant}>{status}</Pill>
            </div>
            <div className="mt-3 text-[11px] text-black/55">Стажер в IT-отдел</div>
            <div className="mt-2 text-[11px] text-black/40">Дата: 10.04.2025</div>
            <button
                type="button"
                className="mt-4 h-9 w-full rounded-xl border border-[#1677ff] bg-white text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
            >
                Открыть отчет
            </button>
        </div>
    );
}

export default function CareerDashboardPage() {
    return (
        <div className="py-10">
            <h1 className="text-[20px] font-semibold text-black/80">Личный кабинет центра карьеры</h1>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <ActionCard title="Студенты" desc="Просмотр и управление студентами" />
                <ActionCard title="Работодатели" desc="Просмотр и управление работодателями" />
                <ActionCard title="Договора" desc="Просмотр и согласование договоров практики" />
                <ActionCard title="Дневник практики" desc="Просмотр и согласование дневников практики" />
            </div>

            <div className="mt-8 text-[14px] font-semibold text-black/75">Дневники практик</div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
                <DiaryCard name="Алия Нурлановна" status="Присутствовал(-а)" variant="green" />
                <DiaryCard name="Андас Малика" status="Удаленно" variant="yellow" />
                <DiaryCard name="Курбанова Сания" status="Удаленно" variant="yellow" />
                <DiaryCard name="Еркебулан Сабитов" status="Отсутствовал(-а)" variant="red" />
            </div>

            <div className="h-10" />
        </div>
    );
}