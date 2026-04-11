import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pill } from "../ui/CareerUi.jsx";

function StatusPill({ status }) {
    if (status === "На согласовании") return <Pill variant="yellow">{status}</Pill>;
    if (status === "Подписан") return <Pill variant="green">{status}</Pill>;
    if (status === "Отклонён") return <Pill variant="red">{status}</Pill>;
    return <Pill variant="gray">{status}</Pill>;
}

function SignRow({ label, status }) {
    const map = {
        "Ожидает подписания": "gray",
        "Подписано": "green",
        "Отклонено": "red",
    };
    return (
        <div className="flex items-center justify-between gap-3 border-t border-black/5 py-3">
            <div className="text-[12px] text-black/60">{label}</div>
            <Pill variant={map[status] || "gray"}>{status}</Pill>
        </div>
    );
}

function Modal({ open, title, children, onClose }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/30" onClick={onClose} />
            <div className="relative w-full max-w-[640px] rounded-2xl bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                <div className="flex items-start justify-between gap-3">
                    <div className="text-[14px] font-semibold text-black/80">{title}</div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-8 w-8 rounded-lg border border-black/10 bg-white text-black/60 hover:bg-black/5"
                        aria-label="Закрыть"
                    >
                        ×
                    </button>
                </div>
                <div className="mt-4">{children}</div>
            </div>
        </div>
    );
}

