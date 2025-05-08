const { Recurrence, Task } = require('../db/models');

exports.createRecurrence = async (req, res) => {
  try {
    const { taskId, frequency, interval, daysOfWeek, startDate, endDate } = req.body;

    // Verify task ownership
    const task = await Task.findOne({ where: { id: taskId, userId: req.user.userId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const recurrence = await Recurrence.create({
      taskId,
      frequency,
      interval,
      daysOfWeek,
      startDate,
      endDate,
    });
    res.status(201).json(recurrence);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getRecurrence = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Verify task ownership
    const task = await Task.findOne({ where: {id:taskId, userId: req.user.userId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const recurrence = await Recurrence.findOne({ where: { taskId } });
    if (!recurrence) return res.status(200).json(null);

    res.json(recurrence);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateRecurrence = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Verify task ownership
    const task = await Task.findOne({ where: { id: taskId, userId: req.user.userId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const recurrence = await Recurrence.findOne({ where: { taskId } });
    if (!recurrence) return res.status(404).json({ message: 'Recurrence not found' });

    await recurrence.update(req.body);
    res.json(recurrence);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.deleteRecurrence = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Verify task ownership
    const task = await Task.findOne({ where: { id: taskId, userId: req.user.userId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const recurrence = await Recurrence.findOne({ where: { taskId } });
    if (!recurrence) return res.status(404).json({ message: 'Recurrence not found' });

    await recurrence.destroy();
    res.json({ message: 'Recurrence deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
