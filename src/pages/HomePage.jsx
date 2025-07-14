import HomeNavbar from './HomePageComponents/HomeNavbar';
import HeroSection from './HomePageComponents/HeroSection';
import FeaturesSection from './HomePageComponents/FeaturesSection';
import HowItWorksSection from './HomePageComponents/HowItWorks';
import TestimonialsSection from './HomePageComponents/TestimonialsSection';
import FaqSection from './HomePageComponents/FaqsSection';
import PartnershipSection from './HomePageComponents/PaternShipSection';
import Footer from '../components/Footer';


// --- HomePage Main ---
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FaqSection />
      <PartnershipSection />
      <Footer />
    </div>
  );
}