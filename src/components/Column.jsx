import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Task from './Task';

const DroppableContainer = styled.div`
    padding: 3px;
    background-color: ${(props) => (props.isDraggingOver ? '#e0e0e0' : '#f4f5f7')};
    flex-grow: 1;
    min-height: 100px;
`;

const Container = styled.div`
    background-color: #f4f6f7;
    border-radius: 2.5px;
    width: 300px;
    height: 300px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    border: 1px solid grey;
`;

const Title = styled.h3`
    padding: 8px;
    background-color: pink;
    text-align: center;
    position: sticky;
`;

export default function Column({ title, tasks, id }) {
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
                            <Task key={index} index={index} task={task} />
                        ))}
                        {provided.placeholder}
                    </DroppableContainer>
                )}
            </Droppable>
        </Container>
    );
}
