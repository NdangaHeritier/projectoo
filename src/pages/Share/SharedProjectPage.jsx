import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import { LoadingSpan } from "../../components/LoadingSpan";
import { ChartPieIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/solid";

export default function SharedProject() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // 🆕 add error state

  useEffect(() => {
    if (!projectId) {
      setError("Invalid project ID in URL.");
      setIsLoading(false);
      return;
    }

    async function fetchProject() {
      setIsLoading(true);
      try {
        const projectRef = doc(db, "projects", projectId);
        const projectSnap = await getDoc(projectRef);

        if (!projectSnap.exists()) {
          setError("Project not found.");
          setIsLoading(false);
          return;
        }

        const fetchedProject = {
          id: projectSnap.id,
          ...projectSnap.data(),
        };

        if (fetchedProject.userId) {
          const userRef = doc(db, "users", fetchedProject.userId);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUser({ id: userSnap.id, ...userSnap.data() });
          }
        }

        // Validate structure
        if (!Array.isArray(fetchedProject.phases)) {
          fetchedProject.phases = [];
        }
        fetchedProject.phases.forEach((phase) => {
          if (!Array.isArray(phase.tasks)) {
            phase.tasks = [];
          }
        });

        setProject(fetchedProject);
      } catch (err) {
        console.error("🔥 Firebase Error:", err);
        setError("Something went wrong while loading the project.");
      }
      setIsLoading(false);
    }

    fetchProject();
  }, [projectId]);

  if (isLoading) {
    return (
      <LoadingSpan text="Preparing your project ..." />
    );
  }
  
  if (error) {
    return (
      <section className="p-10 bg-white dark:bg-gray-900 border border-zinc-300 dark:border-zinc-800 shadow-md rounded-xl max-w-xl mx-auto mt-16">
        <div className="flex flex-col items-center">
          <ClipboardDocumentListIcon className="h-12 w-12 text-red-400 mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex justify-center items-center min-h-screen bg-transparent p-0">
      {/* update meta tags first */}

      <title>{project.title}</title>
      <meta name="description" content={project.description} />

      {/* contents */}
      <div className="p-16 max-sm:px-8 w-full bg-white/50 dark:bg-black/50">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <ClipboardDocumentListIcon className="h-10 w-10 text-indigo-500" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{project.title}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
              <span className="h-4 w-4 border border-white dark:border-black ring-2 ring-indigo-500/50 bg-gradient-to-br from-indigo-400 to-pink-500 rounded-full"></span>
              Planned by {user?.displayName || user?.name || "Anonymous"}
            </p>
          </div>
        </div>
        {/* Description */}
        <div className="mb-6">
          <p className="text-lg text-gray-700 dark:text-gray-200">{project.description || "No description provided."}</p>
        </div>
        {/* Phases */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Phases</h3>
          <div className="space-y-6">
            {project.phases.length > 0 ? (
              project.phases.map((phase, idx) => (
                <div key={phase.id || idx} className="py-5">
                  <div className="flex items-center gap-3 mb-2">
                    <ChartPieIcon className="h-10 w-10 text-indigo-500" />
                    <span className="font-semibold text-xl text-indigo-500">{phase.name}</span>
                  </div>
                  <p className="text-gray-600 py-3 dark:text-gray-300 text-sm mb-2">{phase.description}</p>
                  {phase.tasks.length > 0 && (
                    <ul className="flex flex-col gap-5 mt-2">
                      {phase.tasks.map((task, tIdx) => (
                        <li key={task.id || tIdx} className="flex items-start justify-start gap-2">
                          <span className="rounded-full flex items-center justify-center border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-black w-6 h-6 text-xs font-bold text-indigo-600">{tIdx + 1}</span>
                          <div className="flex-1">
                            <span className={`text-base font-semibold text-gray-800 dark:text-gray-200`}>
                              {task.title}
                            </span>
                            {task.status === "Pending" && (
                              <span className="ml-2 text-xs text-yellow-600 font-semibold">(In Progress)</span>
                            )}
                            {task.status === "Completed" && (
                              <span className="ml-2 text-xs text-green-600 font-semibold">(Done)</span>
                            )}
                            <div className="desc text-base py-3 mt-4 pl-3 border-s-4 border-gray-500/30 text-gray-600 dark:text-gray-400">
                              {task.description || "No description provided."}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  {phase.tasks.length === 0 && (
                    <div className="text-gray-400 italic mt-2">No tasks in this phase yet.</div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-gray-400 italic">No phases added yet.</div>
            )}
          </div>
        </div>
        {/* Footer */}
        <div className="flex items-center gap-2 mt-8">
          <img src="/favicon.svg" className="w-7 h-7" alt="Projectoo logo" />
          <span className="text-gray-500 dark:text-gray-400 text-sm">Shared via Projectoo</span>
        </div>
      </div>
    </section>
  );
}
