import { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import Column from './Column'

export default function KanbanBoard() {

    const [completed, setCompleted] = useState([])
    const [doing, setDoing] = useState([])
    const [incomplete, setIncomplete] = useState([])

    return (
        <DragDropContext>
            <h2 style={{ textAlign: 'center' }}>KANBAN BOARD</h2>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                <Column title={"To Do"} tasks={incomplete} id={'1'} />
                <Column title={"Doing"} tasks={doing} id={'2'} />
                <Column title={"Ready"} tasks={completed} id={'3'} />
            </div>
        </DragDropContext>
    )
}