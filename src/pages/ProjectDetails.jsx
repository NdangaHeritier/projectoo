import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import {
  doc,
  getDoc,
  updateDoc,
  // arrayUnion,
  // arrayRemove,
} from 'firebase/firestore';
import {
  PlusIcon,
  TrashIcon,
  CheckIcon,
  // PencilIcon,
  XMarkIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ChartBarIcon,
  RocketLaunchIcon,
  // ClipboardDocumentListIcon,
  ClockIcon,
  ChartPieIcon,
  ShareIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline';
import { projectIcons, phaseIcons, getIconComponent, getDefaultPhaseIcon } from '../utils/icons';
import toast from 'react-hot-toast';
import InlineEdit from '../components/InlineEdit';
import ProjectProgressReport from '../components/ProjectProgressReport';
import ModalLayout from '../components/ModalLayout';
import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/16/solid';
import SelectMenu from '../components/SelectMenu';
import OverallProgressCard from './ProjectDetailsComponents/OverallProgressCard';
import ShareProjectModal from './ProjectDetailsComponents/ShareProjectModal';
import { LoadingSpan } from '../components/LoadingSpan';

export default function ProjectDetails() {
  const { projectId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isAddingPhase, setIsAddingPhase] = useState(false);
  // const [editingItem, setEditingItem] = useState(null);
  // const [editingValue, setEditingValue] = useState('');
  const [newPhase, setNewPhase] = useState({
    name: '',
    description: ''
  });
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    expectedTime: '',
    status: 'Pending',
    timeSpent: 0,
    phaseId: ''
  });
  const [isSelectingIcon, setIsSelectingIcon] = useState(false);
  const [iconTarget, setIconTarget] = useState(null); // { type: 'project' | 'phase', id: string }
  const [showProgressReport, setShowProgressReport] = useState(false);
  const [showHoursModal, setShowHoursModal] = useState(false);
  const [hoursModalTask, setHoursModalTask] = useState(null); // { phaseId, taskId }
  const [hoursInput, setHoursInput] = useState('');
  const [isSharingProject, setIsSharingProject] = useState(false);

  useEffect(() => {
    console.log('projectId:', projectId, 'currentUser:', currentUser);
    if (projectId && currentUser) {
      console.log('ProjectDetails mounted, fetching project:', projectId);
      fetchProject();
    }
  }, [projectId, currentUser]);

  // Add a timeout effect to handle stalled loading
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
        toast.error('Loading timed out. Please refresh the page.');
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(loadingTimeout);
  }, [loading]);

  async function fetchProject() {
    console.log('Starting fetchProject');
    try {
      setLoading(true);
      setError(null);

      if (!currentUser) {
        console.log('No current user');
        setError('Please log in to view project details');
        setLoading(false);
        toast.error('Please log in to view project details');
        navigate('/login');
        return;
      }

      if (!projectId) {
        console.log('No project ID');
        setError('Invalid project ID');
        setLoading(false);
        toast.error('Invalid project ID');
        navigate('/');
        return;
      }

      console.log('Fetching project document');
      const projectRef = doc(db, 'projects', projectId);
      const projectSnap = await getDoc(projectRef);

      if (projectSnap.exists()) {
        const projectData = projectSnap.data();
        console.log('Project data:', projectData);

        if (projectData.userId !== currentUser.uid) {
          console.log('Permission denied');
          setError('You do not have permission to view this project');
          setLoading(false);
          toast.error('You do not have permission to view this project');
          navigate('/');
          return;
        }

        // Ensure phases array exists
        if (!projectData.phases) {
          projectData.phases = [];
        }

        // Ensure each phase has a tasks array
        projectData.phases = projectData.phases.map(phase => ({
          ...phase,
          tasks: phase.tasks || []
        }));

        console.log('Setting project state');
        setProject({ id: projectSnap.id, ...projectData });
      } else {
        console.log('Project not found');
        setError('Project not found');
        toast.error('Project not found');
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      setError('Failed to load project');
      toast.error('Failed to load project');
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  }

  function getDefaultPhaseIcon(phaseId) {
    switch (phaseId) {
      case 'planning':
        return 'ClipboardDocumentList';
      case 'development':
        return 'CodeBracket';
      case 'testing':
        return 'AdjustmentsHorizontal';
      case 'launch':
        return 'RocketLaunch';
      default:
        return 'ClipboardDocumentList';
    }
  }

  async function handleUpdateProject(field, value) {
    try {
      const projectRef = doc(db, 'projects', projectId);
      await updateDoc(projectRef, { [field]: value });
      setProject({ ...project, [field]: value });
      toast.success('Updated successfully');
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    }
  }

  async function handleUpdatePhase(phaseId, field, value) {
    try {
      const updatedPhases = project.phases.map(phase => {
        if (phase.id === phaseId) {
          return { ...phase, [field]: value };
        }
        return phase;
      });

      const projectRef = doc(db, 'projects', projectId);
      await updateDoc(projectRef, { phases: updatedPhases });
      setProject({ ...project, phases: updatedPhases });
      toast.success('Phase updated successfully');
    } catch (error) {
      console.error('Error updating phase:', error);
      toast.error('Failed to update phase');
    }
  }

  async function handleUpdateTask(phaseId, taskId, field, value) {
    try {
      const updatedPhases = project.phases.map(phase => {
        if (phase.id === phaseId) {
          return {
            ...phase,
            tasks: phase.tasks.map(task => {
              if (task.id === taskId) {
                return { ...task, [field]: value };
              }
              return task;
            })
          };
        }
        return phase;
      });

      const projectRef = doc(db, 'projects', projectId);
      await updateDoc(projectRef, { phases: updatedPhases });
      setProject({ ...project, phases: updatedPhases });
      toast.success('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  }

  async function handleAddPhase(e) {
    e.preventDefault();
    try {
      const phaseData = {
        id: Date.now().toString(),
        ...newPhase,
        icon: 'ClipboardDocumentList', // Default icon for new phases
        order: project.phases.length,
        tasks: []
      };

      const updatedPhases = [...project.phases, phaseData];
      const projectRef = doc(db, 'projects', projectId);
      await updateDoc(projectRef, { phases: updatedPhases });

      setProject({
        ...project,
        phases: updatedPhases
      });

      setIsAddingPhase(false);
      setNewPhase({ name: '', description: '' });
      toast.success('Phase added successfully!');
    } catch (error) {
      console.error('Error adding phase:', error);
      toast.error('Failed to add phase');
    }
  }

  const [selectedPhaseId, setSelectedPhaseId] = useState('');
  async function handleAddTask(e) {
    e.preventDefault();
    try {
      const taskData = {
        id: Date.now().toString(),
        ...newTask,
        createdAt: new Date().toISOString()
      };

      const updatedPhases = project.phases.map(phase => {
        if (phase.id === newTask.phaseId) {
          return {
            ...phase,
            tasks: [...phase.tasks, taskData]
          };
        }
        return phase;
      });

      const projectRef = doc(db, 'projects', projectId);
      await updateDoc(projectRef, { phases: updatedPhases });

      setProject({
        ...project,
        phases: updatedPhases
      });

      setIsAddingTask(false);
      setNewTask({
        title: '',
        description: '',
        expectedTime: '',
        status: 'Pending',
        timeSpent: 0,
        phaseId: ''
      });
      toast.success('Task added successfully!');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task');
    }
  }

  async function handleDeleteTask(phaseId, taskId) {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      const updatedPhases = project.phases.map(phase => {
        if (phase.id === phaseId) {
          return {
            ...phase,
            tasks: phase.tasks.filter(task => task.id !== taskId)
          };
        }
        return phase;
      });

      const projectRef = doc(db, 'projects', projectId);
      await updateDoc(projectRef, { phases: updatedPhases });
      
      setProject({
        ...project,
        phases: updatedPhases
      });
      
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  }

  async function handleToggleTaskStatus(phaseId, taskId) {
    const phase = project.phases.find(p => p.id === phaseId);
    const task = phase?.tasks.find(t => t.id === taskId);
    if (task.status !== 'Completed') {
      setHoursModalTask({ phaseId, taskId });
      setHoursInput(task.timeSpent ? String(task.timeSpent) : '');
      setShowHoursModal(true);
    } else {
      // Mark as not completed
      const updatedPhases = project.phases.map(phase =>
        phase.id === phaseId
          ? {
              ...phase,
              tasks: phase.tasks.map(task =>
                task.id === taskId ? { ...task, status: 'Pending' } : task
              ),
            }
          : phase
      );
      const projectRef = doc(db, 'projects', projectId);
      await updateDoc(projectRef, { phases: updatedPhases });
      setProject({ ...project, phases: updatedPhases });
      toast.success('Task status updated');
    }
  }

  async function handleMoveTask(fromPhaseId, toPhaseId, taskId) {
    try {
      const task = project.phases
        .find(p => p.id === fromPhaseId)
        ?.tasks.find(t => t.id === taskId);

      if (!task) {
        toast.error('Task not found');
        return;
      }

      const updatedPhases = project.phases.map(phase => {
        if (phase.id === fromPhaseId) {
          return {
            ...phase,
            tasks: phase.tasks.filter(t => t.id !== taskId)
          };
        }
        if (phase.id === toPhaseId) {
          return {
            ...phase,
            tasks: [...phase.tasks, task]
          };
        }
        return phase;
      });

      const projectRef = doc(db, 'projects', projectId);
      await updateDoc(projectRef, { phases: updatedPhases });
      setProject({ ...project, phases: updatedPhases });
      toast.success('Task moved successfully');
    } catch (error) {
      console.error('Error moving task:', error);
      toast.error('Failed to move task');
    }
  }

  const calculatePhaseProgress = (phase) => {
    if (!phase.tasks || phase.tasks.length === 0) return 0;
    const completedTasks = phase.tasks.filter(task => task.status === 'Completed').length;
    return Math.round((completedTasks / phase.tasks.length) * 100);
  };

  const calculateOverallProgress = () => {
    if (!project.phases) return 0;
    let totalTasks = 0;
    let completedTasks = 0;

    project.phases.forEach(phase => {
      if (phase.tasks) {
        totalTasks += phase.tasks.length;
        completedTasks += phase.tasks.filter(task => task.status === 'Completed').length;
      }
    });

    return totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  };

  const getIconComponent = (iconName) => {
    const allIcons = [...projectIcons, ...phaseIcons];
    const iconConfig = allIcons.find(icon => icon.name === iconName);
    return iconConfig ? iconConfig.icon : RocketLaunchIcon;
  };

  async function handleUpdateIcon(type, id, iconName) {
    try {
      const projectRef = doc(db, 'projects', projectId);

      if (type === 'project') {
        await updateDoc(projectRef, { icon: iconName });
        setProject({ ...project, icon: iconName });
      } else if (type === 'phase') {
        const updatedPhases = project.phases.map(phase => {
          if (phase.id === id) {
            return { ...phase, icon: iconName };
          }
          return phase;
        });
        await updateDoc(projectRef, { phases: updatedPhases });
        setProject({ ...project, phases: updatedPhases });
      }

      setIsSelectingIcon(false);
      setIconTarget(null);
      toast.success('Icon updated successfully');
    } catch (error) {
      console.error('Error updating icon:', error);
      toast.error('Failed to update icon');
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-black border border-zinc-300 dark:border-zinc-800 rounded-lg p-6">
            <div className="text-center text-red-600 dark:text-red-400">
              <h2 className="text-2xl font-bold mb-2">Error</h2>
              <p>{error}</p>
              <button
                onClick={() => navigate('/')}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md  text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <LoadingSpan text="Loading projects ..." />
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900/50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-black border border-zinc-300 dark:border-zinc-800 shadow rounded-lg p-6">
            <div className="text-center text-gray-600 dark:text-zinc-500">
              <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
              <p>The project you're looking for doesn't exist or you don't have permission to view it.</p>
              <button
                onClick={() => navigate('/')}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md  text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const phaseOptions = project.phases.map(phase => ({
    value: phase.id,
    label: phase.name || 'Unnamed Phase',
  }));

  const selectedPhase = phaseOptions.find(option => option.value === selectedPhaseId);
  return (
    <div className="py-6 px-3 sm:px-5">
      <div className="max-w-7xl max-sm:w-full mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-5 max-sm:flex-col sm:gap-3">
          <div className="flex-1">
            <div className="flex items-center max-sm:items-start max-sm:flex-col max-sm gap-3 mb-2">
              {project.icon && (
                <button
                  onClick={() => {
                    setIsSelectingIcon(true);
                    setIconTarget({ type: 'project', id: project.id });
                  }}
                  className="mr-4 p-2 bg-indigo-100 dark:bg-indigo-500/10 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-500/20 transition-colors"
                  title="Change project icon"
                >
                  {React.createElement(getIconComponent(project.icon), {
                    className: "h-8 w-8 text-indigo-600"
                  })}
                </button>
              )}
              <InlineEdit
                value={project.title}
                onSave={(value) => handleUpdateProject('title', value)}
                className="text-3xl font-bold text-gray-900 dark:text-zinc-200"
                inputClassName="text-3xl font-bold"
              />
            </div>
            <InlineEdit
              value={project.description}
              onSave={(value) => handleUpdateProject('description', value)}
              type="textarea"
              className="py-5 text-base text-gray-600 dark:text-gray-500 font-medium w-full"
            />
          </div>
          <div className="gap-4 grid grid-cols-2 bg-indigo-200 dark:bg-indigo-500/10 p-5 rounded-xl max-sm:grid-cols-1 max-sm:w-full max-sm:gap-2">
            <button
              onClick={() => setShowProgressReport(!showProgressReport)}
              className="inline-flex cursor-pointer items-center px-4 py-2 border border-transparent rounded-md  text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <ChartBarIcon className="-ml-1 mr-2 h-5 w-5" />
              {showProgressReport ? 'Hide Report' : 'View Progress Report'}
            </button>
            <button
              onClick={() => setIsAddingPhase(true)}
              className="inline-flex cursor-pointer items-center px-4 py-2 border border-transparent rounded-md  text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
              Add Phase
            </button>
            <button
              onClick={() => setIsAddingTask(true)}
              className="inline-flex cursor-pointer items-center px-4 py-2 border border-transparent rounded-md  text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
              Add Task
            </button>

             <button
              onClick={() => setIsSharingProject(true)}
              className="inline-flex cursor-pointer items-center px-4 py-2 border border-transparent rounded-md  text-sm font-medium text-indigo-600 bg-transparent hover:bg-indigo-400/10"
            >
              <ShareIcon className="-ml-1 mr-2 h-5 w-5" />
              Share Project
            </button>
          </div>
        </div>

        {/* sharing project.. */}
        {isSharingProject &&(
          <ModalLayout
            title="Share your project Plan with friends!"
            onClose={() => setIsSharingProject(false)}
            showCloseButton={true}
        >
          <ShareProjectModal project_id={project.id} />
        </ModalLayout>
        )}

        {showProgressReport && (
          <ModalLayout
            title="Analytics & Report"
            onClose={() => setShowProgressReport(false)}
            showCloseButton={true}
          >
            <ProjectProgressReport project={project} />
          </ModalLayout>
        )}

        {/* Selecting Icon for specific phase to editi it/ it select a pannel with icons to pick one you like, */}

        {isSelectingIcon && (
          <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-black rounded-lg p-6 max-w-2xl w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Select {iconTarget?.type === 'project' ? 'Project' : 'Phase'} Icon
                </h3>
                <button
                  onClick={() => {
                    setIsSelectingIcon(false);
                    setIconTarget(null);
                  }}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="grid grid-cols-6 gap-4">
                {(iconTarget?.type === 'project' ? projectIcons : phaseIcons).map((iconConfig) => {
                  const IconComponent = iconConfig.icon;
                  return (
                    <button
                      key={iconConfig.name}
                      onClick={() => handleUpdateIcon(iconTarget.type, iconTarget.id, iconConfig.name)}
                      className="p-4 rounded-lg flex flex-col items-center justify-center hover:bg-indigo-50 dark:hover:bg-zinc-950 transition-colors"
                    >
                      <IconComponent className="h-8 w-8 text-gray-700 dark:text-zinc-400" />
                      <span className="mt-2 text-xs text-gray-600 dark:text-gray-500">{iconConfig.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}


        {/* Setting Hours that you have spended on a task. */}
        {showHoursModal && (
          <ModalLayout
            title="How many hours did you spend?"
            onClose={() => {
              setShowHoursModal(false);
              setHoursModalTask(null);
              setHoursInput('');
            }}
          >
            <div className="px-4 py-5 sm:p-6">
              <input
                type="number"
                min="0"
                step="0.1"
                value={hoursInput}
                onChange={e => setHoursInput(e.target.value)}
                className="w-full text-black dark:text-white border border-gray-300 dark:border-zinc-800 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoFocus
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setShowHoursModal(false);
                    setHoursModalTask(null);
                    setHoursInput('');
                  }}
                  className="px-4 py-2 rounded bg-zinc-200 dark:bg-zinc-950 text-black dark:text-white hover:bg-zinc-300 dark:hover:bg-black/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    let hours = parseFloat(hoursInput);
                    if (isNaN(hours) || hours < 0) {
                      toast.error('Please enter a valid number of hours.');
                      return;
                    }
                    const { phaseId, taskId } = hoursModalTask;
                    const updatedPhases = project.phases.map(phase =>
                      phase.id === phaseId
                        ? {
                            ...phase,
                            tasks: phase.tasks.map(task =>
                              task.id === taskId
                                ? { ...task, status: 'Completed', timeSpent: hours }
                                : task
                            ),
                          }
                        : phase
                    );
                    const projectRef = doc(db, 'projects', projectId);
                    await updateDoc(projectRef, { phases: updatedPhases });
                    setProject({ ...project, phases: updatedPhases });
                    setShowHoursModal(false);
                    setHoursModalTask(null);
                    setHoursInput('');
                    toast.success('Task marked as completed!');
                  }}
                  className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </div>
          </ModalLayout>
        )}

        <div className="mt-6">
          <OverallProgressCard project={project} />
        </div>

        {isAddingPhase && (
          <ModalLayout
            title="Add New Phase"
            onClose={() => setIsAddingPhase(false)}
            showCloseButton={true}
          >
            <div className="p-4 sm:p-6 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black rounded-lg">
              <form onSubmit={handleAddPhase} className="mt-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Phase Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newPhase.name}
                    onChange={(e) =>
                      setNewPhase({ ...newPhase, name: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-700 text-zinc-800 dark:text-zinc-300 rounded-md  py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Description
                  </label>
                  <textarea
                    required
                    value={newPhase.description}
                    onChange={(e) =>
                      setNewPhase({ ...newPhase, description: e.target.value })
                    }
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-700 text-zinc-800 dark:text-zinc-300 rounded-md  py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAddingPhase(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-zinc-800 rounded-md  text-sm font-medium text-gray-700 dark:text-zinc-400 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md  text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Add Phase
                  </button>
                </div>
              </form>
            </div>
          </ModalLayout>
        )}

        {isAddingTask && (
          <ModalLayout
            title="Add New Task"
            onClose={() => setIsAddingTask(false)}
            showCloseButton={true}
          >
            <div className="p-4 sm:p-6 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black rounded-lg">
              <form onSubmit={handleAddTask} className="mt-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Phase
                  </label>
                  <SelectMenu
                    options={phaseOptions}
                    selected={selectedPhase} // Pass the object
                    onChange={(option) => {
                      setSelectedPhaseId(option.value); // still store ID in state
                      setNewTask({ ...newTask, phaseId: option.value });
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Task Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-700 text-zinc-800 dark:text-zinc-300 rounded-md  py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Description
                  </label>
                  <textarea
                    required
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-700 text-zinc-800 dark:text-zinc-300 rounded-md  py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Expected Time (hours)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.5"
                    value={newTask.expectedTime}
                    onChange={(e) =>
                      setNewTask({ ...newTask, expectedTime: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-700 text-zinc-800 dark:text-zinc-300 rounded-md  py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAddingTask(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-zinc-800 rounded-md  text-sm font-medium text-gray-700 dark:text-zinc-400 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md  text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </ModalLayout>
        )}

        <div className="mt-6 space-y-6">
          {project.phases.map((phase, phaseIndex) => (
            <div key={phase.id} className="bg-transparent overflow-hidden">
              <div className="px-1 py-5">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          setIsSelectingIcon(true);
                          setIconTarget({ type: 'phase', id: phase.id });
                        }}
                        className="mr-3 p-2 bg-gray-100 dark:bg-gray-900 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800/70 transition-colors"
                        title="Change phase icon"
                      >
                        {React.createElement(getIconComponent(phase.icon || 'ClipboardDocumentList'), {
                          className: "h-6 w-6 text-gray-600 dark:text-zinc-400"
                        })}
                      </button>
                      <div className="flex items-center justify-between gap-3 flex-1 min-w-0">
                        <InlineEdit
                          value={phase.name}
                          onSave={(value) => handleUpdatePhase(phase.id, 'name', value)}
                          className="text-xl font-medium text-gray-900 dark:text-zinc-200"
                        />                        
                      </div>                      
                    </div>
                    <InlineEdit
                      value={phase.description}
                      onSave={(value) => handleUpdatePhase(phase.id, 'description', value)}
                      type="textarea"
                      className="mt-2 text-base text-gray-600 dark:text-gray-500 inline-block"
                    />
                  </div>                  
                </div>

                <div className='pb-3'>
                  <div className="relative pt-1">
                    <div className="py-3 flex w-full items-center justify-between">
                      <h2 className="text-zinc-800 dark:text-zinc-300 font-semibold flex items-center">
                        <ChartPieIcon className='pe-2 h-7 w-7 inline-flex text-indigo-500' />
                        Phase Progress
                      </h2>
                      <span className="text-sm text-gray-600 dark:text-gray-500">{calculatePhaseProgress(phase)}% Complete</span>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200 dark:bg-indigo-500/20">
                      <div
                        style={{ width: `${calculatePhaseProgress(phase)}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {(!phase.tasks || phase.tasks.length === 0) ? (
                    <p className="text-gray-500 text-sm">No tasks in this phase yet.</p>
                  ) : (
                    phase.tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`border w-full rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 overflow-x-auto ${task.status === 'Completed'
                          ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-600/50 border-l-6 border-l-indigo-600 hover:border-indigo-400 dark:hover:border-indigo-400/50'
                          : 'bg-gray-50 dark:bg-black border-gray-300 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-700'
                        } transition-colors duration-200`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                            <button
                              onClick={() => handleToggleTaskStatus(phase.id, task.id)}
                              className={`h-5 w-5 flex items-center justify-center border rounded-full mt-2 sm:mt-0 ${
                                task.status === 'Completed'
                                  ? 'bg-indigo-500 border-indigo-500'
                                  : 'border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-zinc-800'
                              }`}
                            >
                              {task.status === 'Completed' && (
                                <CheckIcon className="h-4 w-3 text-white" />
                              )}
                            </button>
                            <div className="flex-1 min-w-0">
                              <InlineEdit
                                value={task.title}
                                onSave={(value) => handleUpdateTask(phase.id, task.id, 'title', value)}
                                className={`text-lg font-medium min-w-0 ${
                                  task.status === 'Completed'
                                    ? 'text-indigo-600'
                                    : 'text-gray-900 dark:text-zinc-200'
                                }`}
                              />
                              <InlineEdit
                                value={task.description}
                                onSave={(value) => handleUpdateTask(phase.id, task.id, 'description', value)}
                                type="textarea"
                                className="mt-1 text-sm text-gray-700 dark:text-zinc-400 inline-block"
                                inputClassName="bg-gray-50 dark:bg-zinc-900/50"
                              />
                              <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-gray-500">
                                <div className="flex flex-wrap items-center gap-2">
                                  <ClockIcon className="h-4 w-4 text-gray-400" />
                                  <span>Expected Time:</span>
                                  <span>{task.expectedTime}h</span>
                                  {task.status === 'Completed' && (
                                    <div className="flex items-center gap-1">
                                      <CheckCircleIcon className="h-4 w-4 text-indigo-300" />
                                      <span>Done in</span>
                                      <InlineEdit
                                        value={String(task.timeSpent || 0)}
                                        onSave={(value) => handleUpdateTask(phase.id, task.id, 'timeSpent', parseFloat(value) || 0)}
                                        type="number"
                                        className="ml-1 text-sm font-bold"
                                        inputClassName="w-5 bg-gray-300/50 dark:bg-zinc-800"
                                        inputProps={{ min: 0, step: 0.1 }}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row flex-wrap items-center gap-2 mt-3 sm:mt-0">
                          {phaseIndex > 0 && (
                            <button
                              onClick={() => handleMoveTask(phase.id, project.phases[phaseIndex - 1].id, task.id)}
                              className="p-2 text-gray-400 hover:text-indigo-500 rounded-full hover:bg-indigo-100 cursor-pointer"
                              title={`Move to ${project.phases[phaseIndex - 1].name}`}
                            >
                              <ArrowLeftIcon className="h-5 w-5" />
                            </button>
                          )}
                          {phaseIndex < project.phases.length - 1 && (
                            <button
                              onClick={() => handleMoveTask(phase.id, project.phases[phaseIndex + 1].id, task.id)}
                              className="p-2 text-gray-400 hover:text-indigo-500 rounded-full hover:bg-indigo-100 cursor-pointer"
                              title={`Move to ${project.phases[phaseIndex + 1].name}`}
                            >
                              <ArrowRightIcon className="h-5 w-5" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteTask(phase.id, task.id)}
                            className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-100 cursor-pointer"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
