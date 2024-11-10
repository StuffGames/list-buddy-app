export default function HomePage() {
    return (
        <div className="pl-7">
            <h1 className="text-blue-700 text-5xl font-black mt-6 mb-10">
            ListBuddy
            </h1>
            <div className="task-container">
                <h2 className="text-4xl">Active tasks:</h2>
                    <div className="pl-6">
                    <input type="checkbox" className="task-1"
                        name="task1" value="task1" />
                    <label htmlFor="task-1" className="text-2xl"> Buy Christmas gifts</label><br />
                    <p className="text-gray-500 text-sm ml-5">Due Dec. 20th, 12:00pm</p> {/* Smaller gray text */}

                    <input type="checkbox" className="task-2"
                        name="task2" value="task2" />
                    <label htmlFor="task-2" className="text-2xl"> Weekly Reading Assignment</label><br />
                    <p className="text-gray-500 text-sm ml-5">Due Nov. 8, 8:00am</p> {/* Smaller gray text */}
                    </div>

                    <h2 className="text-4xl">Completed tasks:</h2>
                    <div className="pl-6">
                    <input type="checkbox" className="task-3"
                        name="task3" value="task3" />
                    <label htmlFor="task-3" className="text-2xl"> Laundry </label><br />
                    <p className="text-gray-500 text-sm ml-5">Completed Nov. 6, 6:24pm</p> {/* Smaller gray text */}

                    <input type="checkbox" className="task-4"
                        name="task4" value="task4" />
                    <label htmlFor="task-4" className="text-2xl"> Daily run </label><br />
                    <p className="text-gray-500 text-sm ml-5">Completed Nov. 7, 10:01am</p> {/* Smaller gray text */}

                    <input type="checkbox" className="task-5"
                        name="task5" value="task5" />
                    <label htmlFor="task-5" className="text-2xl"> History 284 Essay</label><br />
                    <p className="text-gray-500 text-sm ml-5">Due Nov. 7, 2:31pm</p> {/* Smaller gray text */}
                </div>
            </div>
      </div>
    );
}
