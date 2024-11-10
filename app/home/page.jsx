'use client'
import React, { useState } from 'react';

const initialTasks = [
  {
    name: 'Implement New Task Form',
    deadline: new Date('2024-12-20'),
    description: '...',
    difficulty: 3,
    category: 'work',
    completed: false,
    completion_date: null,
    priority: 2,
    importance: 0,
  },
  {
    name: 'Break it Down',
    deadline: new Date('2024-11-11'),
    description: '...',
    difficulty: 2,
    category: 'school',
    completed: false,
    completion_date: null,
    priority: 2,
    importance: .1,
  },
  {
    name: 'Get server running',
    deadline: new Date('2024-11-06'),
    description: '...',
    difficulty: 1,
    category: 'home',
    completed: false,
    completion_date: null,
    priority: 1,
    importance: .2,
  },
  {
    name: 'Weekly Reading Assignment 2',
    deadline: new Date('2023-11-11'),
    description: 'Complete weekly reading for class.',
    difficulty: 2,
    category: 'school',
    completed: false,
    completion_date: null,
    priority: 2,
    importance: .3,
  },
  {
    name: 'Laundry 2',
    deadline: new Date('2024-11-06'),
    description: 'Do the laundry.',
    difficulty: 1,
    category: 'home',
    completed: true,
    completion_date: new Date('2024-11-06'),
    priority: 1,
    importance: .4,
  },
  {
    name: 'item',
    deadline: new Date('2023-11-11'),
    description: 'Complete weekly reading for class.',
    difficulty: 2,
    category: 'school',
    completed: false,
    completion_date: null,
    priority: 2,
    importance: .5,
  },
  {
    name: 'Buy Christmas Gifts 2',
    deadline: new Date('2024-12-20'),
    description: 'Buying gifts for family and friends.',
    difficulty: 3,
    category: 'work',
    completed: false,
    completion_date: null,
    priority: 2,
    importance: .6,
  },
  {
    name: 'Buy Christmas Gifts 3',
    deadline: new Date('2024-12-20'),
    description: 'Buying gifts for family and friends.',
    difficulty: 3,
    category: 'work',
    completed: false,
    completion_date: null,
    priority: 2,
    importance: .7,
  },
  {
    name: 'Buy Christmas Gifts 4',
    deadline: new Date('2024-12-20'),
    description: 'Buying gifts for family and friends.',
    difficulty: 3,
    category: 'work',
    completed: false,
    completion_date: null,
    priority: 2,
    importance: .8,
  },
  // Add more tasks here as needed
];

const HomePage = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [showActive, setShowActive] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);

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

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <body>
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
                    Due {task.deadline.toLocaleDateString()}
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
                  {task.completion_date <= task.deadline && (
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
        (task.deadline - new Date()) / (1000 * 60 * 60 * 24)
      );
      const boxSize = task.priority <= 2 
        ? 'col-span-2 row-span-2' 
        : task.priority <= 4 
        ? 'col-span-3 row-span-3' 
        : 'col-span-4 row-span-4';
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
          className={`${boxSize} ${color} p-4 text-white rounded-lg relative`}
        >
          <button
                onClick={() => handleCheckboxChange(task.name)}
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

      {/* Icons and Buttons */}
      <div className="absolute bottom-4 right-4 flex items-center space-x-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600">
          + New Task
        </button>
      </div>

      {/* Profile and Settings Icons */}
      <div className="absolute top-0 right-0 flex">
        <button className = "scale-75" onClick={() => navigateToProfile()}>
          <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25.5" cy="25.5" r="24" fill="white" stroke="black" strokeWidth="3"/>
            <circle cx="26" cy="20" r="9.5" fill="white" stroke="black" strokeWidth="3"/>
            <path d="M10.0192 44C9.69146 39.5 13.4943 35 25.7529 35C38.0115 35 41 41.3 41 44" stroke="black" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </button>
        <button className = "scale-75" onClick={() => navigateToSettings()}>
          <svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="43" cy="43" r="8.58642" stroke="black" strokeWidth="3"/>
            <path d="M30.0682 25.4027C33.7954 27.7563 38.7297 25.7125 39.701 21.4126C40.4952 17.8967 45.5048 17.8967 46.299 21.4126C47.2703 25.7125 52.2046 27.7563 55.9319 25.4027C58.9795 23.4781 62.5219 27.0205 60.5973 30.0681C58.2437 33.7954 60.2875 38.7297 64.5874 39.701C68.1033 40.4952 68.1033 45.5048 64.5874 46.299C60.2875 47.2703 58.2437 52.2046 60.5973 55.9319C62.5219 58.9795 58.9795 62.5219 55.9319 60.5973C52.2046 58.2437 47.2703 60.2875 46.299 64.5874C45.5048 68.1033 40.4952 68.1033 39.701 64.5874C38.7297 60.2875 33.7954 58.2437 30.0681 60.5973C27.0205 62.5219 23.4781 58.9795 25.4027 55.9319C27.7563 52.2046 25.7125 47.2703 21.4126 46.299C17.8967 45.5048 17.8967 40.4952 21.4126 39.701C25.7125 38.7297 27.7563 33.7954 25.4027 30.0681C23.4781 27.0205 27.0205 23.4781 30.0682 25.4027Z" stroke="black" strokeWidth="3"/>
          </svg>
        </button>
      </div>
    </div>
    </body>
  );
};

// Pseudo-code functions for navigating to profile and settings
const navigateToProfile = () => {
  // Navigate to profile page
  console.log('Navigate to profile page');
};

const navigateToSettings = () => {
  // Navigate to settings page
  console.log('Navigate to settings page');
};

// Pseudo-code for adding a new task
const addNewTask = () => {
  // Function to add a new task
  console.log('Add a new task');
};

export default HomePage;
