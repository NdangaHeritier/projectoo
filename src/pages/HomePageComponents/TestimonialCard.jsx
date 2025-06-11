import { StarIcon, UserCircleIcon } from "@heroicons/react/24/outline";

function TestimonialCard({ name, text }) {
  return (
    <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between w-full border-b border-gray-300 dark:border-gray-800 pb-4 mb-4">
        <UserCircleIcon className="h-7 w-7 text-gray-400 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="flex items-center justify-center gap-1">
            <StarIcon className="h-6 w-6 text-gray-300" />
            <StarIcon className="h-6 w-6 text-gray-300" />
            <StarIcon className="h-6 w-6 text-gray-300" />
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-200 italic mb-2">"{text}"</p>
      <span className="font-semibold text-indigo-700 dark:text-indigo-300">{name}</span>
    </div>
  );
}
export default TestimonialCard;