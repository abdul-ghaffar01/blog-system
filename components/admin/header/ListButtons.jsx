"use client";
import React, { useState } from "react";
import { List, ListOrdered, Plus } from "lucide-react";
import Modal from "@/components/ui/Modal";
import onAction from "@/utils/admin/onAction";

export default function ListButtons({ editor }) {
  const [open, setOpen] = useState(false);
  const [listType, setListType] = useState("ul");
  const [items, setItems] = useState([""]);

  const addItem = () => setItems([...items, ""]);
  const updateItem = (i, val) => {
    const newItems = [...items];
    newItems[i] = val;
    setItems(newItems);
  };

  const insertList = () => {
    console.log(listType)
    onAction("list", { type: listType, items })
    // handleList({ type: listType, items }, editor);
    setOpen(false);
  };

  return (
    <>
      <div className="flex gap-1">
        <button
          onClick={() => {
            setListType("ul");
            setOpen(true);
          }}
          className="p-2 rounded-md hover:bg-surface text-muted hover:text-foreground"
          title="Insert Bullet List"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => {
            setListType("ol");
            setOpen(true);
          }}
          className="p-2 rounded-md hover:bg-surface text-muted hover:text-foreground"
          title="Insert Numbered List"
        >
          <ListOrdered size={18} />
        </button>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div className="p-4 space-y-3 w-80">
          <h2 className="text-lg font-semibold text-foreground">
            Insert {listType === "ul" ? "Bullet" : "Numbered"} List
          </h2>

          {items.map((item, i) => (
            <input
              key={i}
              type="text"
              value={item}
              onChange={(e) => updateItem(i, e.target.value)}
              className="w-full p-2 border rounded mt-1"
              placeholder={`Item ${i + 1}`}
            />
          ))}
          <button
            type="button"
            onClick={addItem}
            className="mt-2 flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <Plus size={14} /> Add Item
          </button>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setOpen(false)}
              className="px-3 py-1 rounded bg-surface text-muted hover:text-foreground"
            >
              Cancel
            </button>
            <button
              onClick={insertList}
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
