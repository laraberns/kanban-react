import { Draggable } from 'react-beautiful-dnd';
import TaskContainer from './TaskContainer';
import TaskContent from './TaskContent';
import TaskActions from './TaskActions';
import EditableTaskTitle from './EditableTaskTitle';
import { useState } from 'react';

export default function Task({ task, index, onDelete, onUpdateTitle }) {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleBlurTitle = (newTitle) => {
        onUpdateTitle(task.id, newTitle);
        setIsEditing(false);
    };

    return (
        <Draggable draggableId={`${task.id}`} index={index}>
        {(provided, snapshot) => (
            <TaskContainer provided={provided} snapshot={snapshot}>
                <TaskActions onDelete={() => onDelete(task.id)} onEdit={handleEditClick} />
                {isEditing ? (
                    <EditableTaskTitle
                        initialTitle={task.title}
                        onBlur={handleBlurTitle}
                    />
                ) : (
                    <TaskContent isEditing={isEditing}>
                        {task.title}
                        {task.completed && (
                            <p>Data de conclusão: {task.completionDate}</p>
                        )}
                    </TaskContent>
                )}
                {provided.placeholder}
            </TaskContainer>
        )}
    </Draggable>
    );
}
