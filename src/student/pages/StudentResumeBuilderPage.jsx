import React, { useMemo, useState } from "react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, HeadingLevel } from "docx";

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

export default function StudentResumeBuilderPage() {
    const tabs = ["Личная информация", "Образование", "Навыки", "Опыт работы", "Дополнительно"];
    const [tab, setTab] = useState(tabs[0]);

    const [form, setForm] = useState({
        name: "Алина",
        lastName: "Серикова",
        middleName: "Нурлановна",
        email: "student@test.kz",
        phone: "+77010000001",
        city: "Алматы",
        birth: "14.03.2003",
        about: "Я студент IT-направления с сильной технической базой и практическим опытом разработки программного обеспечения. Уверенно работаю с современными технологиями, быстро осваиваю новые инструменты и стремлюсь понимать не только как работает решение, но и почему оно устроено именно так. Имею опыт командной разработки, работы с системами контроля версий, базами данных и веб-технологиями. Ответственно подхожу к задачам, умею самостоятельно находить решения и доводить проекты до результата.",
        photoName: "",
    });

    const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

    const title = useMemo(() => tab, [tab]);

    const preview = async () => {
        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph({
                            text: "РЕЗЮМЕ",
                            heading: HeadingLevel.HEADING_1,
                        }),

                        new Paragraph(`Имя: ${form.name}`),
                        new Paragraph(`Фамилия: ${form.lastName}`),
                        new Paragraph(`Отчество: ${form.middleName}`),
                        new Paragraph(`Email: ${form.email}`),
                        new Paragraph(`Телефон: ${form.phone}`),
                        new Paragraph(`Город: ${form.city}`),
                        new Paragraph(`Дата рождения: ${form.birth}`),

                        new Paragraph(""),
                        new Paragraph("О себе:"),
                        new Paragraph(form.about),
                    ],
                },
            ],
        });

        const blob = await Packer.toBlob(doc);

        saveAs(
            blob,
            `Resume_${form.lastName}_${form.name}.docx`
        );
    };

    const save = () => {
        alert("Резюме сохранено (демо).");
    };

    const onPhoto = (e) => {
        const f = e.target.files && e.target.files[0];
        if (!f) return;
        setForm((p) => ({ ...p, photoName: f.name }));
    };

    return (
        <div className="py-8">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h1 className="text-[20px] font-semibold text-black/80">Создание резюме</h1>
                    <div className="mt-2 text-[12px] text-black/45">{title}</div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={preview}
                        className="h-9 rounded-xl border border-[#1677ff] bg-white px-4 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition"
                    >
                        Предпросмотр
                    </button>
                    <button
                        type="button"
                        onClick={save}
                        className="h-9 rounded-xl bg-[#1677ff] px-4 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                    >
                        Сохранить
                    </button>
                </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-black/10 bg-white">
                <div className="grid grid-cols-5">
                    {tabs.map((t) => (
                        <Tab key={t} active={t === tab} onClick={() => setTab(t)}>
                            {t}
                        </Tab>
                    ))}
                </div>
            </div>

            <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                <div className="text-[16px] font-semibold text-black/75">Личная информация</div>
                <div className="mt-2 text-[12px] text-black/45">
                    Заполните основную информацию о себе для резюме
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-4">
                    <Input label="name" value={form.name} onChange={set("name")} />
                    <Input label="Фамилия" value={form.lastName} onChange={set("lastName")} />
                    <Input label="Отчество" value={form.middleName} onChange={set("middleName")} />
                    <Input label="Почта" value={form.email} onChange={set("email")} />
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Input label="Телефон" value={form.phone} onChange={set("phone")} />
                    <Input label="Город" value={form.city} onChange={set("city")} />
                    <Input label="Дата рождения" value={form.birth} onChange={set("birth")} />
                </div>

                <label className="mt-4 block text-[11px] text-black/45">
                    Рассказ о себе
                    <textarea
                        value={form.about}
                        onChange={set("about")}
                        className="mt-2 h-40 w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-[12px] text-black/70 outline-none focus:border-[#1677ff]"
                    />
                </label>

                <div className="mt-6 rounded-2xl border border-dashed border-black/15 bg-[#fbfcff] p-10">
                    <div className="flex flex-col items-center justify-center gap-3">
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#1677ff] bg-white px-4 py-2 text-[12px] font-semibold text-[#1677ff] hover:bg-[#eef5ff] transition">
                            <input type="file" accept=".png,.jpg,.jpeg" className="hidden" onChange={onPhoto} />
                            <span>Загрузить фото</span>
                            <span aria-hidden="true">↓</span>
                        </label>
                        <div className="text-[11px] text-black/35">PNG, JPG или JPEG до 2MB</div>
                        {form.photoName && (
                            <div className="text-[11px] font-semibold text-black/50">
                                Загружено: {form.photoName}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        onClick={() => setTab("Образование")}
                        className="h-10 rounded-xl bg-[#1677ff] px-5 text-[12px] font-semibold text-white hover:bg-[#0f66e6] transition"
                    >
                        Далее - Образование
                    </button>
                </div>
            </div>

            <div className="h-10" />
        </div>
    );
}