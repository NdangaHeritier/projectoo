// --- FAQs Section ---
function FaqSection() {
  const faqs = [
    {
      q: "Is Projectoo really free?",
      a: "Yes! No credit card, no hidden fees. We just want to help you build cool stuff."
    },
    {
      q: "Can I use Projectoo for big projects?",
      a: "Absolutely. Whether it's a weekend MVP or a mega-corporate launch, Projectoo scales with you."
    },
    {
      q: "Can I pick my own project icon?",
      a: "Yes! Choose from a library of icons to match your project's vibe. Unicorns not included (yet)."
    },
    {
      q: "Is my data safe?",
      a: "We take privacy seriously. Your projects are yours, and we keep them secure."
    }
  ];
  return (
    <section id="faqs" className="py-16 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-6xl max-sm:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-gray-600 to-gray-400 font-bold text-center mb-10">Here is what you're asking your self.</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 border border-indigo-100 dark:border-gray-800 rounded-xl p-6 shadow-sm">
              <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">{faq.q}</h4>
              <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default FaqSection;