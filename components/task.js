import React, { useState, useEffect } from 'react';

const TaskPopup = ({ close, addNewTask }) => {
    const [taskName, setTaskName] = useState('');
    const [taskCategory, setTaskCategory] = useState('work');
    const [taskPriority, setTaskPriority] = useState(5);
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDeadline, setTaskDeadline] = useState('');
    const [userId, setUserId] = useState(null);
    const [userTaskLength, setUserTaskLength] = useState(null);
  
    // Fetch user_id from sessionStorage when the component mounts
    useEffect(() => {
      const user = JSON.parse(sessionStorage.getItem('user'));
      if (user && user._id) {
        setUserId(user._id);
        setUserTaskLength(user.tasks.length);
      }
    }, []);

    const handleSubmit = async () => {
      const newTask = {
        name: taskName,
        user_id: userId,
        category: taskCategory,
        priority: taskPriority,
        description: taskDescription,
        deadline: new Date(taskDeadline),
        completed: false,
        creation_date: new Date(),
        completion_date: null,
        difficulty: 0,
        importance: 0
      };
      
      try {
        const importanceResponse = await fetch('/api/openai/importance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTask),
        });

        const responseTask = await importanceResponse.json();

        newTask.importance = Number(responseTask.score);

        // Send a POST request to the internal API
        const response = await fetch('/api/tasks/createTask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTask),
        });
  
        if (!response.ok) {
          // If the response status is not OK (e.g., 400 or 500), throw an error
          throw new Error('Failed to create task');
        }
  
        const result = await response.json();
        console.log('Task created successfully:', result);
  
        // Call the addNewTask function (to update the UI or state outside the modal)
        //addNewTask(newTask);
  
        // Close the modal
        // TODO: This causes the whole page to reload when exiting modal.
        //    This was intended initially to reload the text in the bubbles but its annoying and theres a better way.
        //    Maybe have some event update all frontend ui components that use that text whenever the server updates the text.
        close();
        window.location.href = '/home';
      } catch (error) {
        console.error('Error creating task:', error);
      }
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