const HandleDeleteTask = async ({
  taskId,
  incomplete,
  setIncomplete,
  doing,
  setDoing,
  completed,
  setCompleted,
}) => {
  try {
    // Delete task from the backend
    const response = await fetch(`http://localhost:3002/api/kanban/deletetask?id=${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete task: ${response.status}`);
    }

    // Update the local state with the remaining tasks
    const updatedTasks = [...incomplete, ...doing, ...completed].filter(
      (task) => task.id !== taskId
    );

    setIncomplete(updatedTasks.filter((task) => !task.completed && !task.doing));
    setDoing(updatedTasks.filter((task) => task.doing));
    setCompleted(updatedTasks.filter((task) => task.completed && !task.doing));
  } catch (error) {
    console.error('Error deleting task:', error.message);
  }

  return null;
};

export default HandleDeleteTask;
