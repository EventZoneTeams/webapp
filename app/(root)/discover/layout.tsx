import Header from "@/components/shared/Header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="m-auto mt-12 w-[820px] py-4">{children}</div>
    </div>
  );
}
