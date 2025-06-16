import { useRef, useState, useEffect } from "react";

export default function RichInput({ value, onChange, placeholder }) {
  const [text, setText] = useState("");

const formatText = (text) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\/\/(.*?)\/\//g, "<em>$1</em>");
};

  return (
    <div className="">
        <div className="mb-4">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type here with **bold** or //italic//"
                className="w-full p-4 text-black dark:text-white bg-transparent border-none outline-none resize-none"
                rows={4}
            />
        </div>
        Output:
        <div
        className="p-4 rounded-md text-black dark:text-white bg-gray-200 dark:bg-gray-900"
        dangerouslySetInnerHTML={{ __html: formatText(text) }}
        />
    </div>
  );
}
