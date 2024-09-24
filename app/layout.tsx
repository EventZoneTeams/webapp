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
  title: {
    template: "%s | EventZone.id.vn",
    default:
      "EventZone.id.vn là nơi quản lí và tổ chức sự kiện", // a default is required when creating a template
  },
  description:
    "EventZone.id.vn là nền tảng quản lý và tổ chức sự kiện, giúp kết nối các nhà tổ chức với cộng đồng.",
  generator: "Next.js",
  applicationName: "EventZone",
  referrer: "origin-when-cross-origin",
  keywords: [
    "sự kiện", "quản lý sự kiện", "EventZone", "tổ chức sự kiện", "mua vé", "hỗ trợ sự kiện"
  ],
  authors: [
    { name: "UyDev", url: "https://github.com/uyLeQuoc" },
  ],
  creator: "Creative Developer",
  publisher: "Creative Developer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://eventzone.id.vn"),
  alternates: {
    canonical: "/",
    languages: {
      "vi-VN": "/vi-VN",
    },
  },
  openGraph: {
    title: {
      template: "%s | EventZone.id.vn",
      default:
        "EventZone - Nền tảng quản lý và tổ chức sự kiện", 
    },
    description:
      "EventZone là nền tảng giúp bạn quản lý và tổ chức sự kiện một cách hiệu quả, cung cấp công cụ mua vé và kết nối cộng đồng.",
    siteName: "EventZone",
    images: [
      "https://eventzone.id.vn/assets/banner.webp",
    ],
    url: "https://eventzone.id.vn",
    emails: ["lequocuyit@gmail.com"],
    phoneNumbers: ["0981331633"],
    countryName: "Viet Nam",
    locale: "vi_VN",
    type: "website",
  },
  category: "ecommerce",
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
