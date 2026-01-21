import { Layout } from "@/components/layout/Layout";
import {
  HeroSection,
  AboutSection,
  AccommodationsSection,
  ActivitiesSection,
  ClosingSection,
} from "@/components/home/HomeSections";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <AccommodationsSection />
      <ActivitiesSection />
      <ClosingSection />
    </Layout>
  );
};

export default Index;
