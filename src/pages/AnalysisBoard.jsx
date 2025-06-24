import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";

export default function AnalysisBoard() {

    // Fetch Analysis data from the firebase.
    const { currentUser } = useAuth();
    const [projectsCount, setProjectsCount] = useState(0);
    const [notesCount, setNotesCount] = useState(0);
    // const [blogsCount, setBlogsCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // 🆕 add error stat
    useEffect(() => {
        async function fetchAnalysisData() {
            setIsLoading(true);
            if (!currentUser) {
                setError("You must be logged in to view this page.");
                toast.error("You must be logged in to view this page.");

                setIsLoading(false);
                return;
            }
            try {
                // Fetch all projects count
                const projectRef = collection(db, "projects");
                const querySnap= query(projectRef, where("userId", "==", currentUser.uid));
                const projectSnap = await getDocs(querySnap);
                setProjectsCount(projectSnap.size);
                // Fetch all notes count
                const notesRef = collection(db, "notes");
                const noteQuerySnap= query(notesRef, where("userId", "==", currentUser.uid));
                const notesSnap = await getDocs(noteQuerySnap);
                setNotesCount(notesSnap.size);
                // Fetch all blogs count
                // const blogsRef = collection(db, "blogs");
                // const blogsSnap = await getDocs(blogsRef);
                // setBlogsCount(blogsSnap.size);
            } catch (error) {
                // Handle any errors that occur during the fetch
                setProjectsCount(0);
                setNotesCount(0);
                // setBlogsCount(0);
                setError("Failed to fetch analysis data. Please try again later.");
                // Log the error for debugging purposes
                console.error("Error fetching analysis data:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchAnalysisData();
    }, []);
    return (
        <div className="flex flex-col items-center justify-center bg-transparent">
            {isLoading ? (
                <div className="animate-pulse h-30 w-full flex rounded-lg analysis-skeleton bg-gray-200 dark:bg-gray-800 p-6" />
            ) : error ? (
                <section className="p-10 bg-white dark:bg-gray-900 border border-zinc-300 dark:border-zinc-800 shadow-md rounded-xl max-w-xl mx-auto mt-16">
                    <div className="flex flex-col items-center">
                        <ClipboardDocumentListIcon className="h-12 w-12 text-red-400 mb-4" />
                        <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-center">{error}</p>
                    </div>
                    
                </section>
            ) : (
                <div className="grid text-gray-700 dark:text-gray-300 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5 pl-0 sm:pl-8 sm:p-8 w-full bg-gradient-to-l sm:bg-gradient-to-b to-50% from-50% from-indigo-500 to-transparent  rounded-3xl">
                    <div className="bg-white dark:bg-gray-900 ring-3 ring-indigo-500 p-10 rounded-2xl h-40 sm:h-50">
                        <h2 className="text-xl text-indigo-600 dark:text-indigo-400 font-semibold mb-4">Total Projects</h2>
                        <p className="text-6xl max-sm:text-4xl font-extrabold">{projectsCount}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 ring-3 ring-indigo-500 p-10 rounded-2xl h-40 sm:h-50">
                        <h2 className="text-violet-600 dark:text-violet-400 text-xl font-semibold mb-4">Total Notes</h2>
                        <p className="text-6xl max-sm:text-4xl font-extrabold">{notesCount}</p>
                        <div className="w-full flex items-center justify-end py-5 relative">
                            <div className="inline-flex pt-3 pl-1 absolute bottom-10 right-1 rounded-full w-16 h-16 bg-gradient-to-r from-violet-500 to-pink-500 text-white">
                                <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full flex items-center justify-center w-16 h-16">
                                    <span className="uppercase text-lg bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent font-bold">new</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">

                        <h2 className="text-xl font-semibold mb-4">Total Blogs</h2>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{blogsCount}</p>
                    </div> */}
                </div>
            )}
        </div>
    );
}