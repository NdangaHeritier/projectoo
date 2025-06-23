import { DocumentPlusIcon, NewspaperIcon, StarIcon } from '@heroicons/react/24/solid';
import NotesBoard from './NotesTakingApp/NotesTakingBoard';
import { Projects } from './projects';
import { FolderOpenIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { Bars2Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Dashboard() {
  
  const [showMenu, setShowMenu] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showPinned, setShowPinned] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  return (
    <section className="main-bar flex items-start justify-start max-sm:flex-col px-3">
      <div className="menubar min-w-20 h-full max-sm:w-full bg-transparent py-5 max-sm:fixed bottom-0 top-7/8 max-sm:px-2 left-0 right-0 max-sm:bg-black z-30">
        <div className="links grid grid-cols-1 max-sm:grid-cols-4 gap-1 max-sm:w-full">
          <button
            type='button'
            onClick={() => setShowMenu(!showMenu)}
            className="menu-switcher max-sm:hidden"
          >
            <Bars2Icon className='text-gray-600 dark:text-gray-500 w-7 h-7 sm:mb-5 cursor-pointer hover:text-gray-800 dark:hover:text-gray-200 rounded-md inline-flex' />
          </button>
          <button
            type='button'
            onClick={() => {
              setShowProjects(false);
              setShowBlogs(false);
              setShowNotes(false);
              setShowPinned(true);
            }}
            className={`${showPinned ? `bg-indigo-600 hover:opacity-90` : `hover:bg-gray-100 dark:hover:bg-gray-900`} px-4 py-2 font-semibold rounded-md sm:rounded-r-full text-gray-800 dark:text-gray-200 inline-flex gap-2 items-center justify-center sm:justify-start cursor-pointer`}
          >
            <StarIcon className={`${showPinned ? `text-indigo-900 dark:text-indigo-400` : `text-gray-700 dark:text-gray-400`} h-5 w-5`} strokeWidth={2} />
            <span className={`${showMenu ? `block`: `hidden`}`}>Pinned</span>
          </button>
          <button
            type='button'
            onClick={() => {
              setShowProjects(true);
              setShowBlogs(false);
              setShowNotes(false);
              setShowPinned(false);
            }}
            className={`${showProjects ? `bg-indigo-600 hover:opacity-90` : `hover:bg-gray-100 dark:hover:bg-gray-900`} px-4 py-2 font-semibold rounded-md sm:rounded-r-full text-gray-800 dark:text-gray-200 inline-flex gap-2 items-center justify-center sm:justify-start cursor-pointer`}
          >
            <FolderOpenIcon className={`${showProjects ? `text-indigo-900 dark:text-indigo-400` : `text-gray-700 dark:text-gray-400`} h-5 w-5`} strokeWidth={2} />
            <span className={`${showMenu ? `block`: `hidden`}`}>Projects</span>
          </button>
          <button
            type='button'
            onClick={() => {
              setShowProjects(false);
              setShowBlogs(false);
              setShowPinned(false);
              setShowNotes(true);
            }}
            className={`${showNotes ? `bg-indigo-600 hover:opacity-90` : `hover:bg-gray-100 dark:hover:bg-gray-900`} px-4 py-2 font-semibold rounded-md sm:rounded-r-full text-gray-800 dark:text-gray-200 inline-flex gap-2 items-center justify-center sm:justify-start cursor-pointer`}
          >
            <SparklesIcon className={`${showNotes ? `text-indigo-900 dark:text-indigo-400` : `text-gray-700 dark:text-gray-400`} h-5 w-5`} strokeWidth={2} />
            <span className={`${showMenu ? `block`: `hidden`}`}>Notes</span>
          </button>
          <button
            type='button'
            onClick={() => {
              setShowProjects(false);
              setShowBlogs(true);
              setShowPinned(false);
              setShowNotes(false);
            }}
            className={`${showBlogs ? `bg-indigo-600 hover:opacity-90` : `hover:bg-gray-100 dark:hover:bg-gray-900`} px-4 py-2 font-semibold rounded-md sm:rounded-r-full text-gray-800 dark:text-gray-200 inline-flex gap-2 items-center justify-center sm:justify-start cursor-pointer`}
          >
            <NewspaperIcon className={`${showBlogs ? `text-indigo-900 dark:text-indigo-400` : `text-gray-700 dark:text-gray-400`} h-5 w-5`} strokeWidth={2} />
            <span className={`${showMenu ? `block`: `hidden`}`}>Blogs</span>
          </button>          
        </div>
      </div>
      <div className="py-6 text-gray-800 dark:text-gray-200 flex-1"> 

        {showPinned && (
          <div className="flex items-center justify-center flex-col gap-0 py-5 m-auto min-h-40">
            <DocumentPlusIcon className='w-16 h-16 text-gray-300 dark:text-gray-700' />
            <h2 className='text-xl font-bold text-gray-800 dark:text-gray-200 p-8 flex items-center justify-center'>
              Pinning Projects, Notes and Blogs Feature Is comming Soon!
            </h2>
            <p className="text-gray-400 dark:text-gray-600 italic text-lg">
              The Pinning feature is comming soon! Stay Tunned.
            </p>
          </div>
        )}    
        {showProjects && <Projects />} 
        {showNotes && <NotesBoard />} 
        {showBlogs && (
          <div className="flex items-center justify-center flex-col gap-0 py-5 m-auto min-h-40">
            <DocumentPlusIcon className='w-16 h-16 text-gray-300 dark:text-gray-700' />
            <h2 className='text-xl font-bold text-gray-800 dark:text-gray-200 p-8 flex items-center justify-center'>
              Blogs Feature With Bloged Is comming Soon!
            </h2>
            <p className="text-gray-400 dark:text-gray-600 italic text-lg">
              The Bloging is comming soon! Stay Tunned.
            </p>
          </div>
        )} 
      </div>
    </section>
  );
} 