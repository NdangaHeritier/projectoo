import React from 'react';
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-gradient-to-br from-90% to-10% from-indigo-50 to-indigo-500 dark:from-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-6 flex items-start justify-start gap-3 shadow-sm hover:scale-105 transition-transform duration-200">
      <div className="">
        {icon}
      </div>
      <div className="flex flex-col items-start justify-start">
        <h3 className="font-semibold text-gray-900 dark:text-gray-200 text-lg mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{desc}</p>
      </div>
    </div>
  );
}
export default FeatureCard;
