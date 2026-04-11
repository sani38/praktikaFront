import React from "react";

export function Pill({ variant = "gray", children }) {
    const map = {
        info: "bg-[#eef5ff] text-[#1677ff]",
        green: "bg-[#eaffea] text-[#16a34a]",
        red: "bg-[#fff0f0] text-[#d92d20]",
        yellow: "bg-[#fff8db] text-[#b7791f]",
        gray: "bg-[#f3f4f6] text-black/55",
    };
    const cls = map[variant] || map.gray;

    return (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${cls}`}>
            {children}
        </span>
    );
}

export function IconUser() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <path d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-1c0-2.761-3.582-5-8-5z" />
        </svg>
    );
}

export function Switch({ checked, onChange }) {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`relative h-6 w-10 rounded-full border transition ${checked ? "bg-[#1677ff] border-[#1677ff]" : "bg-black/10 border-black/10"
                }`}
            aria-pressed={checked}
        >
            <span
                className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow transition ${checked ? "left-5" : "left-1"
                    }`}
            />
        </button>
    );
}

export function Modal({ open, title, children, onClose }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/30" onClick={onClose} />
            <div className="relative w-full max-w-[720px] rounded-2xl bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                <div className="flex items-start justify-between gap-3">
                    <div className="text-[14px] font-semibold text-black/80">{title}</div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-8 w-8 rounded-lg border border-black/10 bg-white text-black/60 hover:bg-black/5"
                        aria-label="Закрыть"
                    >
                        ×
                    </button>
                </div>
                <div className="mt-4">{children}</div>
            </div>
        </div>
    );
}