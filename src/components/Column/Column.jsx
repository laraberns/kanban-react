import React, { useState, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from '../Task/Task';
import NewCardForm from './NewCardForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye, faSortAmountUp, faSortAmountDown, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import HandleAddCard from '../KanbanBoard/HandleAddCard';

const Column = ({ title, tasks, id, onDelete, onUpdateTitle, setIncomplete, setDoing, setCompleted, filteredTasks }) => {
    const [state, setState] = useState({
        sortAscending: true,
        isColumnHidden: false,
        showNewCardForm: false,
    });

    // Use tasks directly instead of maintaining a separate state for renderedTasks
    const sortedTasks = [...tasks].sort((a, b) => {
        const orderMultiplier = state.sortAscending ? 1 : -1;
        return orderMultiplier * (a.id - b.id);
    });


    const handleSortTasks = () => {
        setState((prevState) => ({ ...prevState, sortAscending: !prevState.sortAscending }));
    };

    const handleToggleNewCardForm = () => {
        setState((prevState) => ({ ...prevState, showNewCardForm: !prevState.showNewCardForm }));
    };

    const handleHideColumn = () => {
        setState((prevState) => ({ ...prevState, isColumnHidden: true }));
    };

    const handleShowColumn = () => {
        setState((prevState) => ({ ...prevState, isColumnHidden: false }));
    };

    const renderButton = (onClick, icon, title) => (
        <button className="btn" onClick={onClick} title={title}>
            <FontAwesomeIcon icon={icon} className="mr-2" />
        </button>
    );

    const handleAddCard = async (columnId, title) => {
        try {
            setState((prev) => ({ ...prev, showNewCardForm: false }));
            await HandleAddCard({
                columnId,
                title,
                setIncomplete,
                setDoing,
                setCompleted,
            });
        } catch (error) {
            console.error('Error adding card:', error.message);
        }
    };

    if (state.isColumnHidden) {
        return (
            <div>
                {renderButton(handleShowColumn, faEye, "Mostrar Coluna")}
            </div>
        );
    }

    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 m-4">
            <div className="bg-gray-200 rounded-md p-4 shadow-md">
                <div className="font-extrabold text-2xl mb-2 text-purple-700 underline">
                    {title}
                </div>

                <div className="flex items-center m-3 justify-center gap-2">
                    {renderButton(handleSortTasks, faSortAmountUp, "Ordenar por Id (Crescente)")}
                    {renderButton(() => setState((prev) => ({ ...prev, sortAscending: false })), faSortAmountDown, "Ordenar por Id (Decrescente)")}
                    {renderButton(state.isColumnHidden ? handleShowColumn : handleHideColumn, state.isColumnHidden ? faEye : faEyeSlash, state.isColumnHidden ? "Mostrar Coluna" : "Esconder Coluna")}
                    {renderButton(handleToggleNewCardForm, state.showNewCardForm ? faMinus : faPlus, "Adicionar novo card")}
                </div>

                <div className="h-96 overflow-y-auto bg-gray-200 rounded-md">
                    {state.showNewCardForm && <NewCardForm onAddCard={handleAddCard} columnId={id} />}
                    <Droppable droppableId={id}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{
                                    transition: 'background-color 0.3s ease',
                                    backgroundColor: snapshot.isDraggingOver ? 'lightblue' : 'inherit',
                                }}
                            >
                                {sortedTasks.map((task, index) => (
                                    <Task
                                        key={index}
                                        index={index}
                                        task={task}
                                        onDelete={onDelete}
                                        onUpdateTitle={onUpdateTitle}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </div>
        </div>
    );
}

export default Column;