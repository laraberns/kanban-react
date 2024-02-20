import styled from 'styled-components';

const TextContent = styled.div``;

export default function TaskContent({ isEditing, children }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2' }}>
            <TextContent>{children}</TextContent>
        </div>
    );
}
