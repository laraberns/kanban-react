import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

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
`

const TextContent = styled.div`
`

// Controlar a cor do card ao mudar o estado
function bgcolorchange(props) {
    return props.isDragging
        ? "lightgreen"
        : props.isDraggable
            ? props.isBacklog
                ? "F2D7D5"
                : "DCDCDC"
            : props.isBacklog
                ? "F2D7D5"
                : "fffada";
}

export default function Task({ task, index }) {

    return (
        <Container>

            <div style={{ display: "flex", justifyContent: 'start', padding: 2 }}>
                <span>
                    <small>
                        #{task.id}
                        {""}
                    </small>
                </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', padding: '2' }}>
                <TextContent>{task.title}</TextContent>
            </div>
        </Container>
    )

    return (
        <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
            {/*Provided e Snapshot são utilizados para alterar o estado das tasks*/}
            {(provided, snapshot) => {
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}>

                    <div style={{ display: "flex", justifyContent: 'start', padding: 2 }}>
                        <span>
                            <small>
                                #{task.id}
                                {""}
                            </small>
                        </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', padding: '2' }}>
                        <TextContent>{task.title}</TextContent>
                    </div>
                    {provided.placeholder}
                </Container>
            }}
        </Draggable>
    )
}