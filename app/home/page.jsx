'use client'
import React, { useEffect, useState } from 'react';
import TaskPopup from '../../components/task.js';
import TaskView from '../../components/TaskView.js'; 

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [showActive, setShowActive] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);
  const [modalOpen, setModalOpen] = useState(false); // TaskPopup modal
  const [taskViewOpen, setTaskViewOpen] = useState(false); // TaskView modal
  const [selectedTask, setSelectedTask] = useState(null); // Currently selected task

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch tasks only after the component mounts
    const starterData = async () => {
      try {
        // Ensure sessionStorage is accessed only in the client-side
        const userData = JSON.parse(sessionStorage.getItem("user"));
        if (!userData) {
          throw new Error("No user data found in sessionStorage");
        }

        // IF DOESN'T WORK JUST READ DATA FROM SESSION STORAGE???
        const response = await fetch('/api/tasks/getTasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userData.user_id }), // Send the user_id in the request body
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Something went wrong.');
        }

        const allTasks = await response.json();
        setTasks(allTasks.totalTasks);
      } catch (err) {
        setError('Failed to get initial data.');
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched or an error occurs
      }
    };

    starterData();
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleToggleActive = () => setShowActive(!showActive);
  const handleToggleCompleted = () => setShowCompleted(!showCompleted);

  // Handler for checkbox change
  const handleCheckboxChange = (taskName) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.name === taskName
          ? {
              ...task,
              completed: !task.completed,
              completion_date: !task.completed ? new Date() : null,
            }
          : task
      )
    );
  };

  // Open TaskView modal for a specific task
  const openTaskView = (task) => {
    setSelectedTask(task);
    setTaskViewOpen(true);
  };

  // Close TaskView modal
  const closeTaskView = () => {
    setTaskViewOpen(false);
    setSelectedTask(null);
    window.location.href = '/home';
  };

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="w-1/3 bg-white border-r p-4 min-h-screen">
        <h1 className="text-3xl font-bold text-blue-500 mb-4">ListBuddy</h1>

        {/* Active Tasks */}
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

        {/* Completed Tasks */}
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

      {/* Right Panel (Grid of Tasks) */}
      <div className="flex-1 bg-gray-100 p-4 grid gap-4 grid-cols-5">
        {activeTasks
          .sort((a, b) => a.importance - b.importance) // Sort by importance in ascending order
          .map((task, index) => {
            const daysUntilDeadline = Math.ceil(
              (new Date(task.deadline) - new Date()) / (1000 * 60 * 60 * 24)
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
                key={index}
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
          })}
      </div>

      {/* TaskView Modal */}
      {taskViewOpen && selectedTask && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeTaskView} // Close the modal when clicking the background
        >
        <div
          className="bg-white p-4 rounded-2xl w-full max-w-lg h-full"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        >
      <TaskView task={selectedTask} />
    </div>
  </div>
)}

      {/* Add New Task Button */}
      <div className="absolute bottom-4 right-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600"
          onClick={() => setModalOpen(true)}
        >
          + New Task
        </button>
      </div>

      {/* TaskPopup Modal */}
      {modalOpen && (
        <TaskPopup close={() => setModalOpen(false)} addNewTask={addNewTask} />
      )}
    </div>
  );
};

// Pseudo-code functions for navigating to profile and settings
const navigateToProfile = () => {
  console.log('Navigate to profile page');
};

const navigateToSettings = () => {
  console.log('Navigate to settings page');
};

// Pseudo-code for adding a new task
const addNewTask = () => {
  console.log('Add a new task');
};

export default HomePage;