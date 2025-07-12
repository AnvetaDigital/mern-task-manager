import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

//protect all routes
router.use(auth);

router.post('/createTask', createTask);
router.get('/getTask', getTasks);
router.put("/updateTask/:id", updateTask);
router.delete('/deleteTask/:id', deleteTask);

export default router;