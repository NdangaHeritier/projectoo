import { CodeBracketIcon, GlobeAltIcon, PlusIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Notes from "./Notes";
import AddQuickNoteForm from "./AddQuickNotes";
import ModalLayout from "../../components/ModalLayout";
import AddLinkForm from "./AddLinks";
import AddSnippetForm from "./AddSnippets";

export default function NotesBoard() {
  const [isAddingNotes, setIsAddingNotes] = useState(false);
  const [notes, setNotes] = useState([]);
  const [quickNotes, setQuickNotes] = useState([]);
  const [linkNotes, setLinkNotes] = useState([]);
  const [snippetNotes, setSnippetNotes] = useState([]);
  const [modalType, setModalType] = useState('');
  const closeModal = () => setModalType('');

  const fetchNotes = async () => {
    const snap = await getDocs(collection(db, "notes"));
    const allNotes = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return allNotes;
  };

  useEffect(() => {
    fetchNotes().then((notes) => {
      setNotes(notes);
      setQuickNotes(notes.filter(n => n.type === "Quick Notes"));
      setLinkNotes(notes.filter(n => n.type === "Link"));
      setSnippetNotes(notes.filter(n => n.type === "Snippet"));
    });
  }, []);

  return (
    <section className="NotesBoard py-5 sm:px-5">
      <div className="buttons p-3 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-2xl font-bold">
          Notes
          <div className="bg-gradient-to-r from-indigo-500 to-pink-500 text-xs p-0.5 bg-gray-100 rounded-md">
            <div className="bg-gray-100 rounded-sm px-2 py-1">
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
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-10">
              <button onClick={() => { setModalType("quick"); setIsAddingNotes(false); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Quick Note
              </button>
              <button onClick={() => { setModalType("snippet"); setIsAddingNotes(false); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Snippet
              </button>
              <button onClick={() => { setModalType("link"); setIsAddingNotes(false); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Link
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Adding Notes modals! */}
      {modalType === "quick" && (
        <ModalLayout title="Add Quick Note" onClose={closeModal}>
          <AddQuickNoteForm onClose={closeModal} />
        </ModalLayout>
      )}

      {modalType === "snippet" && (
        <ModalLayout title="Add Snippet" onClose={closeModal}>
          <AddSnippetForm onClose={closeModal} />
        </ModalLayout>
      )}

      {modalType === "link" && (
        <ModalLayout title="Add Link" onClose={closeModal}>
          <AddLinkForm onClose={closeModal} />
        </ModalLayout>
      )}
      <div className="taken-notes">
        {notes.length <=0 && (
          <div className="text-gray-500 text-sm py-5">No Notes Sticked Yet! Add one first.</div>
        )}

        {notes.length > 0 && (
          <Notes quickNotes={quickNotes} snippetNotes={snippetNotes} linkNotes={linkNotes} />
        )}
      </div>
    </section>
  );
}
