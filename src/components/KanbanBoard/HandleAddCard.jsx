const HandleAddCard = async ({
    columnId,
    title,
    setIncomplete,
    setDoing,
    setCompleted,
}) => {
    try {
        let newTask;

        switch (columnId) {
            case '1':
                newTask = { title, completed: false, doing: false, completionDate: null };
                setIncomplete((prev) => [...prev, newTask]);
                break;
            case '2':
                newTask = { title, completed: false, doing: true, completionDate: null };
                setDoing((prev) => [...prev, newTask]);
                break;
            case '3':
                newTask = { title, completed: true, doing: false, completionDate: null };
                setCompleted((prev) => [...prev, newTask]);
                break;
            default:
                break;
        }

        const response = await fetch('http://localhost:3002/api/kanban/posttask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        });

        if (!response.ok) {
            throw new Error(`Failed to add task: ${response.status}`);
        }

        const responseData = await response.json();
        const updatedTask = { ...newTask, id: responseData.id }; // Include the received ID in the task

        // Update the UI with the task including the ID
        switch (columnId) {
            case '1':
                setIncomplete((prev) => [...prev.slice(0, -1), updatedTask]);
                break;
            case '2':
                setDoing((prev) => [...prev.slice(0, -1), updatedTask]);
                break;
            case '3':
                setCompleted((prev) => [...prev.slice(0, -1), updatedTask]);
                break;
            default:
                break;
        }
    } catch (error) {
        console.error('Error adding task:', error.message);
    }
};

export default HandleAddCard;
