"use client"
import useAdminStore from "@/stores/useAdminStore";
import constructBlog from "@/utils/constructBlog";

const Preview = () => {
  const { items } = useAdminStore();

  return (
    <div className="w-full h-full overflow-y-auto bg-background">
      <h2 className="text-lg font-semibold p-2 bg-background">Preview</h2>
      <div className="px-2">
        {constructBlog(items)}
      </div>
    </div>
  )
};

export default Preview;
