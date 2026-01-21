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
    title: "3 Pool Villas & 2 Pools",
    description:
      "Dedicated Kids' Swimming Pool and large Adult Swimming Pool for the perfect poolside experience.",
    image: cruiseImage,
  },
  {
    title: "Rooftop Restaurant",
    description:
      "European-style rooftop dining with multi-cuisine options and stunning panoramic mountain views.",
    image: watersportsImage,
  },
  {
    title: "Indoor & Outdoor Games",
    description:
      "Cricket Turf, indoor games, and exciting activities for guests of all ages.",
    image: toursImage,
  },
  {
    title: "Horse Riding",
    description:
      "Experience the thrill of horse riding amidst the beautiful Anaikatti hills.",
    image: sightseeingImage,
  },
  {
    title: "Movie Screening",
    description:
      "Private movie screening sessions with comfortable seating and premium setup.",
    image: cruiseImage,
  },
  {
    title: "European Photo Spots",
    description:
      "Capture stunning moments at our many Greek-inspired photo spots throughout the resort.",
    image: watersportsImage,
  },
];

const Activities = () => {
  return (
    <Layout>
      <PageHero
        title="Activities & Experiences"
        subtitle="Adventures Await"
        backgroundImage={coastalView}
      >
        <p className="text-white/80 max-w-2xl mx-auto mt-4 text-center animate-slide-up animation-delay-300">
          From poolside relaxation to exciting adventures, discover a range of activities designed for couples, families, and anyone seeking a premium holiday.
        </p>
      </PageHero>

      {/* Activities Grid */}
      <section className="container-resort py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <div
              key={activity.title}
              className="group bg-card rounded-lg overflow-hidden shadow-soft hover-lift"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="font-heading text-xl text-foreground">{activity.title}</h3>
                <p className="text-muted-foreground text-sm">{activity.description}</p>
                <Button variant="aegean" asChild>
                  <Link to="/contact">Learn More</Link>
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