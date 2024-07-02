import HomeCarousel from "@/components/HomeCarousel";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="container">
        <HomeCarousel />
      </div>
    </main>
  );
}
