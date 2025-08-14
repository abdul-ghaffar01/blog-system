"use client"
import React, { useEffect, useState } from "react";
import useAdminStore from "@/stores/useAdminStore";
import constructBlog from "@/utils/constructBlog";

const Preview = () => {
  const { items } = useAdminStore();

  return (
    <div className="w-full h-full overflow-y-auto bg-background">
      <h2 className="text-lg font-semibold mb-4">Preview</h2>
      {constructBlog(items)}
    </div>
  )
};

export default Preview;
