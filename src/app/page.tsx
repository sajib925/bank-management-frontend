import BusinessSolutions from "@/components/BusnessSolution";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import FeaturesSection from "@/components/Freatures";
import FeaturesSection2 from "@/components/Freatures2";
import HeroSection from "@/components/HeroSection";
import LoanManagement from "@/components/LoanManagement";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
    <Navbar />
      <HeroSection />
      <FeaturesSection />
      <FeaturesSection2 />
      {/* <BusinessSolutions /> */}
      {/* <LoanManagement /> */}
      <FAQSection />
      <CTASection />
      <Footer />
    </>
  )
}
