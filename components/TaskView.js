// components/TaskView.js
import { useState, useEffect } from 'react';

export default function TaskView({ task }) {
  const [simplifiedTask, setSimplifiedTask] = useState(null); // State to store simplified task
  // const [userId, setUserId] = useState(null); // State to store data from sessionStorage

  const color = task.category === 'work' 
              ? ['bg-red-500','text-red-500']
              : task.category === 'school' 
              ? ['bg-green-500', 'text-green-500']
              : task.category === 'home' 
              ? ['bg-blue-500','text-blue-500'] 
              : ['bg-purple-500','text-purple-500'];

  // useEffect(() => {
  //   // Fetch tasks only after the component mounts
  //   // Define the function to call the API and fetch the simplified task
  //   const user = JSON.parse(sessionStorage.getItem('user')); // Assuming user is stored as a JSON string
  //   if (user && user.user_id) {
  //     setUserId(user.user_id); // Set user_id if it exists
  //   }
  //   // starterData();
  // }, []);

  const handleButton = async () => {
    try {
      // Make a fetch request to the Next.js API route to simplify the task
      const response = await fetch('/api/openai/simplify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id: task.user_id, task_id: task._id, description: task.description, completed: task.completed }),
      });

      if (!response.ok) {
        throw new Error('Failed to simplify task');
      }

      const result = await response.json();

      // Update the simplified task in the state
      setSimplifiedTask(result.fullText);
    } catch (error) {
      console.error('Error:', error);
      alert('Error simplifying task');
    }
  };

  return (
    
      <div className= {`p-5 ${color[0]} text-white rounded-xl h-full relative`}>
          <h2 className="text-3xl font-bold">{task.name}</h2>
          <p className="mt-4 text-sm font-bold">Complete by: {new Date(task.deadline).toLocaleDateString()}</p>
          <p className="mt-4 font-bold">{simplifiedTask ? simplifiedTask : task.description}</p>
          <div className="flex items-center space-x-2 absolute bottom-4 justify-center mt-6">
          <button
              className={`mt-4 px-4 py-2 bg-white ${color[1]} font-semibold rounded hover:bg-blue-100 transition`}
              onClick={handleButton}
          >
              Simplify task
              
          </button>
          <svg width="36" height="30" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.017 25.2995C19.8573 20.2021 15.7977 16.1426 10.7003 13.9828C15.7977 11.8231 19.8573 7.76352 22.017 2.66616C24.1768 7.76352 28.2363 11.8231 33.3337 13.9828C28.2363 16.1426 24.1768 20.2021 22.017 25.2995Z" stroke="white" strokeWidth="4" strokeLinejoin="round"/>
            <path d="M7.95708 20.0858C7.72015 20.0858 7.48321 20.2049 7.36474 20.4827L7.08832 21.2367C6.0616 23.9751 3.92918 26.1578 1.16493 27.1896L0.414637 27.4674C-0.138212 27.6659 -0.138212 28.4199 0.414637 28.6183L1.16493 28.8961C3.88969 29.928 6.0616 32.071 7.08832 34.8491L7.36474 35.6031C7.48321 35.8809 7.72015 36 7.95708 36C8.19402 36 8.43095 35.8809 8.54942 35.6031L8.82584 34.8491C9.85257 32.1107 11.985 29.928 14.7492 28.8961L15.4995 28.6183C16.0524 28.4199 16.0524 27.6659 15.4995 27.4674L14.7492 27.1896C12.0245 26.1578 9.85257 24.0148 8.82584 21.2367L8.54942 20.4827C8.43095 20.2049 8.19402 20.0858 7.95708 20.0858Z" fill="white"/>
          </svg>
          </div>
          <div className="absolute bottom-3 right-7 scale-125 rotate-[-20deg]">
            <svg width="150" height="180" viewBox="0 0 621 789" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="88.216" y="136.289" width="443.753" height="217.011" rx="16.0393" stroke="white" strokeWidth="32.0785"/>
              <rect x="16.0393" y="411.147" width="588.107" height="360.882" rx="16.0393" stroke="white" strokeWidth="32.0785"/>
              <line x1="80.1963" y1="288.881" x2="537.315" y2="288.881" stroke="white" strokeWidth="32.0785"/>
              <line x1="168.412" y1="279.152" x2="168.412" y2="369.34" stroke="white" strokeWidth="32.0785"/>
              <line x1="518.604" y1="505.63" x2="181.779" y2="505.63" stroke="white" strokeWidth="32.0785"/>
              <line x1="518.603" y1="589.375" x2="181.778" y2="589.375" stroke="white" strokeWidth="32.0785"/>
              <line x1="518.604" y1="670.974" x2="181.779" y2="670.974" stroke="white" strokeWidth="32.0785"/>
              <line x1="459.793" y1="279.152" x2="459.793" y2="369.34" stroke="white" strokeWidth="32.0785"/>
              <line x1="358.211" y1="279.152" x2="358.211" y2="369.34" stroke="white" strokeWidth="32.0785"/>
              <line x1="261.975" y1="279.152" x2="261.975" y2="369.34" stroke="white" strokeWidth="32.0785"/>
              <line x1="310.093" y1="47.241" x2="310.093" y2="137.429" stroke="white" strokeWidth="32.0785"/>
              <ellipse cx="169.749" cy="209.364" rx="41.4348" ry="33.2836" fill="white"/>
              <ellipse cx="114.949" cy="502.474" rx="29.4053" ry="23.6206" fill="white"/>
              <ellipse cx="114.949" cy="586.22" rx="29.4053" ry="23.6206" fill="white"/>
              <ellipse cx="114.948" cy="667.818" rx="29.4053" ry="23.6206" fill="white"/>
              <ellipse cx="447.763" cy="209.364" rx="41.4348" ry="33.2836" fill="white"/>
              <ellipse cx="310.093" cy="33.2836" rx="42.7714" ry="33.2836" fill="white"/>
            </svg>
          </div>
      </div>
  );
}
