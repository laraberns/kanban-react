import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../Column/Column';
import MockTasks from './MockTasks';
import HandleDragEnd from './HandleDragEnd';
import HandleDeleteTask from './HandleDeleteTask';
import HandleAddCard from './HandleAddCard';
import HandleUpdateCardText from './HandleUpdateCardText';
import TaskSearch from './TaskSearch';

export default function KanbanBoard() {
    const [completed, setCompleted] = useState([]);
    const [doing, setDoing] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(() => {
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
        HandleUpdateCardText({
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

    const handleSearch = (searchText) => {
        const allTasks = [...incomplete, ...doing, ...completed];
        const filtered = allTasks.filter((task) =>
            task.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredTasks(filtered);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <TaskSearch tasks={[...incomplete, ...doing, ...completed]} onSearch={handleSearch} />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Column
                        title={"To Do"}
                        tasks={filteredTasks.length > 0 ? filteredTasks.filter(task => incomplete.includes(task)) : incomplete}
                        id={'1'}
                        onAddCard={handleAddCard}
                        onDelete={handleDeleteTask}
                        onUpdateTitle={handleUpdateTitle}
                    />
                    <Column
                        title={"Doing"}
                        tasks={filteredTasks.length > 0 ? filteredTasks.filter(task => doing.includes(task)) : doing}
                        id={'2'}
                        onAddCard={handleAddCard}
                        onDelete={handleDeleteTask}
                        onUpdateTitle={handleUpdateTitle}
                    />
                    <Column
                        title={"Ready"}
                        tasks={filteredTasks.length > 0 ? filteredTasks.filter(task => completed.includes(task)) : completed}
                        id={'3'}
                        onAddCard={handleAddCard}
                        onDelete={handleDeleteTask}
                        onUpdateTitle={handleUpdateTitle}
                    />
                </div>
            </div>
        </DragDropContext>
    );
}
