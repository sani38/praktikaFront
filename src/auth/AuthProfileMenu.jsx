import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../shared/i18n/I18nProvider.jsx";

const ROLE_INFO = {
    student: {
        title: "Студент",
        home: "/student",
    },
    employer: {
        title: "Работодатель",
        home: "/employer",
    },
    admin: {
        title: "Администратор",
        home: "/admin",
    },
    university_staff: {
        title: "Сотрудник университета",
        home: "/career",
    },
};

export default function AuthProfileMenu() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { t } = useI18n();

    const authUser = useMemo(() => {
        try {
            return JSON.parse(localStorage.getItem("authUser"));
        } catch {
            return null;
        }
    }, []);

    const roleCode = authUser?.roleCode || localStorage.getItem("roleCode");

    const info = ROLE_INFO[roleCode] || {
        title: "Пользователь",
        home: "/login",
    };

    const fullName = `${authUser?.lastName || ""} ${authUser?.firstName || ""}`.trim() || "Пользователь";
    const translatedTitle = t(info.title);

    const handleCabinet = () => {
        setOpen(false);
        navigate(info.home);
    };

    const handleLogout = () => {
        localStorage.removeItem("authUser");
        localStorage.removeItem("token");
        localStorage.removeItem("roleCode");
        setOpen(false);
        navigate("/login");
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="inline-flex items-center gap-2 rounded-lg bg-[#f1f5ff] px-3 py-2 text-[12px] font-medium text-[#1f66ff] hover:bg-[#e9f0ff] transition"
            >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#1677ff] text-[11px] font-bold text-white">
                    {translatedTitle.slice(0, 1)}
                </span>
                <span>{ fullName}</span>
                <svg viewBox="0 0 24 24" fill="none" className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} aria-hidden="true">
                    <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {open && (
                <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-72 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.14)]">
                    <div className="border-b border-black/5 p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1677ff] text-sm font-bold text-white">
                                {translatedTitle.slice(0, 1)}
                            </div>
                            <div>
                                <div className="text-[13px] font-semibold text-black/80">{fullName}</div>
                                <div className="mt-0.5 text-[11px] text-black/45">Роль: {translatedTitle}</div>
                            </div>
                        </div>
                    </div>

                    <div className="p-2">

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="mt-1 flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[12px] font-medium text-red-600 hover:bg-red-50 transition"
                        >
                            <span>Выйти из аккаунта</span>
                            <span>↗</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}