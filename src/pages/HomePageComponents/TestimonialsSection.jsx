import TestimonialCard from "./TestimonialCard";

// --- Testimonials Section ---
function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-6xl max-sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-gray-600 to-gray-400 font-bold text-center mb-10">What Our Users Say</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 text-lg">
          Projectoo isn’t just a tool; it’s a game-changer. Our users rave about how easy it is to turn their ideas into reality without the usual project management headaches.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            name="Alex, Startup Founder"
            text="Projectoo turned my MVP chaos into a clear roadmap. I finished my launch two weeks early and still had time for coffee!"
          />
          <TestimonialCard
            name="Jamie, Product Manager"
            text="I love how easy it is to break down big projects. The icon picker is a fun bonus—my team actually argues over which icon to use!"
          />
          <TestimonialCard
            name="Morgan, Indie Hacker"
            text="Finally, a tool that doesn't make me feel like I need a PhD to use it. Projectoo is simple, powerful, and free. What's not to love?"
          />
        </div>
      </div>
    </section>
  );
}
export default TestimonialsSection;