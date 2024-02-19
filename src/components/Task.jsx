import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
    border-radius: 10px;
    padding: 8px;
    color: #000;
    margin-bottom: 8px;
    min-height: 90px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: ${(props) => bgcolorchange(props)};
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;

const TextContent = styled.div``;

function bgcolorchange(props) {
    return props.isDragging
        ? '#b6f5b4'
        : props.isDraggable
        ? props.isBacklog
            ? '#F2D7D5'
            : '#DCDCDC'
        : props.isBacklog
        ? '#F2D7D5'
        : '#fffada';
}

export default function Task({ task, index, onDelete, onUpdateTitle }) {
    const [newTitle, setNewTitle] = useState(task.title);
    const [isEditing, setIsEditing] = useState(false);

    const handleChangeTitle = (event) => {
        setNewTitle(event.target.value);
    };

    const handleBlurTitle = () => {
        onUpdateTitle(task.id, newTitle);
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onUpdateTitle(task.id, newTitle);
            setIsEditing(false);
        }
    };

    return (
        <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    <button onClick={() => onDelete(task.id)}>Excluir</button>
                    {isEditing ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '2' }}>
                            <TextContent>
                                <input
                                    type="text"
                                    value={newTitle}
                                    onChange={handleChangeTitle}
                                    onBlur={handleBlurTitle}
                                    onKeyDown={handleKeyDown}
                                />
                            </TextContent>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '2' }}>
                            <TextContent>{task.title}</TextContent>
                        </div>
                    )}
                    <button onClick={handleEditClick}>Editar</button>
                    {provided.placeholder}
                </Container>
            )}
        </Draggable>
    );
}
