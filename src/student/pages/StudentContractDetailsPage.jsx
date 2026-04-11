import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { contracts as allContracts } from "../data/contracts.js";
import { Pill } from "../ui/Ui.jsx";

function SignPill({ value }) {
    if (value === "Подписано") return <Pill variant="green">Подписано</Pill>;
    return <Pill variant="gray">Ожидает подписания</Pill>;
}

function InfoRow({ label, value }) {
    return (
        <div className="grid grid-cols-12 border-b border-black/5 py-3 last:border-b-0">
            <div className="col-span-6 text-[12px] text-black/55">{label}</div>
            <div className="col-span-6 text-[12px] font-semibold text-black/60">{value}</div>
        </div>
    );
}

export default function StudentContractDetailsPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const initial = useMemo(() => allContracts.find((c) => c.id === id) || null, [id]);
    const [contract, setContract] = useState(initial);

    if (!contract) {
        return (
            <div className="py-10">
                <div className="rounded-2xl border border-black/5 bg-white p-6">
                    <div className="text-[14px] font-semibold text-black/70">Договор не найден</div>
                    <button
                        type="button"
                        className="mt-4 rounded-xl bg-[#1677ff] px-4 py-2.5 text-[12px] font-semibold text-white"
                        onClick={() => navigate("/student/contracts")}
                    >
                        Назад
                    </button>
                </div>
            </div>
        );
    }

    const downloadTxt = () => {
        const blob = new Blob([contract.content], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `contract-${contract.id}.txt`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    const signNow = () => {
        alert("Подписание ЭЦП (демо). Считаем, что подписано всеми сторонами.");
        setContract((p) => ({
            ...p,
            status: "Активный",
            sign: { student: "Подписано", employer: "Подписано", university: "Подписано" },
        }));
    };

    const revoke = () => {
        const ok = confirm("Отозвать договор? (демо)");
        if (!ok) return;
        alert("Договор отозван (демо).");
    };

    const allSigned =
        contract.sign.student === "Подписано" &&
        contract.sign.employer === "Подписано" &&
        contract.sign.university === "Подписано";

    return (
        <div className="py-8">
            <button
                type="button"
                onClick={() => navigate("/student/contracts")}
                className="inline-flex items-center gap-2 text-[12px] text-black/45 hover:text-black/70 transition"
            >
                <span className="text-[#1677ff]">←</span> Мои договора
            </button>

            <div className="mt-2 text-[14px] font-semibold text-black/75">
                Подписание договора №{contract.id}
            </div>

            <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                <div className="text-[16px] font-semibold text-black/75">Информация о договоре</div>
                <div className="mt-1 text-[12px] text-black/45">Проверьте данные перед подписанием договора</div>

                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                    {/* Основная информация */}
                    <div>
                        <div className="text-[12px] font-semibold text-black/65">Основная информация</div>
                        <div className="mt-3 overflow-hidden rounded-xl border border-black/5">
                            <div className="px-4">
                                <InfoRow label="Номер договора" value={contract.id} />
                                <InfoRow label="Позиция" value={contract.position} />
                                <InfoRow label="Период практики" value={contract.period} />
                                <InfoRow label="Студент" value={contract.student} />
                                <InfoRow label="Работодатель" value={contract.company} />
                                <InfoRow label="Университет" value={contract.university} />
                            </div>
                        </div>
                    </div>

                    {/* Статус подписания */}
                    <div>
                        <div className="text-[12px] font-semibold text-black/65">Статус подписания</div>
                        <div className="mt-3 overflow-hidden rounded-xl border border-black/5">
                            <div className="px-4">
                                <div className="grid grid-cols-12 border-b border-black/5 py-3">
                                    <div className="col-span-6 text-[12px] text-black/55">Студент</div>
                                    <div className="col-span-6 flex justify-end">
                                        <SignPill value={contract.sign.student} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 border-b border-black/5 py-3">
                                    <div className="col-span-6 text-[12px] text-black/55">Работодатель</div>
                                    <div className="col-span-6 flex justify-end">
                                        <SignPill value={contract.sign.employer} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 py-3">
                                    <div className="col-span-6 text-[12px] text-black/55">Университет</div>
                                    <div className="col-span-6 flex justify-end">
                                        <SignPill value={contract.sign.university} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 rounded-2xl bg-[#eef5ff] p-4">
                            <div className="text-[12px] font-semibold text-[#1677ff]">Информация о подписании</div>
                            <div className="mt-2 text-[12px] leading-6 text-black/55">
                                Для подписания договора вам необходимо использовать электронную цифровую подпись (ЭЦП).
                                Убедитесь, что у вас установлен NCALayer и имеется действующий ключ ЭЦП.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Содержание договора */}
            <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                <div className="text-[16px] font-semibold text-black/75">Содержание договора</div>
                <div className="mt-2 text-[12px] font-semibold text-[#ff6b00]">
                    Внимательно проверьте информацию перед подписанием!
                </div>

                <div className="mt-4 rounded-2xl border border-black/10 bg-white p-5">
                    <div className="max-h-[260px] overflow-auto whitespace-pre-wrap text-[12px] leading-6 text-black/60">
                        {contract.content}
                    </div>
                </div>

                <div className="mt-5 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={downloadTxt}
                        className="h-10 rounded-xl border border-[#1677ff] bg-white px-5 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                    >
                        Скачать
                    </button>

                    {!allSigned ? (
                        <button
                            type="button"
                            onClick={signNow}
                            className="h-10 rounded-xl bg-[#1677ff] px-5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                        >
                            Подписать договор
                        </button>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={revoke}
                                className="h-10 rounded-xl border border-red-500 bg-white px-5 text-[12px] font-semibold text-red-500 hover:bg-red-50 transition"
                            >
                                Отозвать договор
                            </button>
                            <button
                                type="button"
                                disabled
                                className="h-10 cursor-not-allowed rounded-xl bg-black/20 px-5 text-[12px] font-semibold text-white"
                            >
                                Договор подписан
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="h-10" />
        </div>
    );
}