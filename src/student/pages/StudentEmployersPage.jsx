import React, { useEffect, useState } from "react";
import { getRegionNameDtos } from "../../shared/api/regionApi.js";
import { getCompanyCategoryNameDtos } from "../../shared/api/companyCategoryApi.js";
import { getFilteredCompanies } from "../../shared/api/companyApi.js";
import { Modal, Pill, Pagination, IconPin } from "../ui/Ui.jsx";
import { useNavigate } from "react-router-dom";

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

function RatingBadge({ value, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center gap-1 rounded-lg bg-[#fff6dd] px-2.5 py-1 text-[11px] font-semibold text-[#b25e09] hover:opacity-90 transition"
            title="Оценка работодателя"
        >
            <span className="inline-flex">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            </span>
            <span>{value.toFixed(1)}</span>
        </button>
    );
}

function EmployerCard({ x, onOpenRating }) {
    const navigate = useNavigate();
    const createdDate = x.createdAt
        ? new Date(x.createdAt).toLocaleDateString("ru-RU")
        : "-";
    return (
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-black/20" />
                    <div>
                        <div className="text-[14px] font-semibold text-black/80">{x.name}</div>
                        <div className="mt-1 text-[11px] text-[#1677ff]">{x.categoryName}</div>
                    </div>
                </div>

                {/* <RatingBadge value={x.rating} onClick={() => onOpenRating(x)} /> */}
            </div>

            <div className="mt-4 text-[12px] leading-6 text-black/55">{x.description}</div>

            <div className="mt-4 flex flex-wrap items-center gap-6 text-[12px] text-[#1677ff]">
                <span className="inline-flex items-center gap-1.5">
                    <IconPin /> {x.regionName}
                </span>
                <span className="text-[#1677ff]">Открытых практик: {x.vacancyCount}</span>
            </div>

            <div className="mt-4 text-[11px] text-black/35">Дата размещения: {createdDate}</div>

            <div className="mt-4 flex items-center justify-end gap-3">
                <button
                    type="button"
                    className="h-9 rounded-xl border border-[#1677ff] bg-white px-4 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                    onClick={() => {
                        if (x.website) {
                            window.open(
                                x.website.startsWith("http")
                                    ? x.website
                                    : `https://${x.website}`,
                                "_blank"
                            );
                        }
                    }}
                >
                    Сайт компании
                </button>
                <button
                    type="button"
                    className="h-9 rounded-xl bg-[#1677ff] px-4 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                    onClick={() => navigate(`/student/internships?companyId=${x.companyId}`)}
                >
                    Смотреть вакансии
                </button>
            </div>
        </div>
    );
}

