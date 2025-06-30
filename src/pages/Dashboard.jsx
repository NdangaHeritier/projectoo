import { DocumentPlusIcon, NewspaperIcon, StarIcon } from '@heroicons/react/24/solid';
import NotesBoard from './NotesTakingApp/NotesTakingBoard';
import { Projects } from './projects';
import { FolderOpenIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { Bars2Icon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import PinnedBoard from './PinnedBoard';
import { Link, useParams } from 'react-router-dom';

export default function Dashboard() {
  const { tab } = useParams();
  // const [showMenu, setShowMenu] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showPinned, setShowPinned] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (tab === "projects") {
      setShowProjects(true);
      setShowBlogs(false);
      setShowNotes(false);
      setShowPinned(false);
      setNotFound(false);
    } else if (tab === "pinned" || tab === null) {
      setShowProjects(false);
      setShowBlogs(false);
      setShowNotes(false);
      setShowPinned(true);
      setNotFound(false);
    } else if (tab === "notes") {
      setShowProjects(false);
      setShowBlogs(false);
      setShowNotes(true);
      setShowPinned(false);
      setNotFound(false);
    } else if (tab === "blogs") {
      setShowProjects(false);
      setShowBlogs(true);
      setShowNotes(false);
      setShowPinned(false);
      setNotFound(false);
    } else {
      setShowProjects(false);
      setShowBlogs(false);
      setShowNotes(false);
      setShowPinned(false);
      setNotFound(true);
    }
  }, [tab]);

  return (
    <section className="main-bar flex items-start justify-start max-sm:flex-col">
      <div className="menubar px-1 sm:border-r min-w-20 sm:min-h-screen max-sm:w-full py-3 sm:py-18 sticky top-10 max-sm:fixed max-sm:bottom-0 max-sm:top-7/8 max-sm:px-2 max-sm:left-0 max-sm:right-0 dark:bg-black max-sm:shadow-lg bg-white max-sm:border-t border-gray-300 dark:border-gray-800 z-30">
        <div className="links grid grid-cols-1 max-sm:grid-cols-4 gap-1 max-sm:w-full">
          {/* <button
            type='button'
            onClick={() => setShowMenu(!showMenu)}
            className="menu-switcher max-sm:hidden"
          >
            <Bars2Icon className='text-gray-600 dark:text-gray-500 w-7 h-7 sm:mb-5 cursor-pointer hover:text-gray-800 dark:hover:text-gray-200 rounded-md inline-flex' />
          </button> */}
          <Link
            to={`/pinned`}
            className={`${showPinned ? `bg-indigo-600 hover:opacity-90 text-indigo-200` : `hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700`} px-4 py-2 font-semibold rounded-md  dark:text-gray-200 inline-flex gap-2 items-center justify-center sm:justify-start cursor-pointer`}
          >
            <StarIcon className={`${showPinned ? `text-indigo-200` : `text-gray-700 dark:text-gray-400`} h-5 w-5`} strokeWidth={2} />
            <span className="hidden lg:block">Pinned</span>
          </Link>
          <Link
            to={`/projects`}
            className={`${showProjects ? `bg-indigo-600 hover:opacity-90 text-indigo-200` : `hover:bg-gray-100 dark:hover:bg-gray-900`} px-4 py-2 font-semibold rounded-md  text-gray-800 dark:text-gray-200 inline-flex gap-2 items-center justify-center sm:justify-start cursor-pointer`}
          >
            <FolderOpenIcon className={`${showProjects ? `text-indigo-200` : `text-gray-700 dark:text-gray-400`} h-5 w-5`} strokeWidth={2} />
            <span className="hidden lg:block">Projects</span>
          </Link>
          <Link
            to={`/notes`}
            className={`${showNotes ? `bg-indigo-600 hover:opacity-90 text-indigo-200` : `hover:bg-gray-100 dark:hover:bg-gray-900`} px-4 py-2 font-semibold rounded-md  text-gray-800 dark:text-gray-200 inline-flex gap-2 items-center justify-center sm:justify-start cursor-pointer`}
          >
            <SparklesIcon className={`${showNotes ? `text-indigo-200` : `text-gray-700 dark:text-gray-400`} h-5 w-5`} strokeWidth={2} />
            <span className="hidden lg:block">Notes</span>
          </Link>
          <Link
            to={`/blogs`}
            className={`${showBlogs ? `bg-indigo-600 hover:opacity-90 text-indigo-200` : `hover:bg-gray-100 dark:hover:bg-gray-900`} px-4 py-2 font-semibold rounded-md  text-gray-800 dark:text-gray-200 inline-flex gap-2 items-center justify-center sm:justify-start cursor-pointer`}
          >
            <NewspaperIcon className={`${showBlogs ? `text-indigo-200` : `text-gray-700 dark:text-gray-400`} h-5 w-5`} strokeWidth={2} />
            <span className="hidden lg:block">Blogs</span>
          </Link>          
        </div>
      </div>
      <div className="p-5 text-gray-800 dark:text-gray-200 flex-1 min-h-120 min-w-full max-sm:w-full sm:min-w-7/8"> 

        {showPinned && (
          <PinnedBoard />
        )}    
        {showProjects && <Projects />} 
        {showNotes && <NotesBoard />} 
        {showBlogs && (
          <div className="flex items-center justify-center flex-col gap-0 py-5 m-auto min-h-40 text-center">
            <DocumentPlusIcon className='w-16 h-16 text-gray-300 dark:text-gray-700' />
            <h2 className='text-xl font-bold text-gray-800 dark:text-gray-200 p-8 flex items-center justify-center'>
              Blogs Feature With Bloged Is comming Soon!
            </h2>
            <p className="text-gray-400 dark:text-gray-600 italic text-lg">
              The Bloging is comming soon! Stay Tunned.
            </p>
          </div>
        )} 
        {notFound && (
          <div className="flex items-center justify-center flex-col gap-0 py-5 m-auto min-h-40 text-center">
            <DocumentPlusIcon className='w-16 h-16 text-gray-300 dark:text-gray-700' />
            <h2 className='text-xl font-bold text-gray-800 dark:text-gray-200 p-8 flex items-center justify-center'>
              {tab} Not Found!
            </h2>
            <p className="text-gray-400 dark:text-gray-600 italic text-lg">
              The page you're looking for is not found!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}