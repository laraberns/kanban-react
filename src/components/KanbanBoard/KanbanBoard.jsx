import React, { useState, useEffect } from 'react';
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
            <div className="flex flex-col h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
                {/* Header Section */}
                <div className="sm:flex sm:items-center sm:justify-between bg-white bg-opacity-75 p-4">
                    {/* Search Input and Navigation Links */}
                    <div className="mt-4 sm:mt-0 sm:flex sm:items-center sm:ml-4">
                        {/* Search Input */}
                        <input
                            className="h-10 px-4 sm:mr-4 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
                            type="search"
                            placeholder="Procurar..."
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        {/* Navigation Links */}
                        <div className="flex flex-wrap justify-center items-center mt-3 sm:mt-0">
                            <a className="mr-2 text-base font-semibold text-indigo-700" href="#">
                                Projetos
                            </a>
                            <a className="text-base font-semibold text-gray-600 hover:text-indigo-700" href="#">
                                Times
                            </a>
                        </div>
                    </div>
                    {/* User Icon */}
                    <button className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer">
                        <img
                            src="https://github.com/laraberns.png"
                            alt=""
                        />
                    </button>
                </div>
                {/* Kanban Board Columns */}
                <div className="flex flex-wrap justify-center mt-4">
                    {/* Columns go here */}
                    <Column
                        title={"To Do"}
                        tasks={filteredTasks.length > 0 ? filteredTasks.filter((task) => incomplete.includes(task)) : incomplete}
                        id={'1'}
                        onAddCard={handleAddCard}
                        onDelete={handleDeleteTask}
                        onUpdateTitle={handleUpdateTitle}
                    />
                    <Column
                        title={"Doing"}
                        tasks={filteredTasks.length > 0 ? filteredTasks.filter((task) => doing.includes(task)) : doing}
                        id={'2'}
                        onAddCard={handleAddCard}
                        onDelete={handleDeleteTask}
                        onUpdateTitle={handleUpdateTitle}
                    />
                    <Column
                        title={"Ready"}
                        tasks={filteredTasks.length > 0 ? filteredTasks.filter((task) => completed.includes(task)) : completed}
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
