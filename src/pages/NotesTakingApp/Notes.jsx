import { HashtagIcon, PlusIcon, SparklesIcon , EllipsisHorizontalIcon} from "@heroicons/react/24/outline";
import { useRichFormatter } from "./useRichFormatter";
import { PinIcon, UnpinIcon } from "../../components/PinIcon";
import { Link } from "react-router-dom";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { PinningFunc } from "../PinningFunc";
import { NoteCard } from "./NoteCard";

export default function Notes ({quickNotes, snippetNotes, linkNotes}){

    const { formatText } = useRichFormatter();
    return (
        <div className="notes p-1">

            {quickNotes && (
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
                <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {/* Map quick notes here */}
                    {quickNotes.map(note => (
                        <NoteCard key={note.id} note={note} />
                    ))}
                </div>
                )}
            </div>
            )}

            {/* Snippets listing */}
            
            {snippetNotes && (
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
                <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {/* Map quick notes here */}
                    {snippetNotes.map(note => (
                        <NoteCard key={note.id} note={note} />
                    ))}
                </div>
                )}
            </div>
            )}

            {/* Links listing */}
            
            {linkNotes &&(
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
                <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {/* Map quick notes here */}
                    {linkNotes.map(note => (
                        <NoteCard key={note.id} note={note} />
                    ))}
                </div>
                )}
            </div>
            )}

          {/* end of widgets */}
        </div>
    )
}
