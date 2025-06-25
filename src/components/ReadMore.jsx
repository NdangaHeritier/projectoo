import { useState } from "react";
import { Link } from "react-router-dom";

// ReadMore component for project description
export default function ReadMore({ text, maxLength = 230, projectId }) {
    const [expanded, setExpanded] = useState(false);
    if (text.length <= maxLength) {
        return <span>{text}</span>;
    }
    return (
        <span>
        {expanded ? text : text.slice(0, maxLength) + '... '}
        {!expanded && (
        <button
            className="text-indigo-600 hover:underline text-xs font-semibold"
            onClick={() => setExpanded(true)}
            type="button"
        >
            Read more
        </button>
        )}
        {expanded && (
        <button
            className="text-indigo-600 hover:underline text-xs font-semibold"
            onClick={() => setExpanded(false)}
            type="button"
        >
            Show less
        </button>
        )}
        {projectId && (
        <Link
            to={`/project/${projectId}`}
            className="text-indigo-600 hover:underline text-xs font-semibold ml-2"
        >
            View Project
        </Link>
        )}
        </span>
    );
}