import styled from 'styled-components';

const DroppableContainer = styled.div`
    padding: 3px;
    background-color: ${(props) => (props.isDraggingOver ? '#e0e0e0' : '#f4f5f7')};
    flex-grow: 1;
    min-height: 100px;
`;

export default DroppableContainer;
