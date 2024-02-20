import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Container from './ColumnContainer';
import Title from './ColumnTitle';
import DroppableContainer from './DroppableContainer';
import Task from '../Task/Task';

const NewCardForm = ({ onAddCard, columnId }) => {
    const [newCardInput, setNewCardInput] = useState('');

    const handleAddCard = () => {
        onAddCard(columnId, newCardInput);
        setNewCardInput('');
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter new card title"
                value={newCardInput}
                onChange={(e) => setNewCardInput(e.target.value)}
            />
            <button onClick={handleAddCard}>Add Card</button>
        </div>
    );
};

const Column = ({ title, tasks, id, onAddCard, onDelete, onUpdateTitle }) => {
    const [sortAscending, setSortAscending] = useState(true);
    const [isColumnHidden, setIsColumnHidden] = useState(false);

    const handleSortTasks = () => {
        setSortAscending((prevSortAscending) => !prevSortAscending);
    };

    const handleHideColumn = () => {
        setIsColumnHidden(true);
    };

    const handleShowColumn = () => {
        setIsColumnHidden(false);
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
        <Container>
            <Title>
                {title}
            </Title>
            <button onClick={handleSortTasks}>Ordenar por Id (Crescente)</button>
            <button onClick={() => setSortAscending(false)}>Ordenar por Id (Decrescente)</button>
            <button onClick={handleHideColumn}>Esconder Coluna</button>
            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <DroppableContainer
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        $isDraggingOver={snapshot.isDraggingOver}
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
                        <NewCardForm onAddCard={onAddCard} columnId={id} />
                    </DroppableContainer>
                )}
            </Droppable>
        </Container>
    );
};

export default Column;
