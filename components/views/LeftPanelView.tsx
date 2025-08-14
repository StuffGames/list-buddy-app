import { useState } from 'react';

/**
 * Represents options for the LeftPanelview
 */
interface LeftPanelViewOptions {
  tasks: any[]; // TODO: change type later on
  // Passing function because we want the change to happen at the uppermost level
  handleCheckboxChange: (taskName: string) => void
};

/**
 * Renders a left panel on a page that will contain tasks titles separated by completeness
 * @param options Configuration options for this component
 * @returns LeftPanel React component
 */
function LeftPanelView(options: LeftPanelViewOptions) {
  const {
    tasks,
    handleCheckboxChange
  } = options;

  const [showActive, setShowActive] = useState<boolean>(true);
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  
  const handleToggleActive = () => setShowActive(!showActive);
  const handleToggleCompleted = () => setShowCompleted(!showCompleted);
  
  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="w-1/3 bg-white border-r p-4 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">ListBuddy</h1>

      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-black">Active tasks:</h2>
          <button className="text-black" onClick={handleToggleActive}>{showActive ? '▲' : '▼'}</button>
        </div>
        {showActive && (
          <ul className="space-y-2 mt-2">
            {activeTasks.map((task, index) => (
              <li key={index} className="flex justify-between items-center">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleCheckboxChange(task.name)}
                  />
                  <span className="ml-2 text-black" >{task.name}</span>
                </div>
                <div className="text-sm text-black">
                  Due {new Date(task.deadline).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-black">Completed tasks:</h2>
          <button className="text-black" onClick={handleToggleCompleted}>{showCompleted ? '▲' : '▼'}</button>
        </div>
        {showCompleted && (
          <ul className="space-y-2 mt-2">
            {completedTasks.map((task, index) => (
              <li key={index} className="flex justify-between items-center">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleCheckboxChange(task.name)}
                  />
                  <span className="ml-2 line-through text-black">{task.name}</span>
                </div>
                <div className="text-sm text-black">
                  Completed {task.completion_date?.toLocaleDateString()}
                </div>
                {task.completion_date <= (new Date(task.deadline)) && (
                  <svg width="23" height="22" viewBox="0 0 46 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.279 1.90679C22.0535 0.59869 23.9465 0.598689 24.721 1.90679L30.7152 12.0311C30.9962 12.5058 31.4607 12.8433 31.9989 12.9638L43.4801 15.5361C44.9635 15.8684 45.5485 17.6688 44.5437 18.8096L36.7672 27.639C36.4026 28.0529 36.2252 28.599 36.2768 29.1481L37.3784 40.8622C37.5207 42.3757 35.9892 43.4884 34.5938 42.8854L23.7934 38.2179C23.2871 37.9991 22.7129 37.9991 22.2066 38.2179L11.4062 42.8853C10.0108 43.4884 8.47931 42.3757 8.62163 40.8622L9.72317 29.1481C9.77481 28.599 9.59737 28.0529 9.23282 27.639L1.4563 18.8096C0.451543 17.6688 1.03652 15.8684 2.51993 15.5361L14.0011 12.9638C14.5393 12.8433 15.0038 12.5058 15.2848 12.0311L21.279 1.90679Z" fill="#FFE100"/>
                  </svg>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export { LeftPanelView };