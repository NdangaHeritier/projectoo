import { CodeBracketIcon, GlobeAltIcon, HashtagIcon, PlusIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useRichFormatter } from "./useRichFormatter";

export default function Notes ({quickNotes, snippetNotes, linkNotes}){

    const { formatText } = useRichFormatter();
    return (
        <div className="notes p-1">
            <div className="QuickNotes py-5">
                <div className="title-text inline-flex gap-2 items-center pb-3">
                    <HashtagIcon strokeWidth={3} className="w-10 h-10 p-3 rounded-full bg-gray-600/20" />
                    <h2 className="text-xl text-pink-500 font-bold">Quick Notes</h2>
                </div>

                {quickNotes.length === 0 ? (
                <div className="text-gray-500 py-4 text-sm">
                    No Quick Notes Sticked!
                    <button className="text-pink-500 inline-flex gap-1 ms-1 items-center hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer rounded-lg py-0.5 px-1">
                    <PlusIcon className="w-4 h-4" /> Add one
                    </button>
                </div>
                ) : (
                <div className="py-3 grid grid-cols-3 gap-3">
                    {/* Map quick notes here */}
                    {quickNotes.map(note => (
                        <div key={note.id} className="ring-2 ring-gray-300 dark:ring-gray-800 overflow-hidden relative bg-black rounded-xl mb-2">
                            <span className="absolute right-2 top-2 rounded-md bg-pink-500 text-white inline-flex px-2 py-1 text-sm font-semibold items-center gap-1">
                                <SparklesIcon className="w-4 h-4 text-inherit"/>
                                {note.type}
                            </span>
                            <div
                                className="p-5 bg-white text-gray-700 dark:text-gray-400 dark:bg-black"
                                dangerouslySetInnerHTML={{ __html: formatText(note.content) }}
                            />
                        </div>
                    ))}
                </div>
                )}
            </div>

            {/* Snippets listing */}
            <div className="SnippetNotes py-5">
                <div className="title-text inline-flex gap-2 items-center pb-3">
                <HashtagIcon strokeWidth={3} className="w-10 h-10 p-3 rounded-full bg-gray-600/20" />
                <h2 className="text-xl text-indigo-500 font-bold">Code Snippets</h2>
                </div>

                {snippetNotes.length === 0 ? (
                <div className="text-gray-500 py-4 text-sm">
                    No Snippet Added!
                    <button className="text-indigo-500 inline-flex gap-1 ms-1 items-center hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer rounded-lg py-0.5 px-1">
                    <PlusIcon className="w-4 h-4" /> Add one
                    </button>
                </div>
                ) : (
                <div className="py-3 grid grid-cols-3 gap-3">
                    {/* Map quick notes here */}
                    {snippetNotes.map(note => (
                        <div key={note.id} className="ring-2 ring-gray-300 dark:ring-gray-800 overflow-hidden relative bg-black rounded-xl mb-2">
                            <span className="absolute right-2 top-2 rounded-md text-white bg-yellow-600 inline-flex px-2 py-1 text-sm font-semibold items-center gap-1">
                                <SparklesIcon className="w-4 h-4 text-inherit"/>
                                {note.type}
                            </span>
                            <div
                                className="p-5 bg-white text-gray-700 dark:text-gray-400 dark:bg-black"
                                dangerouslySetInnerHTML={{ __html: formatText(note.content) }}
                            />
                        </div>
                    ))}
                </div>
                )}
            </div>

            {/* Links listing */}
            <div className="LinkNotes py-5">
                <div className="title-text inline-flex gap-2 items-center pb-3">
                <HashtagIcon strokeWidth={3} className="w-10 h-10 p-3 rounded-full bg-gray-600/20" />
                <h2 className="text-xl text-violet-500 font-bold">Links</h2>
                </div>

                {linkNotes.length === 0 ? (
                <div className="text-gray-500 py-4 text-sm">
                    No Link Added!
                    <button className="text-violet-500 inline-flex gap-1 ms-1 items-center hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer rounded-lg py-0.5 px-1">
                    <PlusIcon className="w-4 h-4" /> Add one
                    </button>
                </div>
                ) : (
                <div className="py-3 grid grid-cols-3 gap-3">
                    {/* Map quick notes here */}
                    {linkNotes.map(note => (
                        <div key={note.id} className="ring-2 ring-gray-300 dark:ring-gray-800 overflow-hidden relative bg-black rounded-xl mb-2">
                            <span className="absolute right-2 top-2 rounded-md text-white bg-indigo-600 inline-flex px-2 py-1 text-sm font-semibold items-center gap-1">
                                <SparklesIcon className="w-4 h-4 text-inherit"/>
                                {note.type}
                            </span>
                            <div
                                className="p-5 bg-white text-gray-700 dark:text-gray-400 dark:bg-black"
                                dangerouslySetInnerHTML={{ __html: formatText(note.content) }}
                            />
                        </div>
                    ))}
                </div>
                )}
            </div>

          {/* end of widgets */}
        </div>
    )
}