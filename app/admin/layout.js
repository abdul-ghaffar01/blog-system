import { ThemeProvider } from "@/components/ThemeProvider";

export default function AdminLayout({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
