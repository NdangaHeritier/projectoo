import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { db } from "../../firebase";
import { ChevronLeftIcon, ShareIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { PinIcon, UnpinIcon } from "../../components/PinIcon";
import { useRichFormatter } from "./useRichFormatter";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { PinningFunc } from "../PinningFunc";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

export default function ViewNote(){
    const {formatText} = useRichFormatter();
    const {noteId} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [note, setNote] = useState(null);
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
    const {currentUser} = useAuth();

    useEffect(() => {
        if (currentUser) {
            setUser({
                id: currentUser.uid,
                displayName: currentUser.displayName,
                email: currentUser.email,
                photoURL: currentUser.photoURL
            });
        } else {
            setUser(null);
        }
    }, [currentUser]);

    useEffect(() => {
        if(!noteId){
            setError("Invalid Note Id, Ask owner to double check the link.");
            setIsLoading(false);
            return;
        }
        async function fetchNote (){
            setIsLoading(true);
            try{
                const ref = doc(db, "notes", noteId);
                const snap = await getDoc(ref);
                if (!snap.exists()) {
                    setError("Note not found.");
                    setIsLoading(false);
                    return;
                }
                const data = snap.data();
                setNote({id: snap.id, ...data});
                console.log("notes:", snap);
            } catch (error){
                setError(error.message);
                console.error("error:", error.message);
            }
            finally{
                setIsLoading(false);
            }
        }

        fetchNote();
    }, []);

    if(!note && !isLoading && !error){
        return (
            <section className="p-10 bg-white dark:bg-gray-900 border border-zinc-300 dark:border-zinc-800 shadow-md rounded-xl max-w-xl mx-auto mt-16">
                <div className="flex flex-col items-center">
                    <ClipboardDocumentListIcon className="h-12 w-12 text-gray-400 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">Note Not Found</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-center">The note you are trying to view does not exist or has been deleted.</p>
                </div>
            </section>
        )
    }

    // If loading, show a loading spinner

    if(isLoading){
        return(
            <section className="p-10 flex items-center justify-center gap-5 bg-white dark:bg-gray-900 border border-zinc-300 dark:border-zinc-800 shadow-md rounded-xl max-w-xl mx-auto mt-16">
                <div className="flex flex-col items-center h-20 w-20 animate-spin p-5 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500">
                    <div className="w-full h-full rounded-2xl animate-ping bg-white dark:bg-gray-900"></div>
                </div>
                <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text">Loading Notes..</h2>
            </section>
        )
    }

    if (error){
        return(
        <section className="p-10 bg-white dark:bg-gray-900 border border-zinc-300 dark:border-zinc-800 shadow-md rounded-xl max-w-xl mx-auto mt-16">
            <div className="flex flex-col items-center">
                <ClipboardDocumentListIcon className="h-12 w-12 text-red-400 mb-4" />
                <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
                <p className="text-gray-500 dark:text-gray-400 text-center">{error}</p>
            </div>
            
        </section>
        )
    }
    return(
        <section className="viewNotes">
            <div className="view-head p-5 flex items-center justify-between">
                <Link to={`/`} className="rounded-md inline-flex items-center justify-center gap-1 px-3 py-1 font-semibold text-indigo-600 dark:text-indigo-500 hover:underline hover:bg-gray-500/10">
                    <ChevronLeftIcon className="w-4 h-4 text-inherit" />
                    <span className="text-inherit">Back</span>
                </Link>

                {user ? (
                    <div className="auth inline-flex items-center gap-2 justify-center">
                        {/* actions buttons to pin or unpin note, open share model to copy and share link */}
                        <button
                            onClick = {()=> PinningFunc("notes", note, !note.pinned, note.id)}
                            className="rounded-full w-9 flex items-center justify-center h-9 p-2 bg-transparent hover:bg-gray-900 cursor-pointer"
                        >
                            {note.pinned ? <UnpinIcon className="w-5 h-5 text-indigo-500" /> : <PinIcon />}
                        </button>

                        <button
                            onClick = {()=> {
                                navigator.clipboard.writeText(`${window.location.origin}/notes/${note.id}`);
                                toast.success("Note link copied to clipboard!");
                            }}
                            className="rounded-full w-9 flex items-center justify-center h-9 p-2 bg-transparent hover:bg-gray-900 cursor-pointer"
                        >
                            <ShareIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />  
                        </button>
                    </div>
                ) : (
                    <div className="auth">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                            <span className="font-semibold text-gray-700 dark:text-gray-300">{note.author?.displayName || note.author?.name || "Anonymous"}</span>
                            <span className="text-gray-500 dark:text-gray-400"> created this note.</span>
                        </span>
                    </div>
                )}
            </div>
            <div className="notes-desc grid grid-rows-1 min-h-svh p-5">
                <div className="ring rounded-md p-5 sm:p-8 ring-gray-300 dark:ring-gray-800 shadow-2xl overflow-hidden relative bg-black">
                    <div className="absolute right-2 top-2 inline-flex gap-2 p-1">
                        <span className="rounded-md bg-pink-500 text-white inline-flex px-2 py-1 text-sm font-semibold items-center gap-1">
                            <SparklesIcon className="w-4 h-4 text-inherit"/>
                            {note.type}
                        </span>                        
                    </div>
                    <div
                        className="p-5 bg-white text-gray-700 dark:text-gray-400 dark:bg-black w-full overflow-hidden"
                        dangerouslySetInnerHTML={{ __html: formatText(note.content) }}
                    />
                </div>
            </div>
        </section>
    )
}