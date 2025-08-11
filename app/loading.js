import Loader from "@/components/Loader";


export default function Loading() {
  return (
    <div className="min-h-[100dvh] max-w-screen flex items-center justify-center bg-[var(--color-background)] text-[var(--color-foreground)]">
      <div className="flex flex-col items-center gap-4">
        <Loader size={30} />
        <p className="text-[var(--color-muted)]">Loading, please wait...</p>
      </div>
    </div>
  );
}
