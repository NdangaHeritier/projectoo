'use client';

import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

export default function SelectMenu({ options = [], selected, onChange }) {
  return (
    <div className="w-full">
      <Listbox value={selected} onChange={onChange}>
        <div className="relative">
          {/* Select Button */}
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-100 border border-zinc-300 dark:border-zinc-800 dark:bg-zinc-800 py-2 pl-3 pr-10 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900 sm:text-sm transition-all">
            <span className="block truncate text-gray-900 dark:text-white">
              {selected?.label || 'Select an option'}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400 dark:text-zinc-300" aria-hidden="true" />
            </span>
          </Listbox.Button>

          {/* Dropdown Options */}
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white dark:bg-zinc-800 py-1 text-base shadow-lg ring-1 ring-black/10 focus:outline-none sm:text-sm">
              {options.map((option, idx) => (
                <Listbox.Option
                  key={idx}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 mx-1 rounded-md transition-colors ${
                      active
                        ? 'bg-indigo-100 text-indigo-900 dark:bg-indigo-600 dark:text-white'
                        : 'text-gray-900 dark:text-zinc-100'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                        {option.label}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600 dark:text-white">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
// Usage Example:
// <SelectMenu 