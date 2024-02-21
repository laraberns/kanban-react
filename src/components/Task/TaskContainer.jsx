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
    box-shadow: ${(props) =>
        props.isDragging
            ? '0 20px 8px rgba(0, 0, 0, 0.2)'
            : '0 5px 4px rgba(0, 0, 0, 0.1)'};
`;

function bgcolorchange(props) {
    return props.isDragging
        ? '#b6f5b4' // Green background when dragging
        : props.isDraggable
        ? '#9AFF9A' // Light green background when not dragging and draggable
        : '#fffada'; // Yellow background when not draggable
}


export default function TaskContainer({ provided, snapshot, children }) {
    return (
        <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
        >
            {children}
        </Container>
    );
}
