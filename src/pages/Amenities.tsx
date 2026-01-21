import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { WaveDivider } from "@/components/ui/WaveDivider";
import coastalView from "@/assets/coastal-view.jpg";
import amenityPool from "@/assets/amenity-pool.jpg";
import amenityTheatre from "@/assets/amenity-theatre.jpg";
import amenityRestaurant from "@/assets/amenity-restaurant.jpg";
import heroPool from "@/assets/hero-pool.jpg";
import { Bed, Wifi, Car, Zap, Sun, Camera, Sofa } from "lucide-react";

const amenities = [
  {
    title: "Swimming Pools",
    description:
      "2 Swimming Pools including a dedicated Kids' Swimming Pool and large Adult Swimming Pool for ultimate relaxation.",
    image: amenityPool,
    reverse: false,
  },
  {
    title: "Rooftop Restaurant",
    description:
      "European-style rooftop dining experience with multi-cuisine options and panoramic mountain views.",
    image: amenityRestaurant,
    reverse: true,
  },
  {
    title: "Movie Screening",
    description:
      "Enjoy movie nights in our private screening area with comfortable seating and premium audio-visual setup.",
    image: amenityTheatre,
    reverse: false,
  },
  {
    title: "European Photo Spots",
    description:
      "Picture-perfect corners with minimal blue-white décor designed for stunning photography sessions.",
    image: heroPool,
    reverse: true,
  },
];

const quickAmenities = [
  { icon: Sun, label: "Comfortable Sunbed Areas" },
  { icon: Camera, label: "European-Style Photo Spots" },
  { icon: Sofa, label: "Peaceful Outdoor Seating" },
  { icon: Bed, label: "24/7 Service Support" },
  { icon: Car, label: "Parking" },
  { icon: Zap, label: "Power Backup" },
  { icon: Wifi, label: "Free Wi-Fi" },
];

const Amenities = () => {
  return (
    <Layout>
      <PageHero
        title="Resort Amenities"
        subtitle="Complete Comfort"
        backgroundImage={coastalView}
      >
        <p className="text-white/80 max-w-2xl mx-auto mt-4 text-center animate-slide-up animation-delay-300">
          Experience a private and soothing atmosphere filled with soft lighting, photo-friendly corners, and minimal blue-white décor that makes your stay beautifully memorable.
        </p>
      </PageHero>

      {/* Breadcrumb */}
      <div className="container-resort py-6">
        <nav className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-primary">Amenities</span>
        </nav>
      </div>

      {/* Quick Amenities Grid */}
      <section className="container-resort pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {quickAmenities.map((amenity) => (
            <div key={amenity.label} className="text-center p-4 bg-card rounded-lg shadow-soft hover-lift">
              <amenity.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-xs text-muted-foreground">{amenity.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities List */}
      <section className="container-resort pb-16 space-y-16">
        {amenities.map((amenity) => (
          <div
            key={amenity.title}
            className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
              amenity.reverse ? "md:grid-flow-dense" : ""
            }`}
          >
            {/* Image */}
            <div className={amenity.reverse ? "md:col-start-2" : ""}>
              <img
                src={amenity.image}
                alt={amenity.title}
                className="w-full h-auto rounded-lg shadow-soft-lg hover-lift"
              />
            </div>

            {/* Content */}
            <div className={`space-y-6 ${amenity.reverse ? "md:col-start-1 md:text-right" : ""}`}>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground italic">
                {amenity.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{amenity.description}</p>
              <Button variant="gold" asChild>
                <Link to="/contact">Learn More</Link>
              </Button>
            </div>
          </div>
        ))}
      </section>

      <WaveDivider />

      {/* Final CTA */}
      <section className="bg-background py-16 text-center">
        <h3 className="font-heading text-xl text-foreground mb-4">Experience All Our Amenities</h3>
        <p className="text-muted-foreground mb-6">Book your stay and enjoy world-class facilities</p>
        <Button variant="gold" size="xl" asChild>
          <Link to="/contact" className="flex items-center gap-2">
            Book Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </Button>
      </section>

      <WaveDivider />
    </Layout>
  );
};

export default Amenities;