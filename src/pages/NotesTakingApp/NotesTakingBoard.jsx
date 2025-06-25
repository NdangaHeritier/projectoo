import { CodeBracketIcon, GlobeAltIcon, LinkIcon, PlusIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Notes from "./Notes";
import AddQuickNoteForm from "./AddQuickNotes";
import ModalLayout from "../../components/ModalLayout";
import { useAuth } from "../../contexts/AuthContext";
import { CodeBracketSquareIcon } from "@heroicons/react/24/solid";
import { LoadingSpan } from "../../components/LoadingSpan";
import toast from "react-hot-toast";

export default function NotesBoard() {
  const [isAddingNotes, setIsAddingNotes] = useState(false);
  const [notes, setNotes] = useState([]);
  const [quickNotes, setQuickNotes] = useState([]);
  const [linkNotes, setLinkNotes] = useState([]);
  const [snippetNotes, setSnippetNotes] = useState([]);
  const [modalType, setModalType] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [typeToShow, setTypeToShow] = useState("All");

  // Function to close the modal
  const closeModal = () => setModalType('');

  // current user
  const { currentUser } = useAuth();

  useEffect(() => {
    setIsLoading(true);

    if (!currentUser) {
      setError("You must be logged in to view this page.");
      toast.error("You must be logged in to view this page.");
      setIsLoading(false);
      return;
    }

    const fetchNotes = async () => {
      try {
        const snap = await getDocs(
          query(collection(db, "notes"), where("userId", "==", currentUser.uid))
        );

        const allNotes = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setNotes(allNotes);
        setQuickNotes(allNotes.filter(note => note.type === "Quick Notes"));
        setSnippetNotes(allNotes.filter(note => note.type === "Snippet"));
        setLinkNotes(allNotes.filter(note => note.type === "Link"));
      } catch (error) {
        setError("Failed to fetch notes. Please try again later.");
        console.error("Error fetching notes:", error);
        toast.error("Failed to fetch notes. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

  fetchNotes();
}, [currentUser?.uid]);


  if (isLoading) {
    return <LoadingSpan text="Preparing your Notes .."/>
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500 text-lg font-semibold">
          {error}
        </div>
      </div>
    );
  }

  return (
    <section className="NotesBoard sm:px-5 w-full">
      <div className="buttons pb-3 flex items-center justify-between gap-3 w-full">
        <div className="inline-flex items-center gap-2 text-2xl font-bold">
          Notes
          <div className="bg-gradient-to-r from-indigo-500 to-pink-500 text-xs p-0.5 bg-gray-100 rounded-md">
            <div className="bg-gray-100 dark:bg-black rounded-sm px-2 py-1">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">NEW</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsAddingNotes(!isAddingNotes)}
            className="bg-violet-500 px-4 py-2 rounded-lg cursor-pointer text-white inline-flex items-center gap-1"
          >
            <SparklesIcon className="w-4 h-4" />
            Add Notes
          </button>

          {isAddingNotes && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-black border border-gray-300 dark:border-gray-800 overflow-hidden p-1 rounded-md shadow z-10">
              <button onClick={() => { setModalType("quick"); setIsAddingNotes(false); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer rounded-sm">
                Quick Note
              </button>
              <button onClick={() => { setModalType("snippet"); setIsAddingNotes(false); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer rounded-sm">
                Snippet
              </button>
              <button onClick={() => { setModalType("link"); setIsAddingNotes(false); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer rounded-sm">
                Link
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Adding Notes modals! */}
      {modalType === "quick" && (
        <ModalLayout title="Add Quick Note" onClose={closeModal}>
          <AddQuickNoteForm onClose={closeModal} label="Quick Notes" />
        </ModalLayout>
      )}

      {modalType === "snippet" && (
        <ModalLayout title="Add Snippet" onClose={closeModal}>
          <AddQuickNoteForm onClose={closeModal} label="Snippet" />
        </ModalLayout>
      )}

      {modalType === "link" && (
        <ModalLayout title="Add Link" onClose={closeModal}>
          <AddQuickNoteForm onClose={closeModal} label="Link" />
        </ModalLayout>
      )}
      <div className="taken-notes">
        {notes.length <=0 && (
          <div className="text-gray-500 text-sm py-5">No Notes Sticked Yet! Add one first.</div>
        )}

        {notes.length > 0 && (
          <div className="grid grid-cols-1 gap-3">
            <div className="filter flex items-center justify-end overflow-x-auto max-sm:w-auto">
              <div className="fillter-btn flex items-center justify-center sm:grid grid-cols-4 gap-1">
                <button
                  className={`${typeToShow == "All" ? `text-gray-800 dark:text-gray-100 bg-gray-300 dark:bg-gray-800` : `text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-900` } font-semibold text-sm flex items-center justify-center gap-2 rounded-md px-3 py-1`}
                  onClick={() => setTypeToShow("All")}
                >
                  <span className="title">All</span>
                </button>

                <button
                  className={`${typeToShow == "Quick Notes" ? `text-gray-800 dark:text-gray-100 bg-gray-300 dark:bg-gray-800` : `text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-900` } font-semibold text-sm flex items-center justify-center gap-2 rounded-md px-3 py-1`}
                  onClick={() => setTypeToShow("Quick Notes")}
                >
                  <span className="title">Quick Notes</span>
                </button>
                <button
                  className={`${typeToShow == "Snippet" ? `text-gray-800 dark:text-gray-100 bg-gray-300 dark:bg-gray-800` : `text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-900` } font-semibold text-sm flex items-center justify-center gap-2 rounded-md px-3 py-1`}
                  onClick={() => setTypeToShow("Snippet")}
                >
                  <span className="title">Codes</span>
                </button>
                <button
                  className={`${typeToShow == "Link" ? `text-gray-800 dark:text-gray-100 bg-gray-300 dark:bg-gray-800` : `text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-900` } font-semibold text-sm flex items-center justify-center gap-2 rounded-md px-3 py-1`}
                  onClick={() => setTypeToShow("Link")}
                >
                  <span className="title">Links</span>
                </button>
              </div>
            </div>
            {typeToShow === "All" && <Notes getQuickNotes={quickNotes} getSnippetNotes={snippetNotes} getLinkNotes={linkNotes} /> }
            {typeToShow === "Quick Notes" && <Notes getQuickNotes={quickNotes} /> }
            {typeToShow === "Snippet" && <Notes getSnippetNotes={snippetNotes} /> }
            {typeToShow === "Link" && <Notes getLinkNotes={linkNotes} /> }
          </div>
        )}
      </div>
    </section>
  );
}
