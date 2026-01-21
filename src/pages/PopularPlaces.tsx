import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { WaveDivider } from "@/components/ui/WaveDivider";
import coastalView from "@/assets/coastal-view.jpg";

const attractions = [
  { name: "Anakkatti Hills", distance: "2–5 KM" },
  { name: "Siruvani Waterfalls & Dam", distance: "22–28 KM" },
  { name: "Silent Valley National Park", distance: "30–40 KM" },
  { name: "Attappady Hills", distance: "25–35 KM" },
  { name: "Koodam Waterfalls", distance: "18–22 KM" },
  { name: "Meenvallam Waterfalls", distance: "30–35 KM" },
  { name: "Malampuzha Dam & Gardens", distance: "55–65 KM" },
  { name: "Dhyanalinga & Isha Yoga Centre", distance: "45–55 KM" },
  { name: "Kovai Kutralam Waterfalls", distance: "40–50 KM" },
  { name: "Marudhamalai Temple", distance: "50–60 KM" },
  { name: "Local River View Points", distance: "1–3 KM" },
  { name: "Tribal Village Route", distance: "1–4 KM" },
  { name: "Local Trekking Spots", distance: "2–6 KM" },
];

const PopularPlaces = () => {
  return (
    <Layout>
      <PageHero
        title="Popular Places"
        subtitle="Discover The Best Tourist Spots Near Greece In Blue"
        backgroundImage={coastalView}
        showBookButton={false}
      >
        <p className="text-muted-foreground max-w-2xl mx-auto mt-6 text-center animate-slide-up animation-delay-400">
          Explore the beautiful natural attractions and cultural landmarks near our resort
          for an unforgettable adventure. Here are some of the top places to visit nearby.
        </p>
      </PageHero>

      {/* Attractions List */}
      <section className="container-resort py-16">
        <h2 className="font-heading text-2xl md:text-3xl text-foreground text-center mb-12 tracking-wide">
          NEARBY ATTRACTIONS
        </h2>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-lg shadow-soft overflow-hidden">
            {attractions.map((attraction, index) => (
              <div
                key={attraction.name}
                className={`flex justify-between items-center p-4 ${
                  index !== attractions.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <span className="font-body">
                  <span className="text-primary mr-2">•</span>
                  <span className="font-medium tracking-wide uppercase text-sm">
                    {attraction.name}
                  </span>
                </span>
                <span className="text-muted-foreground font-medium">{attraction.distance}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="gold" size="xl" asChild>
            <Link to="/contact" className="flex items-center gap-2">
              Book Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </Button>
        </div>
      </section>

      <WaveDivider />
    </Layout>
  );
};

export default PopularPlaces;
