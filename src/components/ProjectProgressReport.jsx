import React from 'react';
import { ChartBarIcon, ClockIcon, ExclamationTriangleIcon, CheckCircleIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon } from '@heroicons/react/20/solid';

export default function ProjectProgressReport({ project }) {
  // Helper to compare expected vs spent time
  const calculateTaskTimeDifference = (task) => {
    const expectedTime = parseFloat(task.expectedTime);
    const timeSpent = parseFloat(task.timeSpent || 0);
    return {
      difference: timeSpent - expectedTime,
      isDelayed: timeSpent > expectedTime,
      isFaster: timeSpent < expectedTime && task.status === 'Completed'
    };
  };

  // Analyze project progress
  const analyzeProjectProgress = () => {
    let delayedTasks = [];
    let fastTasks = [];
    let totalTasks = 0;
    let completedTasks = 0;
    let totalTimeSpent = 0;

    project.phases.forEach(phase => {
      phase.tasks.forEach(task => {
        totalTasks++;
        if (task.status === 'Completed') {
          completedTasks++;
          totalTimeSpent += parseFloat(task.timeSpent || 0);
          const { difference, isDelayed, isFaster } = calculateTaskTimeDifference(task);
          if (isDelayed) {
            delayedTasks.push({ ...task, phase: phase.name, timeDifference: difference });
          } else if (isFaster) {
            fastTasks.push({ ...task, phase: phase.name, timeDifference: Math.abs(difference) });
          }
        }
      });
    });

    return {
      delayedTasks,
      fastTasks,
      completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
      totalTasks,
      completedTasks,
      avgTime: completedTasks > 0 ? (totalTimeSpent / completedTasks).toFixed(2) : 0
    };
  };

  const { delayedTasks, fastTasks, completionRate, totalTasks, completedTasks, avgTime } = analyzeProjectProgress();

  // Human-like summary
  let summary = '';
  if (totalTasks === 0) {
    summary = "No tasks have been added to this project yet. Start by creating your first task!";
  } else if (completedTasks === 0) {
    summary = `You have ${totalTasks} tasks in this project. None are completed yet—get started to see your progress here!`;
  } else if (completedTasks === totalTasks) {
    summary = `Fantastic! All ${totalTasks} tasks are completed. On average, each task took ${avgTime} hours. Review your performance below.`;
  } else {
    summary = `You have completed ${completedTasks} out of ${totalTasks} tasks (${completionRate.toFixed(1)}%). The average time spent on completed tasks is ${avgTime} hours. Keep going!`;
  }

  return (
    <div className="bg-white dark:bg-black border border-zinc-200 dark:border-gray-800 rounded-lg p-3 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
        <h2 className="text-lg sm:text-xl font-bold text-black dark:text-zinc-200 flex items-center">
          <ChartBarIcon className="h-6 w-6 mr-2 text-indigo-600" />
          Project Progress Report
        </h2>
        <div className="flex items-center text-sm text-zinc-700 dark:text-zinc-400 mt-2 sm:mt-0">
          <span className="font-semibold">{completionRate.toFixed(1)}% Complete</span>
        </div>
      </div>

      <p className="mb-6 text-zinc-700 dark:text-zinc-400 italic">
        <ChatBubbleBottomCenterTextIcon className="h-5 w-5 inline-block mr-1 text-zinc-400 dark:text-zinc-600" />
        {summary}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <div className="bg-zinc-50 dark:bg-gray-900 border border-zinc-200 dark:border-gray-800 p-3 sm:p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-zinc-700 dark:text-zinc-400">Total Tasks</span>
            <span className="text-2xl font-semibold text-black dark:text-gray-200">{totalTasks}</span>
          </div>
        </div>
        <div className="bg-zinc-50 dark:bg-gray-900 border border-zinc-200 dark:border-gray-800 p-3 sm:p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-zinc-700 dark:text-zinc-400">Completed</span>
            <span className="text-2xl font-semibold text-black dark:text-gray-200">{completedTasks}</span>
          </div>
        </div>
        <div className="bg-zinc-50 dark:bg-gray-900 border border-zinc-200 dark:border-gray-800 p-3 sm:p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-zinc-700 dark:text-zinc-400">Remaining</span>
            <span className="text-2xl font-semibold text-black dark:text-gray-200">{totalTasks - completedTasks}</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {delayedTasks.length > 0 && (
          <div className="border-t border-t-zinc-300 dark:border-zinc-800 pt-4">
            <h3 className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-600 dark:text-red-500 mr-2" />
              Delayed Tasks
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-200 dark:border-zinc-700 rounded-lg">
                <thead className='bg-gray-100 dark:bg-zinc-800 text-left text-sm font-semibold text-gray-700 dark:text-zinc-100'>
                  <tr>
                    <th className="px-4 py-3 whitespace-nowrap">#</th>
                    <th className="px-4 py-3 whitespace-nowrap">Task</th>
                    <th className="px-4 py-3 whitespace-nowrap">Phase</th>
                    <th className='px-4 py-3 whitespace-nowrap'>Delay</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 dark:divide-zinc-700 text-sm text-gray-700 dark:text-zinc-200'>
                  {delayedTasks.map((task, key) => (
                    <tr key={task.id} className="bg-red-50 dark:bg-red-400/5 hover:bg-red-400/10 border border-gray-300 dark:border-zinc-700 dark:hover:bg-red-400/10 transition">
                      <td className="px-4 py-3 whitespace-nowrap">{key + 1}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{task.title}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="flex items-center gap-1">
                          <BookmarkIcon className='w-4 h-4 inline-flex' /> {task.phase}
                        </span>
                      </td>
                      <td className='px-1 py-3 whitespace-nowrap'>
                        <span className="flex items-center justify-center gap-1 text-red-600 dark:text-red-500 border border-red-200 dark:border-red-400/20 px-2 py-0.5 bg-red-100 dark:bg-red-400/10 rounded-full text-sm">
                          <ClockIcon className="h-4 w-4" />
                          <span>{task.timeDifference.toFixed(1)} hrs</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {fastTasks.length > 0 && (
          <div className="border-t border-t-zinc-300 dark:border-zinc-800 pt-4">
            <h3 className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
              <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600" />
              Efficiently Completed Tasks
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-200 dark:border-zinc-700 rounded-lg">
                <thead className='bg-gray-100 dark:bg-zinc-800 text-left text-sm font-semibold text-gray-700 dark:text-zinc-100'>
                  <tr>
                    <th className="px-4 py-3 whitespace-nowrap">#</th>
                    <th className="px-4 py-3 whitespace-nowrap">Task</th>
                    <th className="px-4 py-3 whitespace-nowrap">Phase</th>
                    <th className="px-4 py-3 whitespace-nowrap">Extra</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 dark:divide-zinc-700 text-sm text-gray-700 dark:text-zinc-200'>
                  {fastTasks.map((task, key) => (
                    <tr key={task.id} className="bg-green-50 dark:bg-green-400/5 hover:bg-green-400/10 border border-green-300 dark:border-green-900 dark:hover:bg-green-400/10 transition">
                      <td className="px-4 py-3 whitespace-nowrap">{key + 1}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{task.title}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="flex items-center gap-1">
                          <BookmarkIcon className='w-4 h-4 inline-flex' /> {task.phase}
                        </span>
                      </td>
                      <td className="px-1 py-3 whitespace-nowrap">
                        <span className="flex items-center justify-center gap-1 text-green-600 border border-green-200 dark:border-green-400/20 px-2 py-0.5 bg-green-100 dark:bg-green-400/10 rounded-full text-sm">
                          <ClockIcon className="h-4 w-4" />
                          <span>{task.timeDifference.toFixed(1)} hrs</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {delayedTasks.length === 0 && fastTasks.length === 0 && (
          <div className="text-center text-zinc-500 py-4">
            No completed tasks to analyze yet.
          </div>
        )}
      </div>
    </div>
  );
}