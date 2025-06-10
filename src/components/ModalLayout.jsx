import { CursorArrowRippleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function ModalLayout({ title, onClose, children, showCloseButton = true }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-20 backdrop-blur-sm p-1">
      <div className="relative bg-zinc-100 dark:bg-gray-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-2 sm:p-6 w-full max-w-lg sm:max-w-2xl max-h-[calc(100vh-3rem)] overflow-y-auto">
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-400 bg-white dark:bg-zinc-900 rounded-full p-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Close"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        )}
        {title && (
          <h3 className="text-lg font-bold text-black dark:text-white mb-4 flex items-center gap-2">
            <CursorArrowRippleIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            {title}
          </h3>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}