import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

export default function KanbanBoard() {
    const [completed, setCompleted] = useState([]);
    const [doing, setDoing] = useState([]);
    const [incomplete, setIncomplete] = useState([]);

    // Mock dados
    const mockTasks = [
        { id: 1, title: 'Tarefa 1', completed: true },
        { id: 2, title: 'Tarefa 2', completed: true },
        { id: 3, title: 'Tarefa 3', completed: true },
        { id: 4, title: 'Tarefa 4', completed: false, doing: true },
        { id: 5, title: 'Tarefa 5', completed: false, doing: true },
        { id: 6, title: 'Tarefa 6', completed: false, doing: true },
        { id: 7, title: 'Tarefa 7', completed: false },
        { id: 8, title: 'Tarefa 8', completed: false },
        { id: 9, title: 'Tarefa 9', completed: false },
    ];

    useEffect(() => {
        // Inicializa os estados com as tarefas simulando o carregamento de uma API
        setCompleted(mockTasks.filter((task) => task.completed && !task.doing));
        setDoing(mockTasks.filter((task) => task.doing));
        setIncomplete(mockTasks.filter((task) => !task.completed && !task.doing));
    }, []);

    // Funções para achar itens no array e remover do array
    function findItemById(id, array) {
        return array.find((item) => item.id == id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id != id);
    }

    // Função chamada ao finalizar o arrastar e soltar
    const handleDragEnd = (result) => {
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
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <h2 style={{ textAlign: 'center' }}>KANBAN BOARD</h2>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}
            >
                <Column title={"A Fazer"} tasks={incomplete} id={'1'} />
                <Column title={"Em Progresso"} tasks={doing} id={'2'} />
                <Column title={"Concluído"} tasks={completed} id={'3'} />
            </div>
        </DragDropContext>
    );
}
