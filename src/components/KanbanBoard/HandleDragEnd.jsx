// Funções para achar itens no array e remover do array
function findItemById(id, array) {
    return array.find((item) => item.id == id);
}

function removeItemById(id, array) {
    return array.filter((item) => item.id != id);
}

const HandleDragEnd = async ({ result, incomplete, setIncomplete, doing, setDoing, completed, setCompleted }) => {

    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) return;

    // Update the task status on the backend
    try {
        await fetch('http://localhost:3002/api/kanban/updatetaskstatus', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: draggableId,
                completed: destination.droppableId === '3',
                doing: destination.droppableId === '2',
            }),
        });
    } catch (error) {
        console.error("Error updating task status:", error);
        return;  // Exit the function if there is an error
    }

    // Remove from the source column
    switch (source.droppableId) {
        case '1':
            setIncomplete((prev) => removeItemById(draggableId, prev));
            break;
        case '2':
            setDoing((prev) => removeItemById(draggableId, prev));
            break;
        case '3':
            setCompleted((prev) => removeItemById(draggableId, prev));
            break;
        default:
            break;
    }

    // Add to the destination column
    switch (destination.droppableId) {
        case '3':
            setCompleted((prev) => [
                ...prev,
                { ...findItemById(draggableId, [...incomplete, ...doing, ...completed]), completed: true, completionDate: new Date().toISOString().slice(0, 10), doing: false },
            ]);
            break;
        case '2':
            setDoing((prev) => [
                ...prev,
                { ...findItemById(draggableId, [...incomplete, ...doing, ...completed]), completed: false, doing: true },
            ]);
            break;
        case '1':
            setIncomplete((prev) => [
                ...prev,
                { ...findItemById(draggableId, [...incomplete, ...doing, ...completed]), completed: false, doing: false },
            ]);
            break;
        default:
            break;
    }
};


export default HandleDragEnd;
