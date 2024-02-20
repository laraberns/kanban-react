const HandleUpdateCardText = ({ taskId, newTitle, setIncomplete, setDoing, setCompleted }) => {
    setIncomplete((prevIncomplete) =>
        prevIncomplete.map((task) =>
            task.id === taskId ? { ...task, title: newTitle } : task
        )
    );
    setDoing((prevDoing) =>
        prevDoing.map((task) =>
            task.id === taskId ? { ...task, title: newTitle } : task
        )
    );
    setCompleted((prevCompleted) =>
        prevCompleted.map((task) =>
            task.id === taskId ? { ...task, title: newTitle } : task
        )
    );

    return null;
};

export default HandleUpdateCardText;
