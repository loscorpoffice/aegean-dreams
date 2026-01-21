import { Layout } from "@/components/layout/Layout";
import {
  HeroSection,
  WelcomeSection,
  AboutSection,
  AccommodationsSection,
  ActivitiesSection,
} from "@/components/home/HomeSections";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <WelcomeSection />
      <AboutSection />
      <AccommodationsSection />
      <ActivitiesSection />
    </Layout>
  );
};

export default Index;
