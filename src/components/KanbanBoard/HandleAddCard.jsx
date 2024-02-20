let currentId = 1; // Initialize with the starting ID

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
                newTask = { id: currentId.toString(), title, completed: false, doing: false, completionDate: null };
                setIncomplete((prev) => [...prev, newTask]);
                break;
            case '2':
                newTask = { id: currentId.toString(), title, completed: false, doing: true, completionDate: null };
                setDoing((prev) => [...prev, newTask]);
                break;
            case '3':
                newTask = { id: currentId.toString(), title, completed: true, doing: false, completionDate: null };
                setCompleted((prev) => [...prev, newTask]);
                break;
            default:
                break;
        }

        currentId++; // Increment the ID for the next task

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

        // No need to wait for the response to update the UI

    } catch (error) {
        console.error('Error adding task:', error.message);
    }
};

export default HandleAddCard;
