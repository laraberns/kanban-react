import { useState } from 'react';

export default function EditableTaskTitle({ initialTitle, onBlur }) {
    const [title, setTitle] = useState(initialTitle);

    const handleChange = (event) => {
        setTitle(event.target.value);
    };

    return (
        <input
            type="text"
            value={title}
            onChange={handleChange}
            onBlur={() => onBlur(title)}
            onKeyDown={(event) => {
                if (event.key === 'Enter') onBlur(title);
            }}
        />
    );
}
