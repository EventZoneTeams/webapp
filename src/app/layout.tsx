import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import PublicProvider from "@/providers/RefetchUserData";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ToastProvider from "@/providers/ToastProvider";

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
              <div className="flex min-h-screen w-full flex-col bg-[#141417]">
                {/* <Navbar /> */}
                <PublicProvider>
                  <div className="flex min-h-screen flex-1 flex-col gap-4 ">
                    {children}
                  </div>
                </PublicProvider>
              </div>
            </ToastProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
