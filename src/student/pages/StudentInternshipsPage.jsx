import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Pill, Pagination, IconPin, IconCalendar, IconClock, IconBriefcase } from "../ui/Ui.jsx";
import { getRegionNameDtos } from "../../shared/api/regionApi.js";
import { getPaymentTypeNameDtos } from "../../shared/api/paymentTypeApi.js";
import { getVacancyCategoryNameDtos } from "../../shared/api/vacancyCategoryApi.js";
import { getFilteredVacancies } from "../../shared/api/vacancyApi.js";

function Select({ value, onChange, children, w = "min-w-[92px]" }) {
    return (
        <select
            value={value}
            onChange={onChange}
            className={`h-9 ${w} rounded-lg border border-black/10 bg-white px-3 text-[12px] text-black/60 outline-none focus:border-[#1677ff]`}
        >
            {children}
        </select>
    );
}

function InternshipCard({ x, onOpen }) {
    const statusVariant = x.status === "Опубликовано" ? "green" : "blue";

    const createdDate = x.createdAt
        ? new Date(x.createdAt).toLocaleDateString("ru-RU")
        : "-";

    return (
        <div
            className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)] cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition"
            onClick={onOpen}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" ? onOpen() : null)}
        >
            <div className="flex items-start justify-between gap-4">
                <Pill variant="blue">{x.companyName}</Pill>
                <Pill variant={statusVariant}>{x.status}</Pill>
            </div>

            <div className="mt-3 text-[16px] font-semibold text-black/80">
                {x.jobTitle}
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
                {x.categoryName && <Pill variant="outline">{x.categoryName}</Pill>}
                {x.workFormatName && <Pill variant="outline">{x.workFormatName}</Pill>}
            </div>

            <div className="mt-4 text-[12px] leading-6 text-black/55">
                {x.shortDescription}
            </div>

            <div className="mt-4 rounded-xl bg-black/[0.03] p-4">
                <div className="text-[11px] font-semibold text-black/55">
                    Требования:
                </div>
                <div className="mt-1 text-[11px] leading-5 text-black/45">
                    {x.requirements}
                </div>
            </div>

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

            <div className="mt-4 text-[11px] text-black/35">
                Дата размещения: {createdDate}
            </div>

            <div className="mt-4 flex items-center justify-end gap-3">
                <button
                    type="button"
                    className="h-9 rounded-xl border border-[#1677ff] bg-white px-4 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                    onClick={(e) => {
                        e.stopPropagation();
                        onOpen();
                    }}
                >
                    Подробнее
                </button>

                <button
                    type="button"
                    className="h-9 rounded-xl bg-[#1677ff] px-4 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                    onClick={(e) => {
                        e.stopPropagation();
                        alert(`Отклик отправлен: ${x.jobTitle}`);
                    }}
                >
                    Откликнуться
                </button>
            </div>
        </div>
    );
}

