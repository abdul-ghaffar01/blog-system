"use client";
import React from "react";
import onAction from "@/utils/admin/onAction";

export default function Actions() {
  return (
    <>
      <button onClick={() => onAction("save")} className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark transition">
        Save
      </button>
      <button onClick={() => onAction("publish")} className="px-4 py-2 rounded bg-success text-white hover:bg-success-dark transition">
        Publish
      </button>
    </>
  );
}
