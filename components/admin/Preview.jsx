"use client"
import useAdminStore from "@/stores/useAdminStore";
import constructBlog from "@/utils/constructBlog";
import Loader from "../Loader";
import { RefreshCcw } from 'lucide-react';
import updatePreview from "@/utils/admin/updatePreview";

const Preview = () => {
  const { items, previewLoading } = useAdminStore();

  const refreshPreview = () => {
    updatePreview();
  }
  return (
    <div className="w-full h-full overflow-y-auto bg-background">
      <div className="flex justify-between items-center p-2">
        <h2 className="text-lg font-semibold bg-background select-none">Preview</h2>
        <div className="flex gap-2">
          {previewLoading && <Loader />}
          <button title="Reload" onClick={refreshPreview}>
            <RefreshCcw size={16} className="text-muted hover:text-foreground" />
          </button>

        </div>
      </div>
      <div className="px-2">
        {constructBlog(items)}
      </div>
    </div>
  )
};

export default Preview;
