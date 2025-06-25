import { ArrowRightCircleIcon, CodeBracketSquareIcon, EllipsisHorizontalIcon, LinkIcon, PencilIcon, SparklesIcon, TrashIcon } from "@heroicons/react/24/solid";
import { PinningFunc } from "../PinningFunc";
import { useRichFormatter } from "./useRichFormatter";
import { PinIcon, UnpinIcon } from "../../components/PinIcon";
import { Link } from "react-router-dom";
import { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import toast from "react-hot-toast";
import { LoadingSmall } from "../../components/LoadingSmall";
import InlineEdit from "../../components/InlineEdit";

export const NoteCard = ({ note, onUpdate, onDelete, onPin }) => {
    const { formatText } = useRichFormatter();
    const [isView, setIsView] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    // Function to delete the note
    const deleteNote = async (noteId) => {
        if (isDeleting) return; // Prevent multiple deletions
        setIsDeleting(true);
        try {
            await deleteDoc(doc(db, "notes", noteId));
            toast.success("Note deleted successfully.");
            onDelete(noteId); // Call the parent component's delete handler
        } catch (error) {
            console.error("Error deleting note:", error);
            toast.error("Failed to delete note. Please try again later.");
        }
        finally {
            setIsDeleting(false);
        }
    };

    // Function to Handle Updating the note
    const updateNote = async (noteId, updatedContent) => {
        if (isUpdating) return; // Prevent multiple updates
        setIsUpdating(true);
        try {
            await updateDoc(doc(db, "notes", noteId), {
                content: updatedContent,
                updatedAt: new Date().toISOString(),
            });
            setIsUpdating(false);
            toast.success("Note updated successfully.");
            setIsEditing(false); // Close the edit mode
            onUpdate(noteId, updatedContent); // Call the parent component's update handler
        } catch (error) {
            console.error("Error updating note:", error);
            toast.error("Failed to update note. Please try again later.");
        }
        finally {
            setIsUpdating(false);
        }
    }
    
    return (
        <div className="ring-2 ring-gray-300 dark:ring-gray-800 overflow-hidden relative bg-white dark:bg-black rounded-xl mb-2">
            <div className="inline-flex justify-end gap-2 p-2 w-full backdrop-blur-2xl rounded-lg">
                {/* Edit Button */}
                <button
                    onClick = {()=> setIsEditing(!isEditing)}
                    className={`${isEditing ? `bg-indigo-600 text-white` : `bg-transparent hover:bg-gray-200 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400`} rounded-full w-8 h-8 p-2 inline-flex justify-center items-center cursor-pointer`}
                >
                    {isUpdating ? <LoadingSmall className="w-5 h-5" /> : <PencilIcon className="w-5 h-5" />}
                </button>

                {/* Pin Button */}
                <button
                    onClick = {()=> {
                        PinningFunc("notes", note, !note.pinned, note.id);
                        onPin(note.id); // Call the parent component's pin handler
                    }}
                    className="rounded-full w-8 h-8 p-1.5 inline-flex justify-center items-center bg-transparent hover:bg-gray-200 dark:hover:bg-gray-900 cursor-pointer"
                >
                    {note.pinned ? <UnpinIcon className="text-indigo-500" /> : <PinIcon />}
                </button>
                
                {/* Delete button */}
                <button
                    onClick = {()=> deleteNote(note.id)}
                    className="rounded-full w-8 h-8 p-2 inline-flex justify-center items-center bg-transparent hover:bg-gray-200 dark:hover:bg-gray-900 cursor-pointer"
                >
                    {isDeleting ? <LoadingSmall className="w-5 h-5" /> : <TrashIcon className="w-5 h-5 text-red-600" />}
                </button>

                <span className={`${note.type == "Quick Notes" ? `bg-pink-400/20 rounded-md text-pink-600 dark:text-pink-400` : note.type == "Snippet" ? `bg-indigo-400/20 rounded-md text-indigo-600 dark:text-indigo-400` : `bg-violet-400/20 rounded-md text-violet-600 dark:text-violet-400`} inline-flex px-2 py-1 text-sm font-semibold items-center gap-1`}>
                    {note.type == "Snippet" ? <CodeBracketSquareIcon className="w-4 h-4 text-inherit" />: note.type == "Quick Notes"? <SparklesIcon className="w-4 h-4 text-inherit" /> : <LinkIcon className="w-4 h-4 text-inherit" />}
                    {note.type}
                </span>
            </div>
            { isEditing ? (
                <div className="p-5 py-10 bg-indigo-500/20 h-full">
                    <InlineEdit
                        value={note.content}
                        onSave={(updatedContent) => updateNote(note.id, updatedContent)}
                        showCancelButton={false}
                        type="textarea"
                        placeholder="Edit your note here..."
                        editing={true}
                        inputClassName="p-5 bg-white text-gray-700 dark:text-gray-400 dark:bg-black rounded-lg w-full min-h-58 overflow-y-auto"
                    />
                </div>

            ) : ( 
                <div
                    className="p-5 py-0 bg-white text-gray-700 dark:text-gray-400 dark:bg-black max-h-80 overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: formatText(note.content) }}
                />
            )}
            <div className="absolute inline-flex items-center justify-end bottom-0 left-0 right-0 rounded-b-lg p-3 bg-gradient-to-b to-70% from-transparent to-white dark:to-black">
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