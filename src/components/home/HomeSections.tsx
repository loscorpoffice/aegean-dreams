import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { WaveDivider } from "@/components/ui/WaveDivider";
import heroImage from "@/assets/hero-resort.webp";

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
          <p className="text-sm tracking-elegant text-slate-800 uppercase mb-4 animate-fade-in drop-shadow-sm">
            Welcome to
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-4 animate-slide-up drop-shadow-sm">
            GREECE IN BLUE
          </h1>
          <p className="font-heading text-lg md:text-xl text-amber-600 italic animate-slide-up animation-delay-200 drop-shadow-sm">
            European-Themed Luxury Resort • Anaikatti, Coimbatore
          </p>
          <div className="mt-8 animate-slide-up animation-delay-300">
            <Button variant="gold" size="lg" asChild>
              <a href="tel:+919087884841" className="flex items-center gap-2">
                CALL: 90878-84841
              </a>
            </Button>
          </div>
          <p className="text-slate-700 mt-6 max-w-2xl mx-auto text-sm md:text-base animate-slide-up animation-delay-400 drop-shadow-sm">
            A Santorini-inspired luxury getaway nestled in the calm, breezy hills of Anaikatti. Experience the iconic blue-white charm right here in Tamil Nadu.
          </p>
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

// Rooms Section
import roomPrivatePool from "@/assets/room-private-pool.jpg";
import roomSantorini from "@/assets/room-santorini.jpg";
import roomBarbie from "@/assets/room-barbie.jpg";

const rooms = [
  {
    title: "Santorini Private Pool Room",
    subtitle: "Luxury with a Private Indoor Pool",
    price: "₹7,499/night",
    image: roomPrivatePool,
  },
  {
    title: "Barbie Themed Room",
    subtitle: "A Dreamy Pink Fantasy",
    price: "₹5,999/night",
    image: roomBarbie,
  },
  {
    title: "Classic Santorini Room",
    subtitle: "Timeless Greek Elegance",
    price: "₹4,999/night",
    image: roomSantorini,
  },
];

export function RoomsSection() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="container-resort">
        <div className="text-center mb-12">
          <p className="text-sm tracking-elegant text-muted-foreground uppercase mb-2">
            Our Accommodations
          </p>
          <h2 className="font-heading text-2xl md:text-3xl text-foreground tracking-wide">
            SUITES & VILLAS
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Experience luxury in our Greek-inspired accommodations, each designed to offer a unique and memorable stay.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.title} className="group bg-card rounded-lg overflow-hidden shadow-soft hover-lift">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                  {room.price}
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs text-gold uppercase tracking-wide mb-1">{room.subtitle}</p>
                <h3 className="font-heading text-lg text-foreground">{room.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Button variant="gold" size="lg" asChild>
            <Link to="/rooms" className="flex items-center gap-2">
              VIEW ALL ROOMS
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </Button>
        </div>
      </div>

      <WaveDivider className="mt-12" />
    </section>
  );
}

// Amenities Section
import amenityPool from "@/assets/amenity-pool.jpg";
import amenityTheatre from "@/assets/amenity-theatre.jpg";
import amenityRestaurant from "@/assets/amenity-restaurant.jpg";
import { Wifi, Car, Zap, Sun, Camera, Sofa, Waves } from "lucide-react";

const amenitiesList = [
  { icon: Waves, label: "2 Swimming Pools" },
  { icon: Sun, label: "Sunbed Areas" },
  { icon: Camera, label: "Photo Spots" },
  { icon: Sofa, label: "Outdoor Seating" },
  { icon: Wifi, label: "Free Wi-Fi" },
  { icon: Car, label: "Parking" },
  { icon: Zap, label: "Power Backup" },
];

const amenityImages = [
  { src: amenityPool, title: "Swimming Pools" },
  { src: amenityRestaurant, title: "Rooftop Restaurant" },
  { src: amenityTheatre, title: "Movie Screening" },
];

