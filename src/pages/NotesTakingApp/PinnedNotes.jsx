import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRichFormatter } from "./useRichFormatter"; 
import { PinningFunc } from "../PinningFunc";
import { HashtagIcon, PlusIcon } from "@heroicons/react/24/outline";
import { CodeBracketSquareIcon, SparklesIcon, LinkIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { PinIcon, UnpinIcon } from "../../components/PinIcon";
import { NoteCard } from "./NoteCard";

export default function PinnedNotes({ pinnedNotes }) {
    const { formatText } = useRichFormatter();
    const [isView, setIsView] = useState("");

    return (
        <div className="PinnedNotes py-5">
            <div className="title-text inline-flex gap-2 items-center pb-3">
                <HashtagIcon strokeWidth={3} className="w-10 h-10 p-3 rounded-full bg-gray-600/20" />
                <h2 className="text-xl text-violet-500 font-bold">Pinned Notes</h2>
            </div>
            {pinnedNotes.length === 0 ? (
                <div className="text-gray-500 py-4 text-sm">
                    No Pinned Notes!
                    <button className="text-violet-500 inline-flex gap-1 ms-1 items-center hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer rounded-lg py-0.5 px-1">
                        <PlusIcon className="w-4 h-4" /> Add one
                    </button>
                </div>
            ) : (
                <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {pinnedNotes.map(note => (
                        <NoteCard key={note.id} note={note} />  
                    ))}
                </div>
            )}  
        </div>
    );
}