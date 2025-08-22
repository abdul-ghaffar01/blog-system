"use client";
import React, { useState } from "react";
import { Table, Plus } from "lucide-react";
import Modal from "@/components/ui/Modal";
import handleTable from "@/utils/admin/handleTable";
import onAction from "@/utils/admin/onAction";

export default function TableButtons({ editor }) {
    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState(2);
    const [cols, setCols] = useState(2);
    const [headers, setHeaders] = useState([""]);

    const addHeader = () => setHeaders([...headers, ""]);
    const updateHeader = (i, val) => {
        const newHeaders = [...headers];
        newHeaders[i] = val;
        setHeaders(newHeaders);
    };

    const insertTable = () => {
        onAction("table", { rows, cols, headers })
        // handleTable({ rows, cols, headers }, editor);
        setOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="p-2 rounded-md hover:bg-surface text-muted hover:text-foreground"
                title="Insert Table"
            >
                <Table size={18} />
            </button>

            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <div className="p-4 space-y-3 w-80">
                    <h2 className="text-lg font-semibold text-foreground">Insert Table</h2>

                    <div className="flex gap-2">
                        <input
                            type="number"
                            min="1"
                            value={rows}
                            onChange={(e) => setRows(Number(e.target.value))}
                            className="w-1/2 p-2 border rounded"
                            placeholder="Rows"
                        />
                        <input
                            type="number"
                            min="1"
                            value={cols}
                            onChange={(e) => setCols(Number(e.target.value))}
                            className="w-1/2 p-2 border rounded"
                            placeholder="Cols"
                        />
                    </div>

                    <div>
                        <p className="text-sm text-muted">Headers</p>
                        {headers.map((h, i) => (
                            <input
                                key={i}
                                type="text"
                                value={h}
                                onChange={(e) => updateHeader(i, e.target.value)}
                                className="w-full p-2 border rounded mt-1"
                                placeholder={`Header ${i + 1}`}
                            />
                        ))}
                        <button
                            type="button"
                            onClick={addHeader}
                            className="mt-2 flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                            <Plus size={14} /> Add Header
                        </button>
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setOpen(false)}
                            className="px-3 py-1 rounded bg-surface text-muted hover:text-foreground"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={insertTable}
                            className="px-3 py-1 rounded bg-primary text-white hover:bg-primary-hover"
                        >
                            Insert
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
