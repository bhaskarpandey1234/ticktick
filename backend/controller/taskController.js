const { Task, Recurrence } = require('../db/models');

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;
    console.log(req.body,"req body");

    const parsedDate = new Date(dueDate);
if (isNaN(parsedDate)) {
  return res.status(400).json({ message: 'Invalid date format' });
}
console.log(req.user,"userid");
    const task = await Task.create({
      title,
      description,
      dueDate:parsedDate,
      isCompleted: false,
      status,
      priority,
      userId: req.user.userId,
    });
  
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error',error});
  }
};
exports.getTaskById=async (req,res)=>{
  try {
    const {taskId}=req.params;
    const task= await Task.findOne({where:{id:taskId, userId:req.user.userId}});
    res.status(200).json(task);
  } catch (error) {
   res.status(500).json({message:"server error",error});
  }
}

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.userId },
      include: [{ model: Recurrence }],
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    console.log(req.body,"req body");
    // const id=req.user.userId;
    const task = await Task.findOne({ where: { id:taskId, userId: req.user.userId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.update(req.body);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    // const id=req.user.userId;
    const task = await Task.findOne({ where: { id:taskId, userId: req.user.userId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.destroy();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
