"use client"
import useAdminStore from '@/stores/useAdminStore';
import React, { useEffect, useRef } from 'react';

const Editor = () => {
    const editorRef = useRef(null);
    const { setEditor, selectedItem, setSelectedItem } = useAdminStore();

    useEffect(() => {
        if (editorRef.current) {
            setEditor(editorRef.current);
        }
    }, []);

    // Handling the border to the selected item
    useEffect(() => {
        let prevItem = null;
        let prevBorder = "";

        if (selectedItem) {
            // Restore the original border of the previously selected item
            if (prevItem && prevItem !== selectedItem) {
                prevItem.style.border = prevBorder;
            }

            // Save current border before overriding
            prevBorder = selectedItem.style.border;

            // Add selection border
            selectedItem.style.border = "2px solid red";
            prevItem = selectedItem;
        }

        // Cleanup when selectedItem changes or component unmounts
        return () => {
            if (prevItem) {
                prevItem.style.border = prevBorder;
            }
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
            console.log("Clicked element:", e.target);
        };

        editorEl.addEventListener("click", handleClick);

        // Cleanup
        return () => {
            editorEl.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <div className="w-full h-full overflow-y-auto bg-background pb-25"onClick={() => { setSelectedItem(null) }}>
            <h2 className="text-lg font-semibold mb-4">Editor</h2>
            <div
                ref={editorRef}
                id="editorPanel"
                contentEditable
                suppressContentEditableWarning
                className='focus:outline-none'
            >
            </div>
        </div>
    );
};

export default Editor;
