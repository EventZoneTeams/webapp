import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";

import "./globals.css";
import { Toaster } from "sonner";
import RefreshUser from "@/providers/RefreshUser";
import { TooltipProvider } from "@/components/ui/tooltip";
import AnimatedGradientBackground from "@/components/shared/AminatedBackground";
import "./AnimatedGradientBackground.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import BackgroundImage from "@/public/assets/gradient-dark.webp";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "EventZone",
  description: "Generated by EventZone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={cn("text-container", fontSans.variable)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <RefreshUser>{children}</RefreshUser>
            </TooltipProvider>
            <Toaster richColors position="bottom-right" />
            <div
              className={cn(
                "pointer-events-none fixed left-0 top-0 z-[-1] h-full w-full bg-gradient-to-br from-background to-transparent",
                "transition-all duration-300 ease-in-out",
                "bg-cover bg-center",
                "blur-[20px] brightness-50 filter",
                "opacity-50",
              )}
              style={{ backgroundImage: `url(${BackgroundImage.src})` }}
            ></div>

            <AnimatedGradientBackground />
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
