"use client"
import useAdminStore from '@/stores/useAdminStore';
import updatePreview from '@/utils/admin/updatePreview';
import React, { useEffect, useRef } from 'react';

const Editor = () => {
    const editorRef = useRef(null);
    const { setEditor, selectedItem, setSelectedItem } = useAdminStore();
    const prevItemRef = useRef(null);

    useEffect(() => {
        if (editorRef.current) {
            setEditor(editorRef.current);
        }
    }, []);

    // Handling the border to the selected item
    useEffect(() => {

        if (selectedItem) {
            // Remove outline from previous item if different
            if (prevItemRef.current && prevItemRef.current !== selectedItem) {
                prevItemRef.current.style.outline = "";
                prevItemRef.current.style.outlineOffset = "";
            }

            // Apply selection outline
            selectedItem.style.outline = "2px solid var(--surface)";
            selectedItem.style.outlineOffset = "2px";

            // Store the currently selected item
            prevItemRef.current = selectedItem;
        }

        return () => {
            if (prevItemRef.current) {
                prevItemRef.current.style.outline = "";
                prevItemRef.current.style.outlineOffset = "";
            }
        };
    }, [selectedItem]);


    useEffect(() => {
        if (!editorRef.current || !selectedItem) return;

        // Make all children non-editable
        Array.from(editorRef.current.children).forEach(el => {
            el.contentEditable = "false";
        });

        // Make only the selected item editable
        selectedItem.contentEditable = "true";
        selectedItem.focus();

        const handleInput = () => {
            updatePreview();
        };

        const handleKeyDown = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                document.execCommand("insertLineBreak");
            }
        };

        // Listeners
        editorRef.current.addEventListener("input", handleInput);
        selectedItem.addEventListener("keydown", handleKeyDown);

        return () => {
            editorRef.current.removeEventListener("input", handleInput);
            selectedItem.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedItem]);

    useEffect(() => {
        const editorEl = editorRef.current;
        if (!editorEl) return;

        const handleClick = (e) => {
            // Prevent container click from resetting immediately
            e.stopPropagation();

            // Ignore clicks on the editor container itself
            if (e.target.id === "editorPanel") {
                setSelectedItem(null);
                return;
            }

            setSelectedItem(e.target);
        };

        editorEl.addEventListener("click", handleClick);

        // Cleanup
        return () => {
            editorEl.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <div className="w-full h-full overflow-y-auto bg-background pb-25" onClick={() => { setSelectedItem(null) }}>
            <h2 className="text-lg font-semibold bg-background p-2 select-none">Editor</h2>
            <div
                ref={editorRef}
                id="editorPanel"
                className='focus:outline-none flex flex-col gap-3 px-2'
            >
            </div>
        </div>
    );
};

export default Editor;
