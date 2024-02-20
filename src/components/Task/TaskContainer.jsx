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
