"use client";
import React, { useState } from "react";
import useAdminStore from "@/stores/useAdminStore";
import HeadingSelector from "./header/HeadingSelector";
import FormattingButtons from "./header/FormattingButtons";
import MediaButtons from "./header/MediaButtons";
import ListButtons from "./header/ListButtons";
import AlignButtons from "./header/AlignButtons";
import Actions from "./header/Actions";

export default function AdminHeader() {
  const [headingLevel, setHeadingLevel] = useState("Normal");
  const [align, setAlign] = useState("left");
  const { editor } = useAdminStore();

  return (
    <div className="flex flex-col md:flex-row sticky top-0 items-center justify-between p-3 shadow-md bg-surface">
      {/* Left section */}
      <div className="flex items-center gap-2 flex-wrap">
        <HeadingSelector headingLevel={headingLevel} setHeadingLevel={setHeadingLevel} editor={editor} />
        <FormattingButtons />
        <MediaButtons />
        <ListButtons />
        <AlignButtons align={align} setAlign={setAlign} />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 mt-2 md:mt-0">
        <Actions />
      </div>
    </div>
  );
}
