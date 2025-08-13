import { TaskBubble } from "../TaskBubble";

/**
 * Represents configuration options for the MainTasksView component
 */
interface MainTasksViewOptions {
  // TODO: change types to predefined types
  tasks: any[];
  handleCheckboxChange: (taskName: string) => void;
  openTaskView: (task: any) => void;
};

/**
 * Will render the main view with task bubbles
 * @param options Configuration options for this component
 * @returns Rendered task bubbles view
 */
function MainTasksView(options: MainTasksViewOptions) {
  const {
    tasks,
    handleCheckboxChange,
    openTaskView
  } = options;

  const activeTasks = tasks.filter((task) => !task.completed);
  // Sort by importance in ascending order
  const sortedTasks = activeTasks.sort((a, b) => a.importance - b.importance);

  return (
    <div className="flex-1 bg-gray-100 p-4 grid gap-4 grid-cols-5">
      {sortedTasks.map((task: any) => (
            <TaskBubble
              task={task}
              openTaskView={openTaskView}
              handleCheckboxChange={handleCheckboxChange}
            />
        ))}
    </div>
  );
};

export { MainTasksView };