function EmployerRatingModal({ open, onClose, employer }) {
    const [form, setForm] = useState({
        fio: "Иванов Иван Иванович",
        university: "Satbayev University",
        faculty: "Машиностроение и энергетика",
        practice: "Производственная практика",
        period: "01 июня – 31 июля 2025",
    });

    React.useEffect(() => {
        if (!open) return;
        // при открытии можно подставлять инфо работодателя/практики
    }, [open]);

    const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

    return (
        <Modal open={open} onClose={onClose}>
            <div className="w-full max-w-[520px] rounded-2xl bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white text-black/60 hover:bg-black/5 transition"
                        aria-label="Назад"
                    >
                        ←
                    </button>
                    <div className="text-[14px] font-semibold text-black/80">Оценка работодателя</div>
                </div>

                <div className="mt-4">
                    <div className="text-[12px] font-semibold text-black/65">Информация о работодателе</div>
                    <div className="mt-1 text-[12px] text-black/40">{employer ? employer.name : ""}</div>
                </div>

                <div className="mt-4 max-h-[360px] overflow-auto pr-2">
                    <label className="block text-[11px] text-black/50">
                        ФИО
                        <input
                            value={form.fio}
                            onChange={set("fio")}
                            className="mt-2 h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                        />
                    </label>

                    <label className="mt-4 block text-[11px] text-black/50">
                        Университет
                        <input
                            value={form.university}
                            onChange={set("university")}
                            className="mt-2 h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                        />
                    </label>

                    <label className="mt-4 block text-[11px] text-black/50">
                        Факультет
                        <input
                            value={form.faculty}
                            onChange={set("faculty")}
                            className="mt-2 h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                        />
                    </label>

                    <label className="mt-4 block text-[11px] text-black/50">
                        Практика
                        <input
                            value={form.practice}
                            onChange={set("practice")}
                            className="mt-2 h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                        />
                    </label>

                    <label className="mt-4 block text-[11px] text-black/50">
                        Период
                        <input
                            value={form.period}
                            onChange={set("period")}
                            className="mt-2 h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                        />
                    </label>

                    <div className="mt-4 rounded-xl bg-black/[0.03] p-4 text-[12px] text-black/45">
                        Здесь обычно идут пункты оценки (звёзды/шкалы/комментарии).
                        Если хочешь — сделаю прям как в реальном сервисе: критерии, звезды, комментарий, валидация.
                    </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                    <button
                        type="button"
                        onClick={() => alert("Итоговая оценка отправлена (демо).")}
                        className="h-9 flex-1 rounded-xl bg-[#1677ff] px-4 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                    >
                        Отправить итоговую оценку
                    </button>
                    <button
                        type="button"
                        onClick={() => alert("Черновик сохранён (демо).")}
                        className="h-9 flex-1 rounded-xl border border-[#1677ff] bg-white px-4 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                    >
                        Сохранить черновик
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default function StudentEmployersPage() {
    const [q, setQ] = useState("");
    const [page, setPage] = useState(1);

    const [regionId, setRegionId] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const [regions, setRegions] = useState([]);
    const [categories, setCategories] = useState([]);

    const [items, setItems] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [open, setOpen] = useState(false);
    const [currentEmployer, setCurrentEmployer] = useState(null);

    const pageSize = 5;
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
    const safePage = Math.min(page, totalPages);

    const openRating = (emp) => {
        setCurrentEmployer(emp);
        setOpen(true);
    };

    async function loadCompanies(targetPage = page, filters = {}) {
        try {
            setIsLoading(true);
            setError(null);

            const queryValue = filters.query ?? q.trim();
            const regionValue = filters.regionId ?? regionId;
            const categoryValue = filters.categoryId ?? categoryId;

            const request = {
                query: queryValue || null,
                regionId: regionValue || null,
                categoryId: categoryValue || null,
                lang: "ru",
                page: targetPage,
                pageSize,
            };

            const data = await getFilteredCompanies(request);

            setItems(data.items);
            setTotalCount(data.totalCount);
            setPage(data.page);
        } catch (error) {
            console.error("Ошибка загрузки работодателей:", error);
            setError("Не удалось загрузить работодателей");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        async function loadFilters() {
            try {
                const [regionsData, categoriesData] = await Promise.all([
                    getRegionNameDtos("ru"),
                    getCompanyCategoryNameDtos("ru"),
                ]);

                setRegions(regionsData);
                setCategories(categoriesData);
            } catch (error) {
                console.error("Ошибка загрузки фильтров:", error);
            }
        }

        loadFilters();
        loadCompanies(1);
    }, []);

    return (
        <div className="py-8">
            <h1 className="text-[20px] font-semibold text-black/80">Поиск работодателей</h1>

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
                        loadCompanies(1, { query: q.trim() });
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
                <Select
                    value={regionId}
                    onChange={(e) => {
                        const value = e.target.value;
                        setRegionId(value);
                        setPage(1);
                        loadCompanies(1, { regionId: value });
                    }}
                >
                    <option value="">Город</option>
                    {regions.map((region) => (
                        <option key={region.id} value={region.id}>
                            {region.name}
                        </option>
                    ))}
                </Select>

                <Select
                    value={categoryId}
                    onChange={(e) => {
                        const value = e.target.value;
                        setCategoryId(value);
                        setPage(1);
                        loadCompanies(1, { categoryId: value });
                    }}
                    w="min-w-[110px]"
                >
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
                    <EmployerCard key={x.companyId} x={x} onOpenRating={openRating} />
                ))}
            </div>

            <Pagination
                page={safePage}
                totalPages={totalPages}
                onPage={(nextPage) => {
                    setPage(nextPage);
                    loadCompanies(nextPage);
                }}
            />

            <EmployerRatingModal
                open={open}
                onClose={() => setOpen(false)}
                employer={currentEmployer}
            />
        </div>
    );
}