import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ title, desc, onClick }) {
    return (
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="text-[14px] font-semibold text-black/80">{title}</div>
            <div className="mt-1 text-[12px] leading-5 text-black/45">{desc}</div>

            <div className="mt-4">
                <button
                    type="button"
                    onClick={onClick}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1677ff] px-4 py-2.5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                >
                    <span>Перейти</span>
                    <span className="inline-flex translate-x-0 transition group-hover:translate-x-0.5">→</span>
                </button>
            </div>
        </div>
    );
}

export default function StudentCabinetPage() {
    const navigate = useNavigate();

    const cards = [
        { title: "Поиск практики", desc: "Найдите подходящую практику или стажировку", to: "/student/internships" },
        { title: "Мои заявки", desc: "Просмотр статуса поданных заявок на практику", to: "/student/applications" },
        { title: "Работодатели", desc: "Изучите компании, предлагающие практику", to: "/student/employers" },
        { title: "Мои договоры", desc: "Управление договорами на прохождение практики", to: "/student/contracts" },
        { title: "Создать резюме", desc: "Создайте и обновите ваше профессиональное резюме", to: "/student/resume" },
        { title: "Дневник практики", desc: "Ведите дневник практики и отмечайте посещаемость", to: "/student/diary" },
    ];

    return (
        <div className="min-h-screen bg-[#f6f7fb]">
            <main className="mx-auto max-w-6xl px-6">
                <div className="py-10">
                    <h1 className="text-[20px] font-semibold text-black/80">Личный кабинет студента</h1>

                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                        {cards.map((c) => (
                            <Card key={c.title} title={c.title} desc={c.desc} onClick={() => navigate(c.to)} />
                        ))}
                    </div>
                </div>

                <div className="h-8" />
            </main>
        </div>
    );
}
