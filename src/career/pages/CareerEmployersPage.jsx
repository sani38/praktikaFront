import React, { useEffect, useMemo, useState } from "react";
import { Pill, IconPin } from "../ui/CareerUi.jsx";
import { getCompaniesForCareer } from "../../shared/api/careerApi.js";

function Select({ value, onChange, children }) {
    return (
        <select
            value={value}
            onChange={onChange}
            className="h-9 rounded-xl border border-black/10 bg-white px-3 text-[12px] text-black/60 outline-none focus:border-[#1677ff]"
        >
            {children}
        </select>
    );
}

function MiniStat({ label, value }) {
    return (
        <div className="rounded-2xl border border-black/5 bg-[#f6f7fb] p-4">
            <div className="text-[11px] text-black/45">{label}</div>
            <div className="mt-2 text-[16px] font-semibold text-[#1677ff]">{value}</div>
        </div>
    );
}

function EmployerCard({ e }) {
    return (
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-between gap-3">
                <Pill variant="blue">{e.category}</Pill>
                <Pill variant="green">Активен</Pill>
            </div>

            <div className="mt-3 text-[14px] font-semibold text-black/80">{e.name}</div>

            {e.description && (
                <div className="mt-2 text-[12px] leading-6 text-black/55">{e.description}</div>
            )}

            <div className="mt-4 grid grid-cols-3 gap-3">
                <MiniStat label="Вакансий" value={e.vacancies} />
                <MiniStat label="Студентов" value="-" />
            </div>

            <div className="mt-4 rounded-2xl bg-[#f6f7fb] p-4">
                <div className="text-[11px] text-black/40">Контактное лицо:</div>
                <div className="mt-1 text-[12px] text-black/60">{e.contact}</div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-[12px] text-[#1677ff]">
                <span className="inline-flex items-center gap-2">
                    <IconPin /> {e.city}
                </span>
            </div>

            <div className="mt-4 flex items-center justify-end gap-3">
                <button
                    type="button"
                    className="h-9 rounded-xl border border-[#1677ff] bg-white px-4 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                >
                    Подробнее
                </button>
            </div>
        </div>
    );
}

export default function CareerEmployersPage() {
    const [q, setQ] = useState("");
    const [industry, setIndustry] = useState("Все отрасли");
    const [city, setCity] = useState("Все города");
    const [status, setStatus] = useState("Все статусы");

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadCompanies() {
            try {
                const response = await getCompaniesForCareer();

                const mapped = response.map((x) => {
                    const contactName = `${x.contactLastName || ""} ${x.contactFirstName || ""}`.trim();
                    const contactParts = [
                        contactName,
                        x.contactPhone,
                        x.contactEmail,
                    ].filter(Boolean);

                    return {
                        id: x.companyId,
                        name: x.companyName,
                        description: x.description,
                        category: x.companyCategoryName || "Без категории",
                        city: x.regionName || "Город не указан",
                        vacancies: x.vacanciesCount,
                        contact: contactParts.length ? contactParts.join(", ") : "Контакт не указан",
                        industry: x.companyCategoryName || "Без категории",
                    };
                });

                setData(mapped);
            } catch (error) {
                console.error("Ошибка загрузки работодателей:", error);
            } finally {
                setLoading(false);
            }
        }

        loadCompanies();
    }, []);

    const industries = useMemo(() => {
        const values = data.map((x) => x.industry).filter(Boolean);
        return ["Все отрасли", ...new Set(values)];
    }, [data]);

    const cities = useMemo(() => {
        const values = data.map((x) => x.city).filter(Boolean);
        return ["Все города", ...new Set(values)];
    }, [data]);

    const filtered = useMemo(() => {
        const qq = q.trim().toLowerCase();

        return data.filter((x) => {
            const matchesSearch = !qq || x.name.toLowerCase().includes(qq);
            const matchesIndustry = industry === "Все отрасли" || x.industry === industry;
            const matchesCity = city === "Все города" || x.city === city;

            return matchesSearch && matchesIndustry && matchesCity;
        });
    }, [q, industry, city, data]);

    const reset = () => {
        setIndustry("Все отрасли");
        setCity("Все города");
        setStatus("Все статусы");
    };

    return (
        <div className="py-10">
            <div className="text-[12px] text-[#1677ff]">Работодатели</div>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-[20px] font-semibold text-black/80">Работодатели</h1>
                    <div className="mt-1 text-[12px] text-black/45">Всего работодателей: {filtered.length}</div>
                </div>

                <button
                    type="button"
                    className="h-10 rounded-xl bg-[#1677ff] px-5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                >
                    Добавить работодателя <span className="ml-2">＋</span>
                </button>
            </div>

            <div className="mt-5 flex items-center gap-3">
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Найти работодателя"
                    className="h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                />
                <button
                    type="button"
                    className="h-10 rounded-xl bg-[#1677ff] px-5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                >
                    Поиск
                </button>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[12px] font-semibold text-black/60">
                <span className="text-black/50">⚑</span> Фильтры
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
                <Select value={industry} onChange={(e) => setIndustry(e.target.value)}>
                    {industries.map((x) => (
                        <option key={x}>{x}</option>
                    ))}
                </Select>

                <Select value={city} onChange={(e) => setCity(e.target.value)}>
                    {cities.map((x) => (
                        <option key={x}>{x}</option>
                    ))}
                </Select>

                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option>Все статусы</option>
                    <option>Активен</option>
                </Select>

                <button
                    type="button"
                    onClick={reset}
                    className="h-9 rounded-xl border border-black/10 bg-white px-4 text-[12px] font-semibold text-black/60 hover:bg-black/5 transition"
                >
                    Сбросить <span className="ml-2">×</span>
                </button>
            </div>

            {loading && (
                <div className="mt-6 rounded-2xl border border-black/5 bg-white p-5 text-[12px] text-black/45">
                    Загрузка работодателей...
                </div>
            )}

            {!loading && filtered.length === 0 && (
                <div className="mt-6 rounded-2xl border border-black/5 bg-white p-5 text-[12px] text-black/45">
                    Работодатели не найдены
                </div>
            )}

            {!loading && filtered.length > 0 && (
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {filtered.map((e) => (
                        <EmployerCard key={e.id} e={e} />
                    ))}
                </div>
            )}

            <div className="h-10" />
        </div>
    );
}