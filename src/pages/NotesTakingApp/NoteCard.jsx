import { ArrowRightCircleIcon, ArrowUpRightIcon, CodeBracketSquareIcon, EllipsisHorizontalIcon, LinkIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { PinningFunc } from "../PinningFunc";
import { useRichFormatter } from "./useRichFormatter";
import { PinIcon, UnpinIcon } from "../../components/PinIcon";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";

export const NoteCard = ({ note }) => {
    const { formatText } = useRichFormatter();
    const [isView, setIsView] = useState("");
    
    return (
        <div className="ring-2 ring-gray-300 dark:ring-gray-800 overflow-hidden relative bg-white dark:bg-black rounded-xl mb-2">
            <div className="absolute right-2 top-2 inline-flex gap-2 p-1 backdrop-blur-2xl rounded-lg">
                <span className={`${note.type == "Snippet" ? `bg-indigo-600` : note.type == "Quick Notes" ? `bg-pink-600` : `bg-violet-600`} rounded-md text-white inline-flex px-2 py-1 text-sm font-semibold items-center gap-1`}>
                    {note.type == "Snippet" ? <CodeBracketSquareIcon className="w-4 h-4 text-inherit" />: note.type == "Quick Notes"? <SparklesIcon className="w-4 h-4 text-inherit" /> : <LinkIcon className="w-4 h-4 text-inherit" />}
                    {note.type}
                </span>
                <button
                    onClick = {()=> PinningFunc("notes", note, !note.pinned, note.id)}
                    className="rounded-full w-7 h-7 p-1 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-900 cursor-pointer"
                >
                    {note.pinned ? <UnpinIcon className="text-black dark:text-white w-5 h-5" /> : <PinIcon />}
                </button>
            </div>
            <div
                className="p-5 pt-8 bg-white text-gray-700 dark:text-gray-400 dark:bg-black max-h-96 overflow-hidden"
                dangerouslySetInnerHTML={{ __html: formatText(note.content) }}
            />
            <div className="absolute inline-flex items-center justify-end bottom-0 left-0 right-0 rounded-b-lg p-4 bg-gradient-to-b to-70% from-transparent to-white dark:to-black">
                <button
                    onClick={() => {
                        if (isView){
                            setIsView("");
                        }
                        else{
                            setIsView(note.id);
                        }
                    }}
                    className="px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/20 cursor-pointer"
                >
                    <EllipsisHorizontalIcon className="w-8 h-8 text-gray-900 dark:text-gray-200" />
                </button>
                {isView == note.id && (
                    <Link to={`/notes/${note.id}`} className="absolute bottom-7 font-semibold text-sm right-7 inline-flex gap-x-1 items-center justify-center px-3 py-1 rounded-full rounded-br-md bg-gray-200 text-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-gray-300 border border-gray-500/20">
                        View <ArrowRightCircleIcon className="text-gray-700 dark:text-gray-400 w-5 h-5" strokeWidth={2} />
                    </Link>
                )}
            </div>
        </div>
    );
    };