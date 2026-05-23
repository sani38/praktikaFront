import React from "react";
import { useNavigate } from "react-router-dom";

/* ICONS */
const IconUser = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
        <path
            fill="currentColor"
            d="M12 12a4.2 4.2 0 1 0-4.2-4.2A4.2 4.2 0 0 0 12 12Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
        />
    </svg>
);

const IconSearch = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
        <path
            fill="currentColor"
            d="M10 2a8 8 0 1 0 4.9 14.3l4.4 4.4 1.4-1.4-4.4-4.4A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z"
        />
    </svg>
);

const ArrowRight = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
        <path fill="currentColor" d="M13 5l7 7-7 7-1.4-1.4L16.2 13H4v-2h12.2l-4.6-4.6L13 5z" />
    </svg>
);

const ChevronDown = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
        <path fill="currentColor" d="M7 10l5 5 5-5 1.4 1.4-6.4 6.4-6.4-6.4L7 10z" />
    </svg>
);

const FeatureIcon = ({ variant = "blue" }) => {
    const isOrange = variant === "orange";
    return (
        <span
            className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${isOrange ? "bg-[#ff7a2f]/15 text-[#ff7a2f]" : "bg-[#187dde]/15 text-[#187dde]"
                }`}
            aria-hidden="true"
        >
            <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm2 0v12h12V6H6Zm2 2h8v2H8V8Zm0 4h8v2H8v-2Z"
                />
            </svg>
        </span>
    );
};

const SmallCardIcon = ({ variant = "blue" }) => {
    const isOrange = variant === "orange";
    return (
        <span
            className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${isOrange ? "bg-[#ff7a2f]/15 text-[#ff7a2f]" : "bg-[#187dde]/15 text-[#187dde]"
                }`}
            aria-hidden="true"
        >
            <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 11h5v-2h-5V6h-2v7a2 2 0 0 0 2 2Z"
                />
            </svg>
        </span>
    );
};

const PartnerArrow = ({ dir = "left" }) => (
    <button
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-slate-500 transition hover:shadow-[0_10px_18px_rgba(16,24,40,.06)]"
        type="button"
        aria-label={dir === "left" ? "Назад" : "Вперёд"}
    >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="currentColor"
                d={
                    dir === "left"
                        ? "M15 6l-6 6 6 6-1.4 1.4L6.2 12l7.4-7.4L15 6z"
                        : "M9 6l1.4-1.4L17.8 12l-7.4 7.4L9 18l6-6-6-6z"
                }
            />
        </svg>
    </button>
);

