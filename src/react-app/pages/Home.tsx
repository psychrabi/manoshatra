import { lazy, Suspense } from "react";

const HeroSection = lazy(() => import("../components/home/HeroSection"));
const StatsSection = lazy(() => import("../components/home/StatsSection"));
const ServicesPreview = lazy(() => import("../components/home/ServicesPreview"));
const TeamPreview = lazy(() => import("../components/home/TeamPreview"));
const TestimonialsSection = lazy(() => import("../components/home/TestimonialsSection"));
const BlogPreview = lazy(() => import("../components/home/BlogPreview"));
const CTASection = lazy(() => import("../components/home/CTASection"));

const SectionFallback = () => (
  <div className="py-16 text-center">
    <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4 animate-pulse" />
    <div className="h-4 bg-gray-100 rounded w-64 mx-auto animate-pulse" />
  </div>
);

const Home = () => {
  return (
    <div data-testid="home-page">
      <Suspense fallback={<SectionFallback />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <StatsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ServicesPreview />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TeamPreview />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <BlogPreview />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <CTASection />
      </Suspense>
    </div>
  );
};

export default Home;
