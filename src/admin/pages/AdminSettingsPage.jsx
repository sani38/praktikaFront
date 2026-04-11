import React, { useMemo, useState } from "react";
import { Switch } from "../ui/AdminUi.jsx";

function Tab({ active, children, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`h-10 px-4 text-[12px] transition ${active ? "bg-[#f6f7fb] font-semibold text-black/70" : "text-black/45 hover:bg-black/5"
                }`}
        >
            {children}
        </button>
    );
}

function Field({ label, children }) {
    return (
        <div>
            <div className="text-[11px] text-black/45">{label}</div>
            <div className="mt-2">{children}</div>
        </div>
    );
}

export default function AdminSettingsPage() {
    const tabs = useMemo(() => ["Общие", "Email", "Безопасность"], []);
    const [tab, setTab] = useState("Общие");

    // Общие
    const [siteName, setSiteName] = useState("Praktika KZ");
    const [siteDesc, setSiteDesc] = useState("");
    const [contactEmail, setContactEmail] = useState("support@praktikakz.com");
    const [lang, setLang] = useState("Русский");

    const [maint, setMaint] = useState(false);
    const [regEnabled, setRegEnabled] = useState(false);
    const [regApproval, setRegApproval] = useState(false);

    // Email
    const [smtpHost, setSmtpHost] = useState("smtp.mailserver.com");
    const [smtpPort, setSmtpPort] = useState("587");
    const [smtpUser, setSmtpUser] = useState("no-reply@praktika.kz");
    const [smtpPass, setSmtpPass] = useState("********");
    const [smtpTls, setSmtpTls] = useState(true);
    const [fromName, setFromName] = useState("PraktikaKZ");
    const [fromEmail, setFromEmail] = useState("no-reply@praktika.kz");
    const [testTo, setTestTo] = useState("test@example.com");

    // Security
    const [minLen, setMinLen] = useState("8");
    const [reqUpper, setReqUpper] = useState(true);
    const [reqLower, setReqLower] = useState(true);
    const [reqNumber, setReqNumber] = useState(true);
    const [reqSpecial, setReqSpecial] = useState(false);

    const [twoFA, setTwoFA] = useState(false);
    const [sessionMin, setSessionMin] = useState("60");
    const [maxAttempts, setMaxAttempts] = useState("5");
    const [lockoutMin, setLockoutMin] = useState("15");

    const resetAll = () => {
        setSiteName("Praktika KZ");
        setSiteDesc("");
        setContactEmail("support@praktikakz.com");
        setLang("Русский");
        setMaint(false);
        setRegEnabled(false);
        setRegApproval(false);

        setSmtpHost("smtp.mailserver.com");
        setSmtpPort("587");
        setSmtpUser("no-reply@praktika.kz");
        setSmtpPass("********");
        setSmtpTls(true);
        setFromName("PraktikaKZ");
        setFromEmail("no-reply@praktika.kz");
        setTestTo("test@example.com");

        setMinLen("8");
        setReqUpper(true);
        setReqLower(true);
        setReqNumber(true);
        setReqSpecial(false);
        setTwoFA(false);
        setSessionMin("60");
        setMaxAttempts("5");
        setLockoutMin("15");
    };

    const save = () => {
        alert(`Сохранено (демо): вкладка "${tab}"`);
    };

    return (
        <div className="py-10">
            <div className="text-[12px] text-[#1677ff]">Настройки</div>
            <h1 className="mt-2 text-[20px] font-semibold text-black/80">Настройки системы</h1>
            <div className="mt-1 text-[12px] text-black/45">Управление конфигурацией и параметрами платформы</div>

            <div className="mt-6 overflow-hidden rounded-xl border border-black/10 bg-white">
                <div className="grid grid-cols-3">
                    {tabs.map((t) => (
                        <Tab key={t} active={t === tab} onClick={() => setTab(t)}>
                            {t}
                        </Tab>
                    ))}
                </div>
            </div>

            <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                {/* ----------- Общие ----------- */}
                {tab === "Общие" && (
                    <>
                        <div className="text-[14px] font-semibold text-black/80">Общие настройки</div>
                        <div className="mt-1 text-[12px] text-black/45">Основные параметры конфигурации портала</div>

                        <div className="mt-5 space-y-4">
                            <Field label="Название сайта">
                                <input
                                    value={siteName}
                                    onChange={(e) => setSiteName(e.target.value)}
                                    className="h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                                />
                            </Field>

                            <Field label="Описание сайта">
                                <textarea
                                    value={siteDesc}
                                    onChange={(e) => setSiteDesc(e.target.value)}
                                    className="h-[90px] w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                                />
                            </Field>

                            <Field label="Контактный email">
                                <input
                                    value={contactEmail}
                                    onChange={(e) => setContactEmail(e.target.value)}
                                    className="h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                                />
                            </Field>

                            <Field label="Язык по умолчанию">
                                <select
                                    value={lang}
                                    onChange={(e) => setLang(e.target.value)}
                                    className="h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                                >
                                    <option>Русский</option>
                                    <option>Қазақша</option>
                                    <option>English</option>
                                </select>
                            </Field>

                            <div className="pt-2">
                                <div className="text-[12px] font-semibold text-black/70">Режим обслуживания</div>
                                <div className="mt-3 flex items-start justify-between gap-3">
                                    <div className="text-[12px] text-black/70">Временное отключение доступа к сайту</div>
                                    <Switch checked={maint} onChange={setMaint} />
                                </div>

                                <div className="mt-4 text-[12px] font-semibold text-black/70">Регистрация пользователей</div>

                                <div className="mt-3 flex items-start justify-between gap-3">
                                    <div>
                                        <div className="text-[12px] text-black/70">Регистрация пользователей</div>
                                        <div className="mt-1 text-[11px] text-black/45">Разрешить регистрацию пользователей</div>
                                    </div>
                                    <Switch checked={regEnabled} onChange={setRegEnabled} />
                                </div>

                                <div className="mt-3 flex items-start justify-between gap-3">
                                    <div>
                                        <div className="text-[12px] text-black/70">Подтверждение регистрации</div>
                                        <div className="mt-1 text-[11px] text-black/45">
                                            Требовать одобрения администратора для новых пользователей
                                        </div>
                                    </div>
                                    <Switch checked={regApproval} onChange={setRegApproval} />
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* ----------- Email ----------- */}
                {tab === "Email" && (
                    <>
                        <div className="text-[14px] font-semibold text-black/80">Email</div>
                        <div className="mt-1 text-[12px] text-black/45">Настройки SMTP и писем уведомлений</div>

                        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Field label="SMTP Host">
                                <input
                                    value={smtpHost}
                                    onChange={(e) => setSmtpHost(e.target.value)}
                                    className="h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                                />
                            </Field>

                            <Field label="SMTP Port">
                                <input
                                    value={smtpPort}
                                    onChange={(e) => setSmtpPort(e.target.value)}
                                    className="h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                                />
                            </Field>

                            <Field label="SMTP Username">
                                <input
                                    value={smtpUser}
                                    onChange={(e) => setSmtpUser(e.target.value)}
                                    className="h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                                />
                            </Field>

                            <Field label="SMTP Password">
                                <input
                                    type="password"
                                    value={smtpPass}
                                    onChange={(e) => setSmtpPass(e.target.value)}
                                    className="h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                                />
                            </Field>

                            <div className="md:col-span-2 flex items-center justify-between rounded-2xl bg-[#f6f7fb] p-4">
                                <div>
                                    <div className="text-[12px] font-semibold text-black/70">TLS/SSL</div>
                                    <div className="mt-1 text-[11px] text-black/45">Использовать защищенное соединение</div>
                                </div>
                                <Switch checked={smtpTls} onChange={setSmtpTls} />
                            </div>

                            <Field label="From Name">
                                <input
                                    value={fromName}
                                    onChange={(e) => setFromName(e.target.value)}
                                    className="h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                                />
                            </Field>

                            <Field label="From Email">
                                <input
                                    value={fromEmail}
                                    onChange={(e) => setFromEmail(e.target.value)}
                                    className="h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                                />
                            </Field>

                            <Field label="Тестовый email (кому отправить)">
                                <input
                                    value={testTo}
                                    onChange={(e) => setTestTo(e.target.value)}
                                    className="h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                                />
                            </Field>

                            <div className="md:col-span-2 flex justify-end">
                                <button
                                    type="button"
                                    className="h-9 rounded-xl border border-[#1677ff] bg-white px-4 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                                    onClick={() => alert(`Тестовое письмо отправлено (демо) на: ${testTo}`)}
                                >
                                    Отправить тестовое письмо
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {/* ----------- Безопасность ----------- */}
                {tab === "Безопасность" && (
                    <>
                        <div className="text-[14px] font-semibold text-black/80">Безопасность</div>
                        <div className="mt-1 text-[12px] text-black/45">Политики паролей, сессии и защита аккаунтов</div>

                        <div className="mt-5 space-y-4">
                            <div className="rounded-2xl bg-[#f6f7fb] p-5">
                                <div className="text-[12px] font-semibold text-black/70">Политика паролей</div>

                                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <Field label="Минимальная длина пароля">
                                        <input
                                            value={minLen}
                                            onChange={(e) => setMinLen(e.target.value)}
                                            className="h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                                        />
                                    </Field>

                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="text-[12px] text-black/70">Требовать заглавные буквы</div>
                                            <Switch checked={reqUpper} onChange={setReqUpper} />
                                        </div>
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="text-[12px] text-black/70">Требовать строчные буквы</div>
                                            <Switch checked={reqLower} onChange={setReqLower} />
                                        </div>
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="text-[12px] text-black/70">Требовать цифры</div>
                                            <Switch checked={reqNumber} onChange={setReqNumber} />
                                        </div>
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="text-[12px] text-black/70">Требовать спецсимволы</div>
                                            <Switch checked={reqSpecial} onChange={setReqSpecial} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl bg-[#f6f7fb] p-5">
                                <div className="text-[12px] font-semibold text-black/70">Сессии и вход</div>

                                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <Field label="Время жизни сессии (мин)">
                                        <input
                                            value={sessionMin}
                                            onChange={(e) => setSessionMin(e.target.value)}
                                            className="h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                                        />
                                    </Field>

                                    <div className="flex items-center justify-between rounded-xl border border-black/10 bg-white px-4 py-3">
                                        <div>
                                            <div className="text-[12px] text-black/70">Обязательная 2FA</div>
                                            <div className="mt-1 text-[11px] text-black/45">Для админов/центра карьеры (демо)</div>
                                        </div>
                                        <Switch checked={twoFA} onChange={setTwoFA} />
                                    </div>

                                    <Field label="Макс. попыток входа">
                                        <input
                                            value={maxAttempts}
                                            onChange={(e) => setMaxAttempts(e.target.value)}
                                            className="h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                                        />
                                    </Field>

                                    <Field label="Блокировка (мин)">
                                        <input
                                            value={lockoutMin}
                                            onChange={(e) => setLockoutMin(e.target.value)}
                                            className="h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                                        />
                                    </Field>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* общие кнопки снизу */}
                <div className="mt-6 flex flex-wrap items-center justify-end gap-2">
                    <button
                        type="button"
                        onClick={resetAll}
                        className="h-9 rounded-xl border border-black/10 bg-white px-4 text-[12px] font-semibold text-black/60 hover:bg-black/5"
                    >
                        Сбросить <span className="ml-2">×</span>
                    </button>
                    <button
                        type="button"
                        onClick={save}
                        className="h-9 rounded-xl bg-[#1677ff] px-5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                    >
                        Сохранить
                    </button>
                </div>
            </div>

            <div className="h-10" />
        </div>
    );
}