let taskIdCounter = 10; // Id inicial

const HandleAddCard = ({
    columnId,
    title,
    setIncomplete,
    setDoing,
    setCompleted
}) => {
    const newTask = { id: taskIdCounter++, title, completed: false, doing: false };

    switch (columnId) {
        case '1':
            setIncomplete((prev) => [...prev, newTask]);
            break;
        case '2':
            setDoing((prev) => [...prev, newTask]);
            break;
        case '3':
            setCompleted((prev) => [...prev, newTask]);
            break;
        default:
            break;
    }

    return null; // This component doesn't render anything
};

export default HandleAddCard;
