import { getStats } from "@/services/stats";
import HeroBackground from "./Background";
import HeroCTA from "./Button";
import HeroContent from "./Content";
import Stats from "./Stats";

export default function Hero() {
  const stats = getStats();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background with Image and Overlay */}
      <HeroBackground />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <HeroContent
          title="Promise yourself"
          highlight="the world"
          subtitle="Track your journey, one vow at a time"
          description="Turn your travel dreams into commitments. Share goals with friends, document your adventures, and never forget the places you promised to visit."
        />

        <HeroCTA />

        <Stats
          vowsMade={stats.vowsMade}
          destinations={stats.destinations}
          completed={stats.completed}
        />
      </div>
    </section>
  );
}