/* PAGE */
export default function PublicHomePage() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-[#f7f8fa] text-[#14181f]">
            {/* HEADER */}
            <header className="border-b border-[#e8ecf2] bg-white">
                <div className="mx-auto flex w-[min(1180px,calc(100%-48px))] items-center justify-between py-[14px]">
                    <div className="flex items-center">
                        <img src="/logo.png" alt="Satbayev University" className="h-12 w-auto object-contain" />
                    </div>

                    <div className="flex items-center gap-[10px]">
                        <button
                            onClick={() => navigate("/login")}
                            className="inline-flex items-center gap-2 rounded-[10px] border border-[#e8ecf2] bg-white px-3 py-[9px] text-[13px] font-semibold text-[#1f2937] transition hover:shadow-[0_6px_18px_rgba(16,24,40,.06)] active:translate-y-[1px]"
                            type="button"
                        >
                            <IconUser size={16} />
                            <span>Вход</span>
                        </button>

                        <button
                            className="inline-flex min-w-[62px] items-center justify-between gap-2 rounded-[10px] border border-[#e8ecf2] bg-white px-[10px] py-[9px] text-[13px] font-semibold text-[#1f2937] transition hover:shadow-[0_6px_18px_rgba(16,24,40,.06)] active:translate-y-[1px]"
                            type="button"
                        >
                            <span>Рус</span>
                            <ChevronDown size={16} />
                        </button>
                    </div>
                </div>
            </header>

            {/* HERO */}
            <section className="bg-white">
                <div className="mx-auto grid w-[min(1180px,calc(100%-48px))] grid-cols-1 gap-[26px] py-[26px] pb-[18px] lg:grid-cols-[1.05fr_.95fr]">
                    {/* left */}
                    <div className="py-[32px] pb-[10px] lg:py-[32px]">
                        <h1 className="m-0 text-[44px] font-extrabold leading-[1.06] tracking-[-0.02em]">
                            Найди свою базу
                            <br />
                            практики по
                            <br />
                            всему Казахстану
                        </h1>

                        <p className="mt-4 max-w-[520px] text-[13px] leading-[1.55] text-[#6b7280]">
                            Удобный и быстрый способ найти место для прохождения практики в компаниях, государственных учреждениях и
                            научных организациях.
                        </p>

                        <div className="mt-[18px] flex max-w-[520px] items-center gap-[10px]">
                            <div className="flex-1 rounded-[12px] border border-[#e8ecf2] bg-white px-[12px] py-[10px] shadow-[0_10px_24px_rgba(16,24,40,.06)]">
                                <input
                                    className="w-full border-0 bg-transparent text-[13px] text-[#111827] outline-none"
                                    type="text"
                                    placeholder="Какую практику вы ищете?"
                                />
                            </div>

                            <button
                                className="inline-flex h-[44px] items-center gap-2 rounded-[12px] bg-[#187dde] px-[14px] text-[14px] font-semibold text-white shadow-[0_10px_18px_rgba(24,125,222,.20)] transition hover:bg-[#1f86e7] active:translate-y-[1px]"
                                type="button"
                            >
                                <span>Поиск</span>
                                <IconSearch size={18} />
                            </button>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {["Маркетинг", "IT и Разработка", "Финансы", "Инженерное дело", "Нефть и Газ"].map((t) => (
                                <button
                                    key={t}
                                    className="rounded-full border border-[#e8ecf2] bg-white px-[10px] py-[7px] text-[12px] text-[#3b4453] transition hover:shadow-[0_10px_18px_rgba(16,24,40,.06)]"
                                    type="button"
                                >
                                    {t}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => navigate("/login")}
                            className="mt-[14px] inline-flex items-center gap-2 rounded-[10px] border border-[#187dde]/20 bg-[#e9f2ff] px-[14px] py-[10px] text-[14px] font-semibold text-[#187dde] transition hover:shadow-[0_10px_18px_rgba(16,24,40,.06)] active:translate-y-[1px]"
                            type="button"
                        >
                            <span>Найти базу практик</span>
                            <ArrowRight size={16} />
                        </button>
                    </div>

                    {/* right */}
                    <div className="relative h-[430px] overflow-visible">
                        <img
                            src="/su-bg.png"
                            alt=""
                            className="absolute left-[70px] top-0 h-[430px] w-[360px] object-cover"
                        />

                        <img
                            src="/students.png"
                            alt="Students"
                            className="absolute bottom-0 left-[10px] z-10 w-[620px] object-contain"
                        />

                        <div className="absolute bottom-0 left-0 z-20 h-[90px] w-[620px] bg-gradient-to-t from-white to-transparent" />
                    </div>
                </div>
            </section>

            {/* О ПОРТАЛЕ */}
            <section className="py-4">
                <div className="mx-auto w-[min(1180px,calc(100%-48px))]">
                    <div className="rounded-[22px] border border-[#e8ecf2]/85 bg-white p-[18px] shadow-[0_10px_30px_rgba(16,24,40,.08)]">
                        <div className="px-1 pb-[10px]">
                            <h2 className="m-0 text-[14px] font-bold text-[#111827]">О портале</h2>
                            <p className="mt-2 text-[12px] leading-[1.55] text-[#6b7280]">
                                Портал баз практики — это современная платформа, созданная для студентов и работодателей по всему
                                Казахстану. Здесь студенты легко находят актуальные предложения для прохождения производственной,
                                преддипломной и других видов практик, а организации — потенциальных стажёров, мотивированных развиваться в
                                своей сфере.
                            </p>
                        </div>

                        <div className="mt-2 grid grid-cols-1 gap-[10px] md:grid-cols-2 lg:grid-cols-4">
                            {[
                                "Поиск базы практики по городу, специальности и типу организации",
                                "Онлайн-подача заявки на практику",
                                "Информация о компаниях, отзывах и требованиях",
                                "Прямое взаимодействие с работодателем",
                            ].map((t) => (
                                <div
                                    key={t}
                                    className="flex items-start gap-[10px] rounded-[14px] border border-[#e8ecf2]/90 bg-[#f6f8fb] px-3 py-3"
                                >
                                    <FeatureIcon />
                                    <div className="mt-[2px] text-[12px] font-semibold leading-[1.35] text-[#374151]">{t}</div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-[14px] grid grid-cols-1 gap-3 md:grid-cols-3">
                            {[
                                { label: "Вакансий", value: "10.265" },
                                { label: "Новых вакансий", value: "3.265" },
                                { label: "Работодателей", value: "8.365" },
                            ].map((s) => (
                                <div
                                    key={s.label}
                                    className="relative overflow-hidden rounded-[16px] bg-[#187dde] px-4 py-[14px] text-white"
                                >
                                    <div className="absolute -right-10 -top-10 h-[160px] w-[160px] rounded-full bg-white/15" />
                                    <div className="relative text-[12px] opacity-95">{s.label}</div>
                                    <div className="relative mt-2 text-[36px] font-extrabold tracking-[-0.02em]">{s.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* КАК ЭТО РАБОТАЕТ */}
            <section className="py-4">
                <div className="mx-auto w-[min(1180px,calc(100%-48px))]">
                    <div className="rounded-[22px] border border-[#e8ecf2]/85 bg-white p-[18px] shadow-[0_10px_30px_rgba(16,24,40,.08)]">
                        <div className="mb-3 flex flex-col gap-1">
                            <h2 className="m-0 text-[14px] font-bold text-[#111827]">Как это работает?</h2>
                            <div className="text-[12px] text-[#6b7280]">Всё просто — 3 шага до успешной практики</div>
                        </div>

                        <div className="grid grid-cols-1 gap-[10px] lg:grid-cols-[1fr_1fr_1fr_1.2fr]">
                            {[
                                { n: "1", title: "Зарегистрируйся", text: "Создай личный кабинет студента или организации." },
                                { n: "2", title: "Найди подходящую базу", text: "Отфильтруй по городу, профилю, должности и типу практики." },
                                { n: "3", title: "Оформи заявку", text: "Откликнись на предложения напрямую через портал." },
                            ].map((s) => (
                                <div
                                    key={s.n}
                                    className="flex gap-3 rounded-[16px] border border-[#e8ecf2]/90 bg-[#f6f8fb] px-[14px] py-[14px]"
                                >
                                    <div className="w-[34px] text-[34px] font-black leading-none text-[#187dde]">{s.n}</div>
                                    <div>
                                        <div className="mt-[2px] text-[12px] font-extrabold text-[#1f2937]">{s.title}</div>
                                        <div className="mt-[5px] text-[11px] leading-[1.4] text-[#6b7280]">{s.text}</div>
                                    </div>
                                </div>
                            ))}

                            <div className="flex gap-[10px] rounded-[16px] border border-[#ff7a2f]/35 bg-[#fff7f1] px-[14px] py-[14px]">
                                <div className="mt-1 h-[10px] w-[10px] shrink-0 rounded-full bg-[#ff7a2f]" />
                                <div className="text-[11.5px] font-semibold leading-[1.45] text-[#7a3b18]">
                                    Платформа уведомит тебя о статусе заявки и поможет связаться с представителем организации.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ПРЕИМУЩЕСТВА ДЛЯ СТУДЕНТОВ */}
            <section className="py-4">
                <div className="mx-auto w-[min(1180px,calc(100%-48px))]">
                    <div className="rounded-[22px] border border-[#e8ecf2]/85 bg-white p-[18px] shadow-[0_10px_30px_rgba(16,24,40,.08)]">
                        <h2 className="m-0 text-[14px] font-bold text-[#111827]">Преимущества для студентов</h2>

                        <div className="mt-3 grid grid-cols-1 gap-[10px] md:grid-cols-2 lg:grid-cols-5">
                            {[
                                "Единая база проверенных организаций по всему Казахстану",
                                "Прозрачные условия, требования и сроки",
                                "Прямой контакт с работодателями",
                                "Удобный личный кабинет и история заявок",
                                "Возможность выбрать практику по профилю обучения",
                            ].map((t) => (
                                <div
                                    key={t}
                                    className="flex min-h-[78px] items-start gap-[10px] rounded-[16px] border border-[#e8ecf2]/90 bg-[#f6f8fb] px-[12px] py-[14px]"
                                >
                                    <SmallCardIcon />
                                    <div className="mt-[2px] text-[11.8px] font-semibold leading-[1.35] text-[#374151]">{t}</div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => navigate("/login")}
                            className="mt-3 inline-flex items-center gap-2 rounded-[12px] bg-[#187dde] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_18px_rgba(24,125,222,.20)] transition hover:bg-[#1f86e7] active:translate-y-[1px]"
                            type="button"
                        >
                            <span>Перейти на страницу практиканта</span>
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </section>

            {/* ПРЕИМУЩЕСТВА ДЛЯ ОРГАНИЗАЦИЙ */}
            <section className="py-4">
                <div className="mx-auto w-[min(1180px,calc(100%-48px))]">
                    <div className="rounded-[22px] border border-[#e8ecf2]/85 bg-white p-[18px] shadow-[0_10px_30px_rgba(16,24,40,.08)]">
                        <h2 className="m-0 text-[14px] font-bold text-[#111827]">Преимущества для организаций</h2>

                        <div className="mt-3 grid grid-cols-1 gap-[10px] md:grid-cols-2 lg:grid-cols-5">
                            {[
                                "Бесплатное размещение базы практики",
                                "Доступ к широкому пулу студентов ведущих вузов",
                                "Автоматизированная система обработки заявок",
                                "Повышение узнаваемости компании среди молодёжи",
                                "Возможность отбора лучших кандидатов для дальнейшего трудоустройства",
                            ].map((t) => (
                                <div
                                    key={t}
                                    className="flex min-h-[78px] items-start gap-[10px] rounded-[16px] border border-[#e8ecf2]/90 bg-[#f6f8fb] px-[12px] py-[14px]"
                                >
                                    <SmallCardIcon variant="orange" />
                                    <div className="mt-[2px] text-[11.8px] font-semibold leading-[1.35] text-[#374151]">{t}</div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => navigate("/employer")}
                            className="mt-3 inline-flex items-center gap-2 rounded-[12px] bg-[#187dde] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_18px_rgba(24,125,222,.20)] transition hover:bg-[#1f86e7] active:translate-y-[1px]"
                            type="button"
                        >
                            <span>Перейти на страницу организации</span>
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </section>

            {/* ОТЗЫВЫ */}
            <section className="py-4">
                <div className="mx-auto w-[min(1180px,calc(100%-48px))]">
                    <div className="rounded-[22px] border border-[#e8ecf2]/85 bg-white p-[18px] shadow-[0_10px_30px_rgba(16,24,40,.08)]">
                        <div className="mb-3 flex flex-col gap-1">
                            <h2 className="m-0 text-[14px] font-bold text-[#111827]">Отзывы</h2>
                            <div className="text-[12px] text-[#6b7280]">Возможность отбора лучших кандидатов для дальнейшего трудоустройства</div>
                        </div>

                        <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2">
                            {[
                                {
                                    name: "Амина",
                                    role: "Студентка 3 курса",
                                    text:
                                        "Благодаря порталу я прошла практику в ведущей IT-компании Алматы. Удобный поиск и оперативный отклик работодателя — это то, чего не хватало раньше!",
                                },
                                {
                                    name: "HR-менеджер",
                                    role: "ТОО «TechLine»",
                                    text: "Мы нашли сразу троих практикантов через портал — удобно, быстро и без лишней бюрократии.",
                                },
                            ].map((r) => (
                                <div key={r.name} className="grid grid-cols-[56px_1fr] gap-3">
                                    <div className="h-[56px] w-[56px] rounded-[14px] border border-black/5 bg-[#e5e7eb]" />
                                    <div className="rounded-[16px] border border-[#e8ecf2]/90 bg-[#f6f8fb] px-[14px] py-[14px] text-[12px] font-medium leading-[1.5] text-[#374151]">
                                        {r.text}
                                    </div>
                                    <div className="col-start-2 mt-2">
                                        <div className="text-[12px] font-extrabold text-[#111827]">{r.name}</div>
                                        <div className="mt-[2px] text-[11px] text-[#6b7280]">{r.role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ПАРТНЁРЫ */}
            <section className="py-4">
                <div className="mx-auto w-[min(1180px,calc(100%-48px))]">
                    <div className="rounded-[22px] border border-[#e8ecf2]/85 bg-white p-[18px] shadow-[0_10px_30px_rgba(16,24,40,.08)]">
                        <h2 className="m-0 text-[14px] font-bold text-[#111827]">Работодатели партнёры</h2>

                        <div className="mt-3 grid grid-cols-2 gap-[10px] md:grid-cols-4 lg:grid-cols-7">
                            {Array.from({ length: 7 }, (_, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 px-2 py-2">
                                    <div className="h-[44px] w-[44px] rounded-[10px] border border-black/5 bg-[#e5e7eb]" />
                                    <div className="text-[11px] font-semibold text-[#6b7280]">Казатомпром</div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-2 flex items-center justify-center gap-3">
                            <PartnerArrow dir="left" />
                            <div className="flex items-center gap-[6px] rounded-full px-3 py-2">
                                <span className="h-[6px] w-[6px] rounded-full bg-[#cbd5e1]" />
                                <span className="h-[7px] w-[7px] rounded-full bg-[#187dde]" />
                                <span className="h-[6px] w-[6px] rounded-full bg-[#cbd5e1]" />
                                <span className="h-[6px] w-[6px] rounded-full bg-[#cbd5e1]" />
                                <span className="h-[6px] w-[6px] rounded-full bg-[#cbd5e1]" />
                            </div>
                            <PartnerArrow dir="right" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ЦИФРЫ + CTA */}
            <section className="py-4">
                <div className="mx-auto w-[min(1180px,calc(100%-48px))]">
                    <div className="rounded-[22px] border border-[#e8ecf2]/85 bg-white p-[18px] shadow-[0_10px_30px_rgba(16,24,40,.08)]">
                        <div className="mb-3 flex flex-col gap-1">
                            <h2 className="m-0 text-[14px] font-bold text-[#111827]">ПрактикаKZ в цифрах</h2>
                            <div className="text-[12px] text-[#6b7280]">Единый портал для студентов и работодателей</div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                            {[
                                { big: "5.000+", small: "Доступных практик\nпо всему Казахстану" },
                                { big: "1.200+", small: "Компаний\nпредлагают стажировки" },
                                { big: "17", small: "Регионов\nпо всей стране" },
                                { big: "24/7", small: "Поддержка\nдля студентов и компаний" },
                            ].map((n) => (
                                <div key={n.big} className="relative overflow-hidden rounded-[16px] bg-[#187dde] px-4 py-[14px] text-white">
                                    <div className="absolute -right-12 -top-12 h-[160px] w-[160px] rounded-full bg-white/15" />
                                    <div className="relative text-[22px] font-black tracking-[-0.02em]">{n.big}</div>
                                    <div className="relative mt-2 whitespace-pre-line text-[11.5px] leading-[1.35] text-white/95">
                                        {n.small}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-[14px] flex flex-col gap-4 rounded-[22px] border border-[#e8ecf2]/85 bg-white p-[18px] shadow-[0_10px_30px_rgba(16,24,40,.08)] lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                            <h3 className="m-0 text-[14px] font-extrabold text-[#111827]">Вы представитель компании?</h3>
                            <p className="mt-2 max-w-[760px] text-[12px] leading-[1.55] text-[#6b7280]">
                                Разместите информацию о практике или стажировке и найдите талантливых молодых специалистов для своей
                                компании. Получите доступ к базе резюме студентов и выпускников ведущих вузов Казахстана.
                            </p>
                        </div>

                        <div className="flex items-center gap-[10px] pt-1">
                            <button
                                onClick={() => navigate("/employer/create")}
                                className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#187dde] px-[14px] py-[10px] text-[14px] font-semibold text-white shadow-[0_10px_18px_rgba(24,125,222,.20)] transition hover:bg-[#1f86e7] active:translate-y-[1px]"
                                type="button"
                            >
                                Разместить практику +
                            </button>

                            <button
                                className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#187dde]/30 bg-white px-[14px] py-[10px] text-[14px] font-semibold text-[#187dde] transition hover:shadow-[0_10px_18px_rgba(16,24,40,.06)] active:translate-y-[1px]"
                                type="button"
                            >
                                Узнать больше
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="mt-5 border-t border-[#e8ecf2] bg-white">
                <div className="mx-auto w-[min(1180px,calc(100%-48px))] py-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                        <div className="w-full lg:w-[280px]">
                            <div className="text-[14px] font-black tracking-[-0.01em]">Практика</div>
                            <div className="mt-2 text-[12px] leading-[1.55] text-[#6b7280]">
                                Единый портал практики и стажировок для студентов и выпускников Казахстана.
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div>
                                <div className="mb-2 text-[12px] font-extrabold text-[#111827]">Практика</div>
                                {["Найти практику", "Советы по составлению резюме", "Подготовка к собеседованию", "Истории успеха", "Блог"].map(
                                    (x) => (
                                        <a key={x} href="#!" className="my-[7px] block text-[12px] text-[#4b5563] hover:text-[#111827]">
                                            {x}
                                        </a>
                                    )
                                )}
                            </div>

                            <div>
                                <div className="mb-2 text-[12px] font-extrabold text-[#111827]">Для компаний</div>
                                {["Разместить вакансию", "Поиск кандидатов", "Брендинг работодателя", "Партнёрская программа", "Тарифы"].map(
                                    (x) => (
                                        <a key={x} href="#!" className="my-[7px] block text-[12px] text-[#4b5563] hover:text-[#111827]">
                                            {x}
                                        </a>
                                    )
                                )}
                            </div>

                            <div>
                                <div className="mb-2 text-[12px] font-extrabold text-[#111827]">Контакты</div>
                                <div className="my-[7px] text-[12px] text-[#4b5563]">г. Алматы</div>
                                <div className="my-[7px] text-[12px] text-[#4b5563]">info@praktika.kz</div>
                                <div className="my-[7px] text-[12px] text-[#4b5563]">+7 (727) 12-34-56</div>
                                <a href="#!" className="my-[7px] block text-[12px] text-[#4b5563] hover:text-[#111827]">
                                    Свяжитесь с нами
                                </a>
                                <a href="#!" className="my-[7px] block text-[12px] text-[#4b5563] hover:text-[#111827]">
                                    Вопросы и ответы
                                </a>
                            </div>
                        </div>
                   ы </div>

                    <div className="mt-4 flex flex-col gap-3 border-t border-[#e8ecf2] pt-4 md:flex-row md:items-center md:justify-between">
                        <div className="text-[12px] text-[#6b7280]">© 2025 Практика. Все права защищены.</div>
                        <div className="flex flex-wrap gap-5">
                   ы         {["Условия использования", "Политика конфиденциальности", "Карта сайта"].map((x) => (
                                <a key={x} href="#!" className="text-[12px] text-[#4b5563] hover:text-[#111827]">
                                    {x}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}