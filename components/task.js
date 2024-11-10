export default function TaskPopup() {
    
      // Function to create a new task (for now it just logs the task)
  const createTask = () => {
    if (!taskName || !dueDate) {
      alert('Please fill in both fields.');
      return;
    }
    const newTask = { taskName, dueDate };
    console.log('New Task Created:', newTask);
    
    // Clear inputs after task creation
    setTaskName('');
    setDueDate('');
    };

    return(
        <Popup
      trigger={<button className="bg-blue-500 text-white p-2 rounded">+ New Task</button>}
      modal
      nested
    >
      {(close) => (
        <div className="modal bg-white p-6 rounded-lg shadow-lg">
          <div className="modal-header text-center mb-4">
            <h2 className="text-xl font-semibold">New Task</h2>
          </div>

          {/* Task Name Input */}
          <div className="mb-4">
            <label
              htmlFor="tname"
              className="block text-sm font-medium text-slate-500"
            >
              Task Name
            </label>
            <input
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="tname"
              name="tname"
              value={taskName}
              placeholder="Enter task name"
              required
            />
          </div>

          {/* Due Date Input */}
          <div className="mb-4">
            <label
              htmlFor="ddate"
              className="block text-sm font-medium text-slate-500"
            >
              Due Date
            </label>
            <input
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="date"
              id="ddate"
              name="ddate"
              value={dueDate}
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="modal-footer flex justify-between">
            <button
              onClick={createTask}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Create Task
            </button>
            <button
              onClick={() => {
                close(); // Close the modal
                setTaskName(''); // Clear inputs
                setDueDate('');
              }}
              className="bg-gray-300 text-black p-2 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Popup>
        
    );
}