import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, limit } from 'firebase/firestore';
import {
  PlusIcon,
  TrashIcon,
  ArrowRightIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { projectIcons, getIconComponent } from '../utils/icons';
import ModalLayout from '../components/ModalLayout';
import { StopIcon } from '@heroicons/react/20/solid';

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
          <div className="text-center mt-8">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center mt-8 text-gray-500">
            No projects yet. Create your first project!
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const IconComponent = getIconComponent(project.icon);
                // ReadMore component for project description
                function ReadMore({ text, maxLength = 230, projectId }) {
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

                return (
                <div
                  key={project.id}
                  className="bg-white dark:bg-black border border-zinc-300 dark:border-zinc-800 overflow-hidden rounded-lg hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 dark:bg-indigo-600/20 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="ml-3 text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">
                      {project.title}
                    </h3>
                    </div>
                    <div className="flex space-x-2">
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                    </div>
                  </div>
                  <p className="pt-5 text-sm text-gray-500 min-h-32">
                    <ReadMore text={project.description} projectId={project.id} />
                  </p>
                  <div className="mt-4">
                    <span className="text-sm font-medium text-gray-500">
                    <ClockIcon className="inline h-4 w-4 text-indigo-500 mr-1" />
                    Timeline:
                    </span>
                    <span className="ml-2 text-sm text-gray-900 dark:text-gray-200">
                    {new Date(project.timeline).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className=" rounded-full text-white font-semibold px-2 gap-1 pe-3 py-1 text-sm bg-indigo-700 inline-flex items-center">
                    <StopIcon className='h-4 w-4 rounded-full bg-indigo-300 p-1'/>{project.status}
                    </span>
                  </div>
                  <Link
                    to={`/project/${project.id}`}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 dark:bg-indigo-600/10 hover:bg-indigo-200 dark:hover:bg-indigo-600/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={(e) => {
                    if (!project.id) {
                      e.preventDefault();
                      toast.error('Invalid project ID');
                    }
                    }}
                  >
                    View Details
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                  </div>
                </div>
                );
            })}
          </div>
        )}
      </div>
    )
}