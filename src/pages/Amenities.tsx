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

const amenities = [
  {
    title: "Swimming Pools",
    description:
      "Relax in our breathtaking infinity pool with panoramic sea views, or enjoy the privacy of your own private pool room.",
    image: amenityPool,
    reverse: false,
  },
  {
    title: "Free Wi-Fi",
    description:
      "Stay connected with complimentary high-speed WiFi available throughout the resort, perfect for browsing and streaming.",
    image: heroPool,
    reverse: true,
  },
  {
    title: "4K Private Theatre",
    description:
      "Enjoy the latest movies in our state-of-the-art 4K private theatre, complete with luxurious recliner seats and surround sound.",
    image: amenityTheatre,
    reverse: false,
  },
  {
    title: "Gourmet Restaurant",
    description:
      "Savor exquisite Mediterranean cuisine prepared by our top chefs in a beautiful seaside setting.",
    image: amenityRestaurant,
    reverse: true,
  },
];

const Amenities = () => {
  return (
    <Layout>
      <PageHero
        title="Amenities"
        subtitle="Enjoy Luxurious Comforts at Greece In Blue"
        backgroundImage={coastalView}
      />

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
