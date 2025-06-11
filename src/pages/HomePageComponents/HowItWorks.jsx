import { WrenchScrewdriverIcon, PuzzlePieceIcon, AdjustmentsHorizontalIcon, SlashIcon } from '@heroicons/react/24/outline';

// --- How It Works Section ---
function HowItWorksSection() {
return (
    <section id="howitworks" className="py-16 bg-gradient-to-br from-indigo-500 to-indigo-700 dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-6xl text-transparent bg-clip-text bg-gradient-to-b from-indigo-400 dark:from-gray-600 dark:to-gray-400 to-indigo-200 font-bold text-center mb-10">How It Works</h2>
            <p className="text-gray-300 text-center mb-8 text-lg">
                Projectoo empowers you to turn ideas into reality—one simple step at a time.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <HowItWorksStep
                    index={1}
                    title="Your Project"
                    desc="Start with a blank canvas or a wild idea. Add a name, pick an icon, and let Projectoo do the heavy lifting."
                />
                <HowItWorksStep
                    index={2}
                    title="Break It Down"
                    desc="Divide your project into phases and tasks. MVP or mega-project, Projectoo keeps it simple and manageable."
                />
                <HowItWorksStep
                    index={3}
                    title="Edit & Launch"
                    desc="Edit on the fly, track progress, and launch with confidence. (Cape and superhero pose optional.)"
                />
            </div>
        </div>
    </section>
);
}
export default HowItWorksSection;

function HowItWorksStep({ index, title, desc }) {
  return (
    <div className="bg-indigo-100 dark:bg-indigo-600 border border-indigo-100 dark:border-indigo-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <div className="p-2 font-bold text-4xl flex items-center justify-center text-slate-300 dark:text-indigo-400">
            {index}<SlashIcon className="h-8 w-8 text-indigo-200 dark:text-indigo-900" />
        </div>        
        <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{desc}</p>
    </div>
  );
}