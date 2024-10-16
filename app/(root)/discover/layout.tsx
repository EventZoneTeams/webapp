import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Suspense } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <Header />
      <div className="container m-auto mt-12 max-w-6xl py-4">{children}</div>
      <Footer />
    </Suspense>
  );
}
