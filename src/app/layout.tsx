import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/themeProvider";
import Navbar from "@/components/Navbar";
import ReactQueryProvider from "@/providers/reactQueryProvider";
import ToastProvider from "@/providers/toastProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Event Zone",
  description: "A simple event management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider>
              <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <Navbar />
                <div className="flex min-h-[calc(100vh_-_theme(spacing.20))] flex-1 flex-col gap-4 ">
                  {children}
                </div>
              </div>
            </ToastProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
