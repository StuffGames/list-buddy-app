class Subtask {
    Subtask(subtask_id: Number, content: String) {
        let _subtask_id = subtask_id;
        let _content = content;
    }
}

class Task {
    user_id: Number;
    task_id: Number;
    deadline: Date;
    category: String;
    description: String;
    priority: Number;
    difficulty: Number;

    constructor(user_id: Number, task_id: Number, deadline: Date, category: String, description: String,
        priority:Number =0, difficulty: Number = 0) {
            this.user_id = user_id;
            this.task_id = task_id;
            this.deadline = deadline;
            this.category = category;
            this.description = description;
            this.priority = priority;
            this.difficulty = difficulty;
    }
}

export {Task};