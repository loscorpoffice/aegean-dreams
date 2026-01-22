import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/ui/PageHero";
import { WaveDivider } from "@/components/ui/WaveDivider";
import coastalView from "@/assets/coastal-view.jpg";
import heroPool from "@/assets/hero-pool.jpg";
import roomPrivatePool from "@/assets/room-private-pool.jpg";
import roomSantorini from "@/assets/room-santorini.jpg";
import roomBarbie from "@/assets/room-barbie.jpg";
import amenityPool from "@/assets/amenity-pool.jpg";
import amenityTheatre from "@/assets/amenity-theatre.jpg";
import amenityRestaurant from "@/assets/amenity-restaurant.jpg";
import cruiseImage from "@/assets/activity-cruise.jpg";
import galleryWatersports from "@/assets/gallery-watersports.webp";
import toursImage from "@/assets/activity-tours.jpg";
import sightseeingImage from "@/assets/activity-sightseeing.jpg";
import accommodationsHero from "@/assets/accommodations-hero.jpg";
import aboutTerrace from "@/assets/about-terrace.jpg";
import gallerySunsetView from "@/assets/gallery-sunset-view.webp";

const categories = ["All", "Resort", "Rooms", "Dining", "Activities", "Amenities"];

const galleryImages = [
  { src: roomSantorini, category: "Rooms", title: "Santorini Bedroom" },
  { src: amenityRestaurant, category: "Dining", title: "Seaside Dining" },
  { src: roomBarbie, category: "Rooms", title: "Barbie Room" },
  { src: amenityPool, category: "Amenities", title: "Blue Dome Pool" },
  { src: galleryWatersports, category: "Activities", title: "Watersports" },
  { src: aboutTerrace, category: "Resort", title: "Terrace View" },
  { src: amenityTheatre, category: "Amenities", title: "4K Theatre" },
  { src: roomPrivatePool, category: "Rooms", title: "Private Pool Room" },
  { src: toursImage, category: "Activities", title: "Island Tours" },
  { src: gallerySunsetView, category: "Resort", title: "Sunset View" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <Layout>
      <PageHero
        title="Gallery"
        subtitle="Explore Our Beautiful Resort"
        backgroundImage={coastalView}
        showBookButton={false}
      />

      {/* Filter Tabs */}
      <section className="container-resort py-8">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-gold text-secondary-foreground shadow-gold"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container-resort pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-soft hover-lift aspect-[4/3]"
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4">
                  <p className="text-primary-foreground font-heading text-lg">{image.title}</p>
                  <p className="text-primary-foreground/80 text-sm">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <WaveDivider />
    </Layout>
  );
};

export default Gallery;
