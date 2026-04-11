import React from "react";

export function Pill({ children, variant = "gray" }) {
    const map = {
        gray: "bg-[#f3f4f6] text-black/55",
        blue: "bg-[#eef5ff] text-[#1677ff]",
        green: "bg-[#eefbf0] text-[#2b8a3e]",
        red: "bg-[#fff0f0] text-[#d92d20]",
        outlineBlue: "border border-[#1677ff] text-[#1677ff] bg-white",
        outline: "border border-black/10 text-black/55 bg-white",
    };
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] ${map[variant] || map.gray}`}>
            {children}
        </span>
    );
}

export function IconPin() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <path
                d="M12 22s7-4.5 7-12a7 7 0 10-14 0c0 7.5 7 12 7 12z"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                d="M12 13a3 3 0 100-6 3 3 0 000 6z"
                stroke="currentColor"
                strokeWidth="2"
            />
        </svg>
    );
}

export function IconCalendar() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <path
                d="M7 2v3M17 2v3M3 9h18M5 5h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function IconClock() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <path
                d="M12 22a10 10 0 110-20 10 10 0 010 20z"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                d="M12 6v6l4 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function IconBriefcase() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <path
                d="M9 6V5a2 2 0 012-2h2a2 2 0 012 2v1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M4 7h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2z"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path d="M2 12h20" stroke="currentColor" strokeWidth="2" />
        </svg>
    );
}

export function Pagination({ page, totalPages, onPage }) {
    const pages = [];
    const max = Math.min(totalPages, 5);
    for (let i = 1; i <= max; i++) pages.push(i);

    return (
        <div className="flex items-center justify-center gap-2 py-6">
            <button
                type="button"
                onClick={() => onPage(Math.max(1, page - 1))}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white text-black/50 hover:bg-black/5 transition"
            >
                ←
            </button>

            {pages.map((p) => (
                <button
                    key={p}
                    type="button"
                    onClick={() => onPage(p)}
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-[12px] font-semibold transition ${p === page ? "bg-[#1677ff] text-white" : "border border-black/10 bg-white text-black/55 hover:bg-black/5"
                        }`}
                >
                    {p}
                </button>
            ))}

            <span className="px-2 text-[12px] text-black/40">…</span>
            <button
                type="button"
                onClick={() => onPage(totalPages)}
                className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg border border-black/10 bg-white px-2 text-[12px] text-black/55 hover:bg-black/5 transition"
            >
                {totalPages}
            </button>

            <button
                type="button"
                onClick={() => onPage(Math.min(totalPages, page + 1))}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white text-black/50 hover:bg-black/5 transition"
            >
                →
            </button>
        </div>
    );
}

export function Modal({ open, onClose, children }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50">
            <div
                className="absolute inset-0 bg-black/10 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="absolute inset-0 flex items-start justify-center p-6 pt-16">
                {children}
            </div>
        </div>
    );
}