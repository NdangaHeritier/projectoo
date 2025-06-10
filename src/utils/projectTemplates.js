export const defaultPhases = [
  {
    id: 'planning',
    name: 'Planning',
    description: 'Define project scope, requirements, and timeline',
    icon: 'ClipboardDocumentList',
    tasks: [
      {
        id: 'task-1',
        title: 'Project Requirements',
        description: 'Document detailed project requirements and objectives',
        expectedTime: '4',
        status: 'Pending',
        timeSpent: 0
      },
      {
        id: 'task-2',
        title: 'Resource Planning',
        description: 'Identify and allocate necessary resources',
        expectedTime: '2',
        status: 'Pending',
        timeSpent: 0
      }
    ]
  },
  {
    id: 'development',
    name: 'Development',
    description: 'Execute project tasks and create deliverables',
    icon: 'CodeBracket',
    tasks: [
      {
        id: 'task-3',
        title: 'Initial Setup',
        description: 'Set up project infrastructure and development environment',
        expectedTime: '3',
        status: 'Pending',
        timeSpent: 0
      }
    ]
  },
  {
    id: 'testing',
    name: 'Testing',
    description: 'Quality assurance and testing of deliverables',
    icon: 'AdjustmentsHorizontal',
    tasks: [
      {
        id: 'task-4',
        title: 'Test Planning',
        description: 'Create test plans and test cases',
        expectedTime: '2',
        status: 'Pending',
        timeSpent: 0
      }
    ]
  },
  {
    id: 'launch',
    name: 'Launch',
    description: 'Project deployment and handover',
    icon: 'RocketLaunch',
    tasks: [
      {
        id: 'task-5',
        title: 'Deployment Checklist',
        description: 'Prepare deployment checklist and launch plan',
        expectedTime: '2',
        status: 'Pending',
        timeSpent: 0
      }
    ]
  }
];

export function generateProjectTemplate(projectData) {
  return {
    ...projectData,
    icon: 'RocketLaunch',
    phases: defaultPhases.map(phase => ({
      ...phase,
      tasks: phase.tasks.map(task => ({
        ...task,
        id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }))
    }))
  };
} 