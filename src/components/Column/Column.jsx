import { Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';
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
    return (
        <Container>
            <Title>{title}</Title>
            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <DroppableContainer
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        $isDraggingOver={snapshot.isDraggingOver}
                    >
                        {tasks.map((task, index) => (
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
