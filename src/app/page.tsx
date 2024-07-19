import { EventCarousel } from "@/components/HomeEvent/EventCarousel";
import EventTop from "@/components/HomeEvent/EventTop";
import Navbar from "@/components/Navbar";

export default function Home() {
  const event1 = {
    Id: 3,
    Name: "2024 SUPER JUNIOR <SUPER SHOW SPIN-OFF: Halftime> in HO CHI MINH",
    ThumbnailUrl:
      "https://salt.tkbcdn.com/ts/ds/c2/4b/79/43aa7f8fbf384caa5ddceb011498dbd7.png",
    EventStartDate: "2024-07-15T00:00:00",
  };
  const event2 = {
    Id: 6,
    Name: "[HCM] TRUNG QUÂN 1689 - More than 1589",
    ThumbnailUrl:
      "https://salt.tkbcdn.com/ts/ds/bb/e2/49/34560b519e0293e77d1b16bbaaefcf1c.jpg",
    EventStartDate: "2024-07-15T00:00:00",
  };

  return (
    <main>
      <Navbar />
      <div className="container">
        <div className="flex flex-wrap justify-between mt-10">
          <EventTop event={event1} />
          <EventTop event={event2} />
        </div>
        <EventCarousel category={"Education"} categoryId={1} />
        <EventCarousel category={"Music"} categoryId={2} />
        {/* <EventCarousel category={"Sports"} categoryId={3} />
        <EventCarousel category={"Technology"} categoryId={4} />
        <EventCarousel category={"Business"} categoryId={5} />
        <EventCarousel category={"Art"} categoryId={6} />
        <EventCarousel category={"Food and Drink"} categoryId={7} />
        <EventCarousel category={"Travel"} categoryId={8} />
        <EventCarousel category={"Film"} categoryId={9} />
        <EventCarousel category={"Other"} categoryId={10} /> */}
      </div>
    </main>
  );
}
