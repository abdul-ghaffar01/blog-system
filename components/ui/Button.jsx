"use client";

import clsx from "clsx";
import Loader from "../Loader";

export default function Button({
    children,
    variant = "primary",
    loading = false,
    disabled = false,
    onClick,
    className,
    ...props
}) {
    const variants = {
        primary: {
            bg: "bg-primary",
            hover: "hover:bg-primary-hover",
            text: "text-foreground",
        },
        success: {
            bg: "bg-success",
            hover: "hover:bg-success-hover",
            text: "text-foreground",
        },
        warning: {
            bg: "bg-warning",
            hover: "hover:bg-warning-hover",
            text: "text-foreground",
        },
        danger: {
            bg: "bg-danger",
            hover: "hover:bg-danger-hover",
            text: "text-foreground",
        },
    };

    const current = variants[variant] || variants.primary;
    const disabledStyles =
        "opacity-50 cursor-not-allowed bg-gray-300 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700";


    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={clsx(
                "relative flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200",
                current.bg,
                current.hover,
                current.text,
                (disabled || loading) && disabledStyles,
                className
            )}
            {...props}
        >
            {/* Loader is absolutely centered */}
            {loading && (
                <span className="absolute inset-0 flex items-center justify-center">
                    <Loader size={20} />
                </span>
            )}

            {/* Keep content height but hide visually when loading */}
            <span className={clsx(loading && "invisible")}>{children}</span>
        </button>
    );
}
