import React, { useState } from 'react'; // Import useState

const TaskPopup = ({ close, addNewTask }) => {
    const [taskName, setTaskName] = useState('');
    const [taskCategory, setTaskCategory] = useState('work');
    const [taskPriority, setTaskPriority] = useState(5);
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDeadline, setTaskDeadline] = useState('');
  
    const handleSubmit = () => {
      const newTask = {
        name: taskName,
        category: taskCategory,
        priority: taskPriority,
        description: taskDescription,
        deadline: new Date(taskDeadline),
        completed: false,
        creation_date: new Date(),
        completion_date: null,
      };
  
      addNewTask(newTask); // Add the new task
      close(); // Close the modal
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
        <div className="bg-white p-6 rounded-lg w-1/3">
          <h2 className="text-xl font-semibold mb-4 text-slate-700">Create New Task</h2>
          <input
            type="text"
            style={{ color: 'black' }}
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full p-2 border mb-4"
          />
          <textarea
            type="text"
            style={{ color: 'black' }}
            placeholder="Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full p-2 border mb-4"
          />
          <input
            type="date"
            style={{ color: 'black' }}
            value={taskDeadline}
            onChange={(e) => setTaskDeadline(e.target.value)}
            className="w-full p-2 border mb-4"
          />
          <div className="flex justify-between mb-4">
            <select
              value={taskCategory}
              style={{ color: 'black' }}
              onChange={(e) => setTaskCategory(e.target.value)}
              className="w-1/3 p-2 border"
            >
              <option value="work">Work</option>
              <option value="school">School</option>
              <option value="home">Home</option>
            </select>
            <select
              value={taskPriority}
              style={{ color: 'black' }}
              onChange={(e) => setTaskPriority(Number(e.target.value))}
              className="w-1/3 p-2 border"
            >
              <option value="1">1 (low priority)</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5 (high priority)</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button onClick={close} className="bg-gray-500 text-white p-2 rounded-md">
              Cancel
            </button>
            <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded-md">
              Create Task
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default TaskPopup;