import React, { useState } from 'react';

const TaskSearch = ({ tasks, onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
        const text = e.target.value;
        setSearchText(text);
        onSearch(text);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search tasks"
                value={searchText}
                onChange={handleSearch}
            />
        </div>
    );
};

export default TaskSearch;
