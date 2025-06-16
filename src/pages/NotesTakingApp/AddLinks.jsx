import { useState } from "react";

export default function AddLinkForm({ onClose }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!url.startsWith("http")) {
      alert("Please enter a valid URL.");
      return;
    }
    const data = { url, title, description };
    console.log("Saving link:", data);
    onClose();
  };

  return (
    <div className="space-y-5">
      <input
        placeholder="Paste your link here..."
        className="w-full text-blue-500 bg-transparent placeholder-gray-500 dark:placeholder-gray-600 outline-none border-b border-gray-300 dark:border-gray-600 py-2"
        onChange={(e) => setUrl(e.target.value)}
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
