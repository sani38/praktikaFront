import React from "react";

export default function AdminApprovalsPage() {
    return (
        <div className="py-10">
            <div className="text-[12px] text-[#1677ff]">Подтвержденные регистрации</div>
            <h1 className="mt-2 text-[20px] font-semibold text-black/80">Подтверждение регистрации</h1>
            <div className="mt-1 text-[12px] text-black/45">
                Рассмотрение и подтверждение заявок на регистрацию новых пользователей
            </div>

            <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                <div className="text-[12px] font-semibold text-black/70">Ожидающие подтверждения (0)</div>

                <div className="mt-4 rounded-2xl bg-[#f6f7fb] p-6">
                    <div className="text-[12px] font-semibold text-black/70">Нет ожидающих заявок</div>
                    <div className="mt-1 text-[12px] text-black/45">
                        В настоящее время нет заявок, требующих подтверждения
                    </div>
                </div>
            </div>

            <div className="h-10" />
        </div>
    );
}