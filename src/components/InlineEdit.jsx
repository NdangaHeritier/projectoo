import { useState } from 'react';
import { CheckIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { LoadingSmall } from './LoadingSmall';

export default function InlineEdit({
  value,
  onSave,
  type = 'text',
  className = '',
  inputClassName = '',
  showEditButton = true,
  editing = false, // Controlled prop to manage edit state externally
  showCancelButton = true, // Show cancel button
}) {
  const [isEditing, setIsEditing] = useState(editing);
  const [editValue, setEditValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (isLoading) return; // Prevent multiple saves
    setIsLoading(true);
    await onSave(editValue);
    setIsLoading(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (type == 'input' && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const isMobile = window.innerWidth < 768; // or use `navigator.userAgent` check

  const handleClick = (e) => {
    if (isMobile) {
      setIsEditing(true);
    }
  };

  const handleDoubleClick = (e) => {
    if (!isMobile) {
     setIsEditing(true);
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-start flex-wrap gap-2 w-full">
        {type === 'textarea' ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyPress}
            className={`w-full p-2 border border-indigo-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-400 ${inputClassName}`}
            rows={3}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyPress}
            className={`w-full p-2 border border-indigo-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-400 ${inputClassName}`}
            autoFocus
          />
        )}
        <div className="flex ml-2 space-x-1">
          <button
            onClick={handleSave}
            className={`${!showCancelButton ? `bg-indigo-600 inline-flex items-center justify-center px-2 pr-3 gap-1 text-white hover:opacity-90`: `text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-600/20`} p-1 rounded-full`}
          >
            {isLoading ? (
              <LoadingSmall className={`h-5 w-5`} />
            ) : (
              <CheckIcon className="h-5 w-5" />
            )}
            {!showCancelButton ?
            <span>
              {isLoading ? 'saving...' : 'Save'}
            </span>
            : null}
          </button>
          {showCancelButton && (
            <button
              onClick={handleCancel}
              className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 dark:hover:bg-red-600/20"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`group relative ${className}`}>
      <div className="flex items-center justify-start max-sm:flex-col max-sm:items-start">
        <div className="flex-1" onDoubleClick={handleDoubleClick} onClick={handleClick}>{value}</div>
        {showEditButton && (
          <button
            onClick={() => setIsEditing(true)}
            className="ml-2 p-2 max-sm:absolute max-sm:top-2 max-sm:right-2 cursor-pointer text-gray-400 hover:text-indigo-500 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}