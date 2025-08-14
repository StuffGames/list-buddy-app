/**
 * Configuration options for creating a task bubble
 */
interface TaskBubbleOptions {
  task: any;
  openTaskView: (task: any) => void;
  handleCheckboxChange: (taskName: string) => void;
};

/**
 * Renders a bubble for a specific task to display in the main page view
 * @param options Configuration options for the bubble
 * @returns Rendered bubble with task info
 */
function TaskBubble(options: TaskBubbleOptions) {
  const {
    task,
    openTaskView,
    handleCheckboxChange
  } = options;

  const daysUntilDeadline = Math.ceil(
    (new Date(task.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  const boxSize = task.priority <= 2 
    ? 'col-span-2 row-span-2' 
    : task.priority <= 4 
    ? 'col-span-2 row-span-2' 
    : 'col-span-2 row-span-2';
  const color = task.category === 'work' 
    ? 'bg-red-500' 
    : task.category === 'school' 
    ? 'bg-green-500' 
    : task.category === 'home' 
    ? 'bg-blue-500' 
    : 'bg-purple-500';

  return (
    <div
      key={task.id}
      className={`${boxSize} ${color} p-4 text-white rounded-lg relative cursor-pointer`}
      onClick={() => openTaskView(task)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent parent click event
          handleCheckboxChange(task.name);
        }}
        className="absolute top-2 right-2 w-6 h-6"
      >
        {/* Nothing changes with the below thing, investigate please */}
        {task.completed ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="16" height="16" fill="white" stroke="black" strokeWidth="2"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="16" height="16" fill="white" stroke="black" strokeWidth="2"/>
          </svg>
        )}
      </button>
      <h3 className="font-semibold">{task.name}</h3>
      <p className="text-sm">{task.description}</p>
      <div className="mt-4 text-sm font-semibold">
        {daysUntilDeadline > 30
          ? `Due in ${Math.floor(daysUntilDeadline / 30)} months`
          : `Due in ${daysUntilDeadline} days`}
      </div>
    </div>
  );
};

export { TaskBubble };