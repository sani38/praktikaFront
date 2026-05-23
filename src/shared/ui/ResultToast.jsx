import { useEffect, useState } from "react";

export function ResultToast({
    isOpen,
    type = "success",
    title,
    message,
    onClose,
}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        setVisible(true);

        const hideTimer = setTimeout(() => {
            setVisible(false);
        }, 4500);

        const closeTimer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => {
            clearTimeout(hideTimer);
            clearTimeout(closeTimer);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const isSuccess = type === "success";

    return (
        <div
            className={`
                fixed right-5 top-5 z-50
                transition-all duration-500 ease-out
                ${
                    visible
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-2 opacity-0"
                }
            `}
        >
            <div
                className={`
                    min-w-[320px] max-w-[420px]
                    rounded-xl border p-4 shadow-[0_10px_30px_rgba(0,0,0,0.10)]
                    backdrop-blur-sm
                    ${
                        isSuccess
                            ? "border-green-200 bg-green-50"
                            : "border-red-200 bg-red-50"
                    }
                `}
            >
                <div
                    className={`
                        text-[14px] font-semibold
                        ${
                            isSuccess
                                ? "text-green-700"
                                : "text-red-700"
                        }
                    `}
                >
                    {title}
                </div>

                <div
                    className={`
                        mt-1 text-[12px] leading-5
                        ${
                            isSuccess
                                ? "text-green-800/80"
                                : "text-red-800/80"
                        }
                    `}
                >
                    {message}
                </div>
            </div>
        </div>
    );
}