import React from "react";

export function Pill({ variant = "gray", children }) {
    const map = {
        blue: "bg-[#eef5ff] text-[#1677ff]",
        green: "bg-[#eaffea] text-[#16a34a]",
        red: "bg-[#fff0f0] text-[#d92d20]",
        gray: "bg-[#f3f4f6] text-black/55",
        outline: "bg-white text-black/55 border border-black/10",
    };

    const cls = map[variant] || map.gray;
    const border = variant === "outline" ? "" : "border border-black/0";

    return (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${cls} ${border}`}>
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

export function IconEye() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path
                d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
                stroke="currentColor"
                strokeWidth="2"
            />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        </svg>
    );
}

export function IconEdit() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path
                d="M4 20h4l10.5-10.5a2.121 2.121 0 00-3-3L5 17v3z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M13.5 6.5l4 4" stroke="currentColor" strokeWidth="2" />
        </svg>
    );
}

export function IconTrash() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 6V4h8v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M7 6l1 14h8l1-14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
    );
}

export function SmallIconButton({ title, variant = "blue", onClick, children }) {
    const map = {
        blue: "bg-[#eef5ff] text-[#1677ff] hover:bg-[#e7f0ff]",
        red: "bg-[#fff0f0] text-[#d92d20] hover:bg-[#ffe6e6]",
        gray: "bg-[#f3f4f6] text-black/60 hover:bg-[#eceff3]",
    };

    return (
        <button
            type="button"
            title={title}
            onClick={onClick}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition ${map[variant] || map.gray}`}
        >
            {children}
        </button>
    );
}