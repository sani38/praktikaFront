import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pill, Pagination, IconPin, IconCalendar, IconClock, IconBriefcase } from "../ui/Ui.jsx";
import { getApplicationsByStatus, withdrawApplication } from "../../shared/api/applicationApi.js";
import { ResultToast } from "../../shared/ui/ResultToast.jsx";

const statusByTab = {
    "Все заявки": null,
    "На рассмотрении": "under_review",
    "Одобренные": "approved",
    "Отклоненные": "rejected",
    "С договором": "contract_signed",
};

function Tabs({ value, onChange }) {
    const tabs = ["Все заявки", "На рассмотрении", "Одобренные", "Отклоненные", "С договором"];
    return (
        <div className="mt-6 overflow-hidden rounded-xl border border-black/10 bg-white">
            <div className="grid grid-cols-5">
                {tabs.map((t) => {
                    const active = t === value;
                    return (
                        <button
                            key={t}
                            type="button"
                            onClick={() => onChange(t)}
                            className={`h-10 text-[12px] transition ${active ? "bg-[#f6f7fb] font-semibold text-black/70" : "text-black/45 hover:bg-black/5"
                                }`}
                        >
                            {t}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function AppCard({ x, onWithdraw, onSign }) {
    const createdDate = x.createdAt
        ? new Date(x.createdAt).toLocaleDateString("ru-RU")
        : "-";

    const statusVariant =
        x.statusCode === "approved"
            ? "green"
            : x.statusCode === "rejected"
                ? "red"
                : x.statusCode === "contract_signed"
                    ? "green"
                    : "blue";

    return (
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-between gap-4">
                <Pill variant="blue">{x.companyName}</Pill>
                <div className="flex items-center gap-2">
                    <Pill variant={statusVariant}>
                        {x.status}
                    </Pill>
                </div>
            </div>

            <div className="mt-3 text-[16px] font-semibold text-black/80">{x.jobTitle}</div>
            <div className="mt-3 text-[12px] leading-6 text-black/55">{x.shortDescription}</div>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-[#1677ff]">
                <span className="inline-flex items-center gap-1.5">
                    <IconPin /> {x.regionName}
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <IconCalendar /> {x.duration}
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <IconClock /> {x.paymentType}
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <IconBriefcase /> {x.typeOfEmployment}
                </span>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
                <div className="text-[11px] text-black/35">Дата размещения: {createdDate}</div>

                <div className="flex items-center gap-3">

                    {x.canWithdraw && (
                        <button
                            type="button"
                            className="h-9 rounded-xl border border-[#1677ff] bg-white px-4 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                            onClick={() => onWithdraw(x.applicationId)}
                        >
                            Отозвать заявку
                        </button>
                    )}

                    {x.canSignContract && (
                        <button
                            type="button"
                            className="h-9 rounded-xl bg-[#1677ff] px-4 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                            onClick={() => onSign(x.applicationId)}
                        >
                            Подписать договор
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
}

export default function StudentApplicationsPage() {
    const navigate = useNavigate();
    const [tab, setTab] = useState("Все заявки");
    const [page, setPage] = useState(1);
    const [apps, setApps] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [toast, setToast] = useState({
        isOpen: false,
        type: "success",
        title: "",
        message: "",
    });

    const pageSize = 3;
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

    const onWithdraw = async (applicationId) => {
        try {
            await withdrawApplication(applicationId);

            setToast({
                isOpen: true,
                type: "success",
                title: "Заявка отозвана",
                message: "Ваша заявка успешно отозвана.",
            });

            loadApplications(tab);
        } catch (error) {
            console.error("Ошибка отзыва заявки:", error);

            setToast({
                isOpen: true,
                type: "error",
                title: "Ошибка отзыва",
                message: "Не удалось отозвать заявку.",
            });
        }
    };

    const onSign = () => {
        navigate("/student/contracts");
    };

    async function loadApplications(targetTab = tab) {
        try {
            setIsLoading(true);
            setError(null);

            const statusCode = statusByTab[targetTab];
            const data = await getApplicationsByStatus(
                statusCode,
                "ru",
                page,
                pageSize
            );

            setApps(data.items);
            setTotalCount(data.totalCount);
        } catch (error) {
            console.error("Ошибка загрузки заявок:", error);
            setError("Не удалось загрузить заявки");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadApplications(tab);
    }, [tab, page]);

    return (
        <div className="py-8">
            <h1 className="text-[20px] font-semibold text-black/80">Мои заявки</h1>

            <Tabs
                value={tab}
                onChange={(t) => {
                    setTab(t);
                    setPage(1);
                }}
            />

            <div className="mt-6 space-y-4">
                {apps.map((x) => (
                    <AppCard key={x.applicationId} x={x} onWithdraw={onWithdraw} onSign={onSign} />
                ))}
            </div>

            <Pagination page={page} totalPages={totalPages} onPage={setPage} />
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