import { Layout } from "@/components/layout/Layout";
import {
  HeroSection,
  AboutSection,
  AccommodationsSection,
  ActivitiesSection,
} from "@/components/home/HomeSections";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <AccommodationsSection />
      <ActivitiesSection />
    </Layout>
  );
};

export default Index;
