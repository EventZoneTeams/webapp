import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Events",
};
export default function layout({ children }: { children: React.ReactNode }) {
  return children;
}
