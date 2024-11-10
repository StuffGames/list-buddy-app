import { Task } from './task-objects';

class TaskApi {

    /**
     * Create a Task object from the provided parameters
     * 
     * @param user_id 
     * @param task_id 
     * @param deadline 
     * @param category 
     * @param description 
     * @param priority 
     * @param difficulty 
     * @returns 
     */
    static createTask(user_id: Number, task_id: Number, deadline: string, category: string, description: string,
        priority: Number = 0, difficulty: Number = 0
    ): Task {

        let d: Date = new Date(deadline);
        return new Task(user_id, task_id, d, category, description, priority, difficulty);
    }
}

export {TaskApi};