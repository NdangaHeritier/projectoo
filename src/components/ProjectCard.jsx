import { ArrowRightIcon, ClockIcon, FolderOpenIcon, StopIcon, TrashIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ReadMore from "./ReadMore";

export const ProjectCard = ({ project, onClick, iconComponent }) => {
  return (
    <div
        key={project.id}
        className="bg-white dark:bg-black border border-zinc-300 dark:border-zinc-800 overflow-hidden rounded-lg hover:shadow-lg transition-shadow duration-200"
    >
        <div className="px-4 py-5 sm:p-6 flex flex-col h-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 dark:bg-indigo-600/20 rounded-lg flex items-center justify-center">
                        {iconComponent ? (
                            iconComponent
                        ) : (
                            <FolderOpenIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        )}
                    </div>
                    <h3 className="ml-3 text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">
                        {project.title}
                    </h3>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={onClick}
                        className="p-2 text-gray-400 hover:text-red-500"
                    >
                        <TrashIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
            <p className="pt-5 text-base text-gray-500 flex-1">
                <ReadMore text={project.description} projectId={project.id} />
            </p>
            <div className="mt-4 flex items-center gap-4 justify-between text-sm text-gray-500 dark:text-gray-400">
                 <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-500">
                        <ClockIcon className="inline h-4 w-4 text-indigo-500 mr-1" />Till
                    </span>
                    <span className="ml-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
                        {new Date(project.timeline).toLocaleDateString()}
                    </span>
                </div>
                <div className="mt-2">
                    <span className=" rounded-full text-white font-semibold px-2 gap-1 pe-3 py-1 text-sm bg-indigo-700 inline-flex items-center">
                        <StopIcon className='h-4 w-4 rounded-full bg-indigo-300 p-1'/>{project.status}
                    </span>
                </div>
            </div>
            <Link
                to={`/project/${project.id}`}
                className="mt-4 inline-flex items-center w-full justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 dark:bg-gray-900/70 hover:bg-gray-200 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500/50"
                onClick={(e) => {
                if (!project.id) {
                    e.preventDefault();
                    toast.error('Invalid project ID');
                }
                }}
            >
                View Details
                <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
        </div>
    </div>
    );
}