import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { WaveDivider } from "@/components/ui/WaveDivider";
import accommodationsHero from "@/assets/accommodations-hero.jpg";
import roomPrivatePool from "@/assets/room-private-pool.webp";
import roomSantorini from "@/assets/room-santorini.jpg";
import roomBarbie from "@/assets/room-barbie.jpg";

const rooms = [
  {
    title: "Santorini Private Pool Room",
    subtitle: "Luxury with a Private Indoor Pool",
    description:
      "Private indoor pool with classic Greek blue-white architecture, elegant arches, and premium interiors. Perfect for anniversaries and honeymoons.",
    price: "₹7,499/night",
    capacity: "2 Adults",
    availability: "3 Rooms Available",
    features: ["Private Indoor Pool", "King Size Bed", "Air Conditioning", "Premium Toiletries", "Smart TV", "+7 more"],
    image: roomPrivatePool,
    reverse: false,
  },
  {
    title: "Barbie Themed Room",
    subtitle: "A Dreamy Pink Fantasy",
    description:
      "Dreamy pink escape with blush interiors, rose-gold accents, and picture-perfect decor. Ideal for girls' trips, birthdays, and content shoots.",
    price: "₹5,999/night",
    capacity: "2-3 Adults",
    availability: "6 Rooms Available",
    features: ["Queen Size Bed", "Pink Fantasy Decor", "Rose-Gold Accents", "Air Conditioning", "Smart TV", "+7 more"],
    image: roomBarbie,
    reverse: true,
  },
  {
    title: "Classic Santorini Room",
    subtitle: "Timeless Greek Elegance",
    description:
      "Traditional Greek island architecture with a calm, clean, and elegant ambiance. Perfect for couples and families.",
    price: "₹4,999/night",
    capacity: "2 Adults",
    availability: "6 Rooms Available",
    features: ["King Beds", "Traditional Greek Decor", "Air Conditioning", "Smart TV"],
    image: roomSantorini,
    reverse: false,
  },
];

const Rooms = () => {
  return (
    <Layout>
      <PageHero
        title="Suites & Villas"
        subtitle="Our Accommodations"
        backgroundImage={accommodationsHero}
      >
        <p className="text-white/80 max-w-2xl mx-auto mt-4 text-center animate-slide-up animation-delay-300">
          Experience luxury in our Greek-inspired accommodations, each designed to offer a unique and memorable stay in the heart of Anaikatti.
        </p>
      </PageHero>

      {/* Breadcrumb */}
      <div className="container-resort py-6">
        <nav className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-primary">Rooms</span>
        </nav>
      </div>

      {/* Rooms List */}
      <section className="container-resort pb-16 space-y-20">
        {rooms.map((room) => (
          <div
            key={room.title}
            className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
              room.reverse ? "md:grid-flow-dense" : ""
            }`}
          >
            {/* Image */}
            <div className={room.reverse ? "md:col-start-2" : ""}>
              <img
                src={room.image}
                alt={room.title}
                className="w-full h-auto rounded-lg shadow-soft-lg hover-lift"
              />
            </div>

            {/* Content */}
            <div className={`space-y-4 ${room.reverse ? "md:col-start-1 md:text-right" : ""}`}>
              <div>
                <p className="text-sm text-gold font-medium uppercase tracking-wide">{room.subtitle}</p>
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mt-1">
                  {room.title}
                </h2>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">{room.description}</p>
              
              <div className={`flex flex-wrap gap-4 text-sm ${room.reverse ? "md:justify-end" : ""}`}>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                  {room.price}
                </span>
                <span className="bg-muted px-3 py-1 rounded-full text-muted-foreground">
                  {room.capacity}
                </span>
                <span className="bg-muted px-3 py-1 rounded-full text-muted-foreground">
                  {room.availability}
                </span>
              </div>

              <div className={`flex flex-wrap gap-2 ${room.reverse ? "md:justify-end" : ""}`}>
                {room.features.map((feature, idx) => (
                  <span key={idx} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>
              
              <Button variant="gold" size="lg" asChild>
                <Link to="/contact">Book Now</Link>
              </Button>
            </div>
          </div>
        ))}
      </section>

      <WaveDivider />

      {/* Final CTA */}
      <section className="bg-background py-16 text-center">
        <h3 className="font-heading text-xl text-foreground mb-4">Ready to Book Your Stay?</h3>
        <p className="text-muted-foreground mb-6">Experience the magic of Greece in the heart of Tamil Nadu</p>
        <Button variant="gold" size="xl" asChild>
          <a href="tel:+919087884841" className="flex items-center gap-2">
            Call Now: 90878-84841
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </Button>
      </section>

      <WaveDivider />
    </Layout>
  );
};

export default Rooms;