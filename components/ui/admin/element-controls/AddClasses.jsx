"use client"
import React, { useState } from 'react'
import Button from '../../Button';
import updatePanels from '@/utils/admin/updatePanels';
import { X } from 'lucide-react';

const AddClasses = ({ el }) => {
    const [tailwindClass, setTailwindClass] = useState("");

    const addClass = (e) => {
        e.preventDefault();
        if (!el || !tailwindClass.trim()) return;

        const classesToAdd = tailwindClass
            .trim()
            .split(/\s+/)
            .filter((c) => c);

        classesToAdd.forEach((cls) => el.elem.classList.add(cls));
        setTailwindClass("");
        updatePanels()
    };

    const removeClass = (cls) => {
        if (!el) return;
        el.elem.classList.remove(cls);
        updatePanels()
    };

    return (
        <div className='flex flex-col'>

            {/* Add new class */}
            <div className="">
                <h1 className="text-muted text-sm mb-1">Add Classes</h1>
                <form onSubmit={addClass} className="flex gap-2">
                    <input
                        className="p-2 border-border bg-background w-full rounded text-sm outline-none"
                        onChange={(e) => setTailwindClass(e.target.value)}
                        value={tailwindClass}
                        type="text"
                        placeholder="Type any Tailwind class"
                    />
                    <Button variant="success" className="text-sm">Add</Button>
                </form>
            </div>

            {/* Existing classes */}
            <div className="flex flex-wrap gap-2 mt-2">
                {el?.elem ? (
                    [...el.elem.classList].map((cls) => (
                        <div
                            key={cls}
                            className="flex items-center gap-1 bg-background border border-border px-2 py-1 rounded"
                        >
                            <span className="text-sm text-foreground">{cls}</span>
                            <button onClick={() => removeClass(cls)} type="button">
                                <X size={14} className="text-danger hover:text-danger-hover" />
                            </button>
                        </div>
                    ))
                ) : (
                    <span className="text-xs text-muted">No classes</span>
                )}
            </div>

        </div>
    )
}

export default AddClasses