const HandleUpdateCardText = async ({ taskId, newTitle, setIncomplete, setDoing, setCompleted }) => {
    try {
        await fetch('http://localhost:3002/api/kanban/updatetask', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: taskId, newTitle }),
        });

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
    } catch (error) {
        console.error("Error updating task title:", error);
    }
};

export default HandleUpdateCardText;
