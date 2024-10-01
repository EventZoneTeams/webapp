import Header from "@/components/shared/Header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="m-auto">{children}</div>
    </div>
  );
}
