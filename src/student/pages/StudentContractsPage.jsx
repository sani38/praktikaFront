import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pill } from "../ui/Ui.jsx";
import {
    getActiveContractCount,
    getCompletedContractCount,
    getContractsByUserId,
    getContractDetails,
    getWaitingSignContractCount,
    downloadContract,
} from "../../shared/api/cotractApi.js";

function StatusPill({ status }) {
    if (status?.includes("подписи") || status?.includes("signature")) {
        return <Pill variant="blue">{status}</Pill>;
    }

    if (status === "Полностью подписан" || status === "Fully signed") {
        return <Pill variant="green">{status}</Pill>;
    }

    if (status === "Завершён" || status === "Завершен" || status === "Completed") {
        return <Pill variant="gray">{status}</Pill>;
    }

    return <Pill variant="gray">{status ?? "—"}</Pill>;
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

function formatDate(date) {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("ru-RU");
}

function formatPeriod(startDate, endDate) {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

export default function StudentContractsPage() {
    const navigate = useNavigate();

    const lang = "ru";
    const pageSize = 5;

    const [contracts, setContracts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const [stats, setStats] = useState({
        active: 0,
        signing: 0,
        finished: 0,
    });

    const [loading, setLoading] = useState(false);

    const totalPages = Math.ceil(totalCount / pageSize);

    useEffect(() => {
        loadContracts();
    }, [page]);

    useEffect(() => {
        loadStats();
    }, []);

    async function loadContracts() {
        setLoading(true);

        try {
            const response = await getContractsByUserId(lang, page, pageSize);

            setContracts(response.items ?? []);
            setTotalCount(response.totalCount ?? 0);
        } finally {
            setLoading(false);
        }
    }

    async function loadStats() {
        const [active, signing, finished] = await Promise.all([
            getActiveContractCount(),
            getWaitingSignContractCount(),
            getCompletedContractCount(),
        ]);

        setStats({
            active: active,
            signing: signing,
            finished: finished,
        });
    }

    async function downloadDocx(contractId) {
        try {
            const { blob, fileName } = await downloadContract(contractId);

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;

            document.body.appendChild(a);
            a.click();
            a.remove();

            window.URL.revokeObjectURL(url);
        } catch (e) {
            console.error(e);
            alert("Ошибка при скачивании договора");
        }
    }

    return (
        <div className="py-8">
            <h1 className="text-[20px] font-semibold text-black/80">Мои договора</h1>

            <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                <div className="text-[14px] font-semibold text-black/75">
                    Договоры о прохождении практики
                </div>

                <div className="mt-2 text-[12px] text-black/45">
                    Здесь вы можете просмотреть все ваши договоры на прохождение практики
                </div>

                <div className="mt-5 overflow-hidden rounded-xl border border-black/5">
                    <div className="grid grid-cols-12 bg-[#fafbff] px-4 py-3 text-[11px] font-semibold text-black/50">
                        <div className="col-span-3">Название практики</div>
                        <div className="col-span-2">Компания</div>
                        <div className="col-span-3">Период</div>
                        <div className="col-span-3">Статус</div>
                        <div className="col-span-1 text-right">Действия</div>
                    </div>

                    {loading && (
                        <div className="px-4 py-5 text-[12px] text-black/45">
                            Загрузка...
                        </div>
                    )}

                    {!loading && contracts.length === 0 && (
                        <div className="px-4 py-5 text-[12px] text-black/45">
                            Договоры не найдены
                        </div>
                    )}

                    {!loading && contracts.map((c) => (
                        <div
                            key={c.contractId}
                            className="grid grid-cols-12 items-center border-t border-black/5 px-4 py-4 text-[12px]"
                        >
                            <div className="col-span-3 text-black/65">
                                {c.jobTitle ?? "—"}
                            </div>

                            <div className="col-span-2 text-black/65">
                                {c.companyName ?? "—"}
                            </div>

                            <div className="col-span-3 text-black/55">
                                {formatPeriod(c.startDate, c.endDate)}
                            </div>

                            <div className="col-span-3">
                                <StatusPill status={c.status} />
                            </div>

                            <div className="col-span-1">
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => downloadDocx(c.contractId)}
                                        className="h-8 rounded-lg border border-[#1677ff] bg-white px-3 text-[11px] font-semibold text-[#1677ff] transition hover:bg-[#eef5ff]"
                                    >
                                        Скачать
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => navigate(`/student/contracts/${c.contractId}`)}
                                        className="h-8 rounded-lg bg-[#1677ff] px-3 text-[11px] font-semibold text-white transition hover:bg-[#0f66e6]"
                                    >
                                        Открыть
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="mt-4 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            disabled={page <= 1}
                            onClick={() => setPage(page - 1)}
                            className="h-8 rounded-lg border border-black/10 px-3 text-[12px] disabled:opacity-40"
                        >
                            Назад
                        </button>

                        <div className="text-[12px] text-black/50">
                            {page} / {totalPages}
                        </div>

                        <button
                            type="button"
                            disabled={page >= totalPages}
                            onClick={() => setPage(page + 1)}
                            className="h-8 rounded-lg border border-black/10 px-3 text-[12px] disabled:opacity-40"
                        >
                            Далее
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-6 text-[14px] font-semibold text-black/75">
                Информация о договорах
            </div>
            
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                    { key: "active", title: "Активные договоры", value: stats.active },
                    { key: "signing", title: "На подписании", value: stats.signing },
                    { key: "finished", title: "Завершенные", value: stats.finished },
                ].map((item) => (
                    <div
                        key={`${item.key}-${item.value}`}
                        className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]"
                    >
                        <div className="text-[12px] text-black/45">{item.title}</div>
                        <div className="mt-2 text-[24px] font-semibold text-[#1677ff]">
                            {item.value}
                        </div>
                    </div>
                ))}
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