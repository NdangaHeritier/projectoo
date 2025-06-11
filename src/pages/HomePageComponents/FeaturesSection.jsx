import { BoltIcon, PuzzlePieceIcon, AdjustmentsHorizontalIcon, RocketLaunchIcon, CheckBadgeIcon, SparklesIcon } from '@heroicons/react/24/outline';
import FeatureCard from './FeatureCard';

// --- Features Section ---
function FeaturesSection() {
  return (
    <section id="features" className="py-16 bg-white dark:bg-gray-950 ">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-6xl text-transparent bg-clip-text bg-gradient-to-b from-gray-600 to-gray-400 font-bold text-center mb-10">Why Projectoo?</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-5xl text-center mb-8">
            Projectoo is your go-to tool for turning big ideas into manageable projects. Whether you're a solo developer, a startup founder, or just someone with a great idea, we make it easy to break down your projects into bite-sized tasks. No more chaos, just clarity and a dash of fun!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<BoltIcon className="h-12 w-12 p-2 bg-indigo-400/20 dark:bg-indigo-600/20 rounded-lg flex items-center justify-center text-indigo-600" />}
            title="Break Down Projects"
            desc="Split your big ideas into manageable phases and tasks. Stay organized and focused, even if your coffee isn't."
          />
          <FeatureCard
            icon={<PuzzlePieceIcon className="h-12 w-12 p-2 bg-indigo-400/20 dark:bg-indigo-600/20 rounded-lg flex items-center justify-center text-indigo-600" />}
            title="MVPs Made Easy"
            desc="Turn chaos into clarity. Projectoo helps you build MVPs by focusing on what matters—one step at a time."
          />
          <FeatureCard
            icon={<AdjustmentsHorizontalIcon className="h-12 w-12 p-2 bg-indigo-400/20 dark:bg-indigo-600/20 rounded-lg flex items-center justify-center text-indigo-600" />}
            title="Customize Everything"
            desc="Edit phases, tasks, and icons on the fly. Your project, your rules. (We won't tell your boss.)"
          />
          <FeatureCard
            icon={<SparklesIcon className="h-12 w-12 p-2 bg-indigo-400/20 dark:bg-indigo-600/20 rounded-lg flex items-center justify-center text-indigo-600" />}
            title="Pick Your Icon"
            desc="Choose the perfect icon to reflect your project's vibe. Because every project deserves a little sparkle."
          />
          <FeatureCard
            icon={<RocketLaunchIcon className="h-12 w-12 p-2 bg-indigo-400/20 dark:bg-indigo-600/20 rounded-lg flex items-center justify-center text-indigo-600" />}
            title="Launch Ready"
            desc="From idea to launch, Projectoo keeps you on track. No more sticky notes on your monitor (unless you like them)."
          />
          <FeatureCard
            icon={<CheckBadgeIcon className="h-12 w-12 p-2 bg-indigo-400/20 dark:bg-indigo-600/20 rounded-lg flex items-center justify-center text-indigo-600" />}
            title="Free Forever"
            desc="No credit card. No hidden fees. Just pure productivity, with a side of joy."
          />
        </div>
      </div>
    </section>
  );
}
export default FeaturesSection;