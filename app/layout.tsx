import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
const AnimatedGridPattern = dynamic(
  () => import("@/components/magicui/animated-grid-pattern"),
  { ssr: false },
);
import "./globals.css";
import dynamic from "next/dynamic";

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
        <body className={cn("", fontSans.variable)}>
          {children}
          <AnimatedGridPattern
            numSquares={50}
            maxOpacity={0.2}
            duration={4}
            repeatDelay={0.5}
            className={cn(
              "fixed inset-x-0 inset-y-[-30%] -z-10 h-[200%] skew-y-12",
            )}
          />
          {/* <BackgroundGradientAnimation /> */}
        </body>
      </html>
    </ViewTransitions>
  );
}
