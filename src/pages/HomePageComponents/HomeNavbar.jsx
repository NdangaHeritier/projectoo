import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";

// --- Custom Navbar for Homepage ---
export default function HomeNavbar() {
  return (
    <nav className="w-full text-white py-7 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex uppercase items-center gap-2 font-bold text-xl">
          <img src="/favicon.svg" alt="logo" className="w-8 h-8" />
          Project <span className="text-indigo-300">oo</span>
        </div>
        <div className="hidden sm:flex gap-6 font-medium">
          <a href="#features" className="hover:text-yellow-300 transition">Features</a>
          <a href="#howitworks" className="hover:text-yellow-300 transition">How It Works</a>
          <a href="#testimonials" className="hover:text-yellow-300 transition">Testimonials</a>
          <a href="#faqs" className="hover:text-yellow-300 transition">FAQs</a>
        </div>
        <div className="flex gap-2">
          <a href="/login" className="px-4 py-2 rounded-lg bg-gray-200 text-indigo-600 font-semibold hover:bg-indigo-200 dark:hover:bg-gray-900 transition max-sm:text-sm">Get Started</a>
        </div>
      </div>
    </nav>
  );
}