import React from "react";
import { useI18n } from "./I18nProvider.jsx";

const SWITCHER_LANGUAGES = [
    {
        code: "ru",
        label: "Рус",
        title: "Русский",
    },
    {
        code: "kk",
        label: "Қаз",
        title: "Қазақша",
    },
    {
        code: "en",
        label: "Eng",
        title: "English",
    },
];

export default function LanguageSwitcher({ className = "" }) {
    const { language, setLanguage } = useI18n();

    return (
        <div
            data-no-translate="true"
            translate="no"
            className={`inline-flex items-center rounded-[18px] border border-[#1677ff]/30 bg-white p-1 shadow-[0_8px_20px_rgba(15,23,42,0.04)] ${className}`}
            aria-label="Выбор языка"
        >
            {SWITCHER_LANGUAGES.map((item) => {
                const active = item.code === language;

                return (
                    <button
                        key={item.code}
                        type="button"
                        data-no-translate="true"
                        translate="no"
                        onClick={() => setLanguage(item.code)}
                        className={`h-9 min-w-[52px] rounded-[14px] px-4 text-[14px] font-semibold transition ${active
                                ? "bg-[#1677ff] text-white shadow-[0_8px_18px_rgba(22,119,255,0.25)]"
                                : "bg-transparent text-black/60 hover:bg-[#f3f7ff] hover:text-[#1677ff]"
                            }`}
                        title={item.title}
                    >
                        <span data-no-translate="true" translate="no">
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}