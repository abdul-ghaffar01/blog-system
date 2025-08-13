import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Search from "@/components/search/Search";

export const metadata = {
  title: "iAbdulGhaffar Blog – Web Development, Cloud, and Programming Insights",
  description:
    "Read expert articles on web development, cloud computing, microservices, and programming tips from Abdul Ghaffar. Stay updated with practical guides, tutorials, and tech insights.",
  keywords: [
    "Abdul Ghaffar",
    "web development blog",
    "cloud computing tutorials",
    "Next.js blog",
    "microservices guide",
    "Golang programming",
    "Node.js backend",
    "React front-end",
    "full-stack development",
    "coding tutorials",
    "JavaScript tips",
    "programming blog",
  ],
  authors: [{ name: "Abdul Ghaffar", url: "https://iabdulghaffar.com" }],
  creator: "Abdul Ghaffar",
  publisher: "Abdul Ghaffar",
  openGraph: {
    title: "iAbdulGhaffar Blog – Web Development, Cloud, and Programming Insights",
    description:
      "Expert web development, cloud computing, and programming tips from Abdul Ghaffar. Learn modern tools, frameworks, and techniques.",
    url: "https://blogs.iabdulghaffar.com",
    siteName: "iAbdulGhaffar Blog",
    images: [
      {
        url: "https://iabdulghaffar.com/og-image.jpg", // Replace with actual OG image
        width: 1200,
        height: 630,
        alt: "iAbdulGhaffar Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iAbdulGhaffar Blog – Web Development, Cloud, and Programming Insights",
    description:
      "Practical web development, cloud computing, and programming guides from Abdul Ghaffar.",
    creator: "@YourTwitterHandle",
    images: ["https://iabdulghaffar.com/og-image.jpg"], // Replace with actual
  },
  alternates: {
    canonical: "https://blogs.iabdulghaffar.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ThemeProvider>
          {/* Want to open it everywhere with ctrl + k that's why adding here */}
          <Search />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
