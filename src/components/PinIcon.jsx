export const PinIcon = ({ className = "w-5 h-5 text-gray-500" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="M15.5 3a1 1 0 0 1 .94.66l1.72 4.92 2.29.77a1 1 0 0 1 .3 1.71l-4.7 4.18v3.76a1 1 0 0 1-1.7.71l-3.6-3.6-4.89 4.88a1 1 0 1 1-1.42-1.42l4.88-4.89-3.6-3.6a1 1 0 0 1 .7-1.7h3.76l4.18-4.7a1 1 0 0 1 1.71.3l.77 2.29L15.34 4a1 1 0 0 1 1.16-.72z" />
  </svg>
);


// unpin icon
export const UnpinIcon = ({ className = "w-5 h-5 text-gray-500" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="M3 3l18 18" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M17.67 6.33l-1.72-4.92a1 1 0 0 0-1.94.28l-.77 2.29-4.18 4.7H5.5a1 1 0 0 0-.7 1.7l3.6 3.6-4.88 4.89a1 1 0 0 0 1.42 1.42l4.89-4.88 3.6 3.6a1 1 0 0 0 1.7-.7v-3.76l2.87-2.55"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
