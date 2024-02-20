
import React from 'react';
import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../Column/Column';
import MockTasks from './MockTasks';
import HandleDragEnd from './HandleDragEnd';
import HandleDeleteTask from './HandleDeleteTask';
import HandleAddCard from './HandleAddCard';
import HandleUpdateCardText from './HandleUpdateCardText';

export default function KanbanBoard() {
    const [completed, setCompleted] = useState([]);
    const [doing, setDoing] = useState([]);
    const [incomplete, setIncomplete] = useState([]);

    useEffect(() => {
        // Inicializa os estados com as tarefas simulando o carregamento de uma API
        setCompleted(MockTasks.filter((task) => task.completed && !task.doing));
        setDoing(MockTasks.filter((task) => task.doing));
        setIncomplete(MockTasks.filter((task) => !task.completed && !task.doing));
    }, []);

    const handleDeleteTask = (taskId) => {
        HandleDeleteTask({
            taskId,
            incomplete,
            setIncomplete,
            doing,
            setDoing,
            completed,
            setCompleted,
        });
    };

    const handleAddCard = (columnId, title) => {
        HandleAddCard({
            columnId,
            title,
            setIncomplete,
            setDoing,
            setCompleted,
            incomplete,
            doing,
            completed,
        });
    };

    const handleUpdateTitle = (taskId, newTitle) => {
        HandleUpdateCardText ({
            taskId,
            newTitle,
            setIncomplete,
            setDoing,
            setCompleted,
            incomplete,
            doing,
            completed,
        });
    };

    const handleDragEnd = (result) => {
        HandleDragEnd({
            result,
            incomplete,
            setIncomplete,
            doing,
            setDoing,
            completed,
            setCompleted,
        });
    };
    

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}
            >
                <Column
                    title={"To Do"}
                    tasks={incomplete}
                    id={'1'}
                    onAddCard={handleAddCard}
                    onDelete={handleDeleteTask}
                    onUpdateTitle={handleUpdateTitle}
                />
                <Column
                    title={"Doing"}
                    tasks={doing}
                    id={'2'}
                    onAddCard={handleAddCard}
                    onDelete={handleDeleteTask}
                    onUpdateTitle={handleUpdateTitle}
                />
                <Column
                    title={"Ready"}
                    tasks={completed}
                    id={'3'}
                    onAddCard={handleAddCard}
                    onDelete={handleDeleteTask}
                    onUpdateTitle={handleUpdateTitle}
                />
            </div>
        </DragDropContext>
    );
}
