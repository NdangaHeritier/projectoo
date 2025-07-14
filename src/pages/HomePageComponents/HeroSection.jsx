import { LightBulbIcon } from "@heroicons/react/24/solid";
import HomeNavbar from "./HomeNavbar";

// --- Hero Section ---
function HeroSection() {
return (
    <section className="relative bg-gradient-to-r from-indigo-950 via-indigo-800 to-indigo-600">
        <div className="inset-0 absolute z-0 bg-[url('/rays.png')] bg-center bg-cover bg-no-repeat"></div>
        <section className=" relative text-white pt-0 pb-20 px-4">
            <HomeNavbar />
            <div className="max-w-4xl mx-auto text-center pt-13 max-sm:pt-10 flex flex-col items-center gap-4">
                <div className="inline-flex justify-center items-center gap-2 rounded-full bg-indigo-800 border-2 border-indigo-300 text-indigo-200 px-4 py-2 shadow-lg backdrop-blur-md">
                    <LightBulbIcon className="h-5 w-5 text-indigo-200" />
                    <span className="font-semibold text-base max-sm:text-sm">Meet your Project Partner</span>
                </div>
                <h1 className="text-5xl sm:text-7xl font-bold mb-4">
                    Build MVPs Fast. Launch Big Ideas.
                </h1>
                <p className="text-lg sm:text-xl mb-8 max-sm:mb-4 max-w-2xl mx-auto">
                    Projectoo makes project planning simple—break down tasks, track progress, and launch your next big thing, free forever.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="/register" className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-lg shadow hover:bg-indigo-50 dark:hover:bg-gray-900 transition">
                        Get Started Free
                    </a>
                    <a href="/login" className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg border border-white/20 hover:bg-indigo-700 transition">
                        Sign In
                    </a>
                </div>
                <div className="mt-4 text-indigo-100 text-sm">
                    No credit card needed. Projectoo is always free. 
                    <span className="inline-block text-indigo-700">
                        <a href="/features" className="underline text-indigo-50 font-bold hover:text-indigo-200 transition">
                            Learn more
                        </a>
                    </span>
                </div>
            </div>
        </section>
    </section>
);
}
export default HeroSection;