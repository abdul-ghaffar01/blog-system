"use client";
import React from "react";
import useAdminStore from "@/stores/useAdminStore";

const ElementAccordion = ({ title, open, elementId, children }) => {
    const { selectedItem, setSelectedItem } = useAdminStore();

    const handleToggle = () => {
        if (selectedItem?.id === elementId) {
            setSelectedItem(null); // close if already selected
        } else {
            const node = document.getElementById(elementId);
            if (node) setSelectedItem(node);
        }
    };

    return (
        <div className="border rounded mb-2">
            <button
                onClick={handleToggle}
                className="w-full flex justify-between items-center px-3 py-2 font-medium bg-surface hover:bg-surface-hover"
            >
                {title}
                <span>{open ? "▲" : "▼"}</span>
            </button>
            {open && <div className="p-3 bg-gray-50">{children}</div>}
        </div>
    );
};

export default ElementAccordion;
