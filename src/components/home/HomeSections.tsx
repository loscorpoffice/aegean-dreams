import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { WaveDivider } from "@/components/ui/WaveDivider";
import heroImage from "@/assets/hero-pool.jpg";

export function HeroSection() {
  return (
    <section className="relative">
      {/* Hero Image */}
      <div className="w-full h-[70vh] md:h-[85vh] relative">
        <img
          src={heroImage}
          alt="Santorini infinity pool overlooking the Aegean Sea"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      {/* Wave Divider */}
      <WaveDivider className="absolute bottom-0 left-0 right-0 z-10" />
    </section>
  );
}

export function WelcomeSection() {
  return (
    <section className="bg-background py-16 md:py-20 text-center">
      <div className="container-resort">
        <p className="text-sm tracking-elegant text-muted-foreground uppercase mb-4 animate-fade-in">
          Welcome to
        </p>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 animate-slide-up">
          GREECE IN BLUE
        </h1>
        <p className="font-heading text-lg md:text-xl text-muted-foreground italic animate-slide-up animation-delay-200">
          Discover the Magic of the Aegean
        </p>
      </div>
    </section>
  );
}

import aboutImage from "@/assets/about-terrace.jpg";

export function AboutSection() {
  return (
    <section className="bg-background pb-8">
      <div className="container-resort">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src={aboutImage}
              alt="Coastal terrace with sea view"
              className="w-full h-auto rounded-lg shadow-soft-lg"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground tracking-wide">
              ABOUT US
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Experience the beauty of Greece at our luxurious coastal retreat.
              Wake up to breathtaking views of the Aegean Sea in serene, comfortable
              accommodations. Immerse yourself in the charm and elegance of the Greek
              Islands, where sun-kissed days and unforgettable memories await.
            </p>
            <Button variant="aegean" size="lg" asChild>
              <Link to="/about">READ MORE</Link>
            </Button>
          </div>
        </div>
      </div>

      <WaveDivider className="mt-12" />
    </section>
  );
}

import accommodationsImage from "@/assets/accommodations-hero.jpg";

export function AccommodationsSection() {
  return (
    <section className="relative">
      {/* Title */}
      <div className="text-center py-8 bg-background">
        <h2 className="font-heading text-2xl md:text-3xl text-foreground tracking-wide">
          ACCOMMODATIONS
        </h2>
      </div>

      {/* Full-width scenic image */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <img
          src={accommodationsImage}
          alt="Santorini sunset view"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/40" />

        {/* Book Now button overlay */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
          <Button variant="gold" size="lg" asChild>
            <Link to="/rooms" className="flex items-center gap-2">
              BOOK NOW
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </Button>
        </div>
      </div>

      <WaveDivider />
    </section>
  );
}

import cruiseImage from "@/assets/activity-cruise.jpg";
import watersportsImage from "@/assets/activity-watersports.jpg";
import toursImage from "@/assets/activity-tours.jpg";
import sightseeingImage from "@/assets/activity-sightseeing.jpg";

const activities = [
  {
    title: "Sunset Cruises",
    image: cruiseImage,
    description: "Float across stunning waters with sunset as the only sound.",
  },
  {
    title: "Watersports",
    image: watersportsImage,
    description: "Explore our lush sailing areas for snorkeling and sports.",
  },
  {
    title: "Island Tours",
    image: toursImage,
    description: "Roam the idyllic archipelago, gently strolling our secret coastlines.",
  },
  {
    title: "Local Sightseeing",
    image: sightseeingImage,
    description: "Experience a sense of bliss, and the aromas that enrapture.",
  },
];

export function ActivitiesSection() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="container-resort">
        {/* Decorative wave icon */}
        <div className="text-center mb-8">
          <svg className="w-16 h-8 mx-auto text-primary/30" viewBox="0 0 64 32" fill="currentColor">
            <path d="M0,16 Q16,0 32,16 Q48,32 64,16 L64,20 Q48,36 32,20 Q16,4 0,20 Z" />
          </svg>
          <p className="text-muted-foreground italic mt-4">
            Indulge in luxurious amenities at our coastal sanctuary.
          </p>
        </div>

        <h2 className="font-heading text-2xl md:text-3xl text-foreground tracking-wide text-center mb-12">
          ACTIVITIES
        </h2>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity) => (
            <div key={activity.title} className="group hover-lift">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-heading text-lg text-foreground mb-2 text-center">
                {activity.title}
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-4 line-clamp-2">
                {activity.description}
              </p>
              <div className="text-center">
                <Button variant="aegean" size="sm" asChild>
                  <Link to="/activities">VIEW ALL</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View Gallery CTA */}
        <div className="text-center mt-12">
          <Button variant="goldOutline" size="lg" asChild>
            <Link to="/gallery" className="flex items-center gap-2">
              VIEW GALLERY
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </Button>
        </div>
      </div>

      <WaveDivider className="mt-16" />
    </section>
  );
}