export function AmenitiesSection() {
  return (
    <section className="bg-muted/30 py-12 md:py-16">
      <div className="container-resort">
        <div className="text-center mb-12">
          <p className="text-sm tracking-elegant text-muted-foreground uppercase mb-2">
            Complete Comfort
          </p>
          <h2 className="font-heading text-2xl md:text-3xl text-foreground tracking-wide">
            RESORT AMENITIES
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Experience a private and soothing atmosphere filled with soft lighting, photo-friendly corners, and minimal blue-white décor.
          </p>
        </div>

        {/* Quick Amenities Icons */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
          {amenitiesList.map((amenity) => (
            <div key={amenity.label} className="flex items-center gap-2 bg-background px-4 py-2 rounded-full shadow-soft">
              <amenity.icon className="w-5 h-5 text-primary" />
              <span className="text-sm text-foreground">{amenity.label}</span>
            </div>
          ))}
        </div>

        {/* Amenity Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {amenityImages.map((item) => (
            <div key={item.title} className="group relative overflow-hidden rounded-lg shadow-soft hover-lift aspect-[4/3]">
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent">
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-heading text-lg">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Button variant="aegean" size="lg" asChild>
            <Link to="/amenities" className="flex items-center gap-2">
              VIEW ALL AMENITIES
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </Button>
        </div>
      </div>

      <WaveDivider className="mt-12" />
    </section>
  );
}

// Activities Section
import cruiseImage from "@/assets/activity-cruise.jpg";
import watersportsImage from "@/assets/activity-watersports.jpg";
import toursImage from "@/assets/activity-tours.jpg";
import sightseeingImage from "@/assets/activity-sightseeing.jpg";

const activities = [
  {
    title: "Pool Villas & Pools",
    image: cruiseImage,
    description: "3 Pool Villas with dedicated Kids' & Adult Swimming Pools.",
  },
  {
    title: "Rooftop Restaurant",
    image: watersportsImage,
    description: "European-style dining with panoramic mountain views.",
  },
  {
    title: "Indoor & Outdoor Games",
    image: toursImage,
    description: "Cricket Turf, indoor games, and exciting activities.",
  },
  {
    title: "Horse Riding & More",
    image: sightseeingImage,
    description: "Horse riding, movie screening, and photo spots.",
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
            From poolside relaxation to exciting adventures, discover activities for everyone.
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
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-heading text-lg text-foreground mb-2 text-center">
                {activity.title}
              </h3>
              <p className="text-sm text-muted-foreground text-center line-clamp-2">
                {activity.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Button variant="goldOutline" size="lg" asChild>
            <Link to="/activities" className="flex items-center gap-2">
              VIEW ALL ACTIVITIES
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </Button>
        </div>
      </div>

      <WaveDivider className="mt-12" />
    </section>
  );
}

// Gallery Section
import accommodationsHero from "@/assets/accommodations-hero.jpg";
import coastalView from "@/assets/coastal-view.jpg";

const galleryImages = [
  { src: heroImage, title: "Infinity Pool" },
  { src: roomSantorini, title: "Santorini Room" },
  { src: amenityRestaurant, title: "Rooftop Dining" },
  { src: roomBarbie, title: "Barbie Room" },
  { src: amenityPool, title: "Pool Area" },
  { src: accommodationsHero, title: "Sunset View" },
];

export function GallerySection() {
  return (
    <section className="bg-muted/30 py-12 md:py-16">
      <div className="container-resort">
        <div className="text-center mb-12">
          <p className="text-sm tracking-elegant text-muted-foreground uppercase mb-2">
            Explore Our Resort
          </p>
          <h2 className="font-heading text-2xl md:text-3xl text-foreground tracking-wide">
            GALLERY
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-soft hover-lift aspect-square"
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-heading">{image.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Button variant="aegean" size="lg" asChild>
            <Link to="/gallery" className="flex items-center gap-2">
              VIEW FULL GALLERY
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </Button>
        </div>
      </div>

      <WaveDivider className="mt-12" />
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