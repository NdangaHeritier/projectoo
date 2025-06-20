import { ArrowPathIcon, PlayCircleIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useRichFormatter } from "./useRichFormatter";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

export default function AddQuickNoteForm({ onClose, label='Quick Notes' }) {
  
  const { currentUser } = useAuth();
  const [text, setText] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [loadSaving, setLoadSaving] = useState(false);
    
  const { formatText } = useRichFormatter();
  const RealHtml = formatText(text);


  // save added notes to firebase..
  const saveNotes = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error("You must be logged in to save a note.");
      return;
    }
    setLoadSaving(true);
    try{
      const addNotes= await addDoc(collection(db, "notes"), {
        content: text,
        userId: currentUser.uid,
        type: label,
        createdAt: new Date(), // optional: timestamp
      });

      if(addNotes){
        toast.success(`${label} Saved successfully!`);
        setLoadSaving(false);
        setText(""); // if using useState
        onClose?.(); // if you pass an onClose handler via props
      }
      else{
        toast.error(`Unable to add ${label} Now, try again later.`);
      }
    } catch (error) {
      toast.error(`Sorry, it's our fault, try saving your ${label} again.`);
      console.error("Error saving note:", error);
    } finally {
      setLoadSaving(false);
    }
  }
  
  return (
    <section className="p-4">
      <div className="header bg-gray-900 rounded-t-md flex w-full items-center justify-between">
        <div className="tabs-switcher inline-grid grid-cols-2 gap-2">
          <button
            className={`${showOutput ? `border-transparent`: `border-gray-300 dark:border-gray-700 text-indigo-500`} px-2 py-1 font-semibold border-2 border-b-0  bg-transparent inline-flex items-center justify-center gap-1 text-sm rounded-t-md`}
            onClick={() => setShowOutput(false)}
          >
            <PencilSquareIcon className="w-4 h-4 text-inherit"/>
            <span className="">
              Edit Notes
            </span>
          </button>
          <button
            className={` ${showOutput ? `border-gray-300 dark:border-gray-700 text-pink-500`: `border-transparent`} font-semibold px-2 py-1 bg-transparent border-2 border-b-0  inline-flex items-center justify-center gap-1 text-sm rounded-t-md`}
            onClick={() => setShowOutput(true)}
          >
            <PlayCircleIcon className="h-5 w-5 text-inherit" />
            <span className="">
              Show Notes
            </span>
          </button>
        </div>

        <div className="flex items-center justify-end max-sm:hidden p-1">
          <div className={`inline-flex gap-1 items-center ${label=='Quick Notes'? `text-blue-500 border-blue-300 dark:border-blue-800 bg-blue-600/10`: `text-yellow-500 border-yellow-400 bg-yellow-600/10`} px-2 py-1 rounded-sm capitalize text-xs border`}>
            <SparklesIcon className="w-4 h-4 text-inherit" />
            {label}
          </div>
        </div>
      </div>

      {/* Notes tabs contents */}

      <div className="tabs-content min-h-96 bg-white dark:bg-black text-gray-800 dark:text-gray-200 p-2 border-2 rounded-md rounded-tl-none border-gray-300 dark:border-gray-700">
        {showOutput ? (
          <div className="relative">            
            {text ? (
              <div className="rounded-md min-h-full text-gray-800 dark:text-gray-300">
                
                <div
                className="p-2"
                  dangerouslySetInnerHTML={{ __html: RealHtml }}
                />
              </div>
            ):
            (<p className="text-gray-500 p-4 text-sm">No Notes added to display!</p>)}
          </div>
        ):
        (
          <form className="" onSubmit={(event) => saveNotes(event)}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your note: **bold**, //italic//, [title](https://url), `inline code`, ```snippet```, - list, # heading"
              className="w-full h-full p-4 text-black dark:text-white bg-transparent border-none outline-none resize-none"
              rows={12}
            />
            <div className="buttons w-full flex items-center gap-x-2 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-100 rounded-sm px-4 text-sm py-2 font-semibold text-gray-700 dark:text-gray-300 dark:bg-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loadSaving}
                className={`disabled:cursor-not-allowed disabled:opacity-50 text-center bg-gray-900 rounded-sm px-4 text-sm py-2 font-semibold text-gray-200 dark:text-pink-500 dark:bg-pink-950/20 border border-pink-400`}
              >
                {loadSaving ? (
                  <svg
                    className="w-5 h-5 animate-spin"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="25"
                      cy="25"
                      r="20"
                      stroke="currentColor"
                      strokeWidth="5"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M25 5
                        a 20 20 0 0 1 0 40
                        a 20 20 0 0 1 0 -40
                        M25 5
                        a 20 20 0 0 0 0 40
                        "
                    />
                  </svg>

                ) : `Save`}
              </button>
            </div>
          </form>          
        )}
      </div>
    </section>
  );
}
