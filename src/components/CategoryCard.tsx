import { Category } from '../App';

interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
}

export function CategoryCard({ category, isSelected, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-white rounded-xl p-6 text-left transition-all hover:shadow-md border ${
        isSelected 
          ? 'border-slate-300 shadow-md ring-2 ring-slate-200' 
          : 'border-slate-200/60 hover:border-slate-300'
      }`}
    >
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${category.color}`}>
        <span className="text-lg">{category.taskCount}</span>
      </div>
      <div className="text-slate-800">{category.name}</div>
      <div className="text-xs text-slate-400 mt-1">
        {category.taskCount} {category.taskCount === 1 ? 'task' : 'tasks'}
      </div>
    </button>
  );
}