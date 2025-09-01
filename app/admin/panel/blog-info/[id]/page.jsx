"use client";
import CreateNewBlog from "@/components/admin/CreateNewBlog";
import EditBlog from "@/components/admin/EditBlog";
import React from "react";

export default function BlogInfoPage({ params }) {
  const { id } = React.use(params);

  if (id === "new") {
    return <CreateNewBlog />;
  }

  return <EditBlog id={id} />;
}
