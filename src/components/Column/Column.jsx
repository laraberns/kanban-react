import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from '../Task/Task';
import NewCardForm from './NewCardForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye, faSortAmountUp, faSortAmountDown, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const Column = ({ title, tasks, id, onAddCard, onDelete, onUpdateTitle }) => {
    const [sortAscending, setSortAscending] = useState(true);
    const [isColumnHidden, setIsColumnHidden] = useState(false);
    const [showNewCardForm, setShowNewCardForm] = useState(false);

    const handleSortTasks = () => {
        setSortAscending((prevSortAscending) => !prevSortAscending);
    };

    const handleHideColumn = () => {
        setIsColumnHidden(true);
    };

    const handleShowColumn = () => {
        setIsColumnHidden(false);
    };

    const handleToggleNewCardForm = () => {
        setShowNewCardForm(!showNewCardForm);
    };

    const sortedTasks = [...tasks].sort((a, b) => {
        const orderMultiplier = sortAscending ? 1 : -1;
        return orderMultiplier * (a.id - b.id);
    });

    if (isColumnHidden) {
        return (
            <div>
                <button onClick={handleShowColumn}>Mostrar Coluna</button>
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
                    <button className="btn" onClick={handleSortTasks} title="Ordenar por Id (Crescente)">
                        <FontAwesomeIcon icon={faSortAmountUp} className="mr-2" />
                    </button>
                    <button className="btn" onClick={() => setSortAscending(false)} title="Ordenar por Id (Decrescente)">
                        <FontAwesomeIcon icon={faSortAmountDown} className="mr-2" />
                    </button>
                    <button className="btn" onClick={handleHideColumn} title={isColumnHidden ? "Mostrar Coluna" : "Esconder Coluna"}>
                        {isColumnHidden ? (
                            <>
                                <FontAwesomeIcon icon={faEye} className="mr-2" />
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faEyeSlash} className="mr-2" />
                            </>
                        )}
                    </button>
                    <button className="btn" onClick={handleToggleNewCardForm} title="Adicionar novo card">
                        <FontAwesomeIcon icon={showNewCardForm ? faMinus : faPlus} />
                    </button>
                </div>

                <div className="h-96 overflow-y-auto bg-gray-200 rounded-md">
                    {showNewCardForm && <NewCardForm onAddCard={onAddCard} columnId={id} />}
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
