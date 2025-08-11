"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Button from "../ui/Button";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <Button disabled="true" loading={true} variant="success" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </Button>
    );
}
