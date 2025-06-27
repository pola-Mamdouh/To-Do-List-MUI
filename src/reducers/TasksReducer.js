import {v4 as uuidv4} from 'uuid'
export default function TasksReducer(currentTasks, action) {
    switch(action.type) {
        case "added":{ 
        const newTask =  {              
                id: uuidv4(),
                title: action.payload.newTaskTitle,
                desc: action.payload.newTaskDesc,
                isCompleted: false,
                completedTime: '',
            }

            return [...currentTasks, newTask]
        }
        case "deleted" : {
            return currentTasks.filter((task) => task.id !== action.payload.taskId)
        }
        case "done" : {
            return currentTasks.map((task) =>
        task.id === action.payload.taskId ? { ...task, isCompleted: true } : task)
        }
        case "toggleDoneBtn" : {
            const dateNow = new Date();
            return currentTasks.map((task) => {
                if (task.id === action.payload.taskId) {
                    const newStatus = !task.isCompleted;
                    return {
                        ...task,
                        isCompleted: newStatus,
                        completedTime: newStatus ? dateNow.toLocaleString() : null,
                    };
                }
                return task;
            });
        }
        case "updated": {
            // Update a task's title and description by id
            const { id, title, desc } = action.payload;
            return currentTasks.map((task) =>
                task.id === id ? { ...task, title, desc } : task
            );
        }
        default: 
        throw Error("Unknown Action" + action.type)
}
}
