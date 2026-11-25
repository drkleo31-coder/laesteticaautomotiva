import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveFinishStudio } from './components/InteractiveFinishStudio';
import { CatalogSection } from './components/CatalogSection';
import { AboutSection } from './components/AboutSection';
import { PickupDeliverySection } from './components/PickupDeliverySection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { GoldParticlesCanvas } from './components/GoldParticlesCanvas';
import { ScrollProgressHairline } from './components/ScrollEffects';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#070708] text-[#F4F2ED]">
      <ScrollProgressHairline />

      {/* Ambient Interactive Gold Particles & Moving Light Points across Scroll */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      >
        <GoldParticlesCanvas variant="ambient" />
      </div>

      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <InteractiveFinishStudio />
        <CatalogSection />
        <AboutSection />
        <PickupDeliverySection />
        <LocationSection />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      <FloatingWhatsApp />
    </div>
  );
}
