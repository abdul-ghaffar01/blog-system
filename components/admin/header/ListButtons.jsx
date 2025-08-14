"use client";
import React from "react";
import { List, ListOrdered } from "lucide-react";
import onAction from "@/utils/admin/onAction";

export default function ListButtons() {
  return (
    <>
      <button onClick={() => onAction("unordered-list")} title="Bullet List" className="p-2 hover:bg-background rounded transition">
        <List size={18} />
      </button>
      <button onClick={() => onAction("ordered-list")} title="Numbered List" className="p-2 hover:bg-background rounded transition">
        <ListOrdered size={18} />
      </button>
    </>
  );
}
