import React, { useMemo, useState } from "react";
import { Pill } from "../ui/EmployerUi.jsx";

function Select({ value, onChange, children, w = "min-w-[160px]" }) {
    return (
        <select
            value={value}
            onChange={onChange}
            className={`h-9 ${w} rounded-xl border border-black/10 bg-white px-3 text-[12px] text-black/60 outline-none focus:border-[#1677ff]`}
        >
            {children}
        </select>
    );
}

function Input({ label, value, onChange, placeholder = "" }) {
    return (
        <label className="block text-[11px] text-black/45">
            {label}
            <input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="mt-2 h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
            />
        </label>
    );
}

function Section({ title, children }) {
    return (
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="text-[14px] font-semibold text-black/75">{title}</div>
            <div className="mt-4">{children}</div>
        </div>
    );
}

export default function EmployerCreateVacancyPage() {
    const [title, setTitle] = useState("Junior Data Analyst (производственная практика)");
    const [shortDesc, setShortDesc] = useState("");
    const [fullDesc, setFullDesc] = useState("");
    const [tasks, setTasks] = useState("");

    const [employment, setEmployment] = useState("Тип занятости");
    const [practiceForm, setPracticeForm] = useState("Форма практики");
    const [practiceType, setPracticeType] = useState("Форма практики 2");
    const [course, setCourse] = useState("Желаемый курс");
    const [langs, setLangs] = useState("Языки");

    const [period, setPeriod] = useState("14.07.25 - 20.08.25");
    const [location, setLocation] = useState("Алматы, ул. Бегалина 120» или «Remote");
    const [salary, setSalary] = useState("Стипендия 100 000 ₸ в месяц / обед + ...");
    const [employmentChance, setEmploymentChance] = useState("Возможность трудоустройства");

    const [contactName, setContactName] = useState("Иван Ким, Senior Data Scientist");
    const [contactEmail, setContactEmail] = useState("internships@company.kz");
    const [contactPhone, setContactPhone] = useState("+7 777 123-45-67");
    const [contactSite, setContactSite] = useState("https://company.kz");

    const [skillInput, setSkillInput] = useState("Python");
    const [skills, setSkills] = useState(["Python", "Excel", "SQL"]);

    const [agree1, setAgree1] = useState(true);
    const [agree2, setAgree2] = useState(true);
    const [agree3, setAgree3] = useState(false);

    const addSkill = () => {
        const s = skillInput.trim();
        if (!s) return;
        if (skills.includes(s)) return;
        setSkills((p) => [...p, s]);
        setSkillInput("");
    };

    const removeSkill = (s) => setSkills((p) => p.filter((x) => x !== s));

    const submit = () => {
        if (!agree1 || !agree2) {
            alert("Нужно подтвердить 2 обязательных согласия.");
            return;
        }
        alert("Отправлено на модерацию (демо).");
    };

    const preview = () => alert("Предпросмотр (демо).");
    const draft = () => alert("Черновик сохранен (демо).");

    return (
        <div className="py-10">
            <div className="text-[12px] text-[#1677ff]">Создать вакансию</div>
            <h1 className="mt-2 text-[20px] font-semibold text-black/80">Создать вакансию</h1>

            <div className="mt-6 space-y-5">
                <Section title="Основная информация">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
                        <div className="md:col-span-2">
                            <Input label="Название практики" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div className="md:col-span-1">
                            <Select value={employment} onChange={(e) => setEmployment(e.target.value)} w="w-full">
                                <option>Тип занятости</option>
                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Гибкий график</option>
                            </Select>
                        </div>

                        <div className="md:col-span-1">
                            <Select value={practiceForm} onChange={(e) => setPracticeForm(e.target.value)} w="w-full">
                                <option>Форма практики</option>
                                <option>Офис</option>
                                <option>Удаленно</option>
                                <option>Гибрид</option>
                            </Select>
                        </div>

                        <div className="md:col-span-1">
                            <Select value={practiceType} onChange={(e) => setPracticeType(e.target.value)} w="w-full">
                                <option>Форма практики 2</option>
                                <option>Производственная</option>
                                <option>Преддипломная</option>
                                <option>Учебная</option>
                            </Select>
                        </div>

                        <div className="md:col-span-1">
                            <Select value={course} onChange={(e) => setCourse(e.target.value)} w="w-full">
                                <option>Желаемый курс</option>
                                <option>1 курс</option>
                                <option>2 курс</option>
                                <option>3 курс</option>
                                <option>4 курс</option>
                            </Select>
                        </div>

                        <div className="md:col-span-1">
                            <Select value={langs} onChange={(e) => setLangs(e.target.value)} w="w-full">
                                <option>Языки</option>
                                <option>Русский</option>
                                <option>Казахский</option>
                                <option>Английский</option>
                            </Select>
                        </div>
                    </div>

                    <label className="mt-4 block text-[11px] text-black/45">
                        Краткое описание (до 200 симв.)
                        <textarea
                            value={shortDesc}
                            onChange={(e) => setShortDesc(e.target.value)}
                            className="mt-2 h-20 w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                        />
                    </label>

                    <label className="mt-4 block text-[11px] text-black/45">
                        Полное описание
                        <textarea
                            value={fullDesc}
                            onChange={(e) => setFullDesc(e.target.value)}
                            className="mt-2 h-24 w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                        />
                    </label>

                    <label className="mt-4 block text-[11px] text-black/45">
                        Основные задачи
                        <textarea
                            value={tasks}
                            onChange={(e) => setTasks(e.target.value)}
                            className="mt-2 h-24 w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                        />
                    </label>

                    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div>
                            <Input
                                label="Требуемые навыки"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                placeholder="Например: Python"
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                type="button"
                                onClick={addSkill}
                                className="h-10 rounded-xl bg-[#1677ff] px-5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                            >
                                Добавить
                            </button>
                        </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {skills.map((s) => (
                            <button
                                key={s}
                                type="button"
                                onClick={() => removeSkill(s)}
                                className="group inline-flex items-center gap-2 rounded-full bg-[#f3f4f6] px-3 py-1 text-[11px] text-black/60 hover:bg-[#e9edf3] transition"
                                title="Нажми чтобы удалить"
                            >
                                {s}
                                <span className="text-black/40 group-hover:text-black/60">×</span>
                            </button>
                        ))}
                    </div>
                </Section>

                <Section title="Условия и срок">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                        <Input label="Начало и конец практики" value={period} onChange={(e) => setPeriod(e.target.value)} />
                        <Input label="Локация" value={location} onChange={(e) => setLocation(e.target.value)} />
                        <Input label="Оплата" value={salary} onChange={(e) => setSalary(e.target.value)} />
                        <Select value={employmentChance} onChange={(e) => setEmploymentChance(e.target.value)} w="w-full">
                            <option>Возможность трудоустройства</option>
                            <option>Да</option>
                            <option>Нет</option>
                            <option>По результатам</option>
                        </Select>
                    </div>
                </Section>

                <Section title="Контактные данные">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                        <Input label="Ответственный" value={contactName} onChange={(e) => setContactName(e.target.value)} />
                        <Input label="E-mail" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                        <Input label="Телефон" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
                        <Input label="Ссылка на корпоративный сайт" value={contactSite} onChange={(e) => setContactSite(e.target.value)} />
                    </div>
                </Section>

                <Section title="Политика и согласия">
                    <div className="space-y-3 text-[12px] text-black/55">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={agree1} onChange={(e) => setAgree1(e.target.checked)} className="accent-[#1677ff]" />
                            Подтверждаю, что информация верна и не нарушает законодательство РК
                        </label>

                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={agree2} onChange={(e) => setAgree2(e.target.checked)} className="accent-[#1677ff]" />
                            Согласен с правилами портала и даю согласие на обработку данных
                        </label>

                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={agree3} onChange={(e) => setAgree3(e.target.checked)} className="accent-[#1677ff]" />
                            Требуется подписать NDA со студентами
                        </label>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={preview}
                            className="h-10 rounded-xl border border-[#1677ff] bg-white px-5 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                        >
                            Предпросмотр
                        </button>

                        <button
                            type="button"
                            onClick={draft}
                            className="h-10 rounded-xl border border-[#1677ff] bg-white px-5 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                        >
                            Сохранить черновик
                        </button>

                        <button
                            type="button"
                            onClick={submit}
                            className="h-10 rounded-xl bg-[#1677ff] px-5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                        >
                            Отправить на модерацию
                        </button>
                    </div>
                </Section>
            </div>

            <div className="h-10" />
        </div>
    );
}