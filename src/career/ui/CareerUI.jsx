import React from "react";

export function Pill({ variant = "gray", children }) {
    const map = {
        blue: "bg-[#eef5ff] text-[#1677ff]",
        green: "bg-[#eaffea] text-[#16a34a]",
        red: "bg-[#fff0f0] text-[#d92d20]",
        yellow: "bg-[#fff8db] text-[#b7791f]",
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

export function IconPin() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
        </svg>
    );
}

export function IconClock() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <path d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm1 11h5v-2h-5V6h-2v7a2 2 0 002 2z" />
        </svg>
    );
}

export function IconMoney() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <path d="M21 7H3a2 2 0 00-2 2v6a2 2 0 002 2h18a2 2 0 002-2V9a2 2 0 00-2-2zM7 15H5v-2h2zm0-4H5V9h2zm12 4h-2v-2h2zm0-4h-2V9h2z" />
        </svg>
    );
}