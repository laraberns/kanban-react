    // Funções para achar itens no array e remover do array
    function findItemById(id, array) {
        return array.find((item) => item.id == id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id != id);
    }

const HandleDragEnd = ({ result, incomplete, setIncomplete, doing, setDoing, completed, setCompleted }) => {
    const { destination, source, draggableId } = result;

    if (!destination) return; // Se o destino for inválido, não faz nada

    if (source.droppableId === destination.droppableId) return; // Se a origem e o destino forem iguais, não faz nada

    // Remove da coluna de origem
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

    // Obtém a tarefa
    const task = findItemById(draggableId, [...incomplete, ...completed, ...doing]);

    // Adiciona à coluna de destino
    switch (destination.droppableId) {
        case '3':
            setCompleted((prev) => [...prev, { ...task, completed: true }]);
            break;
        case '2':
            setDoing((prev) => [...prev, { ...task, completed: false }]);
            break;
        case '1':
            setIncomplete((prev) => [...prev, { ...task, completed: false }]);
            break;
        default:
            break;
    }

    return null;
};

export default HandleDragEnd;
