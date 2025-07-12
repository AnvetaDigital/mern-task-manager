import Task from '../models/Task.js';

//Create Task
export const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority } = req.body;
        const task = new Task({
            userId: req.userId,
            title,
            description,
            dueDate,
            priority,
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({message: 'Failed to create Task', error: error.message})
    }
}
//Get all tasks
export const getTasks = async (req, res) => {
    try {
        const { status, priority, title } = req.query;
        const query = { userId: req.userId };

        if (status) {
            query.status = status;
        }
        if (priority) {
            query.priority = priority;
        }
        if (title) {
          query.title = { $regex: title, $options: "i" };
        }

        const tasks = await Task.find(query).sort({ createdAt: 1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
    }
}

//Update Task
export const updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate({
            _id: req.params.id, userId: req.userId
        }, req.body,
            { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update task', error: error.message });
    }
}

//Delete Task
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete task', error: error.message });
    }
}

