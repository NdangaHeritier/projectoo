export function CustomTrendingUpIcon({ className = "w-6 h-6 text-green-600" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* X and Y axis */}
      <path d="M3 17V21H7" strokeOpacity="0.3" />
      
      {/* Trending up line */}
      <polyline points="3 17 9 11 13 15 21 7" />
      {/* Optional: dot at the end */}
      <circle cx="21" cy="7" r="1.5" fill="currentColor" />
    </svg>
  );
}
export default CustomTrendingUpIcon;