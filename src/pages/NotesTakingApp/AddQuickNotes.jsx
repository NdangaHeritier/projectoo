import { useState } from "react";
import RichInput from "./RichInput";

export default function AddQuickNoteForm({ onClose }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = () => {
    // Save to Firebase or wherever
    onClose();
  };

  return (
    <div className="space-y-4">
        <RichInput value={title} onChange={setTitle} placeholder="Quick Note Title (optional)" />
        <RichInput value={desc} onChange={setDesc} placeholder="Start writing your note with **bold** or //italic//..." />
        <button onClick={handleSubmit} className="bg-violet-500 text-white px-4 py-2 rounded-md">
            Save
        </button>
    </div>
  );
}
