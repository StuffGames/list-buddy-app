import React from "react";

export default function HomePage() {
    return (
        <div id="task-list">
            <div id="task-heading">
                <h1>ListBuddy</h1>
            </div>
            <div id="all-task-container">
                <div id="task-container">
                    <div className="avail-tasks">
                        
                        <div className="search">
                            <input type="text" placeholder="Search for a task"/>
                        </div>
                        
                        <div className="active-tasks">
                            <h2>Active tasks:</h2>
                            <button className="task-1">Buy Christmas gifts</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}