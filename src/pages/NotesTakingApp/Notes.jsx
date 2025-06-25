import { HashtagIcon, PlusIcon} from "@heroicons/react/24/outline";
import { NoteCard } from "./NoteCard";
import { useState } from "react";

export default function Notes ({getQuickNotes, getSnippetNotes, getLinkNotes}){
    const [ quickNotes, setQuickNotes ] = useState(getQuickNotes || []);
    const [ snippetNotes, setSnippetNotes ] = useState(getSnippetNotes || []);
    const [ linkNotes, setLinkNotes ] = useState(getLinkNotes || []);

    // Function to handle waiting of 2 seconds before showing the notes
    const [isWaiting, setIsWaiting] = useState(true);

    setTimeout(() => {
        setIsWaiting(false);
    }, 1000);

    if (isWaiting) {
        return (
            <div className="py-6 w-full grid grid-cols-3 gap-5 skeletons max-sm:grid-cols-1">
                <div className="bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl h-70"></div>
                <div className="bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl h-70"></div>
                <div className="bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl h-70"></div>
            </div>
        );
    }
    return (
        <div className="notes p-1">

            {quickNotes.length > 0 && (
                <div className="QuickNotes py-5">
                <div className="title-text inline-flex gap-2 items-center pb-3">
                    <HashtagIcon strokeWidth={3} className="w-10 h-10 p-3 rounded-full bg-gray-600/20" />
                    <h2 className="text-xl text-pink-500 font-bold">Quick Notes</h2>
                </div>
                <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {/* Map quick notes here */}
                    {quickNotes.map(note => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onDelete={() => setQuickNotes(quickNotes.filter(n => n.id !== note.id))}
                            onUpdate={(id, updatedContent) => {
                               setQuickNotes(quickNotes.map(n => 
                                    n.id === id ? { ...n, content: updatedContent } : n
                                ));
                                // Update the state with updatedNotes
                            }}
                            onPin={(id) => setQuickNotes(quickNotes.map(n => 
                                n.id === id ? { ...n, pinned: !n.pinned } : n
                            ))}
                        />
                    ))}
                </div>
            </div>
            )}

            {/* Snippets listing */}
            
            {snippetNotes.length > 0 && (
                <div className="SnippetNotes py-5">
                <div className="title-text inline-flex gap-2 items-center pb-3">
                <HashtagIcon strokeWidth={3} className="w-10 h-10 p-3 rounded-full bg-gray-600/20" />
                <h2 className="text-xl text-indigo-500 font-bold">Code Snippets</h2>
                </div>

                <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {/* Map quick notes here */}
                    {snippetNotes.map(note => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onDelete={() => setSnippetNotes(snippetNotes.filter(n => n.id !== note.id))}
                            onUpdate={(id, updatedContent) => {
                               setSnippetNotes(snippetNotes.map(n => 
                                    n.id === id ? { ...n, content: updatedContent } : n
                                ));
                                // Update the state with updatedNotes
                            }}
                            onPin={(id) => setSnippetNotes(snippetNotes.map(n => 
                                n.id === id ? { ...n, pinned: !n.pinned } : n
                            ))}
                        />
                    ))}
                </div>
            </div>
            )}

            {/* Links listing */}
            
            {linkNotes.length > 0 &&(
                <div className="LinkNotes py-5">
                <div className="title-text inline-flex gap-2 items-center pb-3">
                <HashtagIcon strokeWidth={3} className="w-10 h-10 p-3 rounded-full bg-gray-600/20" />
                <h2 className="text-xl text-violet-500 font-bold">Links</h2>
                </div>

                <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {/* Map quick notes here */}
                    {linkNotes.map(note => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onDelete={() => setLinkNotes(linkNotes.filter(n => n.id !== note.id))}
                            onUpdate={(id, updatedContent) => {
                               setLinkNotes(linkNotes.map(n => 
                                    n.id === id ? { ...n, content: updatedContent } : n
                                ));
                                // Update the state with updatedNotes
                            }}
                            onPin={(id) => setLinkNotes(linkNotes.map(n => 
                                n.id === id ? { ...n, pinned: !n.pinned } : n
                            ))}
                        />
                    ))}
                </div>
            </div>
            )}

          {/* end of widgets */}
        </div>
    )
}
