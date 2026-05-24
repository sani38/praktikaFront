import React, { useEffect, useState } from "react";
import {
    getDataForCreateVacancy,
    createVacancy,
} from "../../shared/api/employerApi.js";

function Select({ name, value, onChange, children, w = "min-w-[160px]" }) {
    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            className={`h-9 ${w} rounded-xl border border-black/10 bg-white px-3 text-[12px] text-black/60 outline-none focus:border-[#1677ff]`}
        >
            {children}
        </select>
    );
}

function Input({ name, label, value, onChange, placeholder = "", type = "text" }) {
    return (
        <label className="block text-[11px] text-black/45">
            {label}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="mt-2 h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
            />
        </label>
    );
}

function TextArea({ name, label, value, onChange, className = "h-24" }) {
    return (
        <label className="mt-4 block text-[11px] text-black/45">
            {label}
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                className={`mt-2 ${className} w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-[12px] text-black/70 outline-none focus:border-[#1677ff]`}
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
    const [dictionary, setDictionary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        nameRu: "",
        shortDescription: "",
        fullDescription: "",
        typeOfEmploymentsId: "",
        practiceFormId: "",
        workFormatId: "",
        regionId: "",
        categoryId: "",
        course: "",
        neccessaryTasks: "",
        requirements: "",
        startDate: "",
        endDate: "",
        address: "",
        jobTitle: "",
        paymentTypeId: "",
    });

    const [agree1, setAgree1] = useState(true);
    const [agree2, setAgree2] = useState(true);
    const [agree3, setAgree3] = useState(false);

    useEffect(() => {
        async function loadDataForCreateVacancy() {
            try {
                const data = await getDataForCreateVacancy();
                console.log("data-for-create-vacancy:", data);
                setDictionary(data);
            } catch (error) {
                console.error("Ошибка загрузки данных для создания вакансии:", error);
            } finally {
                setLoading(false);
            }
        }

        loadDataForCreateVacancy();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const submit = async () => {
        if (!agree1 || !agree2) {
            alert("Нужно подтвердить обязательные согласия.");
            return;
        }

        try {
            setSaving(true);

            await createVacancy({
            employerId: dictionary?.employerId ?? null,

            nameRu: form.nameRu,
            shotrDescription: form.shortDescription,
            fullDescription: form.fullDescription,

            typeOfEmploymentsId: form.typeOfEmploymentsId,
            practiceFormId: form.practiceFormId,
            workFormatId: form.workFormatId,

            regionId: form.regionId || null,

            categoryId: form.categoryId,
            paymentTypeId: form.paymentTypeId,

            course: Number(form.course),

            neccessaryTasks: form.neccessaryTasks,
            requirements: form.requirements,

            startDate: form.startDate
                ? new Date(form.startDate).toISOString()
                : null,

            endDate: form.endDate
                ? new Date(form.endDate).toISOString()
                : null,

            address: form.address,
            jobTitle: form.jobTitle,
        });

            alert("Вакансия успешно создана");
        } catch (error) {
            console.error("Ошибка создания вакансии:", error);
            alert("Не удалось создать вакансию");
        } finally {
            setSaving(false);
        }
    };

    const preview = () => alert("Предпросмотр пока не подключен.");
    const draft = () => alert("Черновик пока не подключен.");

    if (loading) {
        return <div className="py-10 text-[14px] text-black/60">Загрузка...</div>;
    }

    return (
        <div className="py-10">
            <div className="text-[12px] text-[#1677ff]">Создать вакансию</div>
            <h1 className="mt-2 text-[20px] font-semibold text-black/80">
                Создать вакансию
            </h1>

            <div className="mt-6 space-y-5">
                <Section title="Основная информация">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
                        <div className="md:col-span-2">
                            <Input
                                name="nameRu"
                                label="Название практики"
                                value={form.nameRu}
                                onChange={handleChange}
                                placeholder="Например: Junior Data Analyst"
                            />
                        </div>

                        <div className="md:col-span-1">
                            <Select
                                name="typeOfEmploymentsId"
                                value={form.typeOfEmploymentsId}
                                onChange={handleChange}
                                w="w-full"
                            >
                                <option value="">Тип занятости</option>
                                {dictionary?.typeOfEmployments?.map((x) => (
                                    <option
                                        key={x.typeOfEmploymentId}
                                        value={x.typeOfEmploymentId}
                                    >
                                        {x.nameRu}
                                    </option>
                                ))}
                            </Select>
                        </div>

                        <div className="md:col-span-1">
                            <Select
                                name="practiceFormId"
                                value={form.practiceFormId}
                                onChange={handleChange}
                                w="w-full"
                            >
                                <option value="">Форма практики</option>
                                {dictionary?.practiceForms?.map((x) => (
                                    <option
                                        key={x.practiceFormId}
                                        value={x.practiceFormId}
                                    >
                                        {x.nameRu}
                                    </option>
                                ))}
                            </Select>
                        </div>

                        <div className="md:col-span-1">
                            <Select
                                name="workFormatId"
                                value={form.workFormatId}
                                onChange={handleChange}
                                w="w-full"
                            >
                                <option value="">Формат работы</option>
                                {dictionary?.workFormats?.map((x) => (
                                    <option
                                        key={x.workFormatId}
                                        value={x.workFormatId}
                                    >
                                        {x.nameRu}
                                    </option>
                                ))}
                            </Select>
                        </div>

                        <div className="md:col-span-1">
                            <Select
                                name="categoryId"
                                value={form.categoryId}
                                onChange={handleChange}
                                w="w-full"
                            >
                                <option value="">Категория</option>
                                {dictionary?.vacancyCategories?.map((x) => (
                                    <option
                                        key={x.vacancyCategoryId}
                                        value={x.vacancyCategoryId}
                                    >
                                        {x.nameRu}
                                    </option>
                                ))}
                            </Select>
                        </div>

                        <div className="md:col-span-1">
                            <Select
                                name="course"
                                value={form.course}
                                onChange={handleChange}
                                w="w-full"
                            >
                                <option value="">Желаемый курс</option>
                                <option value="1">1 курс</option>
                                <option value="2">2 курс</option>
                                <option value="3">3 курс</option>
                                <option value="4">4 курс</option>
                            </Select>
                        </div>

                        <div className="md:col-span-1">
                            <Select
                                name="paymentTypeId"
                                value={form.paymentTypeId}
                                onChange={handleChange}
                                w="w-full"
                            >
                                <option value="">Тип оплаты</option>
                                {dictionary?.paymentTypes?.map((x) => (
                                    <option
                                        key={x.paymentTypeId}
                                        value={x.paymentTypeId}
                                    >
                                        {x.nameRu}
                                    </option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    <TextArea
                        name="shortDescription"
                        label="Краткое описание"
                        value={form.shortDescription}
                        onChange={handleChange}
                        className="h-20"
                    />

                    <TextArea
                        name="fullDescription"
                        label="Полное описание"
                        value={form.fullDescription}
                        onChange={handleChange}
                    />

                    <TextArea
                        name="neccessaryTasks"
                        label="Основные задачи"
                        value={form.neccessaryTasks}
                        onChange={handleChange}
                    />

                    <TextArea
                        name="requirements"
                        label="Требования"
                        value={form.requirements}
                        onChange={handleChange}
                    />
                </Section>

                <Section title="Условия и срок">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                        <Input
                            name="startDate"
                            label="Дата начала"
                            type="date"
                            value={form.startDate}
                            onChange={handleChange}
                        />

                        <Input
                            name="endDate"
                            label="Дата окончания"
                            type="date"
                            value={form.endDate}
                            onChange={handleChange}
                        />

                        <Input
                            name="address"
                            label="Адрес"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="Например: Алматы, ул. Бегалина 120"
                        />

                        <Input
                            name="jobTitle"
                            label="Должность"
                            value={form.jobTitle}
                            onChange={handleChange}
                            placeholder="Например: Data Analyst Intern"
                        />
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div>
                        <label className="block text-[11px] text-black/45 mb-2">
                            Регион
                        </label>

                        <Select
                            name="regionId"
                            value={form.regionId}
                            onChange={handleChange}
                            w="w-full"
                        >
                            <option value="">Выберите регион</option>

                            {dictionary?.regions?.map((x) => (
                                <option
                                    key={x.regionId}
                                    value={x.regionId}
                                >
                                    {x.nameRu}
                                </option>
                            ))}
                        </Select>
                    </div>
                </div>
                </Section>

                <Section title="Политика и согласия">
                    <div className="space-y-3 text-[12px] text-black/55">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={agree1}
                                onChange={(e) => setAgree1(e.target.checked)}
                                className="accent-[#1677ff]"
                            />
                            Подтверждаю, что информация верна и не нарушает законодательство РК
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={agree2}
                                onChange={(e) => setAgree2(e.target.checked)}
                                className="accent-[#1677ff]"
                            />
                            Согласен с правилами портала и даю согласие на обработку данных
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={agree3}
                                onChange={(e) => setAgree3(e.target.checked)}
                                className="accent-[#1677ff]"
                            />
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
                            disabled={saving}
                            className="h-10 rounded-xl bg-[#1677ff] px-5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition disabled:opacity-60"
                        >
                            {saving ? "Отправка..." : "Отправить на модерацию"}
                        </button>
                    </div>
                </Section>
            </div>

            <div className="h-10" />
        </div>
    );
}