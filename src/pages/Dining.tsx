import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { WaveDivider } from "@/components/ui/WaveDivider";
import amenityRestaurant from "@/assets/amenity-restaurant.jpg";
import poolsideCafe from "@/assets/dining-poolside-cafe.webp";
import coastalView from "@/assets/coastal-view.jpg";

const diningOptions = [
  {
    title: "Rooftop Restaurant",
    subtitle: "Multi-Cuisine",
    description: "Dine with panoramic mountain views in European ambiance. Our rooftop restaurant offers a wide variety of multi-cuisine options prepared with fresh, local ingredients.",
    image: amenityRestaurant,
  },
  {
    title: "Poolside Café",
    subtitle: "Light Bites & Refreshments",
    description: "Refreshing drinks and snacks by the pool. Enjoy light bites and cooling beverages while lounging in the Santorini-inspired surroundings.",
    image: poolsideCafe,
  },
  {
    title: "Lawn Events",
    subtitle: "Lawn Wedding & Celebrations",
    description: "Beautiful lawn space for weddings and special occasions. Host your dream lawn wedding in our beautifully designed outdoor spaces with stunning backdrops.",
    image: coastalView,
  },
];

const Dining = () => {
  return (
    <Layout>
      <PageHero
        title="Dining & Celebrations"
        subtitle="Culinary Experiences"
        backgroundImage={amenityRestaurant}
      >
        <p className="text-white/80 max-w-2xl mx-auto mt-4 text-center animate-slide-up animation-delay-300">
          Enjoy delicious multi-cuisine dining at our rooftop restaurant with stunning mountain views, or host your dream lawn wedding in our beautifully designed outdoor spaces.
        </p>
      </PageHero>

      {/* Breadcrumb */}
      <div className="container-resort py-6">
        <nav className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-primary">Dining</span>
        </nav>
      </div>

      {/* Dining Options */}
      <section className="container-resort pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {diningOptions.map((option) => (
            <div
              key={option.title}
              className="group bg-card rounded-lg overflow-hidden shadow-soft hover-lift"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={option.image}
                  alt={option.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-3">
                <p className="text-sm text-gold font-medium uppercase tracking-wide">{option.subtitle}</p>
                <h3 className="font-heading text-xl text-foreground">{option.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <WaveDivider />

      {/* CTA Section */}
      <section className="bg-background py-16 text-center">
        <h3 className="font-heading text-xl text-foreground mb-4">Plan Your Event or Dining Experience</h3>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Whether it's a romantic dinner, family celebration, or dream wedding, we're here to make it unforgettable.
        </p>
        <Button variant="gold" size="xl" asChild>
          <Link to="/contact" className="flex items-center gap-2">
            Contact Us
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

export default Dining;