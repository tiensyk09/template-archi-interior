import HeroBanner from '@/components/HeroBanner';
import ProjectsSection from '@/components/ProjectsSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ProcessSection from '@/components/ProcessSection';
import Testimonials from '@/components/Testimonials';

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroBanner />
      <ProjectsSection />
      <WhyChooseUs />
      <ProcessSection />
      <Testimonials />
    </div>
  );
}
