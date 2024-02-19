import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import Task from './Task'

const Container = styled.div`
    background-color: #f4f6f7;
    border-radius: 2.5px;
    width: 300px;
    height: 300px;
    overflow-y: scroll;
    -ms-overflow-style:none;
    scrollbar-width:none;
    border: 1px solid grey;
`

const Title = styled.h3`
    padding: 8px;
    background-color: pink;
    text-align: center;
    position: sticky;
`
const TaskList = styled.div`
    padding: 3px;
    background-color: #f4f5f7;
    flex-grow: 1;
    min-height: 100px;
`

export default function Column({ title, tasks, id }) {
    return (
        <Container>
            <Title>
                {title}
            </Title>
            <Droppable droppableId={id}>
                {/*Provided e Snapshot são utilizados para alterar o estado das tasks*/}
                {(provided, snapshot) => (
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                        {/* Coloque aqui suas tasks! */}
                        {provided.placeholder}

                        <Task task={{ id: 123, title: "Faça um kanban" }} index='1' />

                    </TaskList>
                )}
            </Droppable>
        </Container>
    )
}