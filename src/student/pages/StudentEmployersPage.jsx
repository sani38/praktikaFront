import React, { useMemo, useState } from "react";
import { Modal, Pill, Pagination, IconPin } from "../ui/Ui.jsx";

const employers = [
    {
        id: 1,
        name: "ТехноСервис Казахстан",
        sector: "IT и телекоммуникации",
        rating: 4.7,
        desc:
            "Ведущая IT-компания, предоставляющая полный спектр услуг по разработке программного обеспечения и IT-консалтингу.",
        city: "Алматы",
        openInternships: 6,
        date: "10.04.2025",
    },
    {
        id: 2,
        name: "Альфа-Групп",
        sector: "Финансовые услуги",
        rating: 4.5,
        desc:
            "Крупная финансовая корпорация, предлагающая банковские и инвестиционные услуги.",
        city: "Алматы",
        openInternships: 6,
        date: "10.04.2025",
    },
    {
        id: 3,
        name: "КазМунайГаз",
        sector: "Энергетика",
        rating: 4.6,
        desc:
            "Лидер в области добычи и транспортировки углеводородов в Казахстане.",
        city: "Алматы",
        openInternships: 6,
        date: "10.04.2025",
    },
    {
        id: 4,
        name: "Билайн Казахстан",
        sector: "Телекоммуникации",
        rating: 4.3,
        desc:
            "Основной оператор мобильной связи с широким спектром услуг.",
        city: "Алматы",
        openInternships: 6,
        date: "10.04.2025",
    },
    {
        id: 5,
        name: "Казпочта",
        sector: "Логистика и почтовые услуги",
        rating: 4.2,
        desc:
            "Национальный почтовый оператор, обеспечивающий доставку по всей стране.",
        city: "Алматы",
        openInternships: 6,
        date: "10.04.2025",
    },
    {
        id: 6,
        name: "Sky Park",
        sector: "Недвижимость",
        rating: 4.8,
        desc:
            "Инвестиционная компания, специализирующаяся на жилой и коммерческой недвижимости.",
        city: "Алматы",
        openInternships: 6,
        date: "10.04.2025",
    },
    {
        id: 7,
        name: "ТехноЛаб",
        sector: "Разработка ПО",
        rating: 4.9,
        desc:
            "Инновационная компания, предлагающая решения в области программного обеспечения и IT-услуг.",
        city: "Алматы",
        openInternships: 6,
        date: "10.04.2025",
    },
];

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
    return (
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-black/20" />
                    <div>
                        <div className="text-[14px] font-semibold text-black/80">{x.name}</div>
                        <div className="mt-1 text-[11px] text-[#1677ff]">{x.sector}</div>
                    </div>
                </div>

                <RatingBadge value={x.rating} onClick={() => onOpenRating(x)} />
            </div>

            <div className="mt-4 text-[12px] leading-6 text-black/55">{x.desc}</div>

            <div className="mt-4 flex flex-wrap items-center gap-6 text-[12px] text-[#1677ff]">
                <span className="inline-flex items-center gap-1.5">
                    <IconPin /> {x.city}
                </span>
                <span className="text-[#1677ff]">Открытых практик: {x.openInternships}</span>
            </div>

            <div className="mt-4 text-[11px] text-black/35">Дата размещения: {x.date}</div>

            <div className="mt-4 flex items-center justify-end gap-3">
                <button
                    type="button"
                    className="h-9 rounded-xl border border-[#1677ff] bg-white px-4 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                    onClick={() => alert(`Сайт компании (демо): ${x.name}`)}
                >
                    Сайт компании
                </button>
                <button
                    type="button"
                    className="h-9 rounded-xl bg-[#1677ff] px-4 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                    onClick={() => alert(`Смотреть вакансии (демо): ${x.name}`)}
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

    const [city, setCity] = useState("Город");
    const [pay, setPay] = useState("Оплата");
    const [duration, setDuration] = useState("Длительность");
    const [category, setCategory] = useState("Категория");

    const [open, setOpen] = useState(false);
    const [currentEmployer, setCurrentEmployer] = useState(null);

    const filtered = useMemo(() => {
        const query = q.trim().toLowerCase();
        return employers.filter((x) => {
            const byQuery =
                !query ||
                x.name.toLowerCase().includes(query) ||
                x.sector.toLowerCase().includes(query);
            const byCity = city === "Город" || x.city === city;

            return byQuery && byCity;
        });
    }, [q, city, pay, duration, category]);

    const pageSize = 3;
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const safePage = Math.min(page, totalPages);
    const pageItems = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

    const openRating = (emp) => {
        setCurrentEmployer(emp);
        setOpen(true);
    };

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
                    onClick={() => setPage(1)}
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
                <Select value={city} onChange={(e) => { setCity(e.target.value); setPage(1); }}>
                    <option>Город</option>
                    <option>Алматы</option>
                    <option>Астана</option>
                    <option>Шымкент</option>
                </Select>

                <Select value={pay} onChange={(e) => { setPay(e.target.value); setPage(1); }}>
                    <option>Оплата</option>
                    <option>По договоренности</option>
                </Select>

                <Select value={duration} onChange={(e) => { setDuration(e.target.value); setPage(1); }}>
                    <option>Длительность</option>
                    <option>1 месяц</option>
                    <option>2 месяца</option>
                    <option>3 месяца</option>
                </Select>

                <Select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} w="min-w-[110px]">
                    <option>Категория</option>
                    <option>IT</option>
                    <option>Финансы</option>
                    <option>Энергетика</option>
                    <option>Логистика</option>
                    <option>Недвижимость</option>
                </Select>
            </div>

            <div className="mt-6 space-y-4">
                {pageItems.map((x) => (
                    <EmployerCard key={x.id} x={x} onOpenRating={openRating} />
                ))}
            </div>

            <Pagination page={safePage} totalPages={totalPages} onPage={setPage} />

            <EmployerRatingModal
                open={open}
                onClose={() => setOpen(false)}
                employer={currentEmployer}
            />
        </div>
    );
}