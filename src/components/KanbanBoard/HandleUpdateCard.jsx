

const HandleUpdateCard = ({
    taskId,
    newTitle,
    setIncomplete,
    setDoing,
    setCompleted,
    incomplete,
    doing,
    completed,
}) => {
    setIncomplete((prev) =>
        prev.map((task) =>
            task.id === taskId ? { ...task, title: newTitle } : task
        )
    );
    setDoing((prev) =>
        prev.map((task) =>
            task.id === taskId ? { ...task, title: newTitle } : task
        )
    );
    setCompleted((prev) =>
        prev.map((task) =>
            task.id === taskId ? { ...task, title: newTitle } : task
        )
    );

    return null; 
};

export default HandleUpdateCard;
