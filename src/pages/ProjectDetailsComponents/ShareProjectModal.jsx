import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

export default function ShareProjectModal ({project_id})
{
    return(
        <div className="p-4 sm:p-6 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black rounded-lg">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
            Share this project with your friends by copying the link below:
            </p>
            <div className="flex items-center space-x-2 p-2 ring ring-indigo-500/30 rounded-full bg-indigo-500/10">
            <input
                type="text"
                readOnly
                value={`${window.location.origin}/shared/projects/4Xt5oHur73b4dnxc6f4G4J7/share/${project_id}`}
                className="flex-1 border-0 outline-0 rounded-l-full px-3 py-2 bg-transparent text-gray-900 dark:text-zinc-200"
            />
            <button
                onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/shared/projects/4Xt5oHur73b4dnxc6f4G4J7/share/${project_id}`);
                toast.success('Link copied to clipboard!');
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-full cursor-pointer hover:bg-indigo-700 transition-colors"
            >
                <ClipboardDocumentIcon className="h-5 w-5 inline-block mr-1" />
                Copy Link
            </button>
            </div>
        </div>
    )
}