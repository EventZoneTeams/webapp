import EventCard from "@/components/EventCard";
import HomeCarousel from "@/components/HomeCarousel";

export default function Home() {
  return 
    <main className="container">
      <HomeCarousel />
      <EventCard />
    </main>
  );
}
