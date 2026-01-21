import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { WaveDivider } from "@/components/ui/WaveDivider";
import cruiseImage from "@/assets/activity-cruise.jpg";
import watersportsImage from "@/assets/activity-watersports.jpg";
import toursImage from "@/assets/activity-tours.jpg";
import sightseeingImage from "@/assets/activity-sightseeing.jpg";
import coastalView from "@/assets/coastal-view.jpg";

const activities = [
  {
    title: "Sunset Cruises",
    description:
      "Float across stunning waters on our luxury catamaran as the sun sets over the Aegean. Enjoy refreshments and create magical memories.",
    image: cruiseImage,
  },
  {
    title: "Watersports",
    description:
      "From paddleboarding to jet skiing, explore our crystal-clear waters with exciting activities for all skill levels.",
    image: watersportsImage,
  },
  {
    title: "Island Tours",
    description:
      "Discover the hidden gems of the Greek Islands with our guided tours through charming villages, ancient ruins, and scenic viewpoints.",
    image: toursImage,
  },
  {
    title: "Local Sightseeing",
    description:
      "Experience the rich culture and history of the region with visits to temples, museums, and traditional markets.",
    image: sightseeingImage,
  },
];

const Activities = () => {
  return (
    <Layout>
      <PageHero
        title="Activities"
        subtitle="Unforgettable Experiences Await"
        backgroundImage={coastalView}
      />

      {/* Activities Grid */}
      <section className="container-resort py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((activity) => (
            <div
              key={activity.title}
              className="group bg-card rounded-lg overflow-hidden shadow-soft hover-lift"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="font-heading text-xl text-foreground">{activity.title}</h3>
                <p className="text-muted-foreground">{activity.description}</p>
                <Button variant="aegean" asChild>
                  <Link to="/contact">Book Now</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <WaveDivider />

      {/* Gallery CTA */}
      <section className="bg-background py-16 text-center">
        <p className="text-muted-foreground mb-6">
          See more of our beautiful resort and activities
        </p>
        <Button variant="goldOutline" size="lg" asChild>
          <Link to="/gallery">View Gallery</Link>
        </Button>
      </section>

      <WaveDivider />
    </Layout>
  );
};

export default Activities;
