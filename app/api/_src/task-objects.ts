
class Subtask {
    Subtask(subtask_id: Number, content: String) {
        let _subtask_id = subtask_id;
        let _content = content;
    }
}

class Task implements DB_Object {

    private user_id: Number;
    private task_id: Number;
    private deadline: Date;
    private category: String;
    private description: String;
    private priority: Number;
    private difficulty: Number;
    private importance: Number;

    constructor(user_id: Number, task_id: Number, deadline: Date = new Date(Date.now()), category: String, description: String,
        priority:Number =0, difficulty: Number = 0, importance: Number = 0) {
            this.user_id = user_id;
            this.task_id = task_id;
            this.deadline = deadline;
            this.category = category;
            this.description = description;
            this.priority = priority;
            this.difficulty = difficulty;
            this.importance = importance;
    }

    getId(): Number {
        return this.task_id;
    }
}

export {Task};