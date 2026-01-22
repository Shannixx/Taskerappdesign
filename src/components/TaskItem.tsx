import { Task } from '../App';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  isLast?: boolean;
}

export function TaskItem({ task, onToggle, isLast = false }: TaskItemProps) {
  return (
    <div className={`flex items-center gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors group ${!isLast ? 'border-b border-slate-100' : ''}`}>
      <button
        onClick={onToggle}
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          task.completed
            ? 'bg-teal-600 border-teal-600 scale-100'
            : 'border-slate-300 hover:border-teal-500 group-hover:border-slate-400'
        }`}
      >
        {task.completed && (
          <svg
            className="w-3.5 h-3.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>
      <span className={`flex-1 transition-all ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
        {task.title}
      </span>
    </div>
  );
}