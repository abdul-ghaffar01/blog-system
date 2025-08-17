"use client";
import React, { useState } from "react";
import useAdminStore from "@/stores/useAdminStore";
import HeadingSelector from "./header/HeadingSelector";
import FormattingButtons from "./header/FormattingButtons";
import MediaButtons from "./header/MediaButtons";
import ListButtons from "./header/ListButtons";
import AlignButtons from "./header/AlignButtons";
import Actions from "./header/Actions";
import Menu from "./header/Menu";

export default function AdminHeader() {

  return (
    <div>
      {/* Menu */}
      <Menu />

      {/* Elements */}
      <div className="flex flex-col md:flex-row sticky top-0 items-center justify-between p-3 shadow-md bg-surface">
        {/* Left section */}
        <div className="flex items-center gap-2 flex-wrap">
          <HeadingSelector />
          <FormattingButtons />
          <MediaButtons />
          <ListButtons />
          <AlignButtons />
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <Actions />
        </div>
      </div>
    </div>
  );
}
