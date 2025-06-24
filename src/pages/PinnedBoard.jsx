import React, { useEffect, useState } from 'react';
import { HashtagIcon, PlusIcon } from '@heroicons/react/24/outline';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import toast from 'react-hot-toast';
import AnalysisBoard from './AnalysisBoard';
import PinnedNotes from './NotesTakingApp/PinnedNotes';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid';
import { LoadingSpan } from '../components/LoadingSpan';
import { useAuth } from '../contexts/AuthContext';

export default function PinnedBoard() {

    // Fetch Analsis data from the firebase.
    const { currentUser } = useAuth();
    const [pinnedProjects, setPinnedProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pinnedNotes, setPinnedNotes] = useState([]);
    const [error, setError] = useState(null); // 🆕 add error state
    // const [pinnedBlogs, setPinnedBlogs] = React.useState([]);
    useEffect(() => {
        async function fetchPinnedItems() {
            setIsLoading(true);
            if (!currentUser) {
                setError("You must be logged in to view this page.");
                toast.error("You must be logged in to view this page.");
                setIsLoading(false);
                return;
            }
            try {
                // Fetch pinned items from the database
                const projectRef = collection(db, "projects");
                const projectQuery= query(
                    projectRef,
                    where("pinned", "==", true),
                    where("userId", "==", currentUser.uid)
                );
                const projectSnap = await getDocs(projectQuery);
                const projects = projectSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPinnedProjects(projects);

                // Fetch pinned notes from the database
                const notesRef = collection(db, "notes");
                const notesQuery = query(
                    notesRef,
                    where("pinned", "==", true),
                    where("userId", "==", currentUser.uid)
                );
                const notesSnap = await getDocs(notesQuery);
                const notes = notesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPinnedNotes(notes);

                // Fetch pinned blogs from the database
                // const blogsRef = collection(db, "blogs");
                // const blogsQuery = query(blogsRef, where("pinned", "==", true));
                // const blogsSnap = await getDocs(blogsQuery);
                // const blogs = blogsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // setPinnedBlogs(blogs);
            } catch (error) {
                // Handle any errors that occur during the fetch
                setPinnedProjects([]);
                setPinnedNotes([]);
                // setPinnedBlogs([]);
                toast.error("Failed to fetch pinned items. Please try again later.");
                // Log the error for debugging purposes
                console.error("Error fetching pinned items:", error);
            }
            finally {
                setIsLoading(false);
            }
        }

        fetchPinnedItems();
    }, []);

    if(!pinnedNotes && !pinnedProjects && !isLoading && !error){
        return (
            <section className="p-10 bg-white dark:bg-gray-900 border border-zinc-300 dark:border-zinc-800 shadow-md rounded-xl max-w-xl mx-auto mt-16">
                <div className="flex flex-col items-center">
                    <ClipboardDocumentListIcon className="h-12 w-12 text-gray-400 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">Unable to fetch Pinned Items.</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-center">Maybe try later or double check if there's any items Pinned.</p>
                </div>
            </section>
        )
    }

    // If loading, show a loading spinner

    if(isLoading){
        return(
            <LoadingSpan text="Loading Pinned Items..." />
        )
    }

    if (error){
        return(
        <section className="p-10 bg-white dark:bg-gray-900 border border-zinc-300 dark:border-zinc-800 shadow-md rounded-xl max-w-xl mx-auto mt-16">
            <div className="flex flex-col items-center">
                <ClipboardDocumentListIcon className="h-12 w-12 text-red-400 mb-4" />
                <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
                <p className="text-gray-500 dark:text-gray-400 text-center">{error}</p>
            </div>
            
        </section>
        )
    }

    return (
        <div className="pinned-board-container p-5 max-sm:p-3">
           {/* Analysis board */}
           <AnalysisBoard />
           {/* Pinned Projects */}
            <div className="PinnedProjects p-5 px-0">
                <div className="title-text inline-flex gap-2 items-center pb-3">
                    <HashtagIcon strokeWidth={3} className="w-10 h-10 p-3 rounded-full bg-gray-600/20" />
                    <h2 className="text-xl text-indigo-500 font-bold">Pinned Projects</h2>
                </div>
                {pinnedProjects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-sm:px-3 py-2">
                        {pinnedProjects.map(project => (
                            <div key={project.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{project.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
                                <div className="mt-2">
                                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-indigo-800 bg-indigo-100 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                                        {project.type || "Project"}
                                    </span>
                                </div>
                                <button
                                    onClick={() => {
                                        // Handle unpinning project logic here
                                        console.log(`Unpin project: ${project.id}`);
                                    }}
                                    className="mt-3 inline-flex items-center justify-center px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    Unpin Project
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-500 py-4 text-sm">
                        No Pinned Projects!
                        <button className="text-indigo-500 inline-flex gap-1 ms-1 items-center hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer rounded-lg py-0.5 px-1">
                            <PlusIcon className="w-4 h-4" /> Add one
                        </button>
                    </div>
                )}
            </div>
              {/* Pinned Notes */}
            <div className="PinnedNotes py-5 px-0">                
                <PinnedNotes pinnedNotes={pinnedNotes} />
            </div>
        </div>
    );
}