export default function CareerContractDetailsPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const contract = useMemo(
        () => ({
            id,
            position: "Стажер-разработчик",
            period: "15.04.2024 - 15.07.2024",
            student: "Алексей Иванов",
            employer: "ТехноСервис Казахстан",
            university: "Казахский национальный университет",
            status: "На согласовании",
            sign: {
                student: "Ожидает подписания",
                employer: "Ожидает подписания",
                university: "Ожидает подписания",
            },
            text: `ДОГОВОР №${id}
о прохождении профессиональной практики

г. Алматы «26» мая 2025 г.
Казахский национальный университет, именуемый в дальнейшем «Университет», с одной стороны, и
ТехноСервис Казахстан, именуемое в дальнейшем «Предприятие», с другой стороны, и студент Алексей Иванов, именуемый в дальнейшем «Практикант», совместно именуемые «Стороны», заключили настоящий Договор о нижеследующем:

1. ПРЕДМЕТ ДОГОВОРА
1.1. Университет направляет Практиканта для прохождения профессиональной практики в качестве Стажер-разработчик на Предприятие.
1.2. Период прохождения практики: с 15.04.2024 по 15.07.2024.

2. ОБЯЗАННОСТИ СТОРОН
(текст демонстрационный)…`,
        }),
        [id]
    );

    const [status, setStatus] = useState(contract.status);
    const [sign, setSign] = useState(contract.sign);
    const [openReject, setOpenReject] = useState(false);
    const [rejectReason, setRejectReason] = useState("");

    const canApprove = status !== "Подписан" && status !== "Отклонён";

    const approve = () => {
        setStatus("Подписан");
        setSign({ student: "Подписано", employer: "Подписано", university: "Подписано" });
    };

    const reject = () => {
        setStatus("Отклонён");
        setSign({ student: "Отклонено", employer: "Отклонено", university: "Отклонено" });
        setOpenReject(false);
    };

    return (
        <div className="py-10">
            <button
                type="button"
                onClick={() => navigate("/career/contracts")}
                className="text-[12px] text-black/50 hover:text-black/70"
            >
                ← Договора
            </button>

            <div className="mt-2 text-[12px] text-black/45">Подписание договора</div>
            <h1 className="mt-1 text-[20px] font-semibold text-black/80">
                Подписание договора №{id}
            </h1>

            <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <div className="text-[14px] font-semibold text-black/80">Информация о договоре</div>
                        <div className="mt-1 text-[12px] text-black/45">Проверьте данные перед согласованием</div>
                    </div>
                    <StatusPill status={status} />
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Основная информация */}
                    <div className="rounded-2xl border border-black/5 bg-white">
                        <div className="px-5 py-4 text-[12px] font-semibold text-black/70">Основная информация</div>
                        <div className="border-t border-black/5">
                            {[
                                ["Номер договора", id],
                                ["Позиция", contract.position],
                                ["Период практики", contract.period],
                                ["Студент", contract.student],
                                ["Работодатель", contract.employer],
                                ["Университет", contract.university],
                            ].map(([k, v]) => (
                                <div key={k} className="grid grid-cols-2 gap-4 border-t border-black/5 px-5 py-3">
                                    <div className="text-[12px] text-black/45">{k}</div>
                                    <div className="text-[12px] text-black/70">{v}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Статус подписания */}
                    <div className="rounded-2xl border border-black/5 bg-white p-5">
                        <div className="text-[12px] font-semibold text-black/70">Статус подписания</div>

                        <div className="mt-3">
                            <SignRow label="Студент" status={sign.student} />
                            <SignRow label="Работодатель" status={sign.employer} />
                            <SignRow label="Университет" status={sign.university} />
                        </div>

                        <div className="mt-4 rounded-2xl bg-[#eef5ff] p-4 text-[12px] text-[#1677ff]">
                            <div className="font-semibold">Информация о подписании</div>
                            <div className="mt-1 text-[11px] leading-5 text-[#1677ff]/90">
                                Для согласования договора убедитесь, что данные корректны. (Демо-блок)
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Содержание договора */}
            <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                <div className="text-[14px] font-semibold text-black/80">Содержание договора</div>
                <div className="mt-2 text-[12px] font-semibold text-[#ff3b30]">
                    Внимательно проверьте информацию перед согласованием!
                </div>

                <div className="mt-4 rounded-2xl border border-black/10 bg-white p-4">
                    <textarea
                        readOnly
                        value={contract.text}
                        className="h-[240px] w-full resize-none bg-transparent text-[12px] leading-5 text-black/70 outline-none"
                    />
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
                    {status === "Подписан" ? (
                        <>
                            <button
                                type="button"
                                className="h-10 cursor-not-allowed rounded-xl bg-black/10 px-5 text-[12px] font-semibold text-black/40"
                                disabled
                            >
                                Договор подписан
                            </button>
                            <button
                                type="button"
                                onClick={() => setOpenReject(true)}
                                className="h-10 rounded-xl border border-[#ff3b30] bg-white px-5 text-[12px] font-semibold text-[#ff3b30] hover:bg-[#fff0f0] transition"
                            >
                                Отозвать договор
                            </button>
                        </>
                    ) : status === "Отклонён" ? (
                        <button
                            type="button"
                            className="h-10 cursor-not-allowed rounded-xl bg-black/10 px-5 text-[12px] font-semibold text-black/40"
                            disabled
                        >
                            Договор отклонён
                        </button>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={() => setOpenReject(true)}
                                className="h-10 rounded-xl border border-[#ff3b30] bg-white px-5 text-[12px] font-semibold text-[#ff3b30] hover:bg-[#fff0f0] transition"
                            >
                                Отклонить
                            </button>
                            <button
                                type="button"
                                onClick={approve}
                                className="h-10 rounded-xl bg-[#1677ff] px-5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                                disabled={!canApprove}
                            >
                                Подписать договор
                            </button>
                        </>
                    )}
                </div>
            </div>

            <Modal open={openReject} title="Отклонить договор" onClose={() => setOpenReject(false)}>
                <div className="text-[12px] text-black/55">
                    Укажите причину (демо). Можно оставить пустым.
                </div>
                <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="mt-3 h-[110px] w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                    placeholder="Причина отклонения..."
                />
                <div className="mt-4 flex items-center justify-end gap-2">
                    <button
                        type="button"
                        onClick={() => setOpenReject(false)}
                        className="h-9 rounded-xl border border-black/10 bg-white px-4 text-[12px] font-semibold text-black/60 hover:bg-black/5"
                    >
                        Отмена
                    </button>
                    <button
                        type="button"
                        onClick={reject}
                        className="h-9 rounded-xl bg-[#ff3b30] px-4 text-[12px] font-semibold text-white hover:brightness-95"
                    >
                        Отклонить
                    </button>
                </div>
            </Modal>

            <div className="h-10" />
        </div>
    );
}