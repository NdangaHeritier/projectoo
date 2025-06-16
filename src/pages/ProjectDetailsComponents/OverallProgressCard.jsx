const calculateOverallProgress = (project) => {
    if (!project.phases) return 0;
    let totalTasks = 0;
    let completedTasks = 0;

    project.phases.forEach(phase => {
        if (phase.tasks) {
        totalTasks += phase.tasks.length;
        completedTasks += phase.tasks.filter(task => task.status === 'Completed').length;
        }
    }
    );
    return totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
};
export default function OverallProgressCard({project}) {
    return (
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 shadow rounded-lg relative overflow-hidden p-6">
            <div className="rounded-full bg-indigo-500/50 absolute left-30 h-30 w-30 z-0"></div>
            <div className="rounded-full bg-indigo-500/50 absolute right-0 h-20 w-20 z-0"></div>
            <div className="rounded-full bg-indigo-500/50 absolute right-20 bottom-0 h-10 w-10 z-0"></div>
            <h3 className="text-lg font-medium text-gray-100 relative z-10">Overall Progress</h3>
            <div className="mt-2">
                <div className="relative pt-1 z-10">
                <div className="flex mb-2 items-center justify-between">
                    <div>
                    <span className="text-xs font-semibold inline-block py-1 px-3 uppercase rounded-full text-indigo-200 bg-indigo-200/30">
                        Progress
                    </span>
                    </div>
                    <div className="text-right">
                    <span className="text-sm font-semibold inline-block text-zinc-100">
                        {calculateOverallProgress(project)}%
                    </span>
                    </div>
                </div>
                <div className="overflow-hidden h-3 mb-4 rounded bg-indigo-400/50 border border-indigo-400">
                    <div
                    style={{ width: `${calculateOverallProgress(project)}%` }}
                    className="bg-indigo-200 h-3"
                    ></div>
                </div>
                </div>
            </div>
        </div>
    )
}