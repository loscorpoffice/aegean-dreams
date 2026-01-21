import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/ui/PageHero";
import { WaveDivider } from "@/components/ui/WaveDivider";
import amenityRestaurant from "@/assets/amenity-restaurant.jpg";

const Dining = () => {
  return (
    <Layout>
      <PageHero
        title="Dining"
        subtitle="Savor Exquisite Mediterranean Cuisine"
        backgroundImage={amenityRestaurant}
      />

      <section className="container-resort py-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground">
            ATHENS Restaurant
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Experience the finest Mediterranean cuisine at our signature restaurant, ATHENS.
            Our talented chefs prepare dishes using the freshest local ingredients,
            served in a stunning seaside setting with panoramic views of the Aegean Sea.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            From traditional Greek meze to modern fusion creations, every meal is a
            celebration of flavors, textures, and the rich culinary heritage of the region.
          </p>
        </div>

        <div className="mt-12">
          <img
            src={amenityRestaurant}
            alt="Athens Restaurant"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-soft-lg"
          />
        </div>
      </section>

      <WaveDivider />
    </Layout>
  );
};

export default Dining;
