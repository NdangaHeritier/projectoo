// --- Partnership Section ---
function PartnershipSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-6xl text-transparent bg-clip-text bg-gradient-to-b from-gray-600 to-gray-400 font-bold text-center mb-10">Projectoo: Your Project Partner</h2>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
          We’re not just a tool—we’re your sidekick. Projectoo helps you break down, manage, and launch projects with less stress and more fun. Whether you’re building the next unicorn or just want to finally finish that side project, we’re here for you.
        </p>
        <a href="/register" className="inline-block px-8 py-3 bg-indigo-700 text-white font-bold rounded-lg shadow hover:bg-indigo-800 transition">
          Become a Projectoo-er Today!
        </a>
      </div>
    </section>
  );
}
export default PartnershipSection;