import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pill } from "../ui/Ui.jsx";
import { getContractDetails, 
    downloadContract, 
    getContractSignData,
    signContract,
 } from "../../shared/api/cotractApi.js";
import { signTextWithNCALayer } from "../../shared/lib/ncaLayerClient.js";
import { ResultToast } from "../../shared/ui/ResultToast.jsx";

function SignPill({ isSigned }) {
    if (isSigned) return <Pill variant="green">Подписано</Pill>;
    return <Pill variant="gray">Ожидает подписания</Pill>;
}

function InfoRow({ label, value }) {
    return (
        <div className="grid grid-cols-12 border-b border-black/5 py-3 last:border-b-0">
            <div className="col-span-6 text-[12px] text-black/55">{label}</div>
            <div className="col-span-6 text-[12px] font-semibold text-black/60">
                {value ?? "—"}
            </div>
        </div>
    );
}

function formatDate(date) {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("ru-RU");
}

function formatPeriod(startDate, endDate) {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

export default function StudentContractDetailsPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const lang = "ru";

    const [toast, setToast] = useState({
        isOpen: false,
        type: "success",
        title: "",
        message: "",
    });

    const [contract, setContract] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadContract();
    }, [id]);

    async function loadContract() {
        setLoading(true);

        try {
            const response = await getContractDetails(id, lang);
            setContract(response);
        } finally {
            setLoading(false);
        }
    }

    const downloadDocx = async () => {
        try {
            const { blob, fileName } =
                await downloadContract(contract.contractId);

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;
            a.download = fileName;

            document.body.appendChild(a);

            a.click();

            a.remove();

            window.URL.revokeObjectURL(url);
        }
        catch (e) {
            console.error(e);
            alert("Ошибка при скачивании договора");
        }
    };

    const signNow = async () => {
        try {
            const signDataResponse =
                await getContractSignData(contract.contractId, lang);

            const signature =
                await signTextWithNCALayer(
                    signDataResponse.dataToSign
                );

            await signContract(
                contract.contractId,
                signature,
                lang
            );

            await loadContract();

            setToast({
                isOpen: true,
                type: "success",
                title: "Договор успешно подписан",
                message: "Подпись сохранена, статус договора обновлён.",
            });
        }
        catch (error) {
            console.error(error);

            setToast({
                isOpen: true,
                type: "error",
                title: "Ошибка при подписании",
                message:
                    error?.message ??
                    "Не удалось подписать договор. Проверьте NCALayer и ключ ЭЦП.",
            });
        }
    };

    const signedByStudent = contract?.isStudentSigned;

    if (loading) {
        return (
            <div className="py-10 text-[14px] text-black/50">
                Загрузка договора...
            </div>
        );
    }

    if (!contract) {
        return (
            <div className="py-10">
                <div className="rounded-2xl border border-black/5 bg-white p-6">
                    <div className="text-[14px] font-semibold text-black/70">
                        Договор не найден
                    </div>

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

    return (
        <div className="py-8">
            <button
                type="button"
                onClick={() => navigate("/student/contracts")}
                className="inline-flex items-center gap-2 text-[12px] text-black/45 transition hover:text-black/70"
            >
                <span className="text-[#1677ff]">←</span> Мои договора
            </button>

            <div className="mt-2 text-[14px] font-semibold text-black/75">
                Подписание договора №{contract.contractNumber ?? contract.contractId}
            </div>

            <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                <div className="text-[16px] font-semibold text-black/75">
                    Информация о договоре
                </div>

                <div className="mt-1 text-[12px] text-black/45">
                    Проверьте данные перед подписанием договора
                </div>

                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                        <div className="text-[12px] font-semibold text-black/65">
                            Основная информация
                        </div>

                        <div className="mt-3 overflow-hidden rounded-xl border border-black/5">
                            <div className="px-4">
                                <InfoRow label="Номер договора" value={contract.contractNumber} />
                                <InfoRow label="Позиция" value={contract.jobTitle} />
                                <InfoRow
                                    label="Период практики"
                                    value={formatPeriod(contract.startDate, contract.endDate)}
                                />
                                <InfoRow label="Студент" value={contract.student} />
                                <InfoRow label="Работодатель" value={contract.company} />
                                <InfoRow label="Университет" value={contract.university} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="text-[12px] font-semibold text-black/65">
                            Статус подписания
                        </div>

                        <div className="mt-3 overflow-hidden rounded-xl border border-black/5">
                            <div className="px-4">
                                <div className="grid grid-cols-12 border-b border-black/5 py-3">
                                    <div className="col-span-6 text-[12px] text-black/55">Студент</div>
                                    <div className="col-span-6 flex justify-end">
                                        <SignPill isSigned={contract.isStudentSigned} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-12 border-b border-black/5 py-3">
                                    <div className="col-span-6 text-[12px] text-black/55">Работодатель</div>
                                    <div className="col-span-6 flex justify-end">
                                        <SignPill isSigned={contract.isEmployerSigned} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-12 py-3">
                                    <div className="col-span-6 text-[12px] text-black/55">Университет</div>
                                    <div className="col-span-6 flex justify-end">
                                        <SignPill isSigned={contract.isUniversitySigned} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 rounded-2xl bg-[#eef5ff] p-4">
                            <div className="text-[12px] font-semibold text-[#1677ff]">
                                Информация о подписании
                            </div>

                            <div className="mt-2 text-[12px] leading-6 text-black/55">
                                Для подписания договора вам необходимо использовать электронную цифровую подпись.
                                Убедитесь, что у вас установлен NCALayer и имеется действующий ключ ЭЦП.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                <div className="text-[16px] font-semibold text-black/75">
                    Содержание договора
                </div>

                <div className="mt-2 text-[12px] font-semibold text-[#ff6b00]">
                    Внимательно проверьте информацию перед подписанием!
                </div>

                <div className="mt-4 rounded-2xl border border-black/10 bg-white p-5">
                    <div className="max-h-[260px] overflow-auto whitespace-pre-wrap text-[12px] leading-6 text-black/60">
                        {contract.contractContent ?? "Содержание договора отсутствует"}
                    </div>
                </div>

                <div className="mt-5 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={downloadDocx}
                        className="h-10 rounded-xl border border-[#1677ff] bg-white px-5 text-[12px] font-semibold text-[#1677ff] transition hover:bg-[#eef5ff]"
                    >
                        Скачать
                    </button>

                    {!signedByStudent ? (
                        <button
                            type="button"
                            onClick={signNow}
                            className="h-10 rounded-xl bg-[#1677ff] px-5 text-[12px] font-semibold text-white transition hover:bg-[#0f66e6]"
                        >
                            Подписать договор
                        </button>
                    ) : (
                        <button
                            type="button"
                            disabled
                            className="h-10 cursor-not-allowed rounded-xl bg-black/20 px-5 text-[12px] font-semibold text-white"
                        >
                            Договор подписан
                        </button>
                    )}
                </div>
            </div>

            <div className="h-10" />
            <ResultToast
                isOpen={toast.isOpen}
                type={toast.type}
                title={toast.title}
                message={toast.message}
                onClose={() =>
                    setToast((prev) => ({
                        ...prev,
                        isOpen: false,
                    }))
                }
            />
        </div>
    );
}