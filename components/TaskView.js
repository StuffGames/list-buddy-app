// components/TaskView.js

export default function TaskView({ task }) {
  return (
      <div className="p-4 bg-blue-500 text-white rounded-lg">
          <h2 className="text-xl font-bold">{task.name}</h2>
          <p className="mt-2 text-sm">Complete by: {task.deadline.toLocaleDateString()}</p>
          <p className="mt-4">{task.description}</p>
          <button
              className="mt-4 px-4 py-2 bg-white text-blue-500 font-semibold rounded hover:bg-blue-100 transition"
              onClick={() => {
                  // Pseudocode: Simplify task by prompting ChatGPT
                  console.log("Prompting ChatGPT to simplify the task");
              }}
          >
              Simplify task ✨
          </button>
          {/* Pseudocode for Robot SVG */}
          <div className="absolute bottom-4 right-4">
              {/* Replace with an actual SVG */}
              <svg width="50" height="50" fill="white">
                  {/* SVG code for the robot */}
              </svg>
          </div>
      </div>
  );
}
