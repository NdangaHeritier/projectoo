import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, limit } from 'firebase/firestore';
import { PlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { projectIcons, getIconComponent } from '../utils/icons';
import ModalLayout from '../components/ModalLayout';
import { LoadingSpan } from '../components/LoadingSpan';
import { ProjectCard } from '../components/ProjectCard';

export const Projects = () => {
    const { currentUser } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddingProject, setIsAddingProject] = useState(false);
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        timeline: '',
        icon: 'RocketLaunchIcon'
    });

    useEffect(() => {
        // Test Firebase connection
        console.log('Current user:', currentUser);
        if (currentUser) {
        console.log('User ID:', currentUser.uid);
        // Test Firestore access
        const testQuery = query(
            collection(db, 'projects'),
            where('userId', '==', currentUser.uid),
            limit(1)
        );
        getDocs(testQuery)
            .then(() => console.log('Successfully connected to Firestore'))
            .catch(error => console.error('Firestore connection error:', error));
        }
        
        fetchProjects();
    }, [currentUser]);

    async function fetchProjects() {
        try {
        const q = query(
            collection(db, 'projects'),
            where('userId', '==', currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const projectsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setProjects(projectsData);
        } catch (error) {
        toast.error('Failed to fetch projects');
        } finally {
        setLoading(false);
        }
    }

    async function handleAddProject(e) {
        e.preventDefault();
        try {
        if (!currentUser) {
            toast.error('You must be logged in to create a project');
            return;
        }

        const defaultPhases = [
            {
            id: 'planning',
            name: 'Planning',
            description: 'Initial project planning and requirements gathering',
            order: 0,
            tasks: []
            },
            {
            id: 'development',
            name: 'Development',
            description: 'Main development phase',
            order: 1,
            tasks: []
            },
            {
            id: 'testing',
            name: 'Testing',
            description: 'Quality assurance and testing',
            order: 2,
            tasks: []
            },
            {
            id: 'launch',
            name: 'Launch',
            description: 'Project deployment and launch activities',
            order: 3,
            tasks: []
            }
        ];

        const projectData = {
            ...newProject,
            userId: currentUser.uid,
            createdAt: new Date().toISOString(),
            phases: defaultPhases,
            status: 'In Progress'
        };

        console.log('Creating project with data:', projectData);

        const projectsRef = collection(db, 'projects');
        const docRef = await addDoc(projectsRef, projectData);
        
        console.log('Project created with ID:', docRef.id);
        toast.success('Project created successfully!');
        setIsAddingProject(false);
        setNewProject({
            title: '',
            description: '',
            timeline: '',
            icon: 'RocketLaunchIcon'
        });
        fetchProjects();
        } catch (error) {
        console.error('Error creating project:', error);
        if (error.code === 'permission-denied') {
            toast.error('Permission denied. Please make sure you are logged in.');
        } else {
            toast.error(`Failed to create project: ${error.message}`);
        }
        }
    }

    async function handleDeleteProject(projectId) {
        if (window.confirm('Are you sure you want to delete this project?')) {
        try {
            await deleteDoc(doc(db, 'projects', projectId));
            toast.success('Project deleted successfully');
            fetchProjects();
        } catch (error) {
            toast.error('Failed to delete project');
        }
        }
    }
    return (
        <div className="max-w-8xl max-sm:w-full mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200">My Projects</h1>
          <button
            onClick={() => setIsAddingProject(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            New Project
          </button>
        </div>

        {isAddingProject && (
          <ModalLayout onClose={() => setIsAddingProject(false)} title={"Create New Project"}>
            <div className="bg-white dark:bg-black rounded-lg border border-zinc-300 dark:border-zinc-800">
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleAddProject} className="mt-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-400">
                    Project Icon
                  </label>
                  <div className="mt-2 grid grid-cols-10 max-sm:grid-cols-3 gap-2">
                    {projectIcons.map((iconConfig) => {
                      const IconComponent = iconConfig.icon;
                      return (
                        <button
                          key={iconConfig.name}
                          type="button"
                          onClick={() => setNewProject({ ...newProject, icon: iconConfig.name })}
                          className={`p-2 rounded-lg flex items-center justify-center ${
                            newProject.icon === iconConfig.name
                              ? 'bg-indigo-100 dark:bg-indigo-600/20 ring-2 ring-indigo-500'
                              : 'hover:bg-gray-100 dark:hover:bg-zinc-900'
                          }`}
                        >
                          <IconComponent className="h-6 w-6 text-gray-700 dark:text-zinc-400" />
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-400">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newProject.title}
                    onChange={(e) =>
                      setNewProject({ ...newProject, title: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-800 text-gray-800 dark:text-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-400">
                    Description
                  </label>
                  <textarea
                    required
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject({ ...newProject, description: e.target.value })
                    }
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-800 text-gray-800 dark:text-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Timeline
                  </label>
                  <input
                    type="date"
                    required
                    value={newProject.timeline}
                    onChange={(e) =>
                      setNewProject({ ...newProject, timeline: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-800 text-gray-800 dark:text-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAddingProject(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-800 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-zinc-400 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    Create Project
                  </button>
                </div>
              </form>
            </div>
          </div>
          </ModalLayout>
        )}

        {loading ? (
          <LoadingSpan text="Loading projects ..." />
        ) : projects.length === 0 ? (
          <div className="text-center mt-8 text-gray-500">
            No projects yet. Create your first project!
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const IconComponent = getIconComponent(project.icon);

                return (
                  <ProjectCard key={project.id} iconComponent={ <IconComponent className="h-6 w-6 text-indigo-600" /> } project={project} onClick={() => handleDeleteProject(project.id)} />
                );
            })}
          </div>
        )}
      </div>
    )
}