import { useState } from "react";

export default function AddSnippetForm({ onClose }) {
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    const data = { code, title, description };
    console.log("Saving snippet:", data);
    onClose();
  };

  return (
    <div className="space-y-5">
      <textarea
        placeholder="Paste or write your code here..."
        className="w-full h-40 font-mono text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded resize-none focus:outline-none"
        onChange={(e) => setCode(e.target.value)}
      />

      <input
        placeholder="Optional title..."
        className="w-full bg-transparent placeholder-gray-500 dark:placeholder-gray-600 outline-none border-b border-gray-300 dark:border-gray-600 py-2"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Optional description..."
        className="w-full bg-transparent placeholder-gray-500 dark:placeholder-gray-600 outline-none border-b border-gray-300 dark:border-gray-600 py-2"
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">Cancel</button>
        <button onClick={handleSubmit} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Save</button>
      </div>
    </div>
  );
}
