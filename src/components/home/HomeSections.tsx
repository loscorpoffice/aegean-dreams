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
          alt="Greece in Blue Resort - Santorini-inspired luxury getaway in Anaikatti"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-background" />
        
        {/* Welcome Text Overlay - Top */}
        <div className="absolute top-16 md:top-24 left-0 right-0 text-center z-10 px-4">
          <p className="text-sm tracking-elegant text-white/90 uppercase mb-4 animate-fade-in drop-shadow-lg">
            Welcome to
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-4 animate-slide-up drop-shadow-lg">
            GREECE IN BLUE
          </h1>
          <p className="font-heading text-lg md:text-xl text-white/90 italic animate-slide-up animation-delay-200 drop-shadow-lg">
            European-Themed Luxury Resort • Anaikatti, Coimbatore
          </p>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto text-sm md:text-base animate-slide-up animation-delay-300 drop-shadow-lg">
            A Santorini-inspired luxury getaway nestled in the calm, breezy hills of Anaikatti. Experience the iconic blue-white charm right here in Tamil Nadu.
          </p>
          <div className="mt-8 animate-slide-up animation-delay-400">
            <Button variant="gold" size="lg" asChild>
              <a href="tel:+919087884841" className="flex items-center gap-2">
                CALL: 90878-84841
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <WaveDivider className="absolute bottom-0 left-0 right-0 z-10" />
    </section>
  );
}

import aboutImage from "@/assets/about-terrace.jpg";

export function AboutSection() {
  return (
    <section className="bg-background pb-8">
      <div className="container-resort">
        <div className="text-center mb-8">
          <p className="text-sm tracking-elegant text-muted-foreground uppercase mb-2">
            Welcome to Greece in Blue
          </p>
          <h2 className="font-heading text-2xl md:text-3xl text-foreground tracking-wide">
            A Greek Island Escape in Tamil Nadu
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src={aboutImage}
              alt="Greece in Blue Resort architecture with blue-white Greek styling"
              className="w-full h-auto rounded-lg shadow-soft-lg"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Inspired by the iconic blue-white charm of Santorini and the elegance of Roman-style architecture, every corner gives you the feel of a real Greek island escape. Located in the heart of Anaikatti, surrounded by mountains, greenery, and fresh air.
            </p>
            <div className="flex flex-wrap gap-6 text-center">
              <div className="flex-1 min-w-[100px]">
                <span className="font-heading text-3xl text-primary">15</span>
                <p className="text-sm text-muted-foreground">Themed Rooms</p>
              </div>
              <div className="flex-1 min-w-[100px]">
                <span className="font-heading text-3xl text-primary">3</span>
                <p className="text-sm text-muted-foreground">Pool Villas</p>
              </div>
              <div className="flex-1 min-w-[100px]">
                <span className="font-heading text-3xl text-primary">2</span>
                <p className="text-sm text-muted-foreground">Swimming Pools</p>
              </div>
            </div>
            <Button variant="aegean" size="lg" asChild>
              <Link to="/rooms">EXPLORE ROOMS</Link>
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
          alt="Santorini-style rooms at Greece in Blue Resort"
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
    title: "Pool Villas & Pools",
    image: cruiseImage,
    description: "3 Pool Villas with dedicated Kids' Swimming Pool and large Adult Swimming Pool.",
  },
  {
    title: "Rooftop Restaurant",
    image: watersportsImage,
    description: "European-style rooftop dining with panoramic mountain views.",
  },
  {
    title: "Indoor & Outdoor Games",
    image: toursImage,
    description: "Cricket Turf, indoor games, and exciting activities for everyone.",
  },
  {
    title: "Horse Riding & More",
    image: sightseeingImage,
    description: "Horse riding, movie screening, and European photo spots.",
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
            From poolside relaxation to exciting adventures, discover a range of activities designed for couples, families, and anyone seeking a premium holiday.
          </p>
        </div>

        <h2 className="font-heading text-2xl md:text-3xl text-foreground tracking-wide text-center mb-12">
          ACTIVITIES & EXPERIENCES
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

// Closing Section
export function ClosingSection() {
  return (
    <section className="bg-background py-16 text-center">
      <div className="container-resort">
        <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">
          Experience Paradise in Anaikatti
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Reserve your Santorini-inspired retreat and discover why Greece in Blue is the most unique getaway destination in Tamil Nadu.
        </p>
        <Button variant="gold" size="xl" asChild>
          <Link to="/contact" className="flex items-center gap-2">
            Book Your Stay
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </Button>
      </div>
    </section>
  );
}