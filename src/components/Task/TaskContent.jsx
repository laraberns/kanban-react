import styled from 'styled-components';

const TextContent = styled.div``;

export default function TaskContent({ task }) {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2' }}>
            <TextContent>
                <div className="text-xl font-bold text-gray-800 mb-2">{task.title}</div>
                {task.completed && task.completionDate && (
                    <p className="text-sm text-gray-500 mb-2">Finalizada em {task.completionDate}</p>
                )}
                {task.id !== undefined && (
                    <p className="text-xs text-gray-400">ID: {task.id}</p>
                )}
            </TextContent>
        </div>
    );
}
