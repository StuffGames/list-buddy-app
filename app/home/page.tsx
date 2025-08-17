'use client';
import React, { useEffect, useState } from 'react';
import CreateTaskModal from '../../components/CreateTaskModal';
import TaskView from '../../components/views/TaskView';
import { LeftPanelView } from '../../components/views/LeftPanelView';
import { MainTasksView } from '../../components/views/MainTasksView';

// TODO: fix all "any" types that are being thrown around
const HomePage = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [taskViewOpen, setTaskViewOpen] = useState<boolean>(false);
  // TODO: create a type for tasks, or an interface
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Fetch tasks only after the component mounts
    const starterData = async () => {
      try {
        // Ensure sessionStorage is accessed only in the client-side
        const userData = JSON.parse(sessionStorage.getItem('user') || ''); // will throw an error
        if (!userData) {
          throw new Error('No user data found in sessionStorage');
        }

        // IF DOESN'T WORK JUST READ DATA FROM SESSION STORAGE???
        const response = await fetch('/api/tasks/getTasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userData._id }),
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
        setLoading(false);
      }
    };

    starterData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // TODO: Create an API call for this or something
  //      This should be a server side operation
  const handleCheckboxChange = (taskName: string) => {
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

  const openTaskView = (task: any) => {
    setSelectedTask(task);
    setTaskViewOpen(true);
  };

  const closeTaskView = () => {
    setTaskViewOpen(false);
    setSelectedTask(null);
    // TODO: again, let's find a way around having to refresh the page.
    //      initial thoughts are just having another fetch to the database (maybe some caching?).
    window.location.href = '/home';
  };

  return (
    <div className="flex min-h-screen">
      <LeftPanelView
        tasks={tasks}
        handleCheckboxChange={handleCheckboxChange}
      />
      <MainTasksView
        tasks={tasks}
        handleCheckboxChange={handleCheckboxChange}
        openTaskView={openTaskView}
      />

      {/* Task View stuff (look into this a little more) */}
      {taskViewOpen && selectedTask &&
        // FIXME: Creates a div that fills the screen so that if clicked outside it would close the view
        //      But I feel there is a more elegant way to do this
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
      }

      {/* New Task button (separate into a component) */}
      {newTaskButton({ setModalOpen })}

      {/* Create Task modal stuff */}
      {modalOpen && <CreateTaskModal close={() => setModalOpen(false)} addNewTask={addNewTask} /> }
    </div>
  );
};


const newTaskButton = ({ setModalOpen } : { setModalOpen: (state: boolean) => void}) => (
  <div className="fixed bottom-4 right-4">
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600"
      onClick={() => setModalOpen(true)}
    >
      + New Task
    </button>
  </div>
);

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