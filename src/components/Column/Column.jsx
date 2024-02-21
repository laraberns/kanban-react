import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from '../Task/Task';
import NewCardForm from './NewCardForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEyeSlash,
  faEye,
  faSortAmountUp,
  faSortAmountDown,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';
import HandleAddCard from '../KanbanBoard/HandleAddCard';
import HandleUpdateCardText from '../KanbanBoard/HandleUpdateCardText';

// ... (imports)

const Column = ({
  title,
  tasks,
  id,
  onDelete,
  onUpdateTitle,
  setIncomplete,
  setDoing,
  setCompleted,
}) => {
  const [state, setState] = useState({
    sortAscending: true,
    isColumnHidden: false,
    showNewCardForm: false,
  });

  const handleSortTasks = () => {
    setState((prev) => ({ ...prev, sortAscending: !prev.sortAscending }));
  };

  const handleToggleNewCardForm = () => {
    setState((prev) => ({ ...prev, showNewCardForm: !prev.showNewCardForm }));
  };

  const handleHideColumn = () => {
    setState((prev) => ({ ...prev, isColumnHidden: true }));
  };

  const handleShowColumn = () => {
    setState((prev) => ({ ...prev, isColumnHidden: false }));
  };

  const renderButton = (onClick, icon, title) => (
    <button className="btn" onClick={onClick} title={title}>
      <FontAwesomeIcon icon={icon} className="mr-2" />
    </button>
  );

  const handleAddCard = async (columnId, title) => {
    try {
      setState((prev) => ({ ...prev, showNewCardForm: false }));
      await HandleAddCard({
        columnId,
        title,
        setIncomplete,
        setDoing,
        setCompleted,
      });
    } catch (error) {
      console.error('Error adding card:', error.message);
    }
  };

  const handleUpdateTitle = (taskId, newTitle) => {
    // Call your update function here
    HandleUpdateCardText({
      taskId,
      newTitle,
      setIncomplete,
      setDoing,
      setCompleted,
    });
    // Call the parent component's update function if needed
    onUpdateTitle(taskId, newTitle);
  };

  if (state.isColumnHidden) {
    return (
      <div>
        {renderButton(handleShowColumn, faEye, 'Mostrar Coluna')}
      </div>
    );
  }

  const sortedTasks = tasks.slice().sort((a, b) => {
    const sortOrder = state.sortAscending ? 1 : -1;
    return sortOrder * a.title.localeCompare(b.title);
  });

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 m-4">
      <div className="bg-gray-200 rounded-md p-4 shadow-md">
        <div className="font-extrabold text-2xl mb-2 text-purple-700 underline">
          {title}
        </div>

        <div className="flex items-center m-3 justify-center gap-2">
          {renderButton(handleSortTasks, state.sortAscending ? faSortAmountUp : faSortAmountDown, 'Ordenar por Texto')}
          {renderButton(handleToggleNewCardForm, state.showNewCardForm ? faMinus : faPlus, 'Adicionar novo card')}
          {renderButton(handleHideColumn, faEyeSlash, 'Esconder Coluna')}
        </div>

        <div className="h-96 overflow-y-auto bg-gray-200 rounded-md">
          {state.showNewCardForm && <NewCardForm onAddCard={handleAddCard} columnId={id} />}
          <Droppable droppableId={id}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  transition: 'background-color 0.3s ease',
                  backgroundColor: snapshot.isDraggingOver ? 'lightblue' : 'inherit',
                  minHeight: '100px',
                }}
              >
                {sortedTasks.map((task, index) => (
                  <Task
                    key={index}
                    index={index}
                    task={task}
                    onDelete={onDelete}
                    onUpdateTitle={handleUpdateTitle}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </div>
  );
};

export default Column;
