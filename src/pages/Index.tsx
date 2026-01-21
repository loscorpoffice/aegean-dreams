import { Layout } from "@/components/layout/Layout";
import {
  HeroSection,
  AboutSection,
  RoomsSection,
  AmenitiesSection,
  ActivitiesSection,
  GallerySection,
  ClosingSection,
} from "@/components/home/HomeSections";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <RoomsSection />
      <AmenitiesSection />
      <ActivitiesSection />
      <GallerySection />
      <ClosingSection />
    </Layout>
  );
};

export default Index;