import React from 'react';

interface FooterProps {
  activeCount: number
  hasCompleted: boolean
  filter: 'all' | 'active' | 'completed'
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void
  onClearCompleted: () => void
}

export const TodoCardFooter = ({
  activeCount,
  hasCompleted,
  filter,
  onFilterChange,
  onClearCompleted
}: FooterProps) => {
  return (
    <div className="border-t grid grid-cols-6 pt-3 flex items-center">
      <div  className="col-span-1 sm:col-span-2 text-sm text-gray-500">
        {activeCount} {activeCount === 1 ? 'task': 'tasks'} left
      </div>
        <div className="col-span-5 sm:col-span-4 text-sm text-gray-500 gap-x-1 flex justify-end">
          <FilterButton selected={filter === 'all'} onClick={() => onFilterChange('all')}>All</FilterButton>
          <FilterButton selected={filter === 'active'} onClick={() => onFilterChange('active')}>Active</FilterButton>
          <FilterButton selected={filter === 'completed'} onClick={() => onFilterChange('completed')}>Completed</FilterButton>
          {hasCompleted && (
            <button
              onClick={onClearCompleted}
              className="text-sm  text-gray-500 hover:text-gray-700 transition-colors"
            >
              Clear completed
            </button>
          )}
        </div>
    </div>
  );
}


interface FilterButtonProps {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}
const FilterButton = ({ selected, onClick, children }: FilterButtonProps) => (
  <button
    className={`px-2 py-1 rounded cursor-pointer ${selected ? 'bg-green-500 text-white' : 'hover:bg-green-100 transition-colors'}`}
    onClick={onClick}
  >
    {children}
  </button>
)