export default function StudentInternshipsPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [q, setQ] = useState("");
    const [page, setPage] = useState(1);

    const [regionId, setRegionId] = useState("");
    const [paymentTypeId, setPaymentTypeId] = useState("");
    const [durationCode, setDurationCode] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const [regions, setRegions] = useState([]);
    const [paymentTypes, setPaymentTypes] = useState([]);
    const [categories, setCategories] = useState([]);

    const [items, setItems] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const pageSize = 5;
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
    const safePage = Math.min(page, totalPages);

    const durationOptions = [
        { value: "", label: "Длительность" },
        { value: "up_to_1_month", label: "До 1 месяца" },
        { value: "1_2_months", label: "1-2 месяца" },
        { value: "2_3_months", label: "2-3 месяца" },
        { value: "more_than_3_months", label: "Более 3 месяцев" },
    ];

    async function loadInternships(targetPage = page, filters = {}) {
        try {
            setIsLoading(true);
            setError(null);

            const queryValue = filters.query ?? q.trim();
            const regionValue = filters.regionId ?? regionId;
            const paymentValue = filters.paymentTypeId ?? paymentTypeId;
            const durationValue = filters.durationCode ?? durationCode;
            const categoryValue = filters.categoryId ?? categoryId;

            const request = {
                query: queryValue || null,
                regionId: regionValue || null,
                paymentTypeId: paymentValue || null,
                durationCode: durationValue || null,
                categoryId: categoryValue || null,
                lang: "ru",
                page: targetPage,
                pageSize,
            };

            const data = await getFilteredVacancies(request);

            setItems(data.items);
            setTotalCount(data.totalCount);
            setPage(data.page);
        } catch (error) {
            console.error("Ошибка загрузки практик:", error);
            setError("Не удалось загрузить практики");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        async function loadFilters() {
            try {
                const [regionsData, paymentTypesData, categoriesData] = await Promise.all([
                    getRegionNameDtos("ru"),
                    getPaymentTypeNameDtos("ru"),
                    getVacancyCategoryNameDtos("ru"),
                ]);

                setRegions(regionsData);
                setPaymentTypes(paymentTypesData);
                setCategories(categoriesData);
            } catch (error) {
                console.error("Ошибка загрузки фильтров:", error);
            }
        }

        loadFilters();
    }, []);

    useEffect(() => {
        const queryFromUrl = searchParams.get("query") ?? "";
        const categoryIdFromUrl = searchParams.get("categoryId") ?? "";
        const regionIdFromUrl = searchParams.get("regionId") ?? "";
        const paymentTypeIdFromUrl = searchParams.get("paymentTypeId") ?? "";
        const durationCodeFromUrl = searchParams.get("durationCode") ?? "";

        setQ(queryFromUrl);
        setCategoryId(categoryIdFromUrl);
        setRegionId(regionIdFromUrl);
        setPaymentTypeId(paymentTypeIdFromUrl);
        setDurationCode(durationCodeFromUrl);

        loadInternships(1, {
            query: queryFromUrl,
            categoryId: categoryIdFromUrl,
            regionId: regionIdFromUrl,
            paymentTypeId: paymentTypeIdFromUrl,
            durationCode: durationCodeFromUrl,
        });

        navigate("/student/internships", { replace: true });

    }, []);
        
    return (
        <div className="py-8">
            <h1 className="text-[20px] font-semibold text-black/80">Поиск практики</h1>

            <div className="mt-6 flex items-center gap-3">
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Какую практику вы ищете?"
                    className="h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                />
                <button
                    type="button"
                    className="h-10 rounded-xl bg-[#1677ff] px-5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                    onClick={() => {
                        setPage(1);
                        loadInternships(1);
                    }}
                >
                    Поиск
                </button>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[12px] font-semibold text-black/60">
                <span className="inline-flex items-center gap-2">
                    <span className="text-black/50">⚑</span> Фильтры
                </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
                <Select value={regionId} onChange={(e) => setRegionId(e.target.value)}>
                    <option value="">Город</option>
                    {regions.map((region) => (
                        <option key={region.id} value={region.id}>
                            {region.name}
                        </option>
                    ))}
                </Select>

                <Select value={paymentTypeId} onChange={(e) => setPaymentTypeId(e.target.value)}>
                    <option value="">Оплата</option>
                    {paymentTypes.map((paymentType) => (
                        <option key={paymentType.id} value={paymentType.id}>
                            {paymentType.name}
                        </option>
                    ))}
                </Select>

                <Select value={durationCode} onChange={(e) => setDurationCode(e.target.value)}>
                    {durationOptions.map((duration) => (
                        <option key={duration.value} value={duration.value}>
                            {duration.label}
                        </option>
                    ))}
                </Select>

                <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} w="min-w-[110px]">
                    <option value="">Категория</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </Select>
            </div>

            <div className="mt-6 space-y-4">
                {items.map((x) => (
                    <InternshipCard
                        key={x.vacancyId}
                        x={x}
                        onOpen={() => navigate(`/student/internships/${x.vacancyId}`)}
                    />
                ))}
            </div>

            <Pagination page={safePage} totalPages={totalPages} onPage={(nextPage) => { setPage(nextPage); loadInternships(nextPage); }}/>
        </div>
    );
}