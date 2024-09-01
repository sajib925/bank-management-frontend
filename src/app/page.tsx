import BusinessSolutions from "@/components/BusnessSolution";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import FeaturesSection from "@/components/Freatures";
import FeaturesSection2 from "@/components/Freatures2";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <FeaturesSection2 />
      {/* <BusinessSolutions /> */}
      <FAQSection />
      <CTASection />
    </>
  )
}
