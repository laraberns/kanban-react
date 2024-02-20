const HandleDeleteTask = ({
    taskId,
    incomplete,
    setIncomplete,
    doing,
    setDoing,
    completed,
    setCompleted,
}) => {
    const updatedTasks = [...incomplete, ...doing, ...completed].filter(
        (task) => task.id !== taskId
    );

    setIncomplete(updatedTasks.filter((task) => !task.completed && !task.doing));
    setDoing(updatedTasks.filter((task) => task.doing));
    setCompleted(updatedTasks.filter((task) => task.completed && !task.doing));

    return null;
};

export default HandleDeleteTask;
