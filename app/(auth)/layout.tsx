import Header from "@/components/shared/Header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="flex h-screen items-center justify-center">
        {children}
      </div>
    </div>
  );
}
