import { CodeBracketIcon, GlobeAltIcon, PlusIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function Notes ({quickNotes, snippetNotes, linkNotes}){
    return (
        <div className="notes p-1">
            <div className="QuickNotes py-5">
                <div className="title-text inline-flex gap-2 items-center pb-3">
                    <SparklesIcon className="w-5 h-5" />
                    <h2 className="text-xl text-pink-500 font-bold">Quick Notes</h2>
                </div>

                {quickNotes.length === 0 ? (
                <div className="text-gray-500 py-4 text-sm">
                    No Quick Notes Sticked!
                    <button className="text-pink-500 inline-flex gap-1 ms-1 items-center hover:bg-gray-200 rounded-lg py-0.5 px-1">
                    <PlusIcon className="w-4 h-4" /> Add one
                    </button>
                </div>
                ) : (
                <div className="py-3">
                    {/* Map quick notes here */}
                    {quickNotes.map(note => (
                    <div key={note.id} className="p-3 border rounded mb-2">
                        {note.title}
                    </div>
                    ))}
                </div>
                )}
            </div>

            {/* Snippets listing */}
            <div className="SnippetNotes py-5">
                <div className="title-text inline-flex gap-2 items-center pb-3">
                <CodeBracketIcon className="w-5 h-5" />
                <h2 className="text-xl text-indigo-500 font-bold">Code Snippets</h2>
                </div>

                {snippetNotes.length === 0 ? (
                <div className="text-gray-500 py-4 text-sm">
                    No Snippet Added!
                    <button className="text-indigo-500 inline-flex gap-1 ms-1 items-center hover:bg-gray-200 rounded-lg py-0.5 px-1">
                    <PlusIcon className="w-4 h-4" /> Add one
                    </button>
                </div>
                ) : (
                <div className="py-3">
                    {/* Map quick notes here */}
                    {snippetNotes.map(note => (
                        <div key={note.id} className="p-3 border rounded mb-2">
                            {note.title}
                        </div>
                    ))}
                </div>
                )}
            </div>

            {/* Links listing */}
            <div className="LinkNotes py-5">
                <div className="title-text inline-flex gap-2 items-center pb-3">
                <GlobeAltIcon className="w-5 h-5" />
                <h2 className="text-xl text-violet-500 font-bold">Links</h2>
                </div>

                {linkNotes.length === 0 ? (
                <div className="text-gray-500 py-4 text-sm">
                    No Snippet Added!
                    <button className="text-violet-500 inline-flex gap-1 ms-1 items-center hover:bg-gray-200 rounded-lg py-0.5 px-1">
                    <PlusIcon className="w-4 h-4" /> Add one
                    </button>
                </div>
                ) : (
                <div className="py-3">
                    {/* Map quick notes here */}
                    {linkNotes.map(note => (
                        <div key={note.id} className="p-3 border rounded mb-2">
                            {note.title}
                        </div>
                    ))}
                </div>
                )}
            </div>

          {/* end of widgets */}
        </div>
    )
}