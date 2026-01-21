import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { WaveDivider } from "@/components/ui/WaveDivider";
import accommodationsHero from "@/assets/accommodations-hero.jpg";
import roomPrivatePool from "@/assets/room-private-pool.jpg";
import roomSantorini from "@/assets/room-santorini.jpg";
import roomBarbie from "@/assets/room-barbie.jpg";

const rooms = [
  {
    title: "Private Pool Room",
    description:
      "Experience ultimate luxury in our Private Pool Room, featuring a spacious, elegantly decorated interior and a private terrace with an infinity pool overlooking the breathtaking Aegean Sea.",
    image: roomPrivatePool,
    reverse: false,
  },
  {
    title: "Classic Santorini Room",
    description:
      "Immerse yourself in the charm of Santorini in our Classic Santorini Room, showcasing traditional Cycladic architecture with stunning views of the blue domes and the Aegean Sea from a private balcony.",
    image: roomSantorini,
    reverse: true,
  },
  {
    title: "Barbie Themed Room",
    description:
      "Step into a world of fun and fantasy in our Barbie Themed Room, designed with vibrant pink décor, stylish Barbie-inspired furnishings, and playful touches that create a whimsical escape with a private balcony and ocean views.",
    image: roomBarbie,
    reverse: false,
  },
];

const Rooms = () => {
  return (
    <Layout>
      <PageHero
        title="Accommodation"
        subtitle="Our Luxurious Rooms for Your Perfect Getaway"
        backgroundImage={accommodationsHero}
      />

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
      <section className="container-resort pb-16 space-y-16">
        {rooms.map((room, index) => (
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
            <div className={`space-y-6 ${room.reverse ? "md:col-start-1 md:text-right" : ""}`}>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground italic">
                {room.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{room.description}</p>
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

export default Rooms;
