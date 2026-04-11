import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { contracts } from "../data/contracts.js";
import { Pill } from "../ui/Ui.jsx";

function StatusPill({ status }) {
    if (status === "На подписании") return <Pill variant="blue">На подписании</Pill>;
    if (status === "Активный") return <Pill variant="green">Активный</Pill>;
    return <Pill variant="gray">Завершен</Pill>;
}

function SmallStat({ title, value }) {
    return (
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="text-[12px] text-black/45">{title}</div>
            <div className="mt-2 text-[24px] font-semibold text-[#1677ff]">{value}</div>
        </div>
    );
}

function Step({ n, title, desc }) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#eef5ff] text-[12px] font-semibold text-[#1677ff]">
                {n}
            </div>
            <div>
                <div className="text-[12px] font-semibold text-black/70">{title}</div>
                <div className="mt-1 text-[12px] leading-6 text-black/45">{desc}</div>
            </div>
        </div>
    );
}

export default function StudentContractsPage() {
    const navigate = useNavigate();

    const stats = useMemo(() => {
        const active = contracts.filter((c) => c.status === "Активный").length;
        const signing = contracts.filter((c) => c.status === "На подписании").length;
        const finished = contracts.filter((c) => c.status === "Завершен").length;
        return { active, signing, finished };
    }, []);

    const downloadTxt = (c) => {
        const text = `${c.content}\n\n---\nПрактика: ${c.internshipName}\nКомпания: ${c.company}\nПериод: ${c.period}\n`;
        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `contract-${c.id}.txt`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="py-8">
            <h1 className="text-[20px] font-semibold text-black/80">Мои договора</h1>

            <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                <div className="text-[14px] font-semibold text-black/75">Договоры о прохождении практики</div>
                <div className="mt-2 text-[12px] text-black/45">
                    Здесь вы можете просмотреть все ваши договоры на прохождение практики
                </div>

                <div className="mt-5 overflow-hidden rounded-xl border border-black/5">
                    <div className="grid grid-cols-12 bg-[#fafbff] px-4 py-3 text-[11px] font-semibold text-black/50">
                        <div className="col-span-3">Название практики</div>
                        <div className="col-span-3">Компания</div>
                        <div className="col-span-3">Период</div>
                        <div className="col-span-2">Статус</div>
                        <div className="col-span-1 text-right">Действия</div>
                    </div>

                    {contracts.map((c) => (
                        <div key={c.id} className="grid grid-cols-12 items-center px-4 py-4 text-[12px]">
                            <div className="col-span-3 text-black/65">{c.internshipName}</div>
                            <div className="col-span-3 text-black/65">{c.company}</div>
                            <div className="col-span-3 text-black/55">{c.period}</div>
                            <div className="col-span-2">
                                <StatusPill status={c.status} />
                            </div>
                            <div className="col-span-1">
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => downloadTxt(c)}
                                        className="h-8 rounded-lg border border-[#1677ff] bg-white px-3 text-[11px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                                    >
                                        Скачать
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => navigate(`/student/contracts/${c.id}`)}
                                        className="h-8 rounded-lg bg-[#1677ff] px-3 text-[11px] font-semibold text-white hover:bg-[#0f66e6] transition"
                                    >
                                        Подписать
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 text-[14px] font-semibold text-black/75">Информация о договорах</div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <SmallStat title="Активные договоры" value={stats.active} />
                <SmallStat title="На подписании" value={stats.signing} />
                <SmallStat title="Завершенные" value={stats.finished} />
            </div>

            <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                <div className="text-[14px] font-semibold text-black/75">
                    Как работает процесс заключения договора
                </div>

                <div className="mt-5 space-y-4">
                    <Step n={1} title="Подача заявки на практику" desc="Вы находите интересную практику и откликаетесь на нее" />
                    <Step n={2} title="Одобрение работодателем" desc="Работодатель рассматривает вашу заявку и принимает решение" />
                    <Step n={3} title="Оформление договора" desc="После одобрения формируется договор о прохождении практики" />
                    <Step n={4} title="Подписание сторонами" desc="Договор подписывается вами, представителем компании и университета" />
                    <Step n={5} title="Прохождение практики" desc="После подписания вы приступаете к прохождению практики" />
                </div>
            </div>

            <div className="h-10" />
        </div>
    );